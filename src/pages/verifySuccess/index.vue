<template>
  <div id="verify-success-cmp" :style="{height: pageHeight}">
    <div class="verify-result-wrap">
      <div class="verify-result-icon">
        <img src="/static/images/icon-success.png" alt="">
      </div>
      <div class="verify-result-title">校验成功</div>
    </div>
    <div class="cutline"></div>
    <div class="order-wrap">
      <div class="order-title-wrap">
        <div class="order-title">
          <div class="order-title-text"><span>订单号：123456789000</span></div>
          <div class="order-title-money"><span>总金额：¥480</span></div>
        </div>
      </div>
      <div class="order-item" v-for="item in [1,2,3]" :key="item">
          <div class="order-item-pic">
            <!-- <img src="/static/images/icon-success.png" alt=""> -->
          </div> 
          <div class="order-item-info-wrap">
            <div class="info1">招牌鲜肉生煎4只</div>
            <div class="info2">现做现包，精选品牌猪肉</div>
            <div class="info3">单价¥40</div>
          </div>
          <div class="order-item-num">x4份</div>
      </div>
    </div>
    <button class="confirm-btn">确定订单</button>
  </div>
</template>
<script>
import appData from '@/utils/appData'
export default {
  name: 'verifySuccessCmp',
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
  #verify-success-cmp {
     background: #F5F5F5;
     .verify-result-wrap {
       background: #fff;
       padding-bottom:rpx(80);
       .verify-result-icon{
         padding: rpx(84) 0 rpx(52);
         text-align: center;
         font-size: 0;
         img{
           width: rpx(128);
           height: rpx(128);
         }
       }
       .verify-result-title{
         height: rpx(40);
         line-height: rpx(40);
         text-align: center;
         font-size: rpx(40);
         color: #111;
       }
     }
    .cutline {
      height: rpx(20);
    }
    .order-wrap{
      background: #FFF;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      margin-bottom:rpx(198);
      padding: 0 20px ;
      .order-title-wrap{
        font-size: rpx(28);
        padding: rpx(28) 0;
        .order-title{
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: rpx(28);
          color: #111;
          .order-title-text{
            height:rpx(40);
            line-height: rpx(40);
          }
          .order-title-money {
          }
        }

      }
      .order-item {
        border-top: 1px solid #ddd;
        padding: rpx(28) 0;
        display:flex;
        font-size: 0;
        .order-item-pic {
          width:rpx(110);
          height: rpx(110);
          background: pink;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .order-item-info-wrap{
          padding-left: rpx(20);
          flex:1;
          font-size: 0;
          .info1 {
            height: rpx(32);
            line-height: rpx(32);
            font-size: rpx(32);
            color:#111;
          }
          .info2 {
            margin:6px 0;
            height: rpx(28);
            line-height: rpx(28);
            font-size: rpx(24);
            color:#666;
          }
          .info3 {
            height: rpx(28);
            line-height: rpx(28);
            font-size: rpx(24);
            color:#666;
          }          
        }
        .order-item-num{
          width: rpx(100);
          font-size: rpx(32);
          color:#F43F3F;
          display: flex;
          align-items: center;
          text-align: right;
        }
      }
    }
    .confirm-btn {
      height: rpx(110);
      line-height:rpx(110);
      color: #fff;
      width: 100%;
      position: fixed;
      bottom:0;
      font-size: rpx(36);
      border-radius:0;
      background: #F43F3F;
    }
    button:after{
      border:0;
    }
  }
</style>
