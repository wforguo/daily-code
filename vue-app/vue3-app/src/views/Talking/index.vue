<!--
 * @Name: TalkingView.vue
 * @Author: forguo
 * @Date: 2023/2/23 15:52
 * @Description: TalkingView
-->
<template>
    <div class="page talking">
        <div class="talking-inner">
            <div class="talking-device">
                <!-- 给自己本地的视频播放设置静音，防止产生回音 -->
                <video id="local" class="talking-video" autoplay playsinline muted></video>
            </div>
            <div class="talking-device">
                <video id="remote" class="talking-video" autoplay playsinline></video>
            </div>
            <div>
                <el-input v-model="offerSdp" placeholder="offer" />
                <el-input v-model="answerSdp" placeholder="answer" />
            </div>
        </div>
        <div class="talking-tool">
            <el-button @click="open" type="primary">1、发起通话</el-button>
            <el-button @click="createOffer" type="primary">2、创建 offer</el-button>
            <el-button @click="createAnswer" type="primary">3、创建 answer</el-button>
            <el-button @click="addAnswer" type="primary">4、添加 answer</el-button>
            <el-button @click="startRecord">开始录屏</el-button>
            <el-button @click="stopRecord">结束录屏并下载</el-button>
        </div>
    </div>
</template>

<script lang="ts">
// 使用了setup写法时，额外的name、title等信息，需要单独一个script标签，并且lang同setup的script标签
export default {
    name: 'TalkingView',
    title: 'Rtc通信'
}
</script>

<script lang="ts" setup>
/**
 * 创建一个用于连接控制的 RTCPeerConnection 对象
 * 采集媒体流并添加到RTCPeerConnection 实例中
 * 建立连接，传输媒体流。
 */

import 'webrtc-adapter'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const pc = new RTCPeerConnection()
// import rtmp from 'rtmp-stream'

// 创建本地/远程 SDP 描述, 用于描述本地/远程的媒体流
let offerSdp = ref<string>('')
let answerSdp = ref<string>('')

// 开启通话
const open = async () => {
    // 获取本地端视频标签
    const localVideo = document.getElementById('local') as HTMLVideoElement
    // 获取远程端视频标签
    const remoteVideo = document.getElementById('remote') as HTMLVideoElement

    // 采集本地媒体流
    // getDisplayMedia ==> 获取屏幕共享的媒体流
    const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    })

    // 设置本地视频流
    localVideo.srcObject = localStream

    // 不推荐使用：已经过时的方法 [addStream API](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/addStream)
    // pc.addStream(localStream);

    // 添加本地媒体流的轨道都添加到 RTCPeerConnection 中
    localStream.getTracks().forEach(track => {
        console.log(track)
        pc.addTrack(track, localStream)
    })

    // 监听远程流，方法一：
    pc.ontrack = (event: any) => {
        remoteVideo.srcObject = event.streams[0]
    }

    // 方法二：你也可以使用 addStream API，来更加详细的控制流的添加
    // const remoteStream: MediaStream = new MediaStream()
    // pc.ontrack = (event) => {
    //   event.streams[0].getTracks().forEach((track) => {
    //     remoteStream.addTrack(track)
    //   })
    //   // 设置远程视频流
    //   remoteVideo.srcObject = remoteStream
    // }

    // Create a data channel
    let dataChannel = pc.createDataChannel('myDataChannel')
    // 监听文件通道状态
    // 当文件通道状态发生变化时触发
    dataChannel.onopen = event => {
        ElMessage.success('文件通道已打开')
        console.log('🚀🚀🚀 / event', event)
    }

    // 当文件通道关闭时触发
    dataChannel.onclose = event => {
        ElMessage.warning('文件通道已关闭')
    }

    // 当文件通道发生错误时触发
    dataChannel.onerror = event => {
        ElMessage.error('文件通道发生错误')
    }

    // 当文件通道收到消息时触发
    dataChannel.onmessage = event => {
        // eslint-disable-next-line no-console
        console.log('🚀🚀🚀 / event', event)
    }

    pc.createOffer({
        offerToReceiveVideo: !0,
        offerToReceiveAudio: !0
    })
        .then(offer => {
            console.log(offer)
            return pc.setLocalDescription(offer).then(() => {
                return offer
            })
        })
        .then((offer: any) => {
            return new Promise((resolve, reject) => {
                HttpPost('http://127.0.0.1', window.btoa(offer.sdp)).then(
                    res => {
                        resolve(res)
                    },
                    function (rej) {
                        reject(rej)
                    }
                )
            })
        })
        .then((answerSdp: any) => {
            return pc.setRemoteDescription(
                new RTCSessionDescription({
                    type: 'answer',
                    sdp: window.atob(answerSdp)
                })
            )
        })
        .then(() => {})
        .catch(reason => {
            throw reason
        })

    dataChannel.send('Hello world!')
}

const HttpPost = (url: string, data: any) => {
    return new Promise((resolve, reject) => {
        let xhr: any = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
                let res = xhr.responseText
                xhr.onreadystatechange = new Function()
                xhr = null
                resolve(res)
            }
        }
        xhr.open('POST', url.replace('webrtc', 'http'), true)
        xhr.send(data)
    })
}

/**
 * 创建 offer（提案）
 */
const createOffer = async () => {
    // 创建 offer
    const offer = await pc.createOffer()
    // 设置本地描述
    await pc.setLocalDescription(offer)
    // await pc.setLocalDescription()
    // 到这里，我们本地的 offer 就创建好了，一般在这里通过信令服务器发送 offerSdp 给远端

    // 监听 RTCPeerConnection 的 onicecandidate 事件，当 ICE 服务器返回一个新的候选地址时，就会触发该事件
    pc.onicecandidate = async event => {
        if (event.candidate) {
            offerSdp.value = JSON.stringify(pc.localDescription)
        }
    }
}

/**
 * 创建 answer
 */
const createAnswer = async () => {
    // 解析字符串
    const offer = JSON.parse(offerSdp.value)
    pc.onicecandidate = async event => {
        // Event that fires off when a new answer ICE candidate is created
        if (event.candidate) {
            answerSdp.value = JSON.stringify(pc.localDescription)
        }
    }
    await pc.setRemoteDescription(offer)
    const answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)
}

// 添加 answer(应答)
const addAnswer = async () => {
    const answer = JSON.parse(answerSdp.value)
    if (!pc.currentRemoteDescription) {
        pc.setRemoteDescription(answer)
    }
}
let chunks: any = []
let recorder: any = null

// 录屏
const startRecord = async () => {
    // 获取用户屏幕录制的权限
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
    startRecording(stream)
}

const startRecording = (stream: MediaStream) => {
    // 确认当前环境所支持的屏幕录制文件类型
    const mime = MediaRecorder.isTypeSupported('video/webm; codecs=vp9') ? 'video/webm; codecs=vp9' : 'video/webm'

    // 创建MediaRecorder对象
    recorder = new MediaRecorder(stream, {
        mimeType: mime
    })

    // 当录制数据可用时，将数据块添加到数组中
    recorder.ondataavailable = function (e: { data: any }) {
        chunks.push(e.data)
    }

    recorder.onstop = function () {
        // 创建一个Blob对象
        let blob = new Blob(chunks, { type: 'video/mp4' })

        // 创建一个URL对象，将Blob对象转换成URL
        let url = window.URL.createObjectURL(blob)

        // 创建一个video元素，将URL设置为视频源
        let video = document.createElement('video')
        video.src = url
        video.controls = true
        // 将video元素添加到页面中
        document.body.appendChild(video)
    }
    // 开始录制
    recorder.start()
}

const stopRecord = () => {
    // 停止录制
    recorder.stop()
    setTimeout(() => {
        downRecord()
    }, 500)
}

const downRecord = () => {
    const blob = new Blob(chunks, { type: 'video/mp4' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.style.display = 'none'
    a.download = `record.${Date.now()}.mp4`
    a.click()
    ElMessage.success('下载成功')
}
</script>

<style lang="scss" scoped>
.talking {
    height: 100%;
    display: flex;
    flex-direction: column;
    &-inner {
        flex: 1;
        display: flex;
    }
    &-device {
        border-radius: 8px;
        overflow: hidden;
        width: 550px;
        height: 350px;
        border: 1px solid #eee;
        background: #aaa;
        margin-right: 24px;
    }
    &-video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>
