<template>
    <div class="page design-patterns">
        <el-collapse>
            <el-collapse-item title="面向对象">
                <h2>面向对象的概念</h2>
                <h2>面向对象的三要素</h2>
                <h2>jQuery中的应用</h2>
                <h2>面向对象的意义</h2>
                <div>——数据结构化 比如浏览器的渲染，最终是解析成了DOM树，cssom，最后才去渲染</div>
            </el-collapse-item>
            <el-collapse-item title="5大设计原则">
                <div>5大设计原则</div>
            </el-collapse-item>
            <el-collapse-item title="23种设计模式">
                <div>23种设计模式</div>
            </el-collapse-item>
            <el-collapse-item title="项目应用">
                <div>项目应用</div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script lang="ts">
// 使用了setup写法时，额外的name、title等信息，需要单独一个script标签，并且lang同setup的script标签
export default {
    name: 'DesignPatterns',
    title: '设计模式',
    inheritAttrs: false,
    customOptions: {}
}
</script>

<script lang="ts" setup>
import { nextTick } from 'vue'

class jQuery {
    [key: string]: any
    selector: string
    length: number
    constructor(selector: string) {
        const slice = Array.prototype.slice
        const $el = slice.call(document.querySelectorAll(selector))
        const len = $el.length
        for (let i = 0; i < len; i++) {
            this[i] = $el[i]
        }
        this.selector = selector
        this.length = len
    }
    addClass() {}
}

const $ = function (selector: string) {
    return new jQuery(selector)
}

nextTick(() => {
    const $h = $('h2')
    console.log($h)
    const $p = $('section')
    console.log($p)
})
</script>
