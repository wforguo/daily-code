/**
 * @Author: forguo
 * @Date: 2022/3/28 11:13
 * @Description: bind-demo.js
 */

// 模拟bind的实现
Function.prototype.bind1 = function () {

    // 将参数拆解为数组
    const args = Array.prototype.slice.call(arguments);

    // 获取this，并从数组剔除
    const _this = args.shift();

    // 原来的fn，fn.bind(...)的fn1，谁执行就是谁
    const self = this;

    // 返回一个函数
    return function () {
        return self.apply(_this, args);
    }
};

/**
 * 模拟apply的实现
 * 立即执行，第一个参数为目标引用，第二个参数为所有参数
 * @return {function(): any}
 */
Function.prototype.apply1 = function () {

    // 将参数拆解为数组
    const args = Array.prototype.slice.call(arguments);

    // 获取this，并从数组剔除
    const _this = args.shift();

    // 原来的fn，fn.bind(...)的fn1，谁执行就是谁
    const self = this;
    console.log(...args[0]);

    // 返回一个函数
    return self.call(_this, ...args[0]);
};

/**
 * 模拟call的实现
 * 立即执行，第一个参数为目标引用，后面以此均为参数
 * @return {function(): any}
 */
Function.prototype.call1 = function () {

    // 将参数拆解为数组
    const args = Array.prototype.slice.call(arguments);

    // 获取this，并从数组剔除
    const _this = args.shift();

    // 原来的fn，fn.bind(...)的fn1，谁执行就是谁
    const self = this;
    console.log(args);

    // 返回一个函数
    return self.apply(_this, args);
};


function fn () {
    console.log(this);
    console.log([...arguments]);
    return 'this is a fn';
}

let fn1 = fn.bind1({
    name: 'bind1',
}, 10, 20);

fn1();

fn.apply1({
    name: 'apply1',
}, [1,2,3])

fn.call1({
    name: 'apply1',
}, 1, 2, 3)
