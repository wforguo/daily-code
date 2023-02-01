/**
 * @Author: forguo
 * @Date: 2023/1/16 14:59
 * @Description: BaseEvent.js
 */

class BaseEvent {
    constructor() {
        this.handles = {}
        this.cached = []
    }

    on() {
        if (typeof callback !== 'function') return

        if (!this.handles[eventName]) {
            this.handles[eventName] = []
        }
        this.handles[eventName].push(callback)

        if (this.cached[eventName] instanceof Array) {
            //说明有缓存的 可以执行
            callback.apply(null, this.cached[eventName])
        }
    }

    emit() {
        if (this.handles[arguments[0]] instanceof Array) {
            for (let i = 0; i < this.handles[arguments[0]].length; i++) {
                this.handles[arguments[0]][i](arguments[1])
            }
        }
        //默认缓存
        this.cached[arguments[0]] = Array.prototype.slice.call(arguments, 1)
    }
}

export default BaseEvent
