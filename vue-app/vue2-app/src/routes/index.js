/**
 * @author: forguo
 * @time: 2021/6/17 14:21
 * @description: index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

/************************
 * @description: 实现路由的自动加载
 ************************
 */

let routes = [];

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

let views = require.context('../pages/', true, /index\.vue$/);

// 导出的方法有 3 个属性： resolve, keys, id。
// - resolve 是一个函数，它返回请求被解析后得到的模块 id。
// - keys 也是一个函数，它返回一个数组，由所有可能被上下文模块处理的请求组成。
// - id 是上下文模块里面所包含的模块 id. 它可能在你使用 module.hot.accept 的时候被用到

// 这里只用到 keys，返回搜索到的数组

views.keys().forEach((key) => {
    let $route = views(key).default;
    let routerName = $route.name;
    let routerTitle = $route.title;
    let componentPath = $route.__file.replace(/^src\//i, '');
    routes.push({
        path: routerName === 'Home' ? '/' : `/${routerName}`,
        title: routerTitle || routerName,
        component: () => import(
            /* webpackChunkName: "[request]" */
            `../${componentPath}`)
        ,
        name: routerName,
        meta: {
            title: routerTitle || routerName,
        }
    })
});
console.log('所有的路由', routes);

/************************
 * @description: 实现路由的自动加载
 *************************/

Vue.use(VueRouter);

export default routes
