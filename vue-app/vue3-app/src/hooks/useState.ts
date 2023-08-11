import { ref } from 'vue'
import type { Ref } from 'vue'

interface IState<T> {
    (value: T): void
}

const useState = function <T>(val: T): [Ref<T>, IState<T>] {
    const state: Ref = ref(val)
    const setState: IState<T> = function <T>(value: T) {
        state.value = value
    }
    return [state, setState]
}

export default useState
