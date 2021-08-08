<template>

    <div class="page news">
        <div v-for="(item) in list" :key="item._id">
            <Cell :title="item['news-title']" :icon="item['news-thumb']">
            </Cell>
<!--            <div v-html="item['news-intro']"></div>-->
        </div>
    </div>

</template>

<script>
import request from "@/libs/request";
import { Cell } from 'vant';

export default {
    name: "News",
    title: '新闻发布',
    data () {
        return {
            list: []
        }
    },
    components: {
        Cell
    },
    mounted() {
        request.request({
            method: 'get',
            url: 'https://api.cloud-app.com.cn/rest-api/v1.0/cloud-news',
        }).then((res) => {
            console.log(res);
            this.list = res.data || [];
        }, (err) => {
            console.log(err);
        });
    }
}
</script>

<style scoped lang="scss">
.news {

}
</style>
