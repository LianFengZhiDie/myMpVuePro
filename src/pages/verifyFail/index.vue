<template>
  <div id="verify-fail-cmp">
      <div class="verify-result-wrap">
        <div class="verify-result-icon">
          <img src="/static/images/icon-failure.png" alt="">
        </div>  
        <p class="verify-title">校验失败</p>
        <p class="verify-subtitle">该兑餐码不存在！</p>
        <button class="to-verify">重新校验</button>
      </div>
  </div>
</template>
<script>
import appData from '@/utils/appData'
export default {
  name: 'verifyFailCmp',
  data () {
    return {
    }
  },
  components: {
  },
  methods: {
  },
  mounted () {
    appData.setData('aa', 1)
  },
  onShow () {
    wx.setNavigationBarTitle({
      title: 'my-canyinTob'
    })
  },
  onLoad () {
  }
}
</script>

<style lang="scss" scoped>
  #verify-fail-cmp {
    .verify-result-wrap {
      .verify-result-icon {
        padding: rpx(196) 0 rpx(52);
        font-size: 0;
        display: flex;
        justify-content: center;
        img{
          width: rpx(128);
          height: rpx(128);
        }
      }
      .verify-title {
        height: rpx(40);
        line-height: rpx(40);
        color:#111;
        font-size: rpx(40);
        text-align: center;
      }
      .verify-subtitle{
        margin-top: 12px;
        height: rpx(28);
        line-height: rpx(28);
        color:#999;
        font-size: rpx(28);
        text-align: center;
      }
      .to-verify{
        margin: rpx(160) 45px 0 45px;
        height: rpx(88);
        line-height: rpx(88);
        background: linear-gradient(254deg,rgba(255,116,121,0.98) 0%,rgba(239,42,42,1) 100%);
        border-radius: rpx(4);
        font-size: rpx(32);
        color: #FFF;
      }
    }
  }
</style>
