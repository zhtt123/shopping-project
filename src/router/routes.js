//引入路由插件
// import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

export default [
    {
        path: '/center',
        component: Center,
        meta: {show: true},
        children: [
            {
                path: 'myorder',
                component: MyOrder,
            },
            {
                path: 'grouporder',
                component: GroupOrder,
            },
            {
                path: '/center',
                redirect: 'myorder'
            }
        ]
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: {show: true},
    },
    {
        path: '/pay',
        component: Pay,
        meta: {show: true},
        //独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path=='/trade') {
                next()
            } else {
                next(false)
            }
        },
    },
    {
        path: '/trade',
        component: Trade,
        meta: {show: true},
        beforeEnter: (to, from, next) => {
            if(from.path=='/shopcart') {
                next()
            } else {
                next(false)
            }
        },
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: {show: true},
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: {show: true},
    },
    {
        path: '/detail/:skuId',
        component: Detail,
        meta: {show: true},
    },
    {
        path: '/home',
        //路由懒加载：高效
        component: () => import('@/pages/Home'),
        meta: {show: true},
    },
    {
        path: '/search/:keyword?',
        component: Search,
        meta: {show: true},
        name: 'search'
    },
    {
        path: '/login',
        component: Login,
        meta: {show: false},
    },
    {
        path: '/register',
        component: Register,
        meta: {show: false},
    },
    //重定向，在项目跑起来的时候，访问/，立马就定向回首页
    {
        path: '*',
        redirect: 'home'
    }
]