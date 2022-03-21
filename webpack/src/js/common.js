/**
 * @Author: forguo
 * @Date: 2021/10/25 10:11
 * @Description: typescript 学习
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 1.全局安装 typescript
// npm install typescript -g
// yarn global add typescript
/**
 * @title typescript的静态类型
 */
// ** 基础静态类型
// null,undefined,symbol,boolean，void
var count = 1;
var www = 'www';
var weiGuo = {
    name: 'weiGuo',
    age: 25
};
// ** 对象类型
// 对象
var my = {
    name: 'weiGuo',
    age: 25
};
// 数组
var list = [1, 2, 3];
// 类类型
var Person = /** @class */ (function () {
    function Person() {
    }
    return Person;
}());
var person = new Person();
// 函数类型
var fn = function () { return 'fn1'; };
/**
 * @title 类型注释和类型推断
 */
// ** 类型注释
var count2 = 123;
// ** 类型推断
var count3 = 123;
// ===> 工作使用问题（潜规则）
// 如果 TS 能够自动分析变量类型， 我们就什么也不需要做了
// 如果 TS 无法分析变量类型的话， 我们就需要使用类型注解
/**
 * @title 函数参数和返回类型定义
 */
// ** 简单类型定义
function getTotal(one, two) {
    return one + two;
}
getTotal(1, 2);
// ** 无返回值的定义: void
function hello() {
    console.log('hello');
}
hello();
// ** never返回值类型
// 抛出异常
function errFun() {
    throw new Error();
    console.log('error');
}
// 死循环
function whileFun() {
    while (true) {
    }
    console.log('error');
}
// ** 函数参数为对象
function add(_a) {
    var one = _a.one, two = _a.two;
    return one + two;
}
var total = add({ one: 1, two: 2 });
/**
 * @title 数组类型的定义
 */
// ** 基本类型
var numArr = [1, 2, 3];
var strArr = ['1', '2', '3'];
var undefArr = [undefined, undefined, undefined];
var multiArr = ['1', 1]; // 多个类型
var infoList = [
    {
        name: 'forguo',
        age: 25
    }
];
// 类进行定义
var InfoClass = /** @class */ (function () {
    function InfoClass() {
    }
    return InfoClass;
}());
var infoList2 = [
    {
        name: 'forguo',
        age: 25
    }
];
/**
 * @title 元组的使用和类型约束
 */
// ** 基本应用
// 简单类型注解
var xiaojiejie = [0, "teacher", 28];
// 数组中的每个元素类型的位置给固定住了，这就叫做元组
var xiaojiejie1 = ["teacher", 28];
// ** 使用
var xiaojiejies = [
    ["dajiao", "teacher", 28],
    ["liuying", "teacher", 18],
    ["cuihua", "teacher", 25],
];
var girl = {
    name: 'xiaohua',
    age: 18
};
var people1 = 'name';
var girl1 = {
    name: 'nicai'
};
var girl3 = {
    name: 'name',
    sex: 1,
    say: function () {
        return "欢迎光临 ，红浪漫洗浴！！";
    }
};
// ** 接口和类的约束
var girlC = /** @class */ (function () {
    function girlC() {
        this.name = '';
        this.sex = '';
    }
    girlC.prototype.say = function () {
        return this.name;
    };
    return girlC;
}());
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
var Person111 = /** @class */ (function () {
    function Person111(name) {
        this.name = name;
    }
    return Person111;
}());
var person111 = new Person111('www');
console.log(person111.name);
// 简写
var Person222 = /** @class */ (function () {
    function Person222(name) {
        this.name = name;
    }
    return Person222;
}());
var person222 = new Person222('http');
console.log(person222.name);
// 类继承中的构造器写法
var PersonA = /** @class */ (function () {
    function PersonA(name) {
        this.name = name;
        // 这里就不用再去 this.name = name;
    }
    return PersonA;
}());
var Teacher = /** @class */ (function (_super) {
    __extends(Teacher, _super);
    function Teacher(name, age) {
        var _this = _super.call(this, name) || this;
        _this.age = age;
        return _this;
    }
    return Teacher;
}(PersonA));
console.log(new Teacher('罗翔', 18));
/**
 * @title typescript中类的Getter、Setter和static的使用
 */
var XiaoJieJie = /** @class */ (function () {
    function XiaoJieJie(name, _age) {
        this._age = _age;
        this._name = name;
    }
    Object.defineProperty(XiaoJieJie.prototype, "age", {
        // ** get
        get: function () {
            return this._age;
        },
        // ** set
        set: function (age) {
            this._age = age;
        },
        enumerable: false,
        configurable: true
    });
    XiaoJieJie.prototype.say = function () {
        return 'I am ' + this._age + 'years old'; // XiaoJieJie.prototype.say = function
    };
    // ** 不用 new 出对象就可以使用类里的方法
    XiaoJieJie.sayLove = function () {
        return "I Love you"; // XiaoJieJie.sayLove = function
    };
    return XiaoJieJie;
}());
var www1 = new XiaoJieJie('www', 18);
www1.age = 20;
// www1._name = 'www'; // 不可以修改
console.log(www1.age);
// XiaoJieJie.sayLove();
/**
 * @title 抽象类的使用
 */
var DaBaoJian = /** @class */ (function () {
    function DaBaoJian() {
    }
    return DaBaoJian;
}());
var PrimaryWaiter = /** @class */ (function (_super) {
    __extends(PrimaryWaiter, _super);
    function PrimaryWaiter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrimaryWaiter.prototype.skill = function () {
        console.log('初级大保健');
    };
    return PrimaryWaiter;
}(DaBaoJian));
var IntermediateWaiter = /** @class */ (function (_super) {
    __extends(IntermediateWaiter, _super);
    function IntermediateWaiter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IntermediateWaiter.prototype.skill = function () {
        console.log('中级大保健');
    };
    return IntermediateWaiter;
}(DaBaoJian));
var SeniorWaiter = /** @class */ (function (_super) {
    __extends(SeniorWaiter, _super);
    function SeniorWaiter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeniorWaiter.prototype.skill = function () {
        console.log('终极大保健');
    };
    return SeniorWaiter;
}(DaBaoJian));
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
var Status;
(function (Status) {
    Status[Status["success"] = 200] = "success";
    Status[Status["error"] = 201] = "error";
    Status[Status["auth"] = 401] = "auth";
})(Status || (Status = {}));
console.log(Status.error);
console.log(Status[200]);
/**
 * @title 函数泛型
 */
/**
 * @title 命名空间 NameSpace
 */
var Home;
(function (Home) {
    var Header = /** @class */ (function () {
        function Header() {
            var elem = document.createElement('header');
            elem.innerText = 'This Is Header';
            document.body.appendChild(elem);
        }
        return Header;
    }());
    var Footer = /** @class */ (function () {
        function Footer() {
            var elem = document.createElement('footer');
            elem.innerText = 'This Is Footer';
            document.body.appendChild(elem);
        }
        return Footer;
    }());
    // 需要暴露出去的类，可以使用export关键词
    var Page = /** @class */ (function () {
        function Page() {
            new Header();
            new Footer();
        }
        return Page;
    }());
    Home.Page = Page;
    // 只有Home.Page是全局的，其他的都是模块化私有的
    new Page();
})(Home || (Home = {}));
