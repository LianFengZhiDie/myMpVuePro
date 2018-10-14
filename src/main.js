/* eslint-disable */
import Page from './assets/libs/spm'
import Vue from 'vue'
import App from './App'
import './assets/style/hotelfont.css'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue(App)
app.$mount()
