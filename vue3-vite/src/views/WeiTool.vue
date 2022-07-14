<template>
    <div class="home">
        <Timer />

        <el-divider />

    </div>
</template>

<script lang="ts">
import { onMounted } from "vue";
import { isArray } from "wei-tool";

export default {
    name: 'WeiTool',
    components: {
    },
    setup () {
        onMounted(() => {
            const arr = [1, 2, 4];
            console.log('isArray', isArray(arr));
        });
    }
}
</script>
