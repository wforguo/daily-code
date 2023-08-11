import { ref } from 'vue'

const useLoading = function () {
    const loading = ref<boolean>(false)

    function showLoading() {
        loading.value = true
    }

    function hideLoading() {
        loading.value = false
    }
    return {
        loading,
        showLoading,
        hideLoading
    }
}

export default useLoading
