import {CONSTANT} from '@/assets/js/constant'
/* global __APIHOST__ */
/* global __LOGINAPIHOST__ */

export default {
  post (url, data, loadingType) {
    if (!loadingType) {
      wx.showNavigationBarLoading()
    }
    let param = {}
    param.head = this.getApiHeader()
    if (data) {
      param = Object.assign(param, data)
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: __APIHOST__ + url,
        data: param,
        method: 'POST',
        success: function (res) {
          wx.hideNavigationBarLoading()
          if (res.data.code === 0) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: function (res) {
          wx.hideNavigationBarLoading()
          wx.showToast({
            title: '当前网络异常，请稍后再试',
            icon: 'none',
            duration: 2000
          })
        }
      })
    })
  },
  get (url, data) {
    wx.showNavigationBarLoading()
    let param = {}
    param.head = this.getApiHeader()
    if (data) {
      param = Object.assign(param, data)
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: __APIHOST__ + url,
        data: param,
        method: 'GET',
        success: function (res) {
          wx.hideNavigationBarLoading()
          if (res.data.code === 0) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: function (res) {
          wx.hideNavigationBarLoading()
          wx.showToast({
            title: '当前网络异常，请稍后再试',
            icon: 'none',
            duration: 2000
          })
        }
      })
    })
  },
  getApiHeader () {
    let head = {}
    head.token = wx.getStorageSync('login_token')
    head.channel = wx.getStorageSync('CHANNEL_SOURCE_') || CONSTANT.CHANNEL_SOURCE
    head.clientId = ''
    return head
  },
  postOther (url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: __LOGINAPIHOST__ + url,
        data: data,
        method: 'POST',
        success: function (res) {
          resolve(res.data)
        },
        fail: function (res) {
          wx.showToast({
            title: '当前网络异常，请稍后再试',
            icon: 'none',
            duration: 2000
          })
        }
      })
    })
  }
}
