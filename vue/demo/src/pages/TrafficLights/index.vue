<template>

    <div class="traffic-lights">
        <Panel title="红绿灯">
            <div style="margin-bottom: 18px;">实现一个红绿灯，把一个圆形 div 按照绿色 3 秒，黄色 1 秒，红色 2 秒循环改变背景色</div>
        </Panel>
        <div class="light-inner">
            <div class="light" :style="{background: color}"></div>
        </div>
    </div>

</template>

<script>
import { Panel } from 'vant';
export default {
    name: "TrafficLights",
    title: '交通信号灯',
    data() {
        return {
            color: 'green',
        }
    },
    components: {
        Panel
    },
    mounted() {
        // 绿色 3 秒，黄色 1 秒，红色 2 秒循环改变背景色
        this.trafficSwitch();
    },
    methods: {
        async switchColor (color, delay) {
            this.color = color
            await this.switchCount(delay);
        },
        switchCount (delay) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(delay);
                }, delay);
            })
        },
        async switchGreen () {
            await this.switchColor('green', 3000);
            await this.switchYellow();
        },
        async switchYellow () {
            await this.switchColor('yellow', 1000);
            await this.switchRed();
        },
        async switchRed () {
            await this.switchColor('red', 2000);
            await this.switchGreen();
        },
        async trafficSwitch () {
            // 绿色 3 秒，黄色 1 秒，红色 2 秒循环改变背景色
            await this.switchGreen();

            // Promise链式调用
            // this.switchCount(1000).then(res => {
            //     console.log(res);
            //     return this.switchCount(2000);
            // }).then(res => {
            //     console.log(res);
            //     return this.switchCount(3000);
            // }).then(res => {
            //     console.log(res);
            // })
        }
    }
}
</script>
<style scoped lang="less">
.traffic-lights {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .light-inner {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .light {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
}
</style>
