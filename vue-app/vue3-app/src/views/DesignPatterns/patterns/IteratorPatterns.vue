<!--
 * @Name: IteratorPatterns.vue
 * @Author: forguo
 * @Date: 2023/4/1 11:09
 * @Description: 迭代器模式
-->
<template>
    <el-card>
        <template #header>{{ title }}</template>
        <highlightjs language="JavaScript" :autodetect="false" :code="code"></highlightjs>
    </el-card>
</template>

<script lang="ts" setup>
console.log('设计模式')
defineProps({
    title: String
})

const code = `

// 迭代器模式
class Iterator {
    constructor(container) {
        this.list = container.list
        this.index = 0
    }
    hasNext() {
        return this.index < this.list.length
    }
    next() {
        if (this.hasNext()) {
            return this.list[this.index++]
        }
        return null
    }
}

class Container {
    constructor(list) {
        this.list = list
    }
    getGetIterator() {
        return new Iterator(this)
    }
}

const arr = [100, 99, 3]
const list = new Container(arr)
const generate = list.getGetIterator()
console.log(generate.next())
console.log(generate.next())
console.log(generate.next())
console.log(generate.next())

// ES6 iterator
const iterator = arr[Symbol.iterator]()
// 有数据返回 {value: 100, done: false}
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
// 没有数据返回 {value: undefined, done: true}
console.log(iterator.next())

// for of 语法
function each(data) {
    // iterator 实现
    const iterator = data[Symbol.iterator]()
    let item = { done: false }
    while (!item.done) {
        item = iterator.next()
        if (!item.done) {
            console.log(item.value)
        }
    }
    // for of 实现
    for (const item of data) {
        console.log(item)
    }
}

each(arr)

    `
nextTick(() => {
    eval(code)
})
</script>
<style scoped lang="scss"></style>
