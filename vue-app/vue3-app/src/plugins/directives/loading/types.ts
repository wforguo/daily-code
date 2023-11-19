import type { Directive, UnwrapRef } from 'vue'
import type { LoadingInstance } from './createLoading'

export interface LoadingOptions {
    delay?: number | string | null | undefined
    indicator?: any
    size?: string | null | undefined
    spinning?: boolean
    tip?: string | null | undefined
    wrapperClassName?: string | null | undefined
    background?: string | null | undefined
    fullscreen?: boolean
    // 父级元素
    parent?: HTMLElement | string | null
    // 目标元素
    target?: HTMLElement | string | null
}

export interface directiveInstance {
    [propName: string]: Directive
}

export const INSTANCE_KEY = Symbol('ElLoading')
export type LoadingBinding = boolean | UnwrapRef<LoadingOptions>

export interface ElementLoading extends HTMLElement {
    [INSTANCE_KEY]?: {
        instance: LoadingInstance
        options: LoadingOptions
    }
}
