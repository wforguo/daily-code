/**
 * @Author: forguo
 * @Date: 2022/4/11 09:46
 * @Description: eventloop.js
 */
//
// console.log(1)
// setTimeout(function () {
//     console.log(2)
// })
//
// new Promise(resolve => {
//     console.log(3)
//     resolve(3)
// }).then(() => {
//     console.log(4)
// })
//
// console.log(5)

// 1,3,5,4,2

// for (var i = 0; i < 4; i++) {
//     setTimeout(function () {
//         console.log(i) // 4
//     }, 0)
//     console.log(i)
// }
//
// console.log(i) // 4

console.log(1)

setImmediate(() => {
    console.log('setImmediate')
})

setTimeout(() => {
    console.log('setTimeout')
}, 0)

process.nextTick(() => {
    console.log('next')
})

new Promise(resolve => {
    console.log(4)
    resolve()
}).then(() => {
    console.log(5)
})

// 1, 4, next, 5, setTimeout, setImmediate
// console.log(0);
// setTimeout(function () {
//     console.log(1);
//     new Promise(resolve => {
//         console.log(2);
//         resolve();
//     }).then(res => {
//         console.log(3);
//     })
// }, 0)
//
// new Promise(resolve => {
//     console.log(4);
//     resolve();
// }).then(res => {
//     console.log(5);
// })
//
// console.log(6);
// // 0 4 6  5  1 2 3
//
// async function async1() {
//     console.log('async1 start');
//     await async2();
//     console.log('async1 end');
// }
// async function async2() {
//     console.log('async2');
// }
// async1();
// new Promise(function(resolve) {
//     console.log('promise1');
//     resolve();
//     console.log('promise11');
// }).then(function() {
//     console.log('promise2');
// });
// console.log('script end');

/**
 * async1 start
 * async2
 * promise1
 * promise11
 * script end
 * async1 end
 * promise2
 */
