/**
 * @Author: forguo
 * @Date: 2023/2/23 17:04
 * @Description: index.ts
 */
import { createRouter, createWebHistory } from 'vue-router'

// 路由集合
const routes = [
    {
        path: '/',
        name: 'Home',
        title: '首页',
        component: () => import('@/views/Home/index.vue'),
        meta: {
            name: 'Home',
            title: '首页'
        }
    }
]

// 匹配到的文件默认是懒加载的，通过动态导入实现，并会在构建时分离为独立的 chunk。如果你倾向于直接引入所有的模块（例如依赖于这些模块中的副作用首先被应用），你可以传入 { eager: true } 作为第二个参数：
const views = import.meta.glob(`@/views/*/index.vue`, { eager: true })

// 动态加载路由
for (const filePath in views) {
    const module: any = views[filePath]
    const match: Array<any> = filePath.match(/..\/views\/(\w+)/) || []
    // 匹配到的路由名称
    const routerName = match[1]
    // 找到example的组件，并加载
    const $component = module.default
    // const componentPath = filePath.replace(/^\/src/i, '..')
    // 默认首页必须得
    if (routerName && routerName !== 'Home') {
        const routerTitle = $component.title
        const title = routerTitle || routerName
        routes.push({
            path: routerName === 'Home' ? '/' : `/${routerName}`,
            name: routerName,
            title,
            // component: () => import(`${componentPath}`),
            component: $component,
            meta: {
                name: routerName,
                title
            }
        })
    }
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...routes,
        ...[
            {
                path: '/:pathMatch(.*)',
                // 访问主页的时候 重定向到index页面
                redirect: '/404'
            },
            {
                path: '/404',
                name: '/404',
                component: import('@/views/Error/404/index.vue')
            }
        ]
    ]
})

export const menus = routes
    .map((item: any) => {
        const hidden = item.component?.hidden || false
        delete item.component
        return {
            hidden,
            ...item
        }
    })
    .filter((item: any) => !item.hidden)

export default router
