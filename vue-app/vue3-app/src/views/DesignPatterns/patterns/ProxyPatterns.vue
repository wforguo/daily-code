<!--
 * @Name: ProxyPatterns.vue
 * @Author: forguo
 * @Date: 2023/4/1 11:09
 * @Description: 代理模式
-->
<template>
    <el-card>
        <template #header>{{ title }}</template>
        <highlightjs language="JavaScript" lineNumbers :autodetect="false" :code="code"></highlightjs>
    </el-card>
</template>

<script lang="ts" setup>
import { defineProps, nextTick } from 'vue'
defineProps({
    title: String
})
const code = `
class ReadImg {
  constructor(fileName) {
    this.fileName = fileName
    this.loadImg()
  }
  show() {
    console.log('show image', this.fileName)
  }
  loadImg() {
    console.log('load image', this.fileName)

  }
}
class ProxyImg {
  constructor(fileName) {
    this.img = new ReadImg(fileName)
  }
  show() {
    this.img.show()
  }
}

new ProxyImg('www.png').show()
    `
nextTick(() => {
    eval(code)
})
</script>
<style scoped lang="scss"></style>
