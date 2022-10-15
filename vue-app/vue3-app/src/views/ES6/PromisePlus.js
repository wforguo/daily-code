/**
 * 实现一个Promise
 */

const PromisePlus = function (exector) {
    this.pending = []
    this.value = undefined
    const resolve = value => {
        this.value = value
    }
    exector(resolve)
}

PromisePlus.prototype.then = function () {}

new PromisePlus((resolve, reject) => {
    setTimeout(() => {
        if (Date.now() > 1) {
            resolve('success')
        } else {
            reject('fail')
        }
    }, 100)
})
