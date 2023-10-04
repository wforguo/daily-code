const useLoading = function (value: boolean = false) {
    const loading = ref<boolean>(value)

    function showLoading() {
        loading.value = true
    }

    function hideLoading() {
        loading.value = false
    }
    function toggleLoading() {
        loading.value = !loading.value
    }
    return {
        value: loading,
        showLoading,
        hideLoading,
        toggleLoading
    }
}

export default useLoading
