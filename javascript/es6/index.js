// import './class1';
// import { async } from './async';

// async函数返回的是 Promise 对象，可以作为await命令的参数
const asyncF1 = async function () {
    // 这里需要加return，将异步执行结果进行返回
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('resolve 1');
            resolve('async 1');
        }, 1000);
    })
};

const asyncF2 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('resolve 2');
            resolve('async 2');
        }, 1000);
    })
};

const request = async function () {
    try {
        // 写法二
        // let fooPromise = asyncF1();
        // let barPromise = asyncF2();
        // let res1 = await fooPromise;
        // let res2 = await barPromise;
        // // let res1 = await asyncF1();
        // // let res2 = await asyncF2();
        // console.log(res1);
        // console.log(res2);
        //
        let [foo, bar] = await Promise.all([asyncF1(), asyncF2()]);
        console.log(foo, bar);

        // 并发
        [asyncF1,asyncF2].forEach(async item => {
            let res1 = await item();
            console.log(res1);
        });

        // 继发
        // for (let i = 0;i < 3; i++) {
        //     console.log(i);
        //     let res1 = await asyncF1();
        //     console.log(res1);
        // }

    } catch (e) {
        console.log(e);
    }
};

request();
