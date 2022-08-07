/**
 * @author: forguo
 * @time: 2021/6/17 09:55
 * @description: index
 */

const store = {
    namespaced: true,
    state: {
        routers: [
        ],
    },
    actions: {
        setRouters ({store, commit}, {routers}) {
            let routerList = routers.map(item => ({
                name: item.name,
                path: item.path,
                title: item.title,
            })).filter(item => {
                return item.path !== '/'
            });
            return new Promise((resolve) => {
                commit('routerRefresh', routerList);
                resolve();
            });
        }
    },
    mutations: {
        routerRefresh (state, routers) {
            state.routers = routers;
        }
    }
};

export default store;
