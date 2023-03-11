# vite + ts + vue3

[vite](https://cn.vitejs.dev/)

[Vue3打开编辑器](https://github.com/webfansplz/vite-plugin-vue-inspector)

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## 生命周期

vue2--------------vue3
beforeCreate  -> setup()
created       -> setup()
beforeMount   -> onBeforeMount
mounted       -> onMounted
beforeUpdate  -> onBeforeUpdate
updated       -> onUpdated
beforeDestroy -> onBeforeUnmount
destroyed     -> onUnmounted
activated     -> onActivated
deactivated   -> onDeactivated
errorCaptured -> onErrorCaptured

## 响应式

### 深层响应式

```js
import { reactive } from 'vue'
```

返回原始对象的 `Proxy`

#### 局限性

1、无法监听string，boolean，number原始类型
2、不可以随意地“替换”一个响应式对象，会导致响应式连接丢失

```js
let state = reactive({ count: 0 })

// 上面的引用 ({ count: 0 }) 将不再被追踪（响应性连接已丢失！）
state = reactive({ count: 1 })
```

当我们将响应式对象的属性赋值或解构至本地变量时，或是将该属性传入一个函数时，我们会失去响应性：

```js
const state = reactive({ count: 0 })

// n 是一个局部变量，同 state.count
// 失去响应性连接
let n = state.count
// 不影响原始的 state
n++

// count 也和 state.count 失去了响应性连接
let { count } = state
// 不会影响原始的 state
count++

// 该函数接收一个普通数字，并且
// 将无法跟踪 state.count 的变化
callSomeFunction(state.count)

```
### 浅层响应式

仅在顶层具有响应性

```js
import { shallowReactive } from 'vue'
```

### 用 ref() 定义响应式变量

reactive() 的种种限制归根结底是因为 JavaScript 没有可以作用于所有值类型的 “引用” 机制。为此，Vue 提供了一个 ref() 方法来允许我们创建可以使用任何值类型的响应式 ref：

ref() 将传入参数的值包装为一个带 .value 属性的 ref 对象：

```js
const count: Ref<number> = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

一个包含对象类型值的 ref 可以响应式地替换整个对象：
```js
const objectRef = ref({ count: 0 })

// 这是响应式的替换
objectRef.value = { count: 1 }
```

ref 被传递给函数或是从一般对象上被解构时，不会丢失响应性：
```js
const obj = {
  foo: ref(1),
  bar: ref(2)
}

// 该函数接收一个 ref
// 需要通过 .value 取值
// 但它会保持响应性
callSomeFunction(obj.foo)

// 仍然是响应式的
const { foo, bar } = obj
```

## computed计算

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
})
</script>
```

计算属性依赖**响应式**被缓存，**响应式不更新**，是不会触发`computed`的`getter`，重新去计算的

### Tips

Getter 不应有副作用

避免直接修改计算属性值

## 应用

### 路由自动加载

### 透传属性

[https://cn.vuejs.org/guide/components/attrs.html](https://cn.vuejs.org/guide/components/attrs.html)

$attrs

> 传递给一个组件，却没有被该组件声明为 `props` 或 `emits` 的 `attribute` 或者 `v-on` 事件监听器。
> 最常见的例子就是 `class`、`style` 和 `id`。

```vue
<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">click me</button>
</div>
```
