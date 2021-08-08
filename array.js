/**
 * @author: forguo
 * @time: 2021/5/22 12:47
 * @description: 数组常用方法
 */

/**
 * 箭头函数对于class构造出来的对象的this指向没有影响，但是对于构造函数创建出来的对象，他的this指向会发生改变
 * @param arr
 * @return {*}
 */

class Person {
    constructor() {
        this.name = 'person';
    }
    say = () => {
        console.log(this);  // 此时的this不变
    }
}
console.log(new Person().say());

function Stu () {
    this.name = 'stu';
}
Stu.prototype = {
    say: () => {
        console.log(this); // 此时的this为window
    }
}
console.log(new Stu().say());


let arrOrigin = [11, 3, 5, 6, 8, 13, 8];
/**
 * @desc 冒泡排序算法
 * @param arr
 * @return {*}
 */
const maoPao = function (arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[j + 1]) {
                let temp = arr[j + 1];
                arr[j + 1] = arr[j]
                arr[j] = temp;
            }
        }
    }
    console.log(arr);
    return arr;
};
// maoPao(arrOrigin);


/**
 * 数组的高阶函数
 * @author: forguo
 * @time: 2021/5/28 16:20
 * @description: 数组高阶函数的使用
 */

let reducerArr = arrOrigin.reduce((accumulator, currentValue, index, source) => {
    console.log(accumulator, currentValue, index);
    return accumulator + currentValue;
});

console.log('reducerArr', reducerArr);

const filterArr = [
    {
        age: 18,
        name: '张***'
    },
    {
        age: 16,
        name: '李***'
    },
    {
        age: 17,
        name: '王***'
    },
    {
        age: 21,
        name: '张***'
    },
    {
        age: 20,
        name: '孙***'
    },
]

/**
 * 数组的过滤
 */
// 1.对指定条件过滤
const resArr = filterArr.filter(function (item) {
    return item.age >= 18
})
console.log(resArr);
// 1.进行一个搜索
const resArr2 = filterArr.filter(function (item) {
    return item.name.indexOf('张') > -1
})
console.log(resArr2);

/**
 * 返回数组中第一个找到一个给定元素的下标，否则为-1
 */
console.log(arrOrigin.indexOf(8));

/**
 * 返回数组中是否能找到一个给定元素，否则为false
 */
console.log(arrOrigin.includes(8));

/**
 * 返回数组中第一个满足指定条件的选项，否则为 undefined
 */
console.log(arrOrigin.find(element => element < 11));

/**
 * 返回数组中第一个满足指定条件的下标，否则为 -1
 */
console.log(arrOrigin.findIndex(element => element < 11));

/**
 * 如果说数组中有满足条件的，则返回true，否则为false
 */
console.log(arrOrigin.some(element => element < 11));

/**
 * @author: forguo
 * @time: 2021/7/15 21:59
 * @description: 数组去重
 */
_.unique = function (arr) {
    // 1.Es6的写法
    // return Array.from(new Set(arr)) 或者 [...new Set(arr))]

    // 2.常规做法
    var res = [];
    arr.forEach(item => {
        if (res.indexOf(item) === -1) {
            res.push(item);
        }
    });
    return res;
}
