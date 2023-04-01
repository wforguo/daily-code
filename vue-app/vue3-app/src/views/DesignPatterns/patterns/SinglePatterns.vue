<!--
 * @Name: SinglePatterns.vue
 * @Author: forguo
 * @Date: 2023/4/1 11:09
 * @Description: 单例模式
-->
<template>
    <el-card>
        <template #header>单例模式</template>
        <highlightjs language="JavaScript" :autodetect="false" :code="code"></highlightjs>
    </el-card>
</template>

<script lang="ts" setup>
import { nextTick } from 'vue'
console.log('单例模式')
const code = `
class SingleObject {
    showMessage() {
      console.log('showMessage', this)
    }
}
SingleObject.getInstance = (function () {
   let instance = null
    return function () {
      if (!instance) {
        instance =  new SingleObject()
      }
      return instance
    }
})()

console.log(SingleObject.getInstance() === SingleObject.getInstance())
    `
nextTick(() => {
    eval(code)
})
</script>
<style scoped lang="scss"></style>
