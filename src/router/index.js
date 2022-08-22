import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter)
import routes from './routes'
//引入store
import store from '@/store'
//需要重写VueRouter.prototype原型对象身上的push|replace方法
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function(location,resolve,reject) {
    if(resolve && reject) {
        originPush.call(this,location,resolve,reject)
    } else {
        originPush.call(this,location,() => {},() => {})
    }
},
VueRouter.prototype.push = function(location,resolve,reject) {
    if(resolve && reject) {
        originReplace.call(this,location,resolve,reject)
    } else {
        originReplace.call(this,location,() => {},() => {})
    }
}
//配置路由
const router = new VueRouter({
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        //返回的这个y=0，代表的滚动条在最上方
        return { y: 0 };
    },
})
//全局守卫
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    //用户登录了
    if(token) {
        //已经登录了还想进入登录页面（不可以）
        if(to.path=='/login'||to.path=='/register') {
            next('/home')
        } else {
            //已经登录了,访问的是非登录与注册页面,登录了且拥有用户信息放行
            if(name) {
                next()
            } else {
                //登陆了且没有用户信息,在路由跳转之前获取用户信息且放行
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    //token失效重新登录
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        // 用户没有登录
        let toPath = to.path
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1) {
            //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
            next('/login?redirect='+toPath)
        } else {
            next()
        }
    }
})
export default router;