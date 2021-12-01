<!--
 * @Name: index.vue
 * @Author: forguo
 * @Date: 2021/11/20 18:35
 * @Description: index
-->
<template>
    <div>
        <van-form @submit="sengMsg">
            <van-field
                v-model="message"
                name="消息"
                label="消息"
                placeholder="消息"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { Toast } from 'vant'
let ws = {};
export default {
    name: 'Chat',
    title: '聊天',
    data () {
        return {
            send_id: 'oo21w5OZ14t7s7tzl7dDlodY3TTA',
            message: '',
        }
    },
    mounted() {
        ws = new WebSocket('ws://localhost:3000/', );

        ws.onopen = () => {
            console.log('WebSocket onopen');
            // Web Socket 已连接上，使用 send() 方法发送数据
            // ws.send({
            //     id: this.user_id,
            //     data: {
            //         data: this.msg,
            //     },
            //     msg: this.msg,
            // });
        }
        ws.onmessage = message => {
            console.log('WebSocket data received：', message);
            try {
                const res = JSON.parse(message.data);
                console.log(res);
                if (res.code === 200) {
                    this.message = res.data.message || '';
                } else {
                    Toast(res.message || '消息格式解析错误');
                }
            } catch (e) {
                alert('消息解析错误！');
            }
        }
        ws.onclose = () => {
            console.log("WebSocket onclose");
        };
    },
    methods: {
        sengMsg () {
            ws.send(JSON.stringify({
                type: 'notice',
                id: this.send_id,
                time: Date.now(),
                data: {
                    message: this.message,
                },
            }))
        }
    },

}
</script>

<style scoped>

</style>
