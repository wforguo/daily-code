const chunkSize = 3 * 1024 * 1024 // 定义切片的大小
import SparkMD5 from 'spark-md5'

// 文件分片
export function createFileChunk(file: File, size = chunkSize): any[] {
    const fileChunkList = []
    let cur = 0
    while (cur < file.size) {
        fileChunkList.push({ file: file.slice(cur, cur + size) })
        cur += size
    }
    return fileChunkList
}

// 计算hash
export function calculateHash(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const spark = new SparkMD5.ArrayBuffer()
        const reader = new FileReader()
        const size = file.size
        const offset = 2 * 1024 * 1024
        const chunks = [file.slice(0, offset)]

        let cur = offset
        while (cur < size) {
            // 最后一块全部加进来
            if (cur + offset >= size) {
                chunks.push(file.slice(cur, cur + offset))
            } else {
                // 中间的 前中后去两个字节
                const mid = cur + offset / 2
                const end = cur + offset
                chunks.push(file.slice(cur, cur + 2))
                chunks.push(file.slice(mid, mid + 2))
                chunks.push(file.slice(end - 2, end))
            }
            // 前取两个字节
            cur += offset
        }

        reader.readAsArrayBuffer(new Blob(chunks))
        reader.onload = (e: any) => {
            spark.append(e?.target?.result)
            resolve(spark.end())
        }
        reader.onerror = e => {
            reject(e)
        }
    })
}
