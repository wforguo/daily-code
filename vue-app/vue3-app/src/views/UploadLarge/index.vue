<!--
 * @Name: index.vue
 * @Author: forguo
 * @Date: 2023/12/3 17:26
 * @Description: index
-->
<template>
    <div class="upload-large" element-loading-text="上传中...">
        <el-upload
            drag
            ref="uploadRef"
            class="upload-demo"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleChange"
            :disabled="loading"
        >
            <template v-if="!file">
                <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
                <div class="el-upload__text">
                    Drop file here or
                    <em>click to upload</em>
                </div>
            </template>
            <template v-else>
                <el-progress :text-inside="true" :stroke-width="16" :percentage="uploadPercentage" />
            </template>
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
import { calculateHash, createFileChunk } from '@/libs/'
import { mergeChunks, uploadChunk } from '@/api'

const fileChunkList = ref<any[]>([])
const requestList = ref<any[]>([])
const fileHash = ref('')
const chunkSize = 3 * 1024 * 1024 // 定义切片的大小

let file = ref<File>()
let loading = ref<boolean>(false)

// 计算总文件上传进度
const uploadPercentage = computed(() => {
    // 每个切片的上传进度 * 切片大小除以总文件大小
    if (!file.value || !fileChunkList.value.length) return 0
    const loaded = fileChunkList.value.map(item => item.size * item.percentage).reduce((acc, cur) => acc + cur)
    return parseInt((loaded / file.value.size).toFixed(2))
})

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
            index,
            percentage: 0
        }
    })

    // 上传进度监听函数
    function onProgress(item: any) {
        return (e: any) => {
            console.log(e)
            item.percentage = parseInt(String((e.loaded / e.total) * 100))
        }
    }

    // 上传文件切片
    const uploadChunks = async (chunkList: any[] = []) => {
        try {
            loading.value = true
            requestList.value = chunkList.map((item: any, idx: number) =>
                uploadChunk(item, onProgress(fileChunkList.value[idx]))
            )
            await Promise.all(requestList.value)
            // 通知服务器合并切片
            await mergeChunks({
                fileName: file.value?.name,
                fileSize: file.value?.size,
                size: chunkSize,
                hash: fileHash.value
            })
            ElMessage.success('上传成功')
            fileChunkList.value = []
            file.value = undefined
            loading.value = false
        } catch (error) {
            ElMessage.error('上传失败')
            loading.value = false
        }
    }

    await uploadChunks(fileChunkList.value)
}
</script>

<style scoped lang="scss">
.upload-large {
    display: flex;
    justify-content: center;
    flex-direction: column;
}
</style>
