import Vue from 'vue'
import App from './App.vue'
//三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import {Button,MessageBox} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
//第一个参数：全局组件的名字；第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
Vue.component(Button.name,Button)
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'
//引入MockServer.js----mock数据
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/dist/css/swiper.css'
//统一接口api文件夹里面全部请求函数,API是一个对象
import * as API from '@/api'
//引入懒加载要用的图片
import wx from '@/assets/wx.jpg'
//引入图片懒加载插件
import Vant,{Lazyload} from 'vant'
import 'vant/lib/action-sheet/index.css'
Vue.use(Vant)
Vue.use(Lazyload,{
  loading: wx
})
//引入表单校验插件
import "@/plugins/validate"
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //注册路由
  router,
  //注册仓库
  store,
  //安装全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this,
    Vue.prototype.$API = API
  }
}).$mount('#app')
