/**
 * @Author: forguo
 * @Date: 2021/10/25 10:11
 * @Description: typescript 学习
 */

// 1.全局安装 typescript
// npm install typescript -g
// yarn global add typescript

// * typescript的静态类型

// ** 基础静态类型
// null,undefined,symbol,boolean，void
const count: number = 1;
let www: string = 'www';

// ** 自定义静态类型
interface People1 {
    name: string,
    age: number
}

const weiGuo: People1 = {
    name: 'weiGuo',
    age: 25,
    // sex: 'man',
}

// ** 对象类型

// 对象
const my: {
    name: string,
    age: number
} = {
    name: 'weiGuo',
    age: 25,
    // sex: 'man',
}

// 数组
const list: number[] = [1, 2, 3];

// 类类型
class Person {
}

const person: Person = new Person();

// 函数类型
const fn: () => string = () => 'fn1';

// * 类型注释和类型推断

// ** 类型注释
let count2: number = 123;

// ** 类型推断
let count3 = 123;

// ===> 工作使用问题（潜规则）
// 如果 TS 能够自动分析变量类型， 我们就什么也不需要做了
// 如果 TS 无法分析变量类型的话， 我们就需要使用类型注解

// * 函数参数和返回类型定义

// ** 简单类型定义

function getTotal(one: number, two: number): number {
    return one + two;
}

getTotal(1, 2);

// ** 无返回值的定义: void
function hello(): void {
    console.log('hello');
}

hello();

// ** never返回值类型
// 抛出异常
function errFun(): never {
    throw new Error();
    console.log('error');
}

// 死循环
function whileFun(): never {
    while (true) {
    }
    console.log('error');
}

// ** 函数参数为对象

function add({one, two}: { one: number, two: number }) {
    return one + two;
}

const total = add({one: 1, two: 2});

// * 数组类型的定义

// ** 基本类型
const numArr: number[] = [1, 2, 3]
const strArr: string[] = ['1', '2', '3']
const undefArr: undefined[] = [undefined, undefined, undefined]
const multiArr: (number | string) [] = ['1', 1]; // 多个类型

// ** 对象类型的定义
// 类型别名(type alias)
type Info = {
    name: string,
    age: number
};

let infoList: Info[] = [
    {
        name: 'forguo',
        age: 25,
    }
];

// 类进行定义
class InfoClass {
    name: string;
    age: number;
}

let infoList2: InfoClass[] = [
    {
        name: 'forguo',
        age: 25,
    }
];

// * 元组的使用和类型约束

// ** 基本应用

// 简单类型注解
const xiaojiejie: (string | number)[] = [0, "teacher", 28];

// 数组中的每个元素类型的位置给固定住了，这就叫做元组
const xiaojiejie1: [string, number] = ["teacher", 28];

// ** 使用

const xiaojiejies: [string, string, number][] = [
    ["dajiao", "teacher", 28],
    ["liuying", "teacher", 18],
    ["cuihua", "teacher", 25],
];

/**
 * @title typescript中的interface接口
 * @desc 用来规范类型的
 */

// ** 初步了解
interface Girl {
    name: string;
    age: number;
}

const girl: Girl = {
    name: 'xiaohua',
    age: 18
}

// ** 类型别名和接口的区别
// 类型别名可以直接给类型，比如string，而接口必须代表对象。

type Name = string;
const people1: Name = 'name';


// ** 可选值
interface Girl1 {
    name: string;
    age?: number;
    address?: string;
}

const girl1: Girl1 = {
    name: 'nicai',
    // age: 18,
    // address: '浙江杭州'
}

// ** 任意值

interface Girl3 {
    name: string;
    [propname: string]: any; // 这个的意思是，属性的名字是字符串类型，属性的值可以是任何类型。
    say(): string;
}

const girl3: Girl3 = {
    name: 'name',
    sex: 1,
    say () {
        return "欢迎光临 ，红浪漫洗浴！！";
    },
}

// ** 接口和类的约束

