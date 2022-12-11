/**
 * @author: forguo
 * @time: 2021/6/17 09:55
 * @description: index
 */

const store = {
    namespaced: true,
    state: {
        list: [
            {
                path: '/',
                name: 'home',
                title: '首页'
            }
        ],
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        updateMenu ({store, commit}, {list}) {
            console.log(list)
            commit('updateMenu', list.map(item => ({
                name: item.name,
                path: item.path,
                title: item.title,
            })));
        }
    },
    mutations: {
        updateMenu (state, list) {
            state.list = list;
        }
    }
};

export default store;
