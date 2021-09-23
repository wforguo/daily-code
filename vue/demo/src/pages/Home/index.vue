<template>

    <div class="home">
        <h2 class="home-title">所有的路由</h2>
        <div v-for="(item, index) in routers" :key="index" class="router-item">
            <Cell :title="item.title" is-link :to="item.path" />
        </div>

        {{$attrs}}
        <MyButton type="primary" round :autoLoading="true" :loading-text="'提交中...'" @click="handleClick">提交</MyButton>

    </div>

</template>

<script>
import { mapState } from 'vuex';
import { Cell } from 'vant';
import MyButton from '@/components/MyButton';

export default {
    name: "Home",
    data() {
        return {
            loading: true,
        }
    },
    computed: {
        ...mapState('router', [
            'routers'
        ])
    },
    components: {
        Cell,
        MyButton
    },
    methods: {
        handleClick (done) {
            setTimeout(() => {
                // 执行该回调，去关闭loading
                done();
            }, 1500)
        }
    }
}
</script>
<style scoped lang="less">
.home {
    overflow: hidden;
    .home-title {
        margin: 15px 0 30px;
    }
    .router-item {
        margin: 15px 0;
        font-size: 15px;
        .router-name {
            margin-right: 12px;
            font-weight: bold;
        }
    }
    /deep/ .van-cell {
        background: transparent;
    }
}
</style>
