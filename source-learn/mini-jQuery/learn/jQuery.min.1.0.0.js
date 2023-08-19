/**
 * @author: forguo
 * @time: 2021/6/17 22:24
 * @description: jQuery.1.0.0.js
 */

(function (root) {
    var version = '1.0.0',
        rootjQuery,
        rejectExp = /^<(\w+)\s*\/?>$/;

    var jQuery = function (selector, context) {
        return new jQuery.prototype.init(selector, context);
    }
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        length: 0,
        selector: "",
        // 共享原型
        init: function (selector, context) {
            context = context || document;
            var match, i = 0;
            // 与jQuery共享一个原型对象
            if (!selector) {
                return this;
            }
            if (typeof selector === 'string') {
                var selectorLength = selector.length;
                // 创建dom
                if (selector[0] === '<' && selector[selectorLength - 1] === '>' && selectorLength >= 3) {
                    match = [selector];
                }
                if (match) {
                    jQuery.merge(this, jQuery.parseHTML(selector, context));
                } else {
                    // 返回的是一个nodeList
                    var $select = document.querySelectorAll(selector);
                    // 将类数组，转换成一个数组
                    var elements = Array.prototype.slice.call($select);
                    this.length = elements.length;
                    for (; i < elements.length; i++) {
                        this[i] = elements[i];
                    }
                    this.selector = selector;
                    this.context = context;
                }
            } else if (selector.nodeType) {
                this[0] = selector;
                this.length = 1;
                return this;
            } else if (jQuery.isFunction(selector)) {
                return rootjQuery.ready();
            }
        },
    }

    /**
     * @description 实现对于jQuery或者jQuery实例的扩展，或者对于任意对象的扩展
     * @params 第一个参数为{},并且只有一个参数则为jQuery或者jQuery实例的扩展
     *         第一参数为Boolean，并且为true，则为深拷贝，
     * @type {function(): any}
     */
    jQuery.extend = jQuery.fn.extend = function () {
        var target = arguments[0] || {};
        var isDeep; // 是否是一个深拷贝
        var i = 1; // 因为对象扩展的时候第一个参数是不需要动的，所以从1开始
        var length = arguments.length;

        // 如果是第一个参数是Boolean，为true是深拷贝
        if (typeof target === 'boolean') {
            isDeep = target;
            target = arguments[1];
            i = 2;
        }

        // 第一个参数必须为Object
        if (typeof target !== 'object') {
            target = {};
        }

        // 判断当前参数的个数
        if (i === length) {
            // 只有1个参数用于对jQuery或jQuery实例扩展静态属性及方法，
            // 1个参数以上用于给任意对象的扩展
            target = this;

            // 从0开始，用于扩展每个属性和方法
            i--;
        }

        for (; i < length; i++) {
            var options, name, copy, src, clone, copyIsArray;
            if ((options = arguments[i]) !== null) {
                for (name in options) {
                    copy = options[name];
                    src = target[name];
                    // 如果是深拷贝，并且为数组或者对象
                    if (isDeep && (jQuery.isObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];
                        } else {
                            clone = src && jQuery.isObject(src) ? src : {};
                        }
                        target[name] = jQuery.extend(isDeep, clone, copy);
                    } else {
                        target[name] = copy; // 浅拷贝
                    }
                }
            }
        }
        return target;
    };

    // init共享jQuery原型对象，
    jQuery.fn.init.prototype = jQuery.fn;

    // Initialize central reference
    rootjQuery = jQuery( document );

    // 扩展常用的静态方法
    jQuery.extend({
        isObject: function (data) {
            // 检测Object
            return toString.call(data) === '[object Object]';
        },
        isArray: function (data) {
            // 检测Array
            return toString.call(data) === '[object Array]';
        },
        isFunction: function (data) {
            // 检测Function
            return toString.call(data) === '[object Function]';
        },
        merge: function (first, second) {
            // 用于合并一个数组
            var i = first.length,
                j = second.length,
                l = 0;

            if (typeof i === 'number') {
                for (; l < j; l++) {
                    first[i++] = second[l];
                }
            } else {
                while (second[l] !== undefined) {
                    first[i++] = second[l++];
                }
            }

            first.length = i;
            return first;
        },
        parseHTML: function (selector, context) {
            // 创建dom
            if (!selector || typeof selector !== 'string') {
                return null;
            }
            // 返回标签名
            var parse = rejectExp.exec(selector);
            return [context.createElement(parse[1])];
        },
        /**
         * 用于管理函数队列
         * @param options
         * @return {{add: function(): void, fire: function(): void, fireWidth: function(*, *): void}}
         * @constructor
         */
        Callbacks: function (options = {}) {
            if (typeof options === 'string') {
                options = createOptions(options);
            } else if (toString.call(options) === '[object Object]') {
                options = jQuery.extend({}, options);
            }
            var list = [],
                length,
                testing,
                memory,
                index,
                start,
                startIndex;

            var fire = function (data) {
                index = startIndex || 0;
                start = 0;
                memory = options.memory && data;
                length = list.length;
                testing = true;
                for (; index < length; index++) {
                    if (!list[index].apply(data[0], data[1]) && options.stopOnFalse) {
                        // stopOnFalse中断后面的请求
                        break;
                    }
                }
            };

            var self = {
                /**
                 * 通过 add 添加处理函数到队列中
                 */
                add: function () {
                    var argus = Array.prototype.slice.call(arguments);
                    start = list.length;
                    argus.forEach(function (fn) {
                        jQuery.isFunction(fn) && list.push(fn)
                    });
                    // 如果有缓存，添加了就开始执行
                    if (memory) {
                        startIndex = start;
                        fire(memory);
                    }
                },
                /**
                 * @desc 绑定上下文对象，并传参
                 * @param content
                 * @param arguments
                 */
                fireWidth: function (content, arguments) {
                    // 若果不是once，并且当前队列并未执行过，则执行一次，
                    if (!options.once || !testing) {
                        fire([content, arguments]);
                    }
                },
                /**
                 * 通过 fire 执行这些处理函数
                 */
                fire: function () {
                    this.fireWidth(this, arguments);
                }
            }
            return self;
        }
    })

    function createOptions (options) {
        var object = {};
        // 切割成数组
        // /\s+/ 匹配一个或多个空白字符
        options.split(/\s+/).forEach(name => {
            object[name] = true;
        });
        return object;
    }

    jQuery.fn.extend({
        on: function (types, selector, data, fn) {
            var type;
            if (typeof types === 'object') {
                for (type in types) {
                    this.on(type, selector, data, types[type])
                }
                return this;
            }
            var $element = document.querySelectorAll(selector);
            console.log($element);
        },
        css: function () {

        }
    })

    jQuery.event = {
        add: function () {

        },
        trigger: function () {

        },
        dispatch: function () {

        }
    }

    root.$ = root.jQuery = jQuery;

})(window);
