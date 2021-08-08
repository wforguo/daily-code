<template>

    <div>
        <br />
        <h3>我是 father 组件</h3>
        <br />
        <hr />

        <child/>
    </div>

</template>

<script>

import child from "./child";

export default {
    data() {
        return {
            name: 'lifeState',
            visible: false,
        }
    },
    components: {
        child
    },
    beforeCreate() {
        console.log(`%c father %c beforeCreate`, 'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060', 'padding: 1px 5px 1px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e');
    },
    created() {
        console.log(`%c father %c created`, 'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060', 'padding: 1px 5px 1px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e');
    },
    beforeMount() {
        console.log(`%c father %c beforeMount`, 'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060', 'padding: 1px 5px 1px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e');
    },
    mounted() {
        console.log(`%c father %c mounted`, 'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060', 'padding: 1px 5px 1px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e');
    },
    beforeDestroy() {
        console.log('father', 'beforeDestroy');
    },
    destroyed() {
        console.log('father', 'destroyed');
    },
    methods: {}
}

</script>

<style>

</style>
