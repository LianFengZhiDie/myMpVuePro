<template>
  <div id="order-list" :style="{height: pageHeight}">
    <div class="data-choice">
      <p class="p-title"><img src="/static/images/icon-success.png">按日期筛选</p>
      <div class="input-box-wrap">
        
        <picker mode="date" fields="day" v-model="startDate" @change="bindStartDateChange">
          <view style="display: flex">
            <input placeholder="开始日期" v-model="startDate" class="input-box" disabled/>
          </view>
        </picker>
        <span class="to-text">至</span>
        <picker mode="date" fields="day" v-model="endDate" @change="bindEndDateChange">
          <view style="display: flex">
            <input placeholder="截止日期" v-model="endDate" class="input-box" disabled/>
          </view>
        </picker>
        <p class="search-text" @click="searchOrder">搜索</p>
      </div>
    </div>
    <!-- <div class="cutline"></div> -->
    <div class="order-wrap">
        <div v-for="(mItem, index) in orderListData" :key="index">
          <div class="order-title" v-for="(item,idx1) in titleArry" :key="idx1" v-if="index === idx1">{{item}}</div>
          <div v-for="(dItem, idx) in Object.values(mItem)" :key="idx">
            <div class="order-content">
              <div class="order-content-num">{{dItem.number}}</div>
              <div class="order-content-text">{{dItem.text}}</div>
              <div class="order-content-time">{{dItem.copy}}</div>
              <div class="order-content-copy">￥{{dItem.price}}元</div>
              <div class="order-content-price">{{dItem.time}}</div>
            </div>
          </div>  
        </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  import appData from '@/utils/appData'
  export default {
    name: 'orderList',
    components: {},
    data () {
      return {
        pageHeight: 0,
        startDate: '',
        endDate: '',
        titleArry: [9,8,7],
        orderListData: [
          {
            '2018-10': [
              {
                'number': 111111111,
                'text': '招牌鲜肉生煎4只',
                'copy': 4,
                'price': 200,
                'time': '09:50'
              },
              {
                'number': 222222222,
                'text': '现做现包，精选品牌猪肉',
                'copy': 2,
                'price': 300,
                'time': '09:50'
              },
              {
                'number': 3333333333,
                'text': '牛肉面1碗',
                'copy': 7,
                'price': 150,
                'time': '09:50'
              }
            ]
          },
          {
            '2018-09': [
              {
                'number': 111111111,
                'text': '招牌鲜肉生煎4只',
                'copy': 4,
                'price': 200,
                'time': '09:50'
              },
              {
                'number': 222222222,
                'text': '现做现包，精选品牌猪肉',
                'copy': 2,
                'price': 300,
                'time': '09:50'
              },
              {
                'number': 3333333333,
                'text': '牛肉面1碗',
                'copy': 7,
                'price': 150,
                'time': '09:50'
              }
            ]
          },
          {
            '2018-08': [
              {
                'number': 111111111,
                'text': '招牌鲜肉生煎4只',
                'copy': 4,
                'price': 200,
                'time': '09:50'
              },
              {
                'number': 222222222,
                'text': '现做现包，精选品牌猪肉',
                'copy': 2,
                'price': 300,
                'time': '09:50'
              },
              {
                'number': 3333333333,
                'text': '牛肉面1碗',
                'copy': 7,
                'price': 150,
                'time': '09:50'
              }
            ]
          }
        ]
      }
    },
    methods: {
      getViewHeight () {
        let _this = this
        wx.getSystemInfo({
          success: function (res) {
            _this.pageHeight = res.windowHeight + 'px'
          }
        })
      },
      bindStartDateChange (e) {
        this.startDate = e.mp.detail.value
      },
      bindEndDateChange (e) {
        this.endDate = e.mp.detail.value
      },
      searchOrder () {
        console.log('abcd!')
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
  #order-list{
    background: #F5F5F5;
    .data-choice {
      width: rpx(750);
      height: rpx(166);
      background: #fff;
      padding:rpx(15);
      .p-title{
        margin: rpx(20) 0 rpx(20) rpx(25);
        font-size: rpx(28);
        color: #111111;
        img{
          margin-right: rpx(10);
          width: rpx(25);
          height: rpx(25);
        }
      }
      .input-box-wrap{
        display: flex;
        margin:0 rpx(25);
        align-items: center;
        .input-box{
          width: rpx(270);
          height: rpx(56);
          text-align: center;
          font-size: rpx(28);
          border: 1px solid #dddddd;
          border-radius: rpx(28);
        }
        .to-text{
          font-size: rpx(28);
          color: #111111;
          margin: rpx(10) rpx(15);
        }
        .search-text{
          font-size: rpx(32);
          color: #999999;
          margin: 0 rpx(5) 0 rpx(15);
        }
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
      .order-title{
        font-size: rpx(28);
        padding: rpx(28) 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: rpx(28);
        color: #111;
      }
      .order-content {
        border-top: 1px solid #ddd;
        padding: rpx(28) 0;
        display:flex;
        font-size: 0;
        .order-content-num{
          width: rpx(100);
          font-size: rpx(32);
          color:#000;
          display: flex;
          align-items: center;
          text-align: right;
        }
        .order-content-text {
          width:rpx(110);
          height: rpx(110);
          background: pink;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .order-content-time{
          width: rpx(100);
          font-size: rpx(32);
          color:#000;
          display: flex;
          align-items: center;
          text-align: right;
        }
        .order-content-copy{
          width: rpx(100);
          font-size: rpx(32);
          color:#F43F3F;
          display: flex;
          align-items: center;
          text-align: right;
        }
        .order-content-price{
          width: rpx(100);
          font-size: rpx(32);
          color:#F43F3F;
          display: flex;
          align-items: center;
          text-align: right;
        }
      }
    }
  }
</style>
