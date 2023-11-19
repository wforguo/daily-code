<!--
 * @Name: AdaptPatterns.vue
 * @Author: forguo
 * @Date: 2023/4/1 11:09
 * @Description: 适配器模式
-->
<template>
    <el-card>
        <template #header>{{ title }}</template>
        <highlightjs language="JavaScript" lineNumbers :autodetect="false" :code="code"></highlightjs>
    </el-card>
</template>

<script lang="ts" setup>
defineProps({
    title: String
})

const code = `
class SpecialRequest {
    request() {
      return 'old'
    }
}

class Request {
  constructor() {
    // 封装旧接口
    this.adptor = new SpecialRequest()
  }
  request () {
    let type = this.adptor.request()
    console.log(type)
  }
}
new Request().request()
    `
nextTick(() => {
    eval(code)
})
</script>
<style scoped lang="scss"></style>
