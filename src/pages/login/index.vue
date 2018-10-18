<template>
  <!--页面spm class data-spm='值'-->
  <div id="login-cmp">
    <div class="avatar-wrap">
      <div class="avatar"></div>
      <p class="title">my-shangjiaduan</p>
      <div class="userinfo-wrap">
        <div class="username-info">
          <span>账号</span>
          <input type="text" v-model='username'>
        </div>
        <div class="cutline"></div>
        <div class="passwd-info">
          <span>密码</span>
          <input type="password" v-model='passwd'>
        </div>
        <div class="cutline2">
          <div class="login-error-info">
            密码错误，请重新输入您的密码
          </div>
        </div>
        <button class="login-btn">登录</button>
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
      username: 'maxiaoer',
      passwd: '1234566789'
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
  },
  onLoad () {
  }
}
</script>

<style lang="scss" scoped>
  #login-cmp {
    padding:0 30px;
   .avatar-wrap {
     padding-top: rpx(100);
     text-align: center;
     font-size: 0;
     .avatar {
       display: inline-block;
       width: rpx(168);
       height: rpx(168);
       border-radius: 50%;
       background: #EBEBEB;
     }
   }
   .title {
     margin-top: 20px;
     margin-bottom: 59px;
     font-size: rpx(36);
     height: rpx(50);
     line-height: rpx(50);
     text-align: center;
     color: #111;
     font-weight: 600;
   }
   .userinfo-wrap {
     .username-info {
       font-size:rpx(32);
       color: #111;
       font-weight: 600;
       display: flex;
       align-items: center;
       span {
        width: rpx(104);
       }
       input{
        flex: 1;
        text-align: left;
        height:rpx(50);
        line-height: rpx(50);
       }
     }
     .cutline {
       border-top: 1px solid #DDD;
       margin-top: 20px;
       margin-bottom: 18px;
     }
     .passwd-info{
       font-size:rpx(32);
       color: #111;
       font-weight: 600;
       display: flex;
       align-items: center;
       span {
        width: rpx(104);
       }
       input{
        outline: none;
        border: 0;
        flex: 1;
        text-align: left;
        height:rpx(50);
        line-height: rpx(50);
       }
       .visible-pic {
         width: rpx(50);
        
       }
     }
     .cutline2 {
       border-top: 1px solid #DDD;
       margin-top: 20px;
       margin-bottom: 40px;
       position: relative;
       .login-error-info {
         color:#F02424;
         font-size:rpx(24);
         position: absolute;
         top:rpx(10);
       }
     }
     .login-btn {
       background: #F43F3F;
       height: rpx(88);
       line-height: rpx(88);
       border-radius: rpx(4);
       color: #FFF;
       font-size: rpx(32);
     }
   }
  }
</style>
