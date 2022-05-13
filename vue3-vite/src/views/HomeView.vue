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
import { defineComponent, ref, reactive, toRefs } from 'vue';
import { ElButton } from 'element-plus';
interface DataProps {
    companies: object[],
    target: object,
    send: (index: number) => void;
}

export default {
    name: 'HomeView',
    components: { ElButton },
    setup() {
        const data: DataProps = reactive({
            companies: [
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
            ],
            target: {},
            send: (index: number) => {
                data.target = data.companies[index];
            }
        });

        const ref = toRefs(data);

        return {
            ...ref,
        }
    }
}
</script>
