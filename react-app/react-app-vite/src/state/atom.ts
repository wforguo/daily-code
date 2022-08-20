/**
 * @Author: forguo
 * @Date: 2022/6/11 17:29
 * @Description: atom
 */

import { atom } from "recoil";

interface SystemConfig {
    theme: 'dark' | 'light'
}

const systemConfig = atom<SystemConfig>({
    key: 'systemConfig',
    default: {
        theme: 'dark'
    }
});

const token = atom({
    key: 'token',
    default: 'token'
});

const collapsed = atom({
    key: 'collapsed',
    default: false
});

const menus = atom({
    key: 'menus',
    default: [
        {
            path: '/user/list',
            title: '用户列表',
            children: '',
            icon: ''
        },
        {
            path: '/user/add',
            title: '用户编辑',
            children: '',
            icon: ''
        },
    ]
});

export const globalAtom = {
    token,
    collapsed,
    systemConfig,
    menus
}
