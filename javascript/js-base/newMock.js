/**
 * @Author: forguo
 * @Date: 2022/4/9 11:16
 * @Description: 模拟new的实现
 */

// 模拟new的实现
let newMock = function () {
    let argus = Array.prototype.slice.apply(arguments);
    let Foo = argus.shift();
    let target = Object.create(Foo.prototype);
    let foo = Foo.apply(target, argus);
    if (typeof foo === 'object') {
        // 比如构造函数返回了一个Object，工厂模式之类的
        return foo;
    } else {
        return target;
    }
}

// 构造函数
let Person = function (name) {
    this.name = `i am ${name}`;
    this.say = function () {
        console.log(this)
    }
}

// 使用
let p = newMock(Person, 'www')
console.log(p instanceof Person) // === true 说明newMock使用成功
