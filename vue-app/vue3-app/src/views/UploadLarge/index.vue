<!--
 * @Name: index.vue
 * @Author: forguo
 * @Date: 2023/12/3 17:26
 * @Description: index
-->
<template>
    <a-upload-dragger :file-list="fileList">
        <a-button type="primary">
            <a-icon type="upload" />
            点击上传
        </a-button>
    </a-upload-dragger>
</template>

<script lang="ts" setup>
defineOptions({
    title: '大文件上传',
    name: 'UploadLarge'
})
let fileList = ref<any[]>([])
</script>

<style scoped></style>
