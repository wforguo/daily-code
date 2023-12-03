import { createVNode, render } from 'vue'
import type { VNode } from 'vue'
import { Spin as Loading } from 'ant-design-vue'
// import { LoadingOutlined } from '@ant-design/icons-vue'

import type { LoadingOptionsResolved } from './types'

export function createLoading(options: LoadingOptionsResolved & { style: Partial<CSSStyleDeclaration> }, wait = false) {
    const target = options.target
    const originOptions = {
        ...options
    }
    delete originOptions.target
    delete originOptions.parent
    const data = reactive({
        ...originOptions
    })

    // 默认加载器
    // const indicatorDefault = createVNode(LoadingOutlined, {
    //   style: {
    //     fontSize: '24px'
    //   },
    //   spin: true
    // })

    // 自定义加载器，可以是一个 svg
    const svg = data.indicator
    const indicator = createVNode(
        'span',
        {
            class: 'indicator',
            style: {
                fontSize: '24px'
            }
        },
        {
            default: () => svg
        }
    )

    // 生成 Loading vNode
    const vm: VNode = createVNode(
        Loading,
        // options
        {
            delay: data.delay,
            indicator: data.indicator ? indicator : '',
            size: data.size,
            spinning: data.spinning,
            tip: data.tip || '加载中...',
            wrapperClassName: data.wrapperClassName,
            style: data.style
        },
        {
            // default: () => data.tip
        }
        // children，允许字符串或数组
    )

    // 输出虚拟DOM
    if (wait) {
        setTimeout(() => {
            render(vm, document.createElement('div'))
        }, 0)
    } else {
        render(vm, document.createElement('div'))
    }

    // 卸载
    function close() {
        if (vm?.el && vm.el.parentNode) {
            vm.el.parentNode.removeChild(vm.el)
        }
        target?.classList.remove('v-loading-target')
    }

    // 挂载
    function open(target: HTMLElement = document.body) {
        if (!vm || !vm.el) {
            return
        }
        target.appendChild(vm.el as HTMLElement)
        target.classList.add('v-loading-target')
    }

    if (target) {
        open(target as HTMLElement)
    }

    return {
        ...toRefs(data),
        vm,
        close,
        open,
        get loading() {
            return data.spinning
        },
        get $el(): HTMLElement {
            return vm?.el as HTMLElement
        }
    }
}

export type LoadingInstance = ReturnType<typeof createLoading>
