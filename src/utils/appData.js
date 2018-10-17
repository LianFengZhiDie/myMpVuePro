// 设置appdata
export default {
  setData (key, val) {
    let AppData = getApp()
    !AppData.globalData.pageData && (AppData.globalData.pageData = {})
    AppData = AppData.globalData.pageData
    if (key && val) {
      AppData[key] = val
    }
    // console.log(AppData, 'pagedata')
  },
  getData (key) {
    // 获取appdata
    let AppData = getApp()
    if (!AppData.globalData.pageData) return false
    return AppData.globalData.pageData[key] || false
  },
  removeData (key) {
    // 删除appdata
    let AppData = getApp()
    if (!AppData.globalData.pageData) return false
    delete AppData.globalData.pageData[key]
    return true
  },
  getStorage (key) {
    // 设置localstorage
    try {
      var value = wx.getStorageSync(key)
      if (value) {
        // Do something with return value
        return value
      }
    } catch (e) {
      // Do something when catch error
      return e
    }
  },
  removeStorage (key) {
    // 删除localstorage
    try {
      wx.removeStorageSync(key)
      return true
    } catch (e) {
      // Do something when catch error
      return e
    }
  },
  setToast (msg, callback) {
    setTimeout(() => {
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 2000,
        success: function (params) {
          if (callback) {
            callback()
          }
        }
      })
    }, 200)
  }
}
