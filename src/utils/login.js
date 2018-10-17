import CryptoJS from 'crypto-js/crypto-js'
import $http from './ajax'
import {CONSTANT} from '@/assets/js/constant'

export default {
  async phoneLogin (data, type) {
    // type:1、获取openid 2、通过openid注册绑定
    let tmpParam = {}
    if (type === 1) {
      tmpParam.code = data.code
      // 风控需要传此字段,前期不走风控
      // tmpParam.fingerprint = wx.getStorageSync('fingerprint')
      tmpParam.iv = data.iv
      tmpParam.encryptedData = data.encryptedData
      tmpParam.rawData = data.rawData
      tmpParam.signature = data.signature
    } else if (type === 2) {
      tmpParam.code = wx.getStorageSync('cyCode')
      tmpParam.iv = data.iv
      tmpParam.encryptedData = data.encryptedData
    }
    let expdate = new Date().getTime()
    let param = {
      ...tmpParam,
      'authType': CONSTANT.AUTH_TYPE,
      'msgVersion': CONSTANT.MSG_VERSION,
      'custString': CONSTANT.CUST_STRING,
      'platform': CONSTANT.PLATFORM,
      'appId': CONSTANT.REQUIST_APP_ID,
      'coordinate': CONSTANT.COORDINATE,
      'machineNo': CONSTANT.MACHINE_NO,
      'type': CONSTANT.REQUIST_TYPE,
      'channel_source': wx.getStorageSync('CHANNEL_SOURCE_') || CONSTANT.CHANNEL_SOURCE,
      'reqTime': expdate.toString()
    }
    param.sign = this.encryption(param)
    let tmpData = await $http.postOther('/miniProgram/login', param)
    if (tmpData.respCode === '0000') {
      // 登录成功则返回'0000'
      // tmpData.data.respCode
      // 0000：登录成功
      // U006：未绑定账号
      // U007：该手机已被其他账号绑定
      // U011：code无效
      // 9999：系统异常
      if (tmpData.data.respCode === '0000') {
        wx.setStorageSync('login_token', tmpData.data.data.token)
        wx.setStorageSync('cyCode', tmpData.data.data.cycode)
        let tmpPhoneNumber = tmpData.data.data.mobileNo
        let reg = /^(\d{3})\d{4}(\d{4})$/
        tmpPhoneNumber = tmpPhoneNumber.replace(reg, '$1****$2')
        wx.setStorageSync('userPhoneNumber', tmpPhoneNumber)
        let words = CryptoJS.enc.Base64.parse(tmpData.data.data.openId)
        let openid = words.toString(CryptoJS.enc.Utf8).slice(6)
        wx.setStorageSync('openid', openid)
        let callData = {
          respCode: tmpData.data.respCode,
          openId: openid
        }
        return callData
      } else if (tmpData.data.respCode === 'U011' || tmpData.data.respCode === 'U006') {
        //  code invalid && no bind
        wx.setStorageSync('loginSatus', 'U006')
        wx.setStorageSync('cyCode', tmpData.data.data.cycode)
        let words = CryptoJS.enc.Base64.parse(tmpData.data.data.openId)
        let openid = words.toString(CryptoJS.enc.Utf8).slice(6)
        wx.setStorageSync('openid', openid)
        let callData = {
          respCode: tmpData.data.respCode,
          openId: openid
        }
        return callData
      } else if (tmpData.data.respCode === 'U0007') {
        // 此功能后台暂时不支持
        console.log('需要进行解绑操作')
      } else if (tmpData.data.respCode === '9999') {
        //  System abnormality
      }
    } else {
      wx.removeStorageSync('login_token')
      wx.showToast({
        title: '登录失败',
        icon: 'none',
        duration: 2000
      })
      return tmpData.respCode
    }
  },
  async checkTooken () { // 判断token是否过期
    let tmpData = await $http.postOther('/service/validate/loginToken', this.signatureParam())
    if (tmpData.respCode === '0000') {
    //  token有效返回'0000'
      return tmpData.data.validResult
    } else {
      // token无效 需要执行重新登录逻辑
      return tmpData.respCode
    }
  },
  signatureParam () {
    let expdate = new Date().getTime()
    let param = {
      'appId': CONSTANT.REQUIST_APP_ID,
      'authType': CONSTANT.AUTH_TYPE,
      'coordinate': CONSTANT.COORDINATE,
      'custString': CONSTANT.CUST_STRING,
      'ip': CONSTANT.REQUIST_IP,
      'login_token': wx.getStorageSync('login_token'),
      'machineNo': CONSTANT.MACHINE_NO,
      'msgVersion': CONSTANT.MSG_VERSION,
      'platform': CONSTANT.PLATFORM,
      'reqTime': expdate.toString()
    }
    param.sign = this.encryption(param)
    return param
  },
  encryption (data) {
    let strs = []
    for (let i in data) {
      strs.push(i + '' + data[i])
    }
    // 数组排序
    strs.sort()
    // 数组变字符串
    strs = strs.join('')
    // MD5加密
    let endData = CryptoJS.MD5(strs + '123456').toString()
    return endData
  },
  reLogin (type, _this) {
    let that = this
    return new Promise((resolve, reject) => {
      wx.login({
        success: function (data) {
          if (data.code) {
            wx.getUserInfo({
              success: (e) => {
                e.code = data.code
                let weChatInfo = e.userInfo
                wx.setStorageSync('_AVATARuRL_', weChatInfo.avatarUrl)
                wx.setStorageSync('_NICKNAME_', weChatInfo.nickName)
                that.phoneLogin(e, 1).then(res => {
                  if (res.respCode === 'U011' || res.respCode === 'U006') {
                    // code 无效或未绑定手机号
                    resolve(res.respCode)
                  } else if (res.respCode === '0000') {
                    resolve(res.respCode)
                  }
                })
              },
              fail: (e) => {
                resolve(-1)
              }
            })
          }
        }
      })
    })
  }
}
