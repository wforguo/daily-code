<template>
    <div class="home">
        <Timer />
        <h4>排行榜</h4>
        <div>
            <p v-for="(item, index) in companies" :key="item.id">
                <el-tag>{{ item.name }}</el-tag>
                <el-button @click="send(index)">投递</el-button>
            </p>
        </div>

        <p>
            已经投递：{{  target }}
        </p>

        <el-divider />

        <Suspense>
            <template #default>
                <AsyncShow />
            </template>
            <template #fallback>
                加载中...
            </template>
        </Suspense>

    </div>
</template>

<script lang="ts">
import {
    reactive,
    toRefs,
    onBeforeMount,
    onMounted,
    onErrorCaptured,
    watch
} from 'vue';
import Timer from '@/components/Timer.vue';
import AsyncShow from "@/components/AsyncShow.vue";

interface DataProps {
    companies: object[],
    target: object,
    send: (index: number) => void;
}

export default {
    name: 'HomeView',
    components: {
        AsyncShow,
        Timer
    },
    setup () {
        console.log("1-开始创建组件-----setup()");
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

        /**
         * 生命周期
         */
        onBeforeMount(() => {
            console.log("2-组件挂载到页面之前执行-----onBeforeMount()");
        });

        onMounted(() => {
            console.log("3-组件挂载到页面之后执行-----onMounted()");
        });
        // onBeforeUpdate(() => {
        //     console.log("4-组件更新之前-----onBeforeUpdate()");
        // });
        //
        // onUpdated(() => {
        //     console.log("5-组件更新之后-----onUpdated()");
        // });

        // onRenderTracked((event) => {
        //     console.log("状态跟踪组件----------->");
        //     console.log(event);
        // });
        //
        // onRenderTriggered((event) => {
        //     console.log("状态触发组件--------------->");
        //     console.log(event);
        // });

        // 监听多个使用数组
        watch(ref.target, (newValue: object, oldValue: object) => {
            console.log(`new--->${JSON.stringify(newValue)}`);
            console.log(`old--->${JSON.stringify(oldValue)}`);
            if (newValue && newValue.name) {
                document.title = `已投递：${newValue.name}`;
            }
        });

        // 异常捕获
        onErrorCaptured((err) => {
            console.log('/*******************/')
            console.log(err);
            console.log('/*******************/')
        });
        return {
            ...ref,
        }
    }
}
</script>
