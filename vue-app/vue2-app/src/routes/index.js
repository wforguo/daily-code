/**
 * @author: forguo
 * @time: 2021/6/17 14:21
 * @description: index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

/************************
 * @description: 实现路由的自动加载
 ************************/

/**
 *  // 1、Vue异步组件技术：
 *  {
 *     path: '/home',
 *     name: 'Home',
 *     // 不能指定chunk-name
 *     component: resolve => require(['path路径'], resolve)
 *   }
 **/
// 2、es6提案的import()
// 可以指定chunk-name
// const Home = () => import( /* webpackChunkName: "home" */ '@/views/Home.vue')
/*
 *  // 3、webpack提供的require.ensure()
 * 可以指定chunk-name
 *  const Home = resolve => {
 *     require.ensure([], () => {
 *         resolve(require('@/views/Home.vue'));
 *     }, 'chunk-name');
 * };
 */

/**
 * 通过require.context函数获取一个特定的上下文
 * 要搜索的文件夹目录
 * 搜索它的子目录，
 * 匹配文件的正则表达式。
 */
/*
    require.context(
        directory: String, 要搜索的文件夹目录
        includeSubdirs: Boolean /* optional, default true, 搜索它的子目录
        filter: RegExp /* optional, default /^\.\/.*$/, any file, 匹配文件的正则表达式
        mode: String  /* optional, 'sync' | 'eager' | 'weak' | 'lazy' | 'lazy-once', default 'sync'
    )
 */

let views = require.context('@/views/', true, /index\.vue$/)
let routes = []

// 导出的方法有 3 个属性： resolve, keys, id。
// - resolve 是一个函数，它返回请求被解析后得到的模块 id。
// - keys 也是一个函数，它返回一个数组，由所有可能被上下文模块处理的请求组成。
// - id 是上下文模块里面所包含的模块 id. 它可能在你使用 module.hot.accept 的时候被用到

// 这里只用到 keys，返回搜索到的数组

views.keys().forEach(fileName => {
    let $route = views(fileName).default
    let routerName = $route.name
    let routerTitle = $route.title
    let componentPath = fileName.replace(/^\.\//i, 'views/')
    console.log($route)
    routerName &&
        routes.push({
            path: routerName === 'Home' ? '/' : `/${routerName}`,
            title: routerTitle || routerName,
            // component: $route,
            component: () => import(`../${componentPath}`),
            name: routerName,
            meta: {
                title: routerTitle || routerName
            }
        })
})

/************************
 * @description: 实现路由的自动加载
 *************************/

Vue.use(VueRouter)

const routes1 = [
    {
        path: '/',
        title: '首页',
        name: 'Home',
        meta: { title: '首页' },
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Home')
    },
    {
        path: '/Directive',
        title: '指令',
        name: 'Directive',
        meta: { title: '指令' },
        hidden: true,
        component: () => import(/* webpackChunkName: "Directive" */ '@/views/Directive')
    },
    {
        path: '/Component',
        title: '组件',
        name: 'Component',
        meta: { title: '组件' },
        // hidden: true,
        component: () => import(/* webpackChunkName: "Component" */ '@/views/Component')
    },
    {
        path: '/List',
        title: '列表',
        name: 'List',
        meta: { title: '列表' },
        hidden: true,
        component: () => import(/* webpackChunkName: "List" */ '@/views/List')
    },
    {
        path: '/X6',
        title: 'Antv/X6流程图',
        name: 'X6',
        meta: { title: 'Antv/X6流程图' },
        component: () => import(/* webpackChunkName: "X6" */ '@/views/X6')
    },
    {
        path: '/GoJs',
        title: 'gojs流程图',
        name: 'GoJs',
        meta: { title: 'GoJs流程图' },
        component: () => import(/* webpackChunkName: "GoJs" */ '@/views/GoJs')
    },
    {
        path: '/AmapDrop',
        title: '高德地图下钻',
        name: 'AmapDrop',
        meta: { title: 'GoJs流程图' },
        component: () => import(/* webpackChunkName: "AmapDrop" */ '@/views/AmapDrop')
    },
    {
        path: '*',
        name: '404',
        meta: {
            title: '404'
        },
        component: () => import('@/views/Error/404')
    }
]

console.log(routes)

export default routes.filter(item => !item.hidden)
