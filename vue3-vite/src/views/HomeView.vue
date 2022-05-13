<template>
    <div class="home">
        <h4>排行榜</h4>
        <div>
            <p v-for="(item, index) in companies" :key="item.id">
                <el-tag>{{ item.name }}</el-tag>
                <el-button @click="send(index)">投递</el-button>
            </p>
        </div>

        <p>
            已经投递：{{target}}
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ElButton } from 'element-plus';
export default defineComponent({
    name: 'HomeView',
    components: { ElButton },
    setup() {
        /**
         * data
         */
        const companies = ref([
            {
                id: '10001',
                name: '阿里',
            },
            {
                id: '10002',
                name: '腾讯',
            },
            {
                id: '10003',
                name: '字节',
            },
        ]);
        const target = ref('');

        /**
         * methods
         */
        const send = (index: number) => {
            console.log(index);
            target.value = companies.value[index];
        }
        return {
            companies,
            target,
            send,
        }
    }
});
</script>
