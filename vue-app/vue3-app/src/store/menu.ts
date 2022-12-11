import { defineStore, acceptHMRUpdate } from 'pinia'

const useMenuStore = defineStore({
    id: 'menu',
    state: () => ({
        list: [
            {
                path: '/',
                name: 'home',
                title: '首页'
            }
        ]
    }),

    actions: {
        updateMenu(list: Array<any>) {
            this.$patch({
                list
            })
        }
    }
})

export default useMenuStore

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMenuStore, import.meta.hot))
}
