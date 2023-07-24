<template>
    <div class="page page-scroll-y design-patterns">
        <el-link href="//forguo.cn" target="_blank" type="primary">设计模式</el-link>
        <el-collapse>
            <el-collapse-item title="面向对象">
                <el-descriptions title="" :column="1">
                    <el-descriptions-item label="面向对象的概念"></el-descriptions-item>
                    <el-descriptions-item label="面向对象的三要素"></el-descriptions-item>
                    <el-descriptions-item label="面向对象的意义">
                        数据结构化 比如浏览器的渲染，最终是解析成了DOM树，cssom，最后才去渲染
                    </el-descriptions-item>
                    <el-descriptions-item label="jQuery中的应用"></el-descriptions-item>
                </el-descriptions>
            </el-collapse-item>
            <el-collapse-item title="5大设计原则">
                <el-descriptions title="" :column="1">
                    <el-descriptions-item label="S">单一职责原则</el-descriptions-item>
                    <el-descriptions-item label="O">开放封闭原则（开放扩展，封闭修改）</el-descriptions-item>
                    <el-descriptions-item label="L">李氏置换原则</el-descriptions-item>
                    <el-descriptions-item label="I">接口独立原则</el-descriptions-item>
                    <el-descriptions-item label="D">依赖导致原则</el-descriptions-item>
                </el-descriptions>
            </el-collapse-item>
            <el-collapse-item title="23种设计模式">
                <FactoryPatterns title="工厂模式" />
                <SinglePatterns title="单列模式" />
                <AdaptPatterns title="适配器模式" />
                <DecoratorPatterns title="装饰器模式" />
                <ProxyPatterns title="代理模式" />
                <IteratorPatterns title="迭代器模式" />
                <el-alert type="success" :closable="false" style="margin-bottom: 12px">订阅、发布模式</el-alert>
                <el-alert type="success" :closable="false" style="margin-bottom: 12px">原型模式</el-alert>
                <el-alert type="success" :closable="false" style="margin-bottom: 12px">状态模式</el-alert>
                <el-alert type="success" :closable="false" style="margin-bottom: 12px">享元模式</el-alert>
                <el-alert type="success" :closable="false" style="margin-bottom: 12px">策略模式</el-alert>
                <el-alert type="success" :closable="false" style="margin-bottom: 12px">策略模式</el-alert>
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
import {
    IteratorPatterns,
    FactoryPatterns,
    SinglePatterns,
    AdaptPatterns,
    DecoratorPatterns,
    ProxyPatterns
} from './patterns/index'
</script>
<style lang="scss">
.design-patterns {
    .el-card {
        margin-bottom: 16px;
    }
}
</style>
