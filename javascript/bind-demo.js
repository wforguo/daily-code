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

    // 原来的fn
    const self = this;

    // 返回一个函数
    return function () {
        return self.apply(_this, args);
    }
};

function fn () {
    console.log(this);
    console.log(arguments);
    return 'this is a fn';
}

let fn1 = fn.bind1({
    name: 'fn',
}, 10, 20);

fn();
fn1(99);

