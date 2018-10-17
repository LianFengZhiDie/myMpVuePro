/* eslint-disable */
var isProduction = process.env.NODE_ENV === 'production'
// 记录上一个页面, 在页面隐藏的时候, 将最后一个url赋值给他
var upPage = null
// 页面开始显示的时间
var pageShowTime = null
var pageHideTime = null
// 小程序默认的站点编码为 5.1  根据运营生成
var siCode = '5.1'
// 用户点击dom
var tapDom = ''
var systemInfo

// 版本号
var version = 1.1
// 一些默认的key
var statId = {
  _PVKEY: ['', 'PU', 'V', ''].join('_')
}
//
var client = {
  x: 0,
  y: 0
}

var dataAll = {
  Sid: '',
  token: '',
  domain: '',
  curUrl: '',
  siCode: '',
  paCode: '',
  moCode: '',
  useragent: '',
  browser: '',
  eventType: '',
  preSiCode: '',
  prePaCode: '',
  preMoCode: '',
  preurl: '',
  remark: '',
  iscookie: '',
  ip: '',
  spm: '',
  time: '',
  source: '',
  visittime: '',
  reserve: '',
  reserve1: '',
  reserve2: '',
  Reserve3: ''
}

function getQuery(url, name) {
  var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)");
  var query = (url.match(reg));
  return query && query[2];
}

// 当页面跳转之前, 设置上一个页面
function setUpPage() {
  let pageList = getCurrentPages()
  upPage = pageList[pageList.length - 1]
  return upPage
}

function getCurrentPage() {
  let pageList = getCurrentPages()
  return pageList[pageList.length - 1]
}

function getLocal(key) {
  return wx.getStorageSync(key)
}

function get_PU_V_(key) {
  let puv = getLocal(key)
  return (
    puv ||
    (function () {
      let c = ''
      for (let d = '0123456789', f = d.length; c.length < 5;)
        c += d.substr(Math.floor(Math.random() * f), 1)
      c = c + '' + +new Date()
      wx.setStorage({
        key: statId._PVKEY,
        data: c
      })
      return c
    })()
  )
}

function reqCkdAfter(obj, spmPageDom) {
  //eventType, moCode
  let pagePara = {}
  let currentPage = getCurrentPage()
  pagePara.eventType = (obj && obj.eventType) || '00'
  pagePara.preurl = encodeURIComponent(upPage ? upPage.route : '') // 上个页面的路径
  pagePara.curUrl = encodeURIComponent(currentPage.route) // 当前页面的url
  let spmList = currentPage.options.spm ?
    currentPage.options.spm.split('.') :
    []
  // 根据url 分析 上个页面(url)获取的信息
  pagePara.preSiCode =
    spmList[0] && spmList[1] ?
    (spmList[0] || '') + '.' + (spmList[1] || '') :
    ''
  pagePara.prePaCode = spmList[2] || ''
  pagePara.preMoCode = spmList[3] || ''
  if (obj && obj.moCode) {
    let modeCodeList = obj.moCode.split('.')
    obj.moCode =
      modeCodeList.length > 2 ?
      modeCodeList.splice(modeCodeList.length - 2).join('.') :
      modeCodeList.join('.')
  }
  pagePara.moCode = (obj && obj.moCode) || '0'
  pagePara.spm = spmList[4] || ''
  pagePara.source = spmList[6] || '02000000' // 如果没有的话, 不知道默认为空, 还是设置成 02000000
  pagePara.reserve1 = spmList[7] || '02000000'
  // 当前页面, 获取的信息
  pagePara.siCode = siCode
  pagePara.time = (obj && obj.time) || ''

  spmPageDom
    ?
    mergePageSpm(spmPageDom, pagePara) :
    getDomAttr('.data-spm').then(data => {
      mergePageSpm(data, pagePara)
    })
}

function mergePageSpm(data, pagePara) {
  if (data) {
    if (data && data.dataset.spm) {
      let pageSpmList = data.dataset.spm.split('.')
      pagePara.paCode = pageSpmList.splice(pageSpmList.length - 1).join('.')
    } else {
      pagePara.paCode = '';
      // console.log('请在当前页面class中添加.class, 添加data-spm="你的模块"');
    }
  } else {
    // console.log('请在页面class 设置 data-spm');
  }

  reqCkd(pagePara)
}

function getSysInfo() {
  return new Promise((res, rej) => {
    if (systemInfo) {
      res(systemInfo)
    } else {
      wx.getSystemInfo({
        success: function (e) {
          // e.appId = wx.getAccountInfoSync().miniProgram.appId;
          systemInfo = e
          res(e)
        }
      })
    }
  })
}

function paramObj(obj) {
  let para = []
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      para.push(i + '=' + obj[i])
    }
  }
  return para.join('&')
}

function reqCkd(para) {
  // console.log(para)
  getSysInfo().then(res => {
    para.sid = get_PU_V_(statId._PVKEY) // 设备号是什么 不知道
    para.token = getLocal('token')
    para.domain =
      res.platform == 'devtools' ?
      'test-m-stg.ppppoints.com' :
      'm.changyoyo.com' // 自动获取
    para.useragent = version // app取版本号, 这里获取的应该不是的
    para.browser = 'miniApp'
    para.iscookie = 0
    para.ip = ''
    para.reserve2 = systemInfo.screenWidth + 'x' + systemInfo.screenHeight
    para.Reserve3 = systemInfo.system.split(' ')[0]
    Object.assign(dataAll, para)
    let url =
      'https://' +
      (!isProduction ?
        'test-m-stg.ppppoints.com/wxservice' :
        'm.changyoyo.com/notify') +
      '/datacenter/ckd'
    wx.getImageInfo({
      src: url + '?' + paramObj(dataAll)
    })
  })
}

function checkClassName(className) {
  if (className.substr(0, 1) == '#') {
    // console.log('请根据class查找dom');
  }
  if (typeof className !== 'string') {
    className = String(className)
  }
  if (className.substr(0, 1) !== '.') {
    className = '.' + className
  }
  return className
}

// 每次调用销毁, 或者隐藏事件的时候, 清空spmDom,并且将对应的spm做为参数传过去
// 让他再重新查找
var spmDom = {}

// 根据class 获取dom的属性
function getDomAttr(codeClass) {
  if (!spmDom[codeClass]) {
    codeClass = checkClassName(codeClass)
    return new Promise((res, rej) => {
      var query = wx.createSelectorQuery()
      query
        .select(codeClass)
        .fields({
            dataset: true,
            size: true,
            scrollOffset: true,
            properties: ['scrollX', 'scrollY'],
            computedStyle: ['margin', 'backgroundColor']
          },
          function (data) {
            spmDom[codeClass] = data
            res(data)
          }
        )
        .exec()
    })
  } else {
    return Promise.resolve(spmDom[codeClass])
  }
}

function checkSpm(spmModel, spmPage) {
  if (spmModel.startsWith('.')) {
    spmModel = spmModel.substr(1)
  }
  if (spmModel.endsWith('.')) {
    spmModel = spmModel.substr(0, spmModel.length - 1)
  }
  if (spmPage.startsWith('.')) {
    spmPage = spmPage.substr(1)
  }
  if (spmPage.endsWith('.')) {
    spmPage = spmPage.substr(0, spmPage.length - 1)
  }
  let spmPageList = spmPage.split('.')
  spmPage =
    spmPageList.length > 1 ?
    spmPageList.splice(spmPageList.length - 1).join('.') :
    spmPageList.join('.')
  let spmModelList = spmModel.split('.')
  if (spmModelList.length < 3) {
    return (
      siCode +
      '.' +
      spmPage +
      '.' +
      (spmModelList.length == 2 ?
        spmModelList.join('.') :
        spmModelList.length == 1 ?
        [...spmModelList, 0].join('.') :
        '0.0')
    )
  } else {
    //  大于等于3,  只能重写 spm-body 和  spm-model,
    // 不行, 他有可能 小程序跳H5页面,所以说, 他会重写对应的站点 和 spm-body 和 spm-model
    if (spmModelList.length == 3) {
      return siCode + '.' + spmModelList.join('.')
    } else if (spmModelList.length == 4) {
      // console.log('你输入data-spm-model异常, 请修改');
      return siCode + '.' + spmModelList.slice(1, spmModelList.length).join('.');
    } else {
      return spmModelList
        .slice(spmModelList.length - 5, spmModelList.length)
        .join('.')
    }
  }
}

function spliceSpm(spmModel, spmPage, gsource) {
  let spm = checkSpm(spmModel, spmPage);
  let PVID = get_PU_V_(statId._PVKEY);
  spm += '.' + PVID;
  // 设置渠道号
  // upPage   判断是否是其他渠道页面进来的
  let channel_source = getLocal('c_s_e'); // 先获取渠道来源
  if (!channel_source) {
    // 当本地没有渠道, 则默认
    // 获取当前页面的路径
    let currentPage = getCurrentPage();
    //  当时其他渠道来的页面, 他应该有spm参数的
    //  当没有参数, 则设置当前的渠道号为起始渠道号
    channel_source = currentPage.options.spm || gsource;
    wx.setStorage({
      key: 'c_s_e',
      data: channel_source
    });
  }
  return spm += '.' + channel_source + '.' + (channel_source == gsource ? '02000000' : gsource);
}

// 根据.class 获取dom
function getSpm(codeClass, gsource) {
  codeClass = checkClassName(codeClass);
  return new Promise(function (resolve, reject) {
    // 获取page dom(页面编码)
    // 当点击的target 事件自带有data-spm-model的时候, 就用自带的, 没有就获取
    if (tapDom && tapDom.target && tapDom.target.dataset && tapDom.target.dataset.spmModel) {
      let spmModel = tapDom.target.dataset.spmModel;
      wx.createSelectorQuery().select(codeClass).fields({
        dataset: true
      }, function (data) {
        // !(data && data.dataset && data.dataset.spm) && console.log('请在页面第一行代码设置class=".data-spm" data-spm="对应的spm码"');
        return data && data.dataset && data.dataset.spm ? resolve(spliceSpm(spmModel || '0', data.dataset.spm, gsource)) : resolve(spliceSpm(spmModel || '0', '0', gsource));
      }).exec()
    } else {
      let query = wx.createSelectorQuery()
      query.select(codeClass).boundingClientRect()
      query.selectAll('.data-spm-model').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function (res) {
        let dataSpmPage = res[0],
          dataSpmModel = res[1],
          scrollXY = res[2],
          spmModel = ''

        for (let i = 0, length = dataSpmModel.length; i < length; i++) {
          let dom = dataSpmModel[i]
          let tapDomXY = tapDom.changedTouches[0]
          if (
            dom.top + scrollXY.scrollTop < tapDomXY.pageY &&
            tapDomXY.pageY < dom.top + scrollXY.scrollTop + dom.height
          ) {
            if (
              dom.left + scrollXY.scrollLeft < tapDomXY.pageX &&
              tapDomXY.pageX < dom.left + scrollXY.scrollLeft + dom.width
            ) {
              spmModel = dom.dataset && dom.dataset.spmModel
            }
          }
        };
        // !(dataSpmPage && dataSpmPage.dataset && dataSpmPage.dataset.spm) && console.log('请在页面第一行代码设置class=".data-spm" data-spm="对应的spm码"');
        return dataSpmPage && dataSpmPage.dataset && dataSpmPage.dataset.spm ? resolve(spliceSpm(spmModel || '0', dataSpmPage.dataset.spm, gsource)) : resolve(spliceSpm(spmModel || '0', '0', gsource));
      })
    }
  })
}

//
function getTapSpmModel(paraDom) {
  if (paraDom.target.dataset && paraDom.target.dataset.spmModel) {
    return Promise.resolve(paraDom.target.dataset.spmModel)
  } else {
    return new Promise((res, rej) => {
      let query = wx.createSelectorQuery()
      query.selectAll('.data-spm-model').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function (data) {
        let dataSpmModel = data[0],
          scrollXY = data[1],
          spmModel = ''
        for (let i = 0, length = dataSpmModel.length; i < length; i++) {
          let dom = dataSpmModel[i]
          let tapDomXY = paraDom.changedTouches[0]
          if (
            dom.top + scrollXY.scrollTop < tapDomXY.pageY &&
            tapDomXY.pageY < dom.top + scrollXY.scrollTop + dom.height
          ) {
            if (
              dom.left + scrollXY.scrollLeft < tapDomXY.pageX &&
              tapDomXY.pageX < dom.left + scrollXY.scrollLeft + dom.width
            ) {
              spmModel = dom.dataset && dom.dataset.spmModel
            }
          }
        }
        return res(spmModel)
      })
    })
  }
}

// 获取page spm码
function createSpm(gsource) {
  return getSpm('data-spm', gsource).then((data) => {
    return data;
  })
}

function spellingUrl(urlObj) {
  // 当url中没有对应的spm
  if (!(/spm=/ig.test(urlObj.url))) {
    return createSpm(getQuery(urlObj.url, 'gsource')).then((value) => {
      urlObj.url.includes('?') ? (urlObj.url = urlObj.url + '&spm=' + value) : (urlObj.url = urlObj.url + '?spm=' + value);
    })
  } else {
    // 当有 spm的时候, 则不需要操作
    return Promise.resolve(true)
  }
}

// 复写路由跳转的url, 跟他们自动拼接spm
// 打开新页面

let __navigateTo = wx.navigateTo
wx.__defineGetter__('navigateTo', function () {
  return function (urlObj) {
    if (urlObj.spm == false) {
      __navigateTo.call(wx, urlObj)
    } else {
      spellingUrl(urlObj).then(() => {
        __navigateTo.call(wx, urlObj)
      })
    }
  }
})

// //页面重定向
let __redirectTo = wx.redirectTo
wx.__defineGetter__('redirectTo', function () {
  return function (urlObj) {
    if (urlObj.spm == false) {
      __redirectTo.call(wx, urlObj)
    } else {
      spellingUrl(urlObj).then(() => {
        __redirectTo.call(wx, urlObj)
      })
    }
  }
})
// // 重启动
let __reLaunch = wx.reLaunch
wx.__defineGetter__('reLaunch', function () {
  return function (urlObj) {
    if (urlObj.spm == false) {
      __reLaunch.call(wx, urlObj)
    } else {
      spellingUrl(urlObj).then(() => {
        __reLaunch.call(wx, urlObj)
      })
    }
  }
})

// // 只能打开 tabBar 页面
let __switchTab = wx.switchTab
wx.__defineGetter__('switchTab', function () {
  return function (urlObj) {
    if (urlObj.spm == false) {
      __switchTab.call(wx, urlObj)
    } else {
      spellingUrl(urlObj).then(() => {
        __switchTab.call(wx, urlObj)
      })
    }
  }
})

// 页面才开始加载
function onLoadAfter() {
  // console.log('页面才开始加载');
}

// 页面显示的时候
function onShowAfter() {
  pageShowTime = +new Date()
  // 每中路由跳转都会触发这个生命周期, 获取上一个页面, 和这个页面的信息
  // H5中, 只有进入页面, click点击事件,   但是页面退出他没有监控
  reqCkdAfter()
}

// 页面初次渲染完成
function onReadyAfter() {}

// 页面隐藏和页面
// 页面隐藏时调用销毁不会同时触发, 他只会触发其中一个
// moCode 在页面跳转的时候 也可以获取到, 不知道要不要传
// 遇到问题, 退出页面, 如果再获取dom, 是异步获取dom, 所以他会先调用下一个函数的shou
function onHideAfter() {
  setUpPage() // 记录上一级别的信息
  reqCkdAfter({
      eventType: '01',
      time: +new Date() - pageShowTime
    },
    spmDom['.data-spm']
  )
  // 清空缓存的apm dom
  spmDom = {}
}
// 页面卸载时触发
function onUnloadAfter() {
  setUpPage()
  reqCkdAfter({
      eventType: '01',
      time: +new Date() - pageShowTime
    },
    spmDom['.data-spm']
  )
  // 清空缓存的apm dom
  spmDom = {}
}

let __Page = Page;
// 考虑用策略模式来写, 这样写代码的重复的太多
function page(arg) {
  if (arg.onLoad) {
    let __onLoad = arg.onLoad
    arg.onLoad = function () {
      __onLoad.apply(this, arguments)
      onLoadAfter.apply(this, arguments)
    }
  } else {
    arg.onLoad = onLoadAfter
  }

  if (arg.onShow) {
    let __onShow = arg.onShow
    arg.onShow = function () {
      __onShow.apply(this, arguments)
      onShowAfter.apply(this, arguments)
    }
  } else {
    arg.onShow = onShowAfter
  }

  if (arg.onReady) {
    let __onReady = arg.onReady
    arg.onReady = function () {
      __onReady.apply(this, arguments)
      onReadyAfter.apply(this, arguments)
    }
  } else {
    arg.onReady = onReadyAfter
  }

  if (arg.onHide) {
    let __onHide = arg.onHide
    arg.onHide = function () {
      onHideAfter.apply(this, arguments)
      __onHide.apply(this, arguments)
    }
  } else {
    arg.onHide = onHideAfter
  }

  arg.startTap = function (e) {
    client.x = e.changedTouches[0].pageX
    client.y = e.changedTouches[0].pageY
  }

  // 用来监听页面的点击, 获取点击位置
  arg.watchTap = function (e) {
    if(e.target.dataset.spmModel == 'no'){
      return;
    }
    let  touchXY = e.changedTouches[0]
    if ((Math.abs(touchXY.pageX - client.x) < 6) && (Math.abs(touchXY.pageY - client.y) < 6)) {
      tapDom = e
      // 监听点击, 是监听 需要监听的dom(包含spm) , 还是只是用户点击一下页面, 就监听
      // 感觉是第一种
      getTapSpmModel(e).then((res) => {
        if (res) {
          reqCkdAfter({
            eventType: '02',
            moCode: res
          })
        }
      })
    }
  }

  __Page(arg)
}

Page = page
