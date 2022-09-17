<template>
    <div class="home">

        <h2>组件库</h2>

        <el-divider/>

        <we-button>Default</we-button>

    </div>
</template>

<script lang="ts">
import {onMounted} from "vue";
// import { isArray } from "wei-tool";

export default {
    name: 'WeiDesign',
    components: {},
    setup() {
        onMounted(() => {
            const arr = [1, 2, 4];
            // console.log('isArray', isArray(arr));
        });
    }
}
</script>
