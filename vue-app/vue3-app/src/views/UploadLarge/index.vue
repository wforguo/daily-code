<!--
 * @Name: index.vue
 * @Author: forguo
 * @Date: 2023/12/3 17:26
 * @Description: index
-->
<template>
    <div class="upload-large" v-loading="loading" element-loading-text="上传中...">
        <el-upload
            drag
            ref="uploadRef"
            class="upload-demo"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleChange"
        >
            <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
            <div class="el-upload__text">
                Drop file here or
                <em>click to upload</em>
            </div>
        </el-upload>
        <el-row :gutter="20" style="margin-top: 16px">
            <el-col :span="8" :offset="8">
                <el-button :loading="loading" type="primary" fill @click="handleUpload" style="width: 100%">
                    上传
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
defineOptions({
    title: '大文件上传',
    name: 'UploadLarge'
})
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { createFileChunk, calculateHash } from '@/libs/'
import { mergeChunks, uploadChunk } from '@/api'

const fileChunkList = ref<any[]>([])
const fileHash = ref('')
const chunkSize = 3 * 1024 * 1024 // 定义切片的大小

let file = ref<any>()
let loading = ref(false)

/**
 * 选择文件
 * @param uploadFile
 * @param uploadFiles
 */
const handleChange = (uploadFile: any, uploadFiles: any) => {
    console.log(uploadFile.raw, uploadFiles)
    file.value = uploadFile.raw
}

/**
 * 点击上传
 */
const handleUpload = async () => {
    if (!file.value) {
        ElMessage.warning('请选择文件')
        return
    }

    // 文件分片
    const chunkList = createFileChunk(file.value, chunkSize)
    fileHash.value = await calculateHash(file.value)

    fileChunkList.value = chunkList.map(({ file }, index) => {
        return {
            chunk: file,
            size: file.size,
            chunkHash: `${fileHash.value} - ${index}`,
            fileHash: fileHash.value,
            index
        }
    })

    const uploadChunks = async (chunkList: any[] = []) => {
        try {
            loading.value = true
            const requestList = chunkList.map(item => uploadChunk(item))
            await Promise.all(requestList)
            // 通知服务器合并切片
            await mergeChunks({
                fileName: file.value?.name,
                fileSize: file.value?.size,
                size: chunkSize,
                hash: fileHash.value
            })
            ElMessage.success('上传成功')
            loading.value = false
        } catch (error) {
            ElMessage.error('上传失败')
            loading.value = false
        }
    }

    await uploadChunks(fileChunkList.value) // 上传文件切片
}
</script>

<style scoped lang="scss"></style>
