/**
 * @Author: forguo
 * @Date: 2022/4/20 10:45
 * @Description: query.js
 */

/**
 * 实现一个 query 方法，实现对数据的链式查询和处理
 * @param data
 * @return {*}
 */

function query(data) {
    this.data = data;
    console.log(this.data);
    return new query.prototype.init(data);
}

query.prototype = {
    init: function () {
    },
    where: function () {
    },
    orderBy: function (key, desc) {

    },
    execute: function () {

    }
}
query.prototype.init.prototype = query.prototype;

const data = [
    { name: 'foo', age: 16, city: 'shanghai' },
    { name: 'bar', age: 24, city: 'hangzhou' },
    { name: 'fiz', age: 22, city: 'shanghai' },
    { name: 'baz', age: 19, city: 'hangzhou' }
];
//
// query(data)
// .where(item => item.age > 18)
// .orderBy('age')
// .groupBy('city')
// .execute();

query(data)
.where();
