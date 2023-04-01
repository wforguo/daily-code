const rawCode = () => {
    class jQuery {
        [key: string]: any
        selector: string
        length: number
        constructor(selector: string) {
            const slice = Array.prototype.slice
            const $el = slice.call(document.querySelectorAll(selector))
            const len = $el.length
            for (let i = 0; i < len; i++) {
                this[i] = $el[i]
            }
            this.selector = selector
            this.length = len
        }
        addClass() {}
    }
    const $ = function (selector: string) {
        return new jQuery(selector)
    }
    const $h = $('h2')
    console.log($h)
    const $p = $('section')
    console.log($p)
}

export default rawCode
