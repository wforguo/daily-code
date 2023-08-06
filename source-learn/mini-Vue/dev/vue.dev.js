/**
 * @Author: forguo
 * @Date: 2021/7/5 10:10
 * @Description: vue.js
 */
(function (global, factory) {
    // 判断环境，模块规范检测
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.Vue = factory());
})(window, function () {

    /**
     * @description Vue 全局配置对象
     */
    var config = {
        optionMergeStrategies: Object.create(null)
    };

    // 通过检测window去判断是不是浏览器环境
    var inBrowser = typeof window !== 'undefined';

    // 重写是因为 prototype 不可修改 writable为false，Object.getOwnPropertyDescriptor(Array, "prototype")
    var arrayProto = Array.prototype;
    var arrayMethods = Object.create(arrayProto);
    var methodsToPatch = [
        'push',
        'pop',
        'shift',
        'unshift',
        'splice',
        'sort',
        'reverse'
    ];

    methodsToPatch.forEach(method => {
        var original = arrayProto[method];
        arrayMethods[method] = function () {
            update(Array.from(arguments));
            original.apply(this, arguments);
        }
    });

    /**
     * @description 内置组件、指令、过滤器
     * @type {string[]}
     */
    var ASSET_TYPES = [
        'component',
        'directive',
        'filter'
    ];

    /**
     * @description 生命周期钩子
     * @type {string[]}
     */
    var LIFECYCLE_HOOKS = [
        'beforeCreate',
        'created',
        'beforeMount',
        'mounted',
        'beforeUpdate',
        'updated',
        'beforeDestroy',
        'destroyed',
        'activated',
        'deactivated',
        'errorCaptured'
    ]

    var log = console.log;
    var warn = console.warn;
    var error = console.error;


    /**
     * Perform no operation.
     * Stubbing args to make Flow happy without leaving useless transpiled code
     * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
     */
    function noop(a, b, c) {}

    /**
     * @description Default strategy.(所有选项的默认策略)
     */
    var defaultStrat = function (parentVal, childVal) {
        return childVal === undefined
            ? parentVal
            : childVal
    }

    //
    var mergeDataOrFn = function (parentVal, childVal, vm) {
        if (!vm) {
            // 子组件
            return childVal;
        } else {
            return function mergeInstanceDataFn () {
                // 如果是函数则返回函数结果【一个纯对象】，否则返回该对象
                return typeof childVal === "function" ? childVal.call(vm, vm) : childVal;
            }
        }
    }

    var strats = config.optionMergeStrategies;

    // 自定义合并策略的选项。
    // 合并策略选项分别接收在父实例和子实例上定义的该选项的值作为第一个和第二个参数，
    // Vue 实例上下文被作为第三个参数传入。
    strats.data = function (parent, child, vm) {
        // 判断是根实例，还是一个组件
        if (!vm) {
            // 组件的data必须是一个函数
            if (child && typeof child !== 'function') {
                warn('the data should be a function')
            }
            // 处理子组件data的选项
            return mergeDataOrFn(parent, child);
        }
        // 处理根实例data的选项
        return mergeDataOrFn(parent, child, vm);
    }

    /**
     * Check whether an object has the property.
     */
    var hasOwnProperty = Object.prototype.hasOwnProperty
    function hasOwn (obj, key) {
        return hasOwnProperty.call(obj, key)
    }

    function resolveConstructorOptions (Ctor) {
        // 需要判断是不是Vue组件，
        return Ctor.options;
    }

    // 对象的判断
    function isPlainObject (obj) {
        return toString.call(obj) === '[object Object]'
    }

    function initGlobalApi (Vue) {
        var confDef = {};

        confDef.get = function () {
            return config;
        };

        confDef.set = function (option) {
            error('不要尝试修改Vue.config的值的引用！', option)
        };

        Object.defineProperty(Vue, 'config', confDef);
    }

    /**
     * @description 选项合并
     * @param parent
     * @param child
     * @param vm
     * @return {{}}
     */
    function mergeOptions (parent, child, vm) {
        // ...
        // 做选项规范的检测
        // ...
        var options = {};
        var key;
        for (key in parent) {
            mergeField(key);
        }
        for (key in child) {
            // 父选项parent没有key
            if (!hasOwn(parent, key)) {
                mergeField(key);
            }
        }

        // 自定义策略处理
        function mergeField (key) {
            var strat = strats[key] || defaultStrat;
            options[key] = strat(parent[key], child[key], vm, key);
        }

        return options;
    }

    /**
     * @description 查找元素，没有则返回一个div
     * @param el
     * @return {HTMLDivElement|Element|*}
     */
    function queryElement (el) {
        if (typeof el === 'string') {
            var selected = document.querySelector(el);
            if (selected) {
                return selected;
            } else {
                // 没有则创建一个div
                return document.createElement('div');
            }
        } else {
            return el;
        }
    }

    /**
     * @description 钩子函数出发
     * @param vm
     * @param hook
     */
    function callHook(vm, hook) {
        var handles = vm.$options[hook];
        var length = handles.length;
        for (var i = 0; i < length; i++) {
            // 绑定vm并调用
            handles[i].call(vm);
        }
    }

    function initLifeCycle (vm) {
    }

    function initEvents () {

    }

    function initRender () {

    }

    /**
     * @description
     * 变量命名合法性检测
     * 判断第一位是否等于$或者_，也就是是否以$或者_开头
     * 避免与vm内置属性和变量冲突
     * @param str
     * @return {boolean}
     */
    function isReserved (str) {
        var code = (str + '').charCodeAt(0);
        // 对应16进制
        // 0x24 === 36 == '$'
        // 0x5f === 95 == '_'
        return code === 0x24 || code === 0x5f;
    }

    function protoAugment(target, src) {
        /* eslint-disable no-proto */
        target.__proto__ = src;
        /* eslint-enable no-proto */
    }

    /**
     * Observer class that is attached to each observed
     * object. Once attached, the observer converts the target
     * object's property keys into getter/setters that
     * collect dependencies and dispatch updates.
     */
    var Observer = function Observer(value) {
        this.value = value;
        // this.dep = new Dep();
        // this.vmCount = 0;
        if (Array.isArray(value)) {
            protoAugment(value, arrayMethods);
            this.observeArray(value);
        } else {
            this.walk(value);
        }
    };

    // 监听数组
    Observer.prototype.observeArray = function observeArray(items) {
        for (var i = 0, l = items.length; i < l; i++) {
            observe(items[i]);
        }
    }

    /**
     * Walk through all properties and convert them into
     * getter/setters. This method should only be called when
     * value type is Object.
     */
    Observer.prototype.walk = function walk(obj) {
        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
            defineReactive$$1(obj, keys[i]);
        }
    };

    /**
     * Define a reactive property on an Object.
     */
    function defineReactive$$1(
        obj,
        key,
        val,
        customSetter,
        shallow
    ) {
        if (!val) {
            val = obj[key];
        }

        !shallow && observe(val);

        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                // dep.depend();
                // log('依赖收集---', val);
                return val;
            },
            set: function (newVal) {
                log('触发更新---', newVal);
                if (newVal === val) {
                    return
                }
                val = newVal;
                observe(newVal);
                update(obj);
                // dep.notify();
            }
        });
    }

    /**
     * Quick object check - this is primarily used to tell
     * Objects from primitive values when we know the value
     * is a JSON-compliant type.
     */
    function isObject(obj) {
        return obj !== null && typeof obj === 'object'
    }


    // 响应式
    function observe (value, asRootData) {
        // 只处理对象
        if (!isObject(value)) {
            return
        }
        new Observer(value);
    }

    var sharedPropertyDefinition = {
        enumerable: true, // 可枚举
        configurable: true, // 可配置
        get: noop,
        set: noop
    }

    /**
     * @description 代理
     * @param target === vm
     * @param sourceKey === _data
     * @param key 属性名称
     */
    function proxy (target, sourceKey, key) {
        sharedPropertyDefinition.get = function proxyGetter () {
            return this[sourceKey][key];
        }
        sharedPropertyDefinition.set = function proxySetter(value) {
            this[sourceKey][key] = value;
        }
        Object.defineProperty(target, key, sharedPropertyDefinition);
    }

    // 重新定义数据的原型
    function getData(data, vm) {
        // #7573 disable dep collection when invoking data getters
        try {
            return data.call(vm, vm)
        } catch (e) {
            return {}
        } finally {
        }
    }

    // 初始化data
    function initData (vm) {
        // 校验数据对象data是不是一个纯对象。
        var data = vm.$options.data;
        data = vm._data = vm.$data = typeof data === 'function' ?
            getData(data, vm) :
            data || {};
        if (!isPlainObject(data)) {
            data = {};
            warn(
                'data function should return an object\n',
                vm
            )
        }
        /**** 校验data中的数据是否已经声明与props ******/
        var keys = Object.keys(data);
        var props = vm.$options.props;
        var methods = vm.$options.methods;
        var index = keys.length;
        while (index--) {
            /**** 校验data中的数据是否已经声明与props ******/
            var key = keys[index];
            if (methods && hasOwn(methods, key)) {
                // 该方法已存在
                error('methods ' + key + ' has already been defined as a data property', vm);
            }
            if (props && hasOwn(props, key)) {
                // 该属性已存在
                error('The data property ' + key + ' is already declared as a props', vm);
            } else if (!isReserved(key)) {
                // 变量命名合法性检测，避免与vm内置属性和变量冲突

                // 开启响应式之路
                /**
                 * 1、数据观测
                 * 2、依赖收集
                 * 3、触发更新
                 * 4、优化
                 */
                proxy(vm, '_data', key);
            }
        }
        // observe data
        observe(data, true /* asRootData */ );
    }

    // 初始化data
    function initState (vm) {
        var $options = vm.$options;
        if ($options.data) {
            initData(vm);
        }
    }

    function initMixin (Vue) {
        // 实例初始化
        Vue.prototype._init = function (options) {
            var vm = this;

            // 选项合并
            vm.$options = mergeOptions(
                Vue.options,
                options || {},
                vm
            );

            // 初始化生命周期
            initLifeCycle(vm);

            // 初始化事件中心
            initEvents(vm);

            // 初始化渲染
            initRender(vm);

            // 触发 beforeCreate 钩子函数
            callHook(vm, 'beforeCreate');

            // 初始化data、props、computed、watcher
            initState(vm);

            // 触发 created 钩子函数
            callHook(vm, 'created');

            if (vm.$options.el) {
                // 如果有el属性，挂载vm，将模板渲染成最终的Dom
                vm.$mount(vm.$options.el);
            }
        }
    }

    function stateMixin (Vue) {

    }

    function eventsMixin (Vue) {

    }

    function lifeCycleMixin (Vue) {

    }

    function renderMixin (Vue) {

    }

    // Vue 构造函数
    function Vue (options) {
        if (!(this instanceof Vue)) {
            warn('Vue is a constructor and should be called with the `new` keyword\'');
        }
        this._init(options);
    }

    /**
     * @description 最终返回的都是一个数组，所以说 生命周期生命多个，依次去执行
     * @param parentVal
     * @param childVal
     * @return {*|*[]}
     */
    function mergeHook (parentVal, childVal) {
        return childVal ?
            parentVal ?
                parentVal.concat(childVal) :
                Array.isArray(childVal) ?
                    childVal :
                    [childVal] :
            parentVal;
    }

    // 生命周期策略处理
    LIFECYCLE_HOOKS.forEach(function (hook) {
        strats[hook] = mergeHook;
    });

    // 扩展options，空对象的引用
    Vue.options = Object.create(null);

    // 扩展options属性
    ASSET_TYPES.forEach(function (type) {
        Vue.options[type + 's'] = Object.create(null);
        // Vue.options.components ...
        // Vue.options.directives ...
        // Vue.options.filters ...
    });

    initGlobalApi(Vue);
    initMixin(Vue);
    stateMixin(Vue);
    eventsMixin(Vue);
    lifeCycleMixin(Vue);
    renderMixin(Vue);

    function query (el) {
        if (typeof el === 'string') {
            var selected = document.querySelector(el);
            if (!selected) {
                warn(
                    'Cannot find element: ' + el
                );
                return document.createElement('div')
            }
            return selected
        } else {
            return el
        }
    }

    function mountComponent (vm, el, hydrating) {

    }

    // runtime 运行时阶段
    Vue.prototype.$mount = function (el, hydrating) {
        el = el && inBrowser ? query(el) : undefined;
        return mountComponent(this, el, hydrating);
    };

    var $mount = Vue.prototype.$mount;

    function update (data) {
        console.log('update', data)
        const app = document.getElementById('app');
        app.innerHTML = `obj.text = ${JSON.stringify(data)}`
    }

    // 完整版本，runtime + compile
    Vue.prototype.$mount = function (el, hydrating) {
        el = el && query(el);

        // el不能挂载到 body，或者html上面
        if (el === document.body || el === document.documentElement) {
            warn(
                "Do not mount Vue to <html> or <body> - mount to normal elements instead."
            );
            return this
        }

        var options = this.$options;

        if (!options.render) {
            var template = options.template;
            if (template) {
                template = template.innerHTML;
            } else if (el) {
                template = getOuterHTML(el);
            }
            callHook(this, 'mounted');
            update(this.$data);
        }
        // 执行 $mount 并修改 this
        return $mount.call(this, el, hydrating);
    };

    /**
     * Get outerHTML of elements, taking care
     * of SVG elements in IE as well.
     */
    function getOuterHTML(el) {
        if (el.outerHTML) {
            // 包含DOM元素自身的节点内容
            return el.outerHTML
        } else {
            // IE 9 - 11 及SVG元素的兼容性处理；
            var container = document.createElement('div');
            container.appendChild(el.cloneNode(true));
            return container.innerHTML
        }
    }

    return Vue;
});
