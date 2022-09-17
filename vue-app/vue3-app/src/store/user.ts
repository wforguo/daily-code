import { defineStore, acceptHMRUpdate } from 'pinia'
import api from '@/api'

const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        name: '',
        isAdmin: false,
        signature: ''
    }),

    actions: {
        /**
         * user  logout
         */
        logout() {
            this.$patch({
                name: '',
                isAdmin: false
            })
        },
        /**
         * user login
         * @param {string} user
         * @param {string} password
         */
        async login(user: string, password: string) {
            const userData = await api.user.login({
                user,
                password
            })
            const data = {
                name: user,
                ...userData.data
            }
            console.log('login-success', data)
            this.$patch(data)
        }
    }
})

export default useUserStore

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
