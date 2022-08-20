/**
 * @Author: forguo
 * @Date: 2022/6/12 17:33
 * @Description: 自动路由的实现
 */
import {globalAtom, globalSelector} from "@/state";
import {useRecoilState, useRecoilValue} from "recoil";
import { Route, Routes, useLocation} from "react-router-dom";
import React, { useCallback, useEffect, lazy, useMemo } from "react";
import NotFoundPage from "@/components/error/404";
import PageLoading from "@/components/PageLoading";
import Layouts from "@/layouts/index";
import {message } from "antd";
import Home from "@/views/home";

export default () => {
    const [token] = useRecoilState(globalAtom.token);
    const menuMap = useRecoilValue(globalSelector.menuMap);
    const location = useLocation();
    const loadModule = useCallback((p: () => Promise<any>) => {
        return lazy(() => {
            // 做一个懒加载
            const hide = message.loading('加载中', 0);
            return p().finally(() => {
                hide();
            });
        });
    }, []);
    /**
     * 自动根据用户信息注册路由
     * 路由规则为./page/*\/*\/index.tsx所有的页面会自动注册
     */
    const loadPages = useCallback(() => {
        // 所有符合路由的页面
        const page4 = import.meta.glob('../views/*/*/*/*.tsx');
        const page3 = import.meta.glob('../views/*/*/*.tsx');
        const page2 = import.meta.glob('../views/*/*.tsx');
        const pages = {
            ...page4,
            ...page3,
            ...page2
        };

        const filters: Array<{ path: string; element: any }> = [];
        for (const path in pages) {
            // @ts-ignore
            if (menuMap[`${path.substring(8, path.length - 4)}`.toLowerCase()]) {
                filters.push({
                    path: `${path.substring(9, path.length - 4)}`.toLowerCase(),
                    element: loadModule(pages[path])
                });
            }
        }
        return filters;
    }, [menuMap]);
    const pages = useMemo(() => {
        return loadPages();
    }, [loadPages]);
    useEffect(() => {
        const whiteList = ['/account/login', '/account/register', '/404'];
        // 白名单过滤
        if (whiteList.includes(location.pathname)) {
            return undefined;
        }
    }, [token, location]);

    return (
        <Routes>
            <Route path={'/*'} element={<Layouts />}>
                <Route key='home' index element={<Home />} />
                {
                    pages.map((item) => (
                        <Route key={item.path} path={item.path} element={<item.element />} />
                    ))
                }
                <Route path='*' element={pages.length ? <NotFoundPage /> : <PageLoading />} />
            </Route>
        </Routes>
    );
}
