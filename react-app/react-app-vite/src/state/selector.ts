/**
 * @Author: forguo
 * @Date: 2022/6/11 17:30
 * @Description: selector
 */
import { selector } from 'recoil';
import { globalAtom } from './atom';

const themes = {
    dark: {
        color: '#000'
    },
    light: {
        color: '#000'
    }
}
const themeConfig = selector({
    key: 'themeConfig',
    get: ({ get }) => {
        const theme = get(globalAtom.systemConfig).theme;
        return themes[theme];
    }
});

const menuMap = selector({
    key: 'menuMap',
    get: ({ get }) => {
        const menus = get(globalAtom.menus);
        const flats: any[] = [];
        // 平铺操作
        const getMenus = (menus: any []) => {
            menus.forEach((item) => {
                const { children, ...rest } = item;
                flats[item.path] = item;
                if (children && children.length) {
                    getMenus(children);
                }
            });
        };
        getMenus(menus);
        return flats;
    }
});

export const globalSelector = {
    themeConfig,
    menuMap,
};
