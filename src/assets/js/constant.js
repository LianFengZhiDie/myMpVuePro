const ORDER_STATUS = {
  0: '待支付',
  1: '支付失败',
  2: '支付中',
  3: '支付失败',
  4: '支付完成',
  5: '已取消'
}
const ORDER_STATUS_ICON = {
  0: 'icon-daizhifu',
  1: 'icon-zhifushibai',
  2: 'icon-zhifuzhong',
  3: 'icon-zhifushibai',
  4: 'icon-daishiyong', // 支付完成==>待使用
  5: 'icon-yiquxiao'
}

const COUPON_STATUS = {
  0: '已使用',
  1: '未使用',
  2: '退款中',
  3: '已退款'
}
const STATUS_CODE = {
  TO_PAY: '0', // 待支付
  PAY_FAILURE_EXTRA: '1', // 支付失败
  PAYING: '2', // 支付中
  PAY_FAILURE: '3', // 支付失败
  PAYED: '4', // 支付完成
  CANCELD: '5'
}

// 接口参数常量
const CHANNEL_SOURCE = wx.getStorageSync('CHANNEL_SOURCE_') || '05000034' // channel_source值
const REQUIST_APP_ID = 'MiniProgram' // appId
const AUTH_TYPE = 'MD5' // authType
const COORDINATE = '0.0,0.0' // coordinate
const CUST_STRING = ' jfmore_h5' // custString
const MACHINE_NO = 'abcdefgh1234567890' // machineNo
const PLATFORM = 'MiniProgram' // platform
const MSG_VERSION = '1.0.0' // msgVersion
const REQUIST_TYPE = '09'
const REQUIST_IP = '0.0.0.0'

export const CONSTANT = {
  ORDER_STATUS,
  ORDER_STATUS_ICON,
  COUPON_STATUS,
  STATUS_CODE,
  CHANNEL_SOURCE,
  PLATFORM,
  MACHINE_NO,
  REQUIST_APP_ID,
  AUTH_TYPE,
  COORDINATE,
  CUST_STRING,
  MSG_VERSION,
  REQUIST_TYPE,
  REQUIST_IP
}
