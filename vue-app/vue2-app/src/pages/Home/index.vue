<template>
    <div class="home">
        <div v-for="(item, index) in routers" :key="index" class="router-item">
            <van-cell-group inset>
                <van-cell :title="item.title" is-link :to="item.path" />
            </van-cell-group>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    title: "首页",
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
    },
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
