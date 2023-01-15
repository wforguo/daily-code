import { defineStore, acceptHMRUpdate } from 'pinia'

const useMenuStore = defineStore({
    id: 'menu',
    state: () => ({
        list: []
    }),
    actions: {
        updateMenu(list: Array<any>) {
            this.$patch({
                list: [...this.list, ...list]
            })
        }
    }
})

export default useMenuStore

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMenuStore, import.meta.hot))
}
