export const log = function (type = 'log') {
    return function (target: any, name: any, descriptor: any) {
        const oldValue = descriptor.value
        descriptor.value = async function () {
            console.log(`log ${type} ${name} start`)
            // eslint-disable-next-line prefer-rest-params
            await oldValue.apply(this, arguments)
            console.log(`log ${type} ${name} end`)
        }
        return descriptor
    }
}

export default async () => {
    const asyncF1 = function () {
        console.log('asyncF1', Date.now())
        // 这里需要加return，将异步执行结果进行返回
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('resolve 1')
                resolve('async 1')
            }, 1000)
        })
    }

    const asyncF2 = function () {
        console.log('asyncF2', Date.now())
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('resolve 2')
                resolve('async 2')
            }, 1000)
        })
    }

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
            const [foo, bar] = await Promise.all([asyncF1(), asyncF2()])
            console.log(foo, bar)

            // // 继发
            // for (const item of [asyncF1, asyncF2]) {
            //     const res = await item()
            //     console.log(res)
            // }
            //
            // // 继发
            // for (let i = 0; i < 3; i++) {
            //     console.log(i)
            //     const res = await asyncF1()
            //     console.log(res)
            // }
        } catch (e) {
            console.log(e)
        }
    }

    await request()

    // es6装饰器
    class Person {
        name: string
        constructor(name: string) {
            this.name = name
        }

        // "experimentalDecorators": true,
        @log('get')
        getName() {
            console.log('getName', Date.now())
        }
    }
    new Person('test').getName()
}
