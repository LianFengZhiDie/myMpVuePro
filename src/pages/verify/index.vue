<template>
  <div id="verify-cmp" :style="{height: pageHeight}">
      <div class="scan-wrap">
        <div class="scan-box">
          <img src="/static/images/icon-scan.png" alt="" class="scan-img">
        </div>
      </div>
      <div class="text-info">
        <p>扫一扫，使用二维码验证</p>
      </div>
      <div class="cutline"></div>
      <div class="coupon-wrap">
        <div class="coupon-title">
          <div class="coupon-title-text"><span>使用兑换码验证</span></div>
          <div class="coupon-title-reset">重置</div>
        </div>
        <div class="coupon-operate">
          <input type="text" class="coupon-operate-info" placeholder="输入兑换码">
          <button class="coupon-operate-btn">立即验证</button>
        </div>
      </div>
  </div>
</template>
<script>
import appData from '@/utils/appData'
export default {
  name: 'product-list',
  data () {
    return {
      pageHeight: 0
    }
  },
  components: {
  },
  methods: {
    getViewHeight () {
      let _this = this
      wx.getSystemInfo({
        success: function (res) {
          _this.pageHeight = res.windowHeight + 'px'
        }
      })
    }
  },
  mounted () {
    appData.setData('aa', 1)
  },
  onShow () {
    wx.setNavigationBarTitle({
      title: 'my-canyinTob'
    })
    this.getViewHeight()
  },
  onLoad () {
  }
}
</script>

<style lang="scss" scoped>
  #verify-cmp {
     background: #F5F5F5;
    .scan-wrap {
      background: #FFF;
      padding-top:rpx(84);
      .scan-box {
        height:rpx(300);
        display: flex;
        justify-content: center;
        align-items: center;
        .scan-img{
          height: rpx(285);
          width: rpx(285);
        }
      }
    }
    .text-info {
      background: #FFF;
      padding: rpx(26) 0 rpx(110);
      p {
        height: rpx(40);
        line-height: rpx(40);
        color: #F43F3F;
        font-size: rpx(28);
        text-align: center;
      }
    }
    .cutline {
      height: rpx(20);
    }
    .coupon-wrap{
      background: #FFF;
      padding: 0 20px rpx(62);
      .coupon-title{
        font-size: rpx(28);
        padding: rpx(40) 0 rpx(28);
        display: flex;
        justify-content: space-between;
        .coupon-title-text{
          color: #111;
        }
        .coupon-title-reset {
          color: #FF595F;
        }
      }
      .coupon-operate{
        display: flex;
        font-size: 0;
        .coupon-operate-info{
          font-size: rpx(32);
          flex: 1;
          border: 1px solid #DDDDDD;
          height: rpx(96);
          padding-left: rpx(20);
        }
        .coupon-operate-btn{
          color: #FFF;
          height: rpx(96);
          line-height: rpx(96);
          font-size: rpx(32);
          width: rpx(222);
          background:linear-gradient(254deg,rgba(255,116,121,0.98) 0%,rgba(239,42,42,1) 100%);
          outline: none;
          border-radius: 0;
        }
        button:after {
          border: 0;
        }
      
      }
    }
  }
</style>
