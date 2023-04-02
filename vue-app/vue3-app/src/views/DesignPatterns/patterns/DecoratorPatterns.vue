<!--
 * @Name: DecoratorPatterns.vue
 * @Author: forguo
 * @Date: 2023/4/1 11:09
 * @Description: 装饰者模式
-->
<template>
    <el-card>
        <template #header>装饰者模式</template>
        <highlightjs language="JavaScript" lineNumbers :autodetect="false" :code="code"></highlightjs>
    </el-card>
</template>

<script lang="ts" setup>
import { nextTick } from 'vue'
console.log('装饰者模式')
const code = `
class Circle {
    constructor() {
        this.border = 'none'
    }
    draw() {
        console.log('draw Circle', this)
    }
}

class Client {
    constructor(circle) {
        this.circle = circle
    }
    // 添加新功能
    draw() {
        this.circle.draw()
        this.setBorder(this.circle)
        this.circle.draw()
    }
    setBorder(circle) {
        circle.border = '1px'
        console.log('setBorder', circle)
    }
}
new Client(new Circle()).draw()
    `
nextTick(() => {
    eval(code)
})
</script>
<style scoped lang="scss"></style>
