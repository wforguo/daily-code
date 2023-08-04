export default () => {
    /**
     * @Author: forguo
     * @Date: 2021/10/25 10:11
     * @Description: typescript 学习
     */

    // 1.全局安装 typescript
    // npm install typescript -g
    // yarn global add typescript

    /**
     * @title typescript的静态类型
     */

    // ** 基础静态类型
    // number,string,null,undefined,symbol,boolean，void
    const count: number = 1
    const www: string = 'www'

    // ** 自定义静态类型
    interface People1 {
        name: string
        age: number
    }

    const weiGuo: People1 = {
        name: 'weiGuo',
        age: 25
        // sex: 'man',
    }

    // ** 对象类型

    // 对象
    const my: {
        name: string
        age: number
    } = {
        name: 'weiGuo',
        age: 25
        // sex: 'man',
    }

    // 数组
    const list: number[] = [1, 2, 3]
    const list1: Array<number> = [1, 2, 3]
    const list2: {
        [index: number]: number
    } = [1, 2, 3]

    // 函数类型
    const fn: () => string = () => 'fn1'

    /**
     * @title 类型注释和类型推断
     */

    // ** 类型注释
    const count2: number = 123

    // ** 类型推断
    const count3 = 123

    // ===> 工作使用问题（潜规则）
    // 如果 TS 能够自动分析变量类型， 我们就什么也不需要做了
    // 如果 TS 无法分析变量类型的话， 我们就需要使用类型注解

    /**
     * @title 函数参数和返回类型定义
     */

    // ** 简单类型定义

    function getTotal(one: number, two: number): number {
        return one + two
    }

    getTotal(1, 2)

    // ** 无返回值的定义: void
    function hello(): void {
        console.log('hello')
    }

    hello()

    // ** never返回值类型
    // 抛出异常
    function errFun(): never {
        throw new Error()
        console.log('error')
    }

    // 死循环
    function whileFun(): never {
        while (true) {}
        console.log('error')
    }

    // ** 函数参数为对象

    function add({ one, two }: { one: number; two: number }) {
        return one + two
    }

    const total = add({ one: 1, two: 2 })

    /**
     * @title 数组类型的定义
     */

    // ** 基本类型
    const numArr: number[] = [1, 2, 3]
    const strArr: string[] = ['1', '2', '3']
    const undefArr: undefined[] = [undefined, undefined, undefined]
    const multiArr: (number | string)[] = ['1', 1] // 多个类型

    // ** 对象类型的定义
    // 类型别名(type alias)
    type Info = {
        name: string
        age: number
    }

    const infoList: Info[] = [
        {
            name: 'forguo',
            age: 25
        }
    ]

    // 类进行定义
    class InfoClass {
        name: string | undefined
        age: number | undefined
    }

    const infoList2: InfoClass[] = [
        {
            name: 'forguo',
            age: 25
        }
    ]

    /**
     * @title 元组的使用和类型约束
     */

    // ** 基本应用

    // 简单类型注解
    const xiaojiejie: (string | number)[] = [0, 'teacher', 28]

    // 数组中的每个元素类型的位置给固定住了，这就叫做元组
    const xiaojiejie1: [string, number] = ['teacher', 28]

    // ** 使用

    const xiaojiejies: [string, string, number][] = [
        ['dajiao', 'teacher', 28],
        ['liuying', 'teacher', 18],
        ['cuihua', 'teacher', 25]
    ]

    /**
     * @title typescript中的interface接口
     * @desc 用来规范类型的
     */

    // ** 初步了解
    interface Girl {
        name: string
        age: number
    }

    const girl: Girl = {
        name: 'xiaohua',
        age: 18
    }

    // ** 类型别名和接口的区别
    // 类型别名可以直接给类型，比如string，而接口必须代表对象。

    type Name = string
    const people1: Name = 'name'

    // ** 可选值
    interface Girl1 {
        name: string
        age?: number
        address?: string
    }

    const girl1: Girl1 = {
        name: 'nicai'
        // age: 18,
        // address: '浙江杭州'
    }

    // ** 任意值

    interface Girl3 {
        name: string
        [propName: string]: any // 这个的意思是，属性的名字是字符串类型，属性的值可以是任何类型。
        say(): string
    }

    const girl3: Girl3 = {
        name: 'name',
        sex: 1,
        say() {
            return '欢迎光临 ，红浪漫洗浴！！'
        }
    }

    // ** 接口和类的约束

    class girlC implements Girl3 {
        name = ''
        sex = ''
        say() {
            return this.name
        }
    }

    // ** 接口间的继承

    interface Teacher extends Girl {
        teach(): string
    }

    /* 接口只是在 TypeScript 里帮我们作语法校验的工具，编译成正式的js代码，就不会有任何用处了。 */

    /**
     * @title typescript中类的概念和使用
     */

    /**
     * @title typescript中类的访问类型
     */

    // ** public 默认 允许在类的内部和外部被调用

    // ** private 只允许在类的内部被调用，外部不允许调用

    // ** protected 允许在类内及继承的子类中使用

    /**
     * @title typescript中类的构造函数
     */

    class Person111 {
        public name: string
        constructor(name: string) {
            this.name = name
        }
    }

    const person111 = new Person111('www')
    console.log(person111.name)

    // 简写
    class Person222 {
        constructor(public name: string) {}
    }
    const person222 = new Person222('http')
    console.log(person222.name)

    // 类继承中的构造器写法

    class PersonA {
        constructor(public name: string) {
            // 这里就不用再去 this.name = name;
        }
    }

    class Teacher extends PersonA {
        constructor(name: string, public age: number) {
            super(name)
        }
    }

    console.log(new Teacher('罗翔', 18))

    /**
     * @title typescript中类的Getter、Setter和static的使用
     */

    class XiaoJieJie {
        public readonly _name: string
        constructor(name: string, private _age: number) {
            this._name = name
        }
        // ** get
        get age() {
            return this._age
        }
        // ** set
        set age(age: number) {
            this._age = age
        }
        say() {
            return 'I am ' + this._age + 'years old' // XiaoJieJie.prototype.say = function
        }
        // ** 不用 new 出对象就可以使用类里的方法
        static sayLove() {
            return 'I Love you' // XiaoJieJie.sayLove = function
        }
    }
    const www1 = new XiaoJieJie('www', 18)
    www1.age = 20
    // www1._name = 'www'; // 不可以修改
    console.log(www1.age)
    // XiaoJieJie.sayLove();

    /**
     * @title 抽象类的使用
     */

    abstract class DaBaoJian {
        abstract skill(): any // 没有具体方法，这里不写括号
    }

    class PrimaryWaiter extends DaBaoJian {
        skill() {
            console.log('初级大保健')
        }
    }

    class IntermediateWaiter extends DaBaoJian {
        skill() {
            console.log('中级大保健')
        }
    }

    class SeniorWaiter extends DaBaoJian {
        skill() {
            console.log('终极大保健')
        }
    }

    /**
     * @title tsconfig.json
     */

    // typescript 的编译配置文件

    // tsc init // 初始化tsconfig文件

    // tsc // tsconfig编译

    // ** 编译选项详解

    // https://www.tslang.cn/docs/handbook/compiler-options.html

    /**
     * @title 联合类型和类型守护
     */

    // ** 联合类型 两个以上的参数类型
    // ** 类型守护 对参数类型进行判断

    /**
     * @title 枚举的使用
     */

    enum Status {
        success = 200,
        error = 201,
        auth = 401
    }

    console.log(Status.error)
    console.log(Status[200])

    /**
     * @title 函数泛型
     */

    // 类型断言，此时不知道返回类型是什么，需要指定一个类型来处理
    let res: number | string

    res = 1
    res = '2'

    function get(data: number | string): number | string {
        return data
    }

    ;(get(res) as string).length
}
