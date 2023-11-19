<!--
 * @Name: SinglePatterns.vue
 * @Author: forguo
 * @Date: 2023/4/1 11:09
 * @Description: 单例模式
-->
<template>
    <el-card>
        <template #header>{{ title }}</template>
        <highlightjs language="JavaScript" :autodetect="false" :code="code"></highlightjs>
    </el-card>
</template>

<script lang="ts" setup>
defineProps({
    title: String
})
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
