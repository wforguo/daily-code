<template>

    <div>
        <br/>
        <h3>我是 gradeFather 组件</h3>
        <br/>
        <hr/>

        <father v-if="visible"/>

        <button @click="handleVisible(visible, 0)">{{visible ? '隐藏' : '显示'}}</button>

        <div class="row">
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
        </div>
    </div>

</template>

<script>
import father from "./father";

export default {
    name: "LifeState",
    title: '生命周期',
    data() {
        return {
            name: 'grade',
            visible: true,
        }
    },
    components: {
        father
    },
    beforeCreate() {
        console.log(this.$el);
        console.log('gradeFather', 'beforeCreate');
    },
    created() {
        console.log(this.$el);
        console.log('gradeFather', 'created');
    },
    beforeMount() {
        console.log(this.$el);
        console.log('gradeFather', 'beforeMount');
    },
    mounted() {
        console.log(this.$el);
        console.log('gradeFather', 'mounted');
    },
    beforeUpdate() {
        console.log('gradeFather', 'beforeUpdate');
        console.log(this.visible);
    },
    updated() {
        console.log('gradeFather', 'updated');
        console.log(this.visible);
    },
    methods: {
        handleVisible (...rest) {
            console.log(1);
            setTimeout(() => {
                console.log('2');
            }, 0);
            this.$nextTick(function (...rest2) {
                console.log('3');
            });
            let p1 = new Promise((resolve) => {
                console.log('4')
                resolve('p1')
            });
            let p2 = new Promise((resolve, reject) => {
                console.log('5')
                reject('p2');
            }).catch(err => {
                console.warn('p2', err);
            });
            Promise.all([p1, p2]).then(res => {
                console.log(res);
            }).catch(err => {
                console.warn(err);
            }).finally(final => {
                console.log('final', final);
            });
            this.visible = !this.visible;
        }
    }
}

</script>


<style lang="less" scoped>
.row {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    .col {
        height: 20px;
        background: #ccc;
        &:nth-child(1) {
            width: 100px;
            background: #666;
        }
        &:nth-child(2) {
            flex: 1;
        }
        &:nth-child(3) {
            width: 150px;
            background: #333;
        }
    }
}
</style>
