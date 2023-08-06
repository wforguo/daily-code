function Vue(options) {
    this.init(options)
}

// 重写是因为 prototype 不可修改 writable为false，Object.getOwnPropertyDescriptor(Array, "prototype")
var arrayMethods = Object.create(Array.prototype);

var methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]

methods.forEach((method) => {
    var origin = arrayMethods[method]
    arrayMethods[method] = function () {
        arrayUpdate(Array.from(arguments))
        origin.apply(this, arguments)
    }
})

var arrayUpdate = function (data) {
    console.log('arrayUpdate', data)
}

var observer = function  (data) {
    if (!data || typeof data !== 'object') {
        return
    }
    new Observer(data)
}

Vue.prototype.init = function (options) {
    var data = options.data
    observer(data)
}

function Observer (data) {
    this.value = data
    // 数组的响应式处理
    if (Array.isArray(data)) {
        data.__proto__ = arrayMethods
        this.observeArray(data)
    } else {
        // 对象的响应式处理
        this.observeObject(data)
    }
}

Observer.prototype.observeArray = function (items) {
    var l = items.length
    for (var i = 0; i < l; i++) {
        observer(items[i])
    }
}

Observer.prototype.observeObject = function (data) {
    for (const key in data) {
        defineReactive(data, key, data[key])
    }
}

function defineReactive (data, key, val) {
    if (!val) {
        val = data[key]
    }
    observer(val)

    Object.defineProperty(data, key, {
        get() {
            console.log('get', key, val)
            return val
        },
        set(v) {
            console.log('set', key, v)
            observer(v)
            if (v === val) return;
            val = v;
        }
    })
}
