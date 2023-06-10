设计模式的定义：在面向对象软件设计过程中针对特定问题的简洁而优雅的解决方案。

## 第一部分 基础知识

### 第一章 面向对象的 JavaScript
JavaScript 没有提供传统面向对象语言中的类式继承，而是通过原型委托的方式来实现对象与对象之间的继承。JavaScript 也没有在语言层面提供对抽象类和接口的支持。正因为存在这些跟传统面向对象语言不一致的地方，我们在用设计模式编写代码的时候，更要跟传统面向对象语言加以区别。

#### 多态
“多态”一词源于希腊文 polymorphism，拆开来看是 poly（复数） + morph（形态） + sim，从字面上我们可以理解为复数形式。

多态的实际含义是：同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果。换句话说，给不同的对象发送同一个消息时，这些对象会根据这个消息分别给出不同的反馈。

```js
/* 
 * 多态
 * 一段“多态”的 JavaScript 代码
 * 问题：随着动物总类的增加会导致 makeSound 函数臃肿
 */

var makeSound = function (animal) {
  if (animal instanceof Duck) {
    console.log('嘎嘎嘎')
  } else if (animal instanceof Chicken) {
    console.log('咯咯咯')
  }
}

var Duck = function () {}
var Chicken = function () {}

makeSound(new Duck()) // 嘎嘎嘎
makeSound(new Chicken()) // 咯咯咯


/*
 * 对象的多态性
 * 改进：将不变的部分抽离出来（所有动画都会叫 makeSound），然后把可变的部分各自封装起来
 */

var makeSound = function (animal)  {
  animal.sound()
}

var Duck = function () {}
Duck.prototype.sound = function () {
  console.log('嘎嘎嘎')
}

var Chicken = function () {}
Chicken.prototype.sound = function () {
  console.log('咯咯咯')
}

makeSound(new Duck())
makeSound(new Chicken())
```

##### 多态在面向对象程序设计中的作用
多态最根本的作用就是通过把过程化的条件分支语句转化为对象的多态性，从而消除这些条件分支语句。

将行为分布在各个对象中，并将这些对象各自负责自己的行为，这正是面向对象设计的优点。

```js
/*
 * 优化前 
 */
var googleMap = {
  show: function () {
    console.log('开始渲染谷歌地图')
  }
}

var baiduMap = {
  show: function () {
    console.log('开始渲染百度地图')
  }
}

var renderMap = function (type) {
  if (type === 'google') {
    googleMap.show()
  } else if (type === 'baidu') {
    baiduMap.show()
  }
}

renderMap('google') // 输出：开始渲染谷歌地图
renderMap('baidu') // 输出：开始渲染百度地图


/*
 * 优化后 
 * 对象的多态性提示我们：“做什么”和“怎么去做”是可以分开的
 */
var googleMap = {
  show: function () {
    console.log('开始渲染谷歌地图')
  }
}

var baiduMap = {
  show: function () {
    console.log('开始渲染百度地图')
  }
}

/*
 * 后续增加soso地图，renderMap 函数不需要做出任何改变
 */
var sosoMap = {
  show: function () {
    console.log('开始渲染soso地图')
  }
}

var renderMap = function (map) {
  if (map.show instanceof Function) {
    map.show()
  }
}

renderMap(googleMap) // 输出：开始渲染谷歌地图
renderMap(baiduMap) // 输出：开始渲染百度地图
```

#### 原型模式和基于原型继承的 JavaScript 对象系统
JavaScript 的函数既可以普通函数被调用，也可以作为构造函数被调用。当使用 new 运算符来调用函数时，此时的函数就是一个构造器。用 new 运算符来创建对象的过程，实际上也只是先克隆 Object.prototype 对象，在进行一些其他额外操作的过程。

在 Chrome 和 Firefox 等向外暴露了对象 `__proto__` 属性的浏览器下，我们可以通过下面这段代码来理解 new 运算符的过程：

```js
function Person(name) {
  this.name = name
}

Person.prototype.getName = function () {
  return this.name
}

var objectFactory = function () {
  var obj = new Object() // 从 Object.prototype 上克隆一个空的对象
  var Constructor = [].shift.call(arguments) // 取得外部传入的构造器，此例是 Person
  obj.__proto__ = Constructor.prototype // 指向正确的原型 Person.prototype 而不是原来的 Object.prototype
  var ret = Constructor.apply(obj, arguments) // 借用外部传入的构造器给 obj 设置属性

  return typeof ret === 'object' ? ret : obj // 确保构造器总是会返回一个对象
}

var a = objectFactory(Person, 'sven')

console.log(a.name) // sven
console.log(a.getName()) // sven
console.log(Object.getPrototypeOf(a) === Person.prototype) // true

// 我们看到，分别调用下面两句代码产生了一样的结果：
var a = objectFactory(A, 'sven')
var a = new Person('sven')
```

##### JavaScript 中的原型继承
JavaScript 给对象提供了一个名为 `__proto__` 的隐藏属性，对象的 `__proto__` 属性默认会指向它的构造函数的原型对象。

```js
var a = new Object()
console.log(a.__proto__ === Object.prototype) // true
```

实际上，`__proto__` 就是对象跟“对象构造函数的原型”联系起来的纽带。

虽然 JavaScript 的对象最初都是由 Object.prototype 对象克隆而来，但对象构造函数的原型并不仅限于 Object.prototype 上，而是可以动态指向其他对象。

最常用的原型继承方式：

```js
var obj = {name: 'sven'}

var A = function () {}
A.prototype = obj

var a = new A()
console.log(a.name) // sven
```

##### 原型继承的未来
使用 Object.create 来完成原型继承看起来更能体现原型模式的精髓。通过 `Object.create(null)` 可以创建出没有原型的对象。

另外，ECMAScript 6 带来了新的 Class 语法。但其背后仍是通过原型机制来创建对象。

### 第二章 this、call 和 apply
JavaScript 的 this 总是指向一个对象，而具体指向哪个对象时运行时基于函数的执行环境动态绑定的，而非函数被声明时的环境。

#### this 的指向
除去不常用的 with 和 eval 的情况，具体到实际应用中，this 的指向大致可以分为以下 4 种。

* 作为对象的方法调用：this 指向该对象
* 作为普通函数调用：全局对象（浏览器中则为 window 对象，严格模式下，是 undefined）
* 构造函数调用：指向返回的对象。特殊情况：若显示返回一个 object 类型的对象，那么此次运算结果最终会返回这个对象；对于显示返回非对象类型的数据，则会依然保持期待的 this。
* Function.prototype.call 或 Function.prototype.apply 调用：动态改变传入函数的 this，若第一个参数为 null，则函数内的 this 会指向默认的宿主对象（浏览器是 window），但如果是严格模式，则 this 仍为 null。对于目的不在于指定 this 指向，而是借用其他对象的方法，那么可以传入 null 来代替某个具体的对象：`Math.max.apply(null, [1, 2, 3])`

##### Function.prototype.bind
大部分高级浏览器都实现了内置的 Function.prototype.bind。但我们也可以模拟一个：

```js
// bind 的一个特性是 bind 之后不能再次更改 this，这里也实现了。
Function.prototype.bind = function (context) {
  var self = this
  return function () {
    return self.apply(context, arguments)
  }
}
```

### 第三章 闭包和高阶函数
#### 高阶函数
高阶函数是指至少满足下列条件之一的函数：

* 函数可以作为参数被传递
* 函数可以作为返回值输出

##### 高阶函数实现 AOP
AOP（面向切面编程）的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，这些跟业务逻辑无关的功能通常包括日记统计、安全控制、异常处理等。把这些功能抽离出来之后，再通过“动态织入”的方式掺入业务逻辑模块中。这样可以保持业务逻辑模块的纯净和高内聚性，其次是方便复用日志统计等功能模块。

通常，在 JavaScript 中实现 AOP 都是指把一个函数“动态织入”到另外一个函数中，具体的实现技术有很多，这里通过扩展 Function.prototype 来做到这一点。

```js
Function.prototype.before = function (beforefn) {
  var __self = this // 保持原函数的引用
  return function () { // 返回包含了原函数和新函数的“代理”函数
    beforefn.apply(this, arguments) // 执行新函数，修正 this
    return __self.apply(this, arguments) // 执行原函数
  }
}

Function.prototype.after = function (afterfn) {
  var __self = this
  return function () {
    var ret = __self.apply(this, arguments)
    afterfn.apply(this, arguments)
    return ret
  }
}

var func = function () {
  console.log(2)
}

func = func.before(function () {
  console.log(1)
}).after(function () {
  console.log(3)
})

func() // 1 2 3
```

这种使用 AOP 的方式来给函数添加职责，也是 JavaScript 语言中一种非常特别和巧妙的装饰者模式实现。

##### 高阶函数的其他应用
1. currying
2. 函数节流 throttle
3. 分时函数
4. 惰性加载函数

###### currying
currying 又称部分求值。一个 currying 的函数首先会接受一些参数，接受了这些参数之后，该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。

```js
/*
 * 通用的 function currying() {}ƒ
 */
var currying = function (fn) {
  var args = []
  return function () {
    if (arguments.length === 0) {
      return fn.apply(this, args)
    } else {
      [].push.apply(args, arguments)
      return arguments.callee
    }
  }
}

/*
 * 月底计算本月花了多少钱，并不需要每天计算，只需最后求值即可。
 */
var cost = (function () {
  var money = 0
  return function () {
    for (var i = 0, l = arguments.length; i < l; i++) {
      money += arguments[i]
    }
    return money
  }
})()

var cost = currying(cost) // 转化为 currying 函数

cost(100) // 未真正求值
cost(200) // 未真正求值
cost(300) // 未真正求值

alert(cost()) // 求值并输出 600
```

###### 函数节流
```js
/*
 * throttle 
 */

var throttle = function (fn, interval) {
  var __self = fn // 保存需要被延迟执行的函数引用
  var timer // 定时器
  var firstTime = true // 是否是第一次调用

  return function () {
    var args = arguments
    var __me = this

    if (firstTime) { // 如果是第一次调用，不需延迟执行
      __self.apply(__me, args)
      return firstTime = false

    }

    if (timer) { // 如果定时器还在，说明前一次延迟执行还没有完成
      return false
    }

    timer = setTimeout(function () { // 延迟一段时间执行
      clearTimeout(timer)
      timer = null
      __self.apply(__me, args)
    }, interval || 500)
  }
}

window.onresize = throttle(function () {
  console.log(1)
}, 500)
```

###### 分时函数
对于耗时函数的解决方案之一是下面的 timeChunk 函数，timeChunk 函数让创建节点的工作分批进行。

timeChunk 函数接受 3 个函数，第 1 个参数是总数据，第 2 个参数是封装了处理逻辑的函数，第 3 个参数是每一批处理的数量。

```js
/*
 * 分时函数
 * ary 总数据
 * fn 每个数据的处理函数
 * count 每批处理的数据量 
 */

var timeChunk = function (ary, fn, count) {
  var obj
  var t
  var len = ary.length

  var start = function () {
    for (var i = 0; i < Math.min(count || 1, ary.length); i++) {
      var obj = ary.shift()
      fn(obj)
    }
  }

  return function () {
    t = setInterval(function () {
      if (ary.length === 0) { // 如果全部数据已处理完
        return clearInterval(t)
      }
      start()
    }, 200) // 分批执行的时间间隔，也可以用参数的形式传入
  }
}
```

###### 惰性加载函数
在 Web 开发中，因为浏览器之间的实现差异，一些嗅探工作总是不可避免。比如我们需要一个在各个浏览器中能够实现通用的事件绑定函数 addEvent。

```js
// 方案一：常见的写法
// 缺点：每次被调用都会执行条件分支
var addEvent = function (elem, type, handler) {
  if (window.addEventListener) {
    return elem.addEventListener(type, handler, false)    
  }
  if (window.attachEvent) {
    return elem.attachEvent('on' + type, handler)
  }
}

// 方案二：在代码加载时就进行一次判断，让 addEvent 返回一个包裹正确逻辑的函数
// 缺点：当从头到尾都未用过，形成冗余操作
var addEvent = (function () {
  if (window.addEventListener) {
    return function (elem, type, handler) {
      elem.addEventListener(type, handler, false)
    }
  }
  if (window.attachEvent) {
    return function (elem, type, handler) {
      elem.attachEvent('on' + type, handler)
    }
  }
})()


// 方案三：惰性载入函数
var addEvent = function (elem, type, handler) {
  if (window.addEventListener) {
    addEvent = function (elem, type, handler) {
      elem.addEventListener(type, handler, false)
    }
  } else if (window.attachEvent) {
    addEvent = function (elem, type, handler) {
      elem.attachEvent('on' + type, handler)
    }
  }

  addEvent(elem, type, handler)
}
```

## 第二部分 设计模式

本书并没有涵盖 GoF 所提出的 23 种设计模式，而是选择了在 JavaScript 开发中更常见的 14 种设计模式。

### 第四章 单例模式
定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。

```js
// 通用的惰性单例

var getSingle = function (fn) {
  var result
  return function () {
    return result || (result = fn.apply(this, arguments))
  }
}

var createLoginLayer = function () {
  var div = document.createElement('div')
  div.innerHTML = '我是登录浮窗'
  div.style.display = 'none'
  document.body.appendChild(div)
  return div
}

var createSingleLoginLayer = getSingle(createLoginLayer)

document.getElementById('loginBtn').onclick = function () {
  var loginLayer = createSingleLoginLayer()
  loginLayer.style.display = 'block'
}
```

### 第五章 策略模式
定义：定义一系列算法，把它们一个个封装起来，并且使它们可以相互替换。

案例：

```js
// 计算奖金

// 最初的代码实现
var calculateBouns = function (performanceLevel, salary) {
  if (performanceLevel === 'S') {
    return salary * 4
  }
  if (performanceLevel === 'A') {
    return salary * 3
  }
  if (performanceLevel === 'B') {
    return salary * 2
  }
}

calculateBouns('B', 2000) // 40000
calculateBouns('S', 6000) // 24000

// JavaScript 版本的策略模式

var strategies = {
  S: function (salary) {
    return salary * 4
  },
  A: function (salary) {
    return salary * 3
  },
  B: function (salary) {
    return salary * 2
  }
}

var calculateBouns = function (level, salary) {
  return strategies[level](salary)
}

console.log(calculateBouns('S', 20000)) // 80000
console.log(calculateBouns('A', 30000)) // 30000
```

#### 更广义的“算法”
通常会把算法的含义扩散开来，使用策略模式也可以用来封装一系列的“业务规则”。只要这些业务规则指向的目标一致，并且可以被替换使用，我们就可以用策略模式来封装它们。

#### 表单校验
```js
/* 
 * 缺点和计算奖金的最初版本一样
 * 1.registerForm.onsubmit 函数比较庞大，包含了很多 if-else 语句
 * 2.registerForm.onsubmit 缺乏弹性，增加或修改规则需深入内部，违反开发-封闭原则
 * 3.算法复用性差
*/
var registerForm = document.getElementById('registerForm')

registerForm.onsubmit = function () {
  if (registerForm.userName.value === '') {
    alert('用户名不能为空')
    return false
  }

  if (registerForm.password.value.length < 6) {
    alert('密码长度不能少于6位')
    return false
  }

  if (!/(^1[3|5|8][0-9]{9})/.test(registerForm.phoneNumber.value)) {
    alert('手机号码格式不正确')
    return false
  }
}

/* 
 * 用策略模式重构表单校验
 * 第一步：将校验逻辑封装成策略对象
 * 第二步：实现 Validator 类。Validator 类在这里作为 Context，负责接收用户的请求并委托给 strategy 对象。
 * 第三步：客户调用代码
 */
var strategies = {
  isNotEmpty: function (value, errorMsg) {
    if (value === '') {
      return errorMsg
    }
  },
  minLength: function (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg
    }
  },
  isMobile: function (value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9})/.test(value)) {
      return errorMsg
    }   
  }
}

var Validator = function () {
  this.cache = []
}

// 支持对同一个 dom 添加多种校验规则
Validator.prototype.add = function (dom, rules) {
  var self = this

  for (var i = 0, rule; rule = rules[i++]; ) {
    (function (rule) {
      var strategyAry = rule.strategy.split(':') // 把 strategy 和参数分开
      var errorMsg = rule.errorMsg

      self.cache.push(function () { // 把校验的步骤用空函数包装起来，并且放入 cache
        var strategy = strategyAry.shift() // 用户挑选的 strategy
        strategyAry.unshift(dom.value) // 把 input 的 value 添加进参数列表
        strategyAry.push(errorMsg) // 用 errorMsg 添加进参数列表
        return strategies[strategy].apply(dom, strategyAry)
      })
    })(rule)
  }
}

Validator.prototype.start = function () {
  for (var i = 0, ValidatorFunc; ValidatorFunc = this.cache[i++]; ) {
    var errorMsg = ValidatorFunc() // 开始校验，并取得校验后的返回信息
    if (errorMsg) { // 如果没有确切的返回值，说明校验没有通过
      return errorMsg
    }
  }
}

// 客户调用代码
var registerForm = document.getElementById('registerForm')

var validatorFunc = function () {
  var validator = new Validator()

  validator.add(registerForm.userName, [{
    strategy: 'isNotEmpty',
    errorMsg: '用户名不能为空'
  }, {
    strategy: 'minLength:6',
    errorMsg: '用户名长度不能少于6位'
  }])

  var errorMsg = validator.start()
  return errorMsg
}

registerForm.onsubmit = function () {
  var errorMsg = validatorFunc()

  if (errorMsg) {
    alert(errorMsg)
    return false
  }
}
```

#### 策略模式的优点
1. 策略模式利用组合、委托和多态等技术和思想，可以有效地避免多重条件选择语句。
2. 策略模式提供了对开放-封闭原则的完美支持，将算法封装在独立的 strategy 中，使得它们易于切换，易于理解，易于扩展。
3. 策略模式中的算法也可以复用在系统的其他地方，从而避免许多重复的复制粘贴工作。
4. 在策略模式中利用组合和委托让 Context 拥有执行算法的能力，这也是继承的一种更轻便的替代方案。

### 第六章 代理模式
代理模式的关键是，当客户不方便直接访问一个对象或不满足需要的时候，提供一个替身对象来控制对这个对象的访问，客户实际上访问的是替身对象。替身对象对请求做出一些处理之后，再把请求转交给本体对象。

两种代理模式：保护代理和虚拟代理。

保护代理：用于控制不同权限的对象对目标对象的访问，但在 JavaScript 并不容易实现保护代理，因为我们无法判断谁访问了对象。

虚拟代理：把一些开销很大的对象，延迟到真正需要它的时候才创建。

```js
/*
 * 无代理，更常见的情况
 */
var MyImage = (function () {
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  var img = new Image

  img.onload = function () {
    imgNode.src = img.src
  }

  return {
    setSrc: function (src) {
      imgNode.src = '***.gif'
      img.src = src
    }
  }
})

/*
 * 引入代码
 */
var myImage = (function () {
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)

  return {
    setSrc: function (src) {
      imgNode.src = src
    }
  }
})()

var proxyImage = (function () {
  var img = new Image
  img.onload = function () {
    myImage.setSrc(this.src)
  }
  return {
    setSrc: function (src) {
      myImage.setSrc('***.gif')
      img.src = src
    }
  }
})()

proxyImage.setSrc('***.JPG')
```

#### 代理的意义
单一职责原则指的是，就一个类（通常也包括对象和函数等）而言，应该仅有一个引起它变化的原因。如果一个对象承担了多项职责，就意味着这个对象将变得巨大，引起它变化的原因可能会有多个。而面向对象设计鼓励奖行为分布到细粒度和低内聚的设计。

在面向对象的程序设计中，大多数情况下，若违反其他任何原则，同时将违反开放-封闭原则。

因此，代理负责预加载图片，预加载的操作完成之后，把请求体重新交给本体 MyImage。

#### 虚拟代理合并 HTTP 请求
```js
/* 
 * 点击 checkbox 即同步文件
 * 反面例子
 */
var syncFile = function (id) {
  console.log('开始同步文件，id 为' + id)
}

var checkbox = document.getElementsByTagName('input')

for (var i = 0, c; c = checkbox[i++]; ) {
  c.onclick = function () {
    if (this.checked === true) {
      syncFile(this.id)
    }
  }
}

// 使用代理
var syncFile = function (id) {
  console.log('开始同步文件，id 为' + id)
}

var proxySyncFile = (function () {
  var cache = []
  var timer

  return function (id) {
    cache.push(id)
    if (timer) {
      return
    }

    timer = setTimeout(function () {
      syncFile(cache.join(',')) // 2 秒后向本体发送需要同步的 ID 集合。
      clearTimeout(timer)
      timer = null
      cache.length = 0
    }, 2000)
  }
})()

var checkbox = document.getElementsByTagName('input')
for (var i = 0, c; c = checkbox[i++]; ) {
  c.onclick = function () {
    if (this.checked === true) {
      proxySyncFile(this.id)
    }
  }
}
```

#### 缓存代理
缓存代理可以为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参数跟之前一直，则可以直接返回前面存储的运算结果。

```js
/* 
 * 通过增加缓存代理的方式，mult 函数可以继续专注于自身的职责——计算乘积
 * 缓存的功能由代理对象实现
 */

 var mult = function () {
   console.log('开始计算乘积')
   var a = 1
   for (var i = 0, l = arguments.length; i < l; i++) {
     a *= arguments[i]
   }
   return a
 }

 var proxyMult = (function () {
  var cache = {}
  return function () {
    var args = Array.prototype.join.call(arguments, ',')
    if (args in cache) {
      return cache[args]
    }
    return cache[args] = mult.apply(this, arguments)
  }
})()

proxyMult(1, 2, 3, 4) // 24
proxyMult(1, 2, 3, 4) // 24
```

**缓存代理用于 Ajax 异步请求数据**：与计算乘积不同的是，请求数据是个异步操作，无法直接把计算结果放到代理对象的缓存中，而是要通过回调的方式。

```js
var pageProxy = (function () {
  var cache = {}
  return function (fn) { // fn 作为处理页码数据的函数
    var pageData = cache[page]
    if (pageData) {
      return fn(pageData) //返回制定页码的数据
    }
    http.getPage(page) // 获取制定页码的数据
      .then((data) ={
        cache[page] = data //存放数据
        fn(data)
      })
  }
})()
```

#### 用高阶函数动态创建代理
通过传入高阶函数这种更加灵活的方式，可以为各种计算方法创建缓存代理。

```js
/* 
 * 创建缓存代理的工厂
 */

var createProxyFactory = function (fn) {
  var cache = {}
  return function () {
    var args = Array.prototype.join.call(arguments, ',')
    if (args in cache) {
      return cache[args]
    }
    return cache[args] = fn.apply(this, arguments)
  }
}

var proxyMult = createProxyFactory(mult)

proxyMult(1, 2, 3, 4)
```

#### 其他代理模式
防火墙代理、远程代理、保护代理、智能引用代理、写时复制代理

### 第七章 迭代器模式
迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。

```js
/* 
 * 根据不同浏览器获取相应的上传组件对象
 */

/* 
 * 缺点：难以阅读
 * 严重违反开发-封闭原则
 * 不便增加新的上传方式，如 HTML5 上传
 */

var getUploadObj = function () {
  try {

  } catch (e) {
    if (supportFlash()) {
      var str = '<object type="application/x-shockwave-flash"></object>'
      return $(str).appendTo($('body'))
    } else {
      var str = '<input name="file" type="file" />>'
      return $(str).appendTo($('body'))
    }
  }
}

/* 
 * 迭代器
 * 三个函数有同一个约定：upload 对象可用就返回，否则返回 false，提示迭代器继续往后迭代
 */
 
var getActiveUploadObj = function () {
  try {
    return new ActiveXObject('TXFTNActiveX.FTNUpload')
  } catch(e) {
    return false
  }
}

var getFlashUploadObj = function () {
  if (supportFlash()) {
    var str = '<object type="application/x-shockwave-flash"></object>'
    return $(str).appendTo($('body'))
  }
  return false
}

var getFormUploadObj = function () {
  var str = '<input name="file" type="file" />>'
  return $(str).appendTo($('body'))
}

var iteratorUploadObj = function () {
  for (var i = 0, fn; fn = arguments[i]; ) {
    var uploadObj = fn()
    if (uploadObj !== false) {
      return uploadObj
    }
  }
}

var uploadObj = iteratorUploadObj(getActiveUploadObj, getFlashUploadObj, getFormUploadObj)
```

迭代器模式是一种相对简单的模式，简单到很多时候我们都不认为它是一种设计模式。目前绝大部分语言都内置了迭代器，如 Array.prototype.forEach。

### 第八章 发布-订阅模式
又称观察者模式，定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖它的对象都将得到通知。

#### 全局的发布-订阅对象
```js
/* 
 * 全局的 Event 对象
 */
var Event = (function () {
  var clientList = {}
  var listen
  var trigger
  var remove

  listen = function (key, fn) {
    if (!clientList[key]) {
      clientList[key] = []
    }
    clientList[key].push(fn)
  }

  trigger = function () {
    var key = Array.prototype.shift.call(arguments)
    var fns = clientList[key]
    if (!fns || fns.length === 0) {
      return false
    }
    for (var i, fn; fn = fns[i]; ) {
      fn.apply(this, arguments)
    }
  }

  remove = function (key, fn) {
    var fns = clientList[key]
    if (!fns) {
      return false
    }

    if (!fn) {
      fns && (fns.length = 0)
    } else {
      for (var l = fns.length - 1; l >=0; l --) {
        var _fn = fns[l]
        if (_fn === fn) {
          fns.splice(l, 1)
        }
      }
    }
  }

  return {
    listen: listen,
    trigger: trigger,
    remove: remove
  }
})()

Event.listen('squareMeter88', function (price) {
  console.log('价格=' + price)
})

Event.trigger('squareMeter88', 200000)
```

#### 发布-订阅的优缺点
优点：

* 时间上的解耦
* 对象之间的解耦

缺点：

* 过渡使用会导致对象与对象之间的联系被深埋在背后，会导致程序难以跟踪维护和理解。

### 第九章 命令模式
对于书中解释仍不太理解，后续再补充。

### 第十章 组合模式
#### 组合模式的用途
1. 将对象组合成树形结构，以表示“整体-部分”的层次结构。
2. 通过对象的多态表现，使得用户对单个对象和组合对象的使用具有一致性。

#### 更强大的宏命令
```js
/* 
 * 
 * 打开空调
 * 打开电视和音响
 * 关门、开电脑、登录 QQ
 * 宏命令：执行该宏命令时，会一次遍历执行它所包含的子命令
 */

var MacroCommand = function () {
  return {
    commandList: [],
    add: function (command) {
      this.commandList.push(command)
    },
    execute: function () {
      for (var i = 0, command; command = this.commandList[i++]; ) {
        command.execute()
      }
    }
  }
}

var openAcCommand = {
  execute: function () {
    console.log('打开空调')
  }
}

/*
 * 加里的电视和音响是链接在一起的，所有可以用一个宏命令来组合打开它们 
 */

var openTvCommand = {
  execute: function () {
    console.log('打开电视')
  }
}

var openSoundCommand = {
  execute: function () {
    console.log('打开音响')
  }
}

var macroCommand1 = MacroCommand()
macroCommand1.add(openTvCommand)
macroCommand1.add(openSoundCommand)

/* 
 * 关门、打开电脑和登录QQ 的宏命令
 */

var closeDoorCommand = {
  execute: function () {
    console.log('关门')
  }
}

var openPcCommand = {
  execute: function () {
    console.log('打开电脑')
  }
}

var openQQCommand = {
  execute: function () {
    console.log('登录 QQ')
  }
}

var macroCommand2 = MacroCommand()
macroCommand2.add(closeDoorCommand)
macroCommand2.add(openPcCommand)
macroCommand2.add(openQQCommand)

/*
 * 把所有的命令组合成一个“超级命令” 
 */

var macroCommand = MacroCommand()
macroCommand.add(openAcCommand)
macroCommand.add(macroCommand1)
macroCommand.add(macroCommand2)

/*
 * 给遥控器绑定“超级命令” 
 */

var setCommand = (function (command) {
  document.getElementById('button').onclick = function () {
    command.execute()
  }
})(macroCommand)
```

#### 一些值得注意的地方
* 组合模式不是父子关系
      组合对象包含一组叶对象，但叶对象不是组合的子类。组合对象把请求委托给它所包含的所有叶对象，它们能够合作的关键是拥有相同接口。
* 对叶对象操作的一致性
      组合模式除了要求组合对象和叶对象拥有相同的接口之外，还要对一组叶对象的操作必须具有一致性。
* 双向映射关系
* 用职责链模式提高组合模式性能

#### 何时使用组合模式
组合模式适用于以下两种情况：

* 表示对象的部分-整体层次结构。组合模式可以方便地构造一棵树来表示对象的部分-整体结构。特别是我们在开发期间不确定这棵树到底存在多少层次的时候。在树的构造最终完成以后，只需通过请求树的最顶层对象，便能对整棵树做统一的操作。在组合模式中增加和删除树的节点非常方便，并且符合开发-封闭原则。
* 客户希望统一对待树中的所有对象。组合模式使客户可以忽略组合对象和叶对象的区别。客户在面对这棵树，不用关心当前正在处理的对象是组合对象还是叶对象，也就不用写一堆 if、else 语句来分别处理它们。组合对象和叶对象会各自做自己正确的事情，这是组合模式最重要的能力。

### 第十一章 模板方法模式
模板方法模式由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。通常在抽象父类中封装了子类的算法框架，包括实现一些公共方法和封装子类中所有方法的执行顺序。子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。

用 Java 实现 Coffee or Tea 的例子

```java
/* 
 * 用 Java 实现 Coffee or Tea 的例子
 */

public abstract class Beverage { // 饮料抽象类
  final void init () { // 模板方法
    boilWater();
    brew();
    pourInCup();
    addCondiments();
  }

  void boilWater () { // 具体方法 boilWater
    System.out.println('把水煮沸');
  }

  abstract void brew(); // 抽象方法 brew
  abstract void addCondiments(); // 抽象方法 addCondiments
  abstract void pourInCup(); // 抽象方法 pourInCup
}

public class Coffee extends Beverage { // coffee 类
  @Override
  void brew () { // 子类中重写 brew 方法
    System.out.println('用沸水冲泡咖啡');
  }

  @Override
  void pourInCup () { // 子类中重写 pourInCup 方法
    System.out.println('把咖啡倒进杯子');
  }

  @Override
  void addCondiments () { // 子类中重写 addCondiments 方法
    System.out.println('加糖和牛奶');
  }
}

public class Tea extends Beverage { // Tea 类
  @Override
  void brew () { // 子类中重写 brew 方法
    System.out.println('用沸水冲泡茶叶');
  }

  @Override
  void pourInCup () { // 子类中重写 pourInCup 方法
    System.out.println('把茶叶倒进杯子');
  }

  @Override
  void addCondiments () { // 子类中重写 addCondiments 方法
    System.out.println('加柠檬');
  }
}

public class Test {
  private static void prepareRecipe(Beverage beverage) {
    beverage.init();
  }

  public static void main (String args[]) {
    Beverage coffee = new Coffee(); // 创建 coffee 对象
    prepareRecipe(coffee); // 开始泡咖啡
    // 把水煮沸
    // 用沸水冲泡咖啡
    // 把咖啡倒进杯子
    // 加糖和牛奶

    Beverage tea = new Tea(); // 创建 tea 对象
    prepareRecipe(tea); // 开始泡茶叶
    // 把水煮沸
    // 用沸水冲泡茶叶
    // 把茶叶倒进杯子
    // 加柠檬
  }
}
```

我们知道 Beverage.prototype.init 方法作为模板方法，已经规定了子类的算法框架。

```js
Beverage.prototype.init = function () {
  this.boldWater()
  this.brew()
  this.pourInCup()
  this.addCondiments()
}
```

然而，JavaScript 没有抽象类，也没 Java 编辑器会保证子类会重写父类中的抽象方法。因此需要其他变通的解决方案。

让 Beverage.prototype.brew 等方法直接抛出一个异常。至少让程序运行时得到一个错误：

```js
Beverage.prototype.brew = function () {
  throw new Error('子类必须重写 brew 方法')
}
// ...
```

#### 钩子方法
钩子方法让子类不受某些约束。放置钩子是隔离变化的一种常见手段。我们在父类中容易变化的地方放置钩子，钩子可以有一个默认的实现，究竟要不要“挂钩”，这由子类自行决定。钩子方法的返回结果决定了模板方法方面部分的执行步骤，也就是程序接下来的走向。这样一来，程序就拥有了变化的可能。

```js
var Beverage = function () {}

Beverage.prototype.boilWater = function () {
  console.log('把水煮沸')
}

Beverage.prototype.brew = function () {
  throw new Error('子类必须重写 brew 方法')
}

Beverage.prototype.pourInCup = function () {
  throw new Error('子类必须重写 pourInCup 方法')
}

Beverage.prototype.addCondiments = function () {
  throw new Error('子类必须重写 addCondiments 方法')
}

Beverage.prototype.customerWantsCondiments = function () {
  return true // 默认需要调料
}

Beverage.prototype.init = function () {
  this.boilWater()
  this.brew()
  this.pourInCup()
  if (this.customerWantsCondiments()) { // 如果挂钩默认返回 true，则需要调料
    this.addCondiments()
  }
}
```

#### 真的需要“继承”吗？
模板方法模式是基于继承的一种设计模式，父类封装了子类的算法框架和方法的执行顺序。子类继承父类之后，父类通知子类执行这些方法，好莱坞原则很好地诠释了这种设计技巧，即高层组件调用底层组件。

然而 JavaScript 语言实际上没有提供真正的类似继承，继承是通过对象与对象之前的委托来实现的。虽然，我们在形式上借鉴了提供类似继承的语言，但本章学习到的模板方法并不十分正宗。在 JavaScript 通过高阶函数也能实现。

```js
var Beverage = function (param) {
  var boilWater = function () {
    console.log('把水煮沸')
  }

  var brew = param.brew || function () {
    throw new Error('必须传递 brew 方法')
  }

  var pourInCup = param.pourInCup || function () {
    throw new Error('必须传递 pourInCup 方法')
  }

  var addCondiments = param.addCondiments || function () {
    throw new Error('必须传递 addCondiments 方法')
  }

  var F = function () {}

  F.prototype.init = function () {
    boilWater()
    brew()
    pourInCup()
    addCondiments()
  }

  return F
}

var Coffee = Beverage ({
  brew: function () {
    console.log('用沸水冲泡咖啡')
  },
  pourInCup: function () {
    console.log('把咖啡倒进杯子')
  },
  addCondiments: function () {
    console.log('加糖和咖啡')
  }
})

var coffee = new Coffee()
coffee.init()
```

#### 小结
模板方法模式是一种典型的通过封装变化提供系统扩展性的设计模式。在传统的面向对象语言中，一个运用了模板方法模式的程序中，子类的方法种类和执行顺序都是不变的，所以我们把这部分逻辑抽象到父类的模板方法里面。而子类的方法具体怎么实现则是可变的，于是我们把这部分的逻辑封装到子类中。通过增加新的子类，我们便能给系统增加新的功能，并需要改动抽象父类及其他子类，这也符合开发-封闭原则。

### 第十二章 享元模式
享元模式是一种用于性能优化的模式。其核心是用共享技术来支持大量细粒度的对象。

#### 内部状态与外部状态
享元模式要求将对象的属性划分为内部状态和外部状态（通常指属性）。享元模式的目标是尽量减少共享对象的数量。

如何划分内部状态和外部状态，下面的几条经验提供了一些指引：

* 内部状态存储于对象内部。
* 内部状态可以被一些对象共享。
* 内部状态独立于具体的场景，通常不会改变。
* 外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享。

这样一来，我们便可以把所有内部状态相同的对象都指定为同一个共享对象。而外部状态可以从对象身上剥离出来，并存储在外部。

剥离了外部状态的对象成为共享对象，外部状态在必要时被传入共享对象来组装成一个完整的对象。虽然组装外部状态成为一个完整对象的过程需要花费一定的时间，但却可以大大减少系统中的对象数量。因此，享元模式是一种时间换空间的优化模式。

通常来讲，内部状态有多少种组合，系统中便最多存在多少个对象。

使用享元模式的关键是如何区别内部状态和外部状态。可以被对象共享的属性通常被划分为内部状态。

案例：不管什么样式的衣服，都可以按照性别不同，穿在同一个男模特或者女模特身上，模特的性别就可以作为内部状态存储在共享对象的内部。而外部状态取决于具体的场景，并根据场景而变化，就像例子中每件衣服都是不同的，它们不能被一些对象共享，因此只能被划分为外部状态。

#### 文件上传的例子
##### 对象爆炸
每个上传文件对应一个 upload 对象。对于同时上传多个文件时会创建大量对象。

```js
/*
 * 对象爆炸 
 */
var id = 0
var startUpload = function (uploadType, files) { // uploadType 区分是控件还是 Flash
  for (var i = 0, file; file = files[i++]; ) {
    var uploadObj = new Upload(uploadType, file.fileName, file.fileSize)
    uploadObj.init(id++) // 给 upload 对象设置一个唯一的 id
  }
}

var Upload = function (uploadType, fileName, fileSize) {
  this.uploadType = uploadType
  this.fileName = fileName
  this.fileSize = fileSize
  this.dom = null
}

Upload.prototype.init = function (id) {
  var that = this
  this.id = id
  this.dom = document.createElement('div')
  this.dom.innerHTML = 
    '<span>文件名称：'+ this.fileName +', 文件大小：'+ this.fileSize +'</span>' +
    '<button class="delFile">删除</button>'
  this.dom.querySelector('.delFile').onclick = function () {
    this.delFile()
  }
  document.body.appendChild(this.dom)
}

Upload.prototype.delFile = function () {
  if (this.fileSize < 3000) {
    return this.dom.parentNode.removeChild(this.dom)
  }

  if (window.confirm('确定要删除该文件吗？' + this.fileName)) {
    return this.dom.parentNode.removeChild(this.dom)
  }
}

startUpload('plugin', [{
  fileName: '1.txt',
  fileSize: 1000
}, {
  fileName: '2.txt',
  fileSize: 3000
}])

startUpload('flash', [{
  fileName: '3.txt',
  fileSize: 1000
}, {
  fileName: '4.txt',
  fileSize: 3000
}])
```

##### 享元模式重构文件上传
```js
/*
 * 享元模式重构文件上传
 * uploadType 为内部状态
 * fileName、fileSize 是根据场景而变，无法被共享，所以为外部状态 
 */

var Upload = function (uploadType) {
  this.uploadType = uploadType
}

Upload.prototype.delFile = function (id) {
  uploadManager.setExternalState(id, this)

  if (this.fileSize < 3000) {
    return this.dom.parentNode.removeChild(this.dom)
  }
  if (window.confirm('确定需要删除该文件吗？' + this.fileName)) {
    return this.dom.parentNode.removeChild(this.dom)
  }
}

/* 
 * 工厂进行对象实例化
 * 如果某种内部状态对应的共享对象已经被创建过，则直接返回该对象，否则创建一个新的对象。
 */
var UploadFactory = (function () {
  var createdFlyWeightObjs = {}

  return {
    create: function (uploadType) {
      if (createdFlyWeightObjs[uploadType]) {
        return createdFlyWeightObjs[uploadType]
      }
      return createdFlyWeightObjs[uploadType] = new Upload(uploadType)
    }
  }
})

/*
 * 管理器封装外部状态
 * 负责向 UploadFactory 提交创建对象的请求，
 * 并用 uploadDatabase 对象保存所有 upload 对象的外部状态，
 * 以便在程序运行过程中给 upload 共享对象设置外部状态
 */
var uploadManager = (function () {
  var uploadDatabase = {}

  return {
    add: function (id, uploadType, fileName, fileSize) {
      var flyWeightObj = UploadFactory.create(uploadType)

      var dom = document.createElement('div')
      dom.innerHTML = 
        '<span>文件名称：'+ this.fileName +', 文件大小：'+ this.fileSize +'</span>' +
        '<button class="delFile">删除</button>'
      dom.querySelector('.delFile').onclick = function () {
        flyWeightObj.delFile(id)
      }
      document.body.appendChild(dom)

      uploadDatabase[id] = {
        fileName: fileName,
        fileSize: fileSize,
        dom: dom
      }
      return flyWeightObj
    },
    setExternalState: function (id, flyWeightObj) {
      var uploadData = uploadDatabase[id]
      for (var i in uploadData) {
        flyWeightObj[i] = uploadData[i]
      }
    }
  }
})()

var id = 0

window.startUpload = function (uploadType, files) {
  for (var i = 0, file; file = files[i++]; ) {
    var uploadObj = uploadManager.add(++id, uploadType, file.fileName, file.fileSize)
  }
}


/* 
 * 无论上传多少文件，需要创建的 upload 对象的最大数量为 2
 */
startUpload('plugin', [{
  fileName: '1.txt',
  fileSize: 1000
}, {
  fileName: '2.txt',
  fileSize: 3000
}])

startUpload('flash', [{
  fileName: '3.txt',
  fileSize: 1000
}, {
  fileName: '4.txt',
  fileSize: 3000
}])
```

##### 享元模式的适用性
一般来说，以下情况发生时便可以使用享元模式。

* 一个程序中使用了大量的相似对象
* 由于使用了大量对象，造成很大的内推开销
* 对象的大多数状态都可以变为外部状态
* 剥离出对象的外部状态之后，可以用相对较少的共享对象取代大量对象

##### 没有内部状态的享元
对于无内部状态的情况下，依然使用享元模式时，构造函数 Upload 就变成了无参数的形式：

```js
var Upload = function () {}
```

其他属性如 fileName、fileSize、dom 依然可以做为外部状态保存在共享对象外部。现在已经没有了内部状态，意味着只需要唯一的一个共享对象。现在我们需要改写创建享元对象的工厂：

```js
var UploadFactory = (function () {
  var uploadObj
  return {
    create: function () {
      if (uploadObj) {
        return uploadObj
      }
      return uploadObj = new Upload()
    }
  }
})()
```

管理器部分的代码不需要改动，还是负责剥离和组装外部状态。当对象没有内部状态时，生成共享对象的工厂实际上变成了一个单例工厂。

#### 对象池
对象池维护一个装载空闲对象的池子，如果需要对象时，不是直接 new，而是转从对象池里获取。如果对象池里没有空闲对象，则创建一个新的对象，当获取出的对象完成它的职责后，再进入池子等待下次被获取。

对象池技术的应用非常广泛，HTTP 连接池和数据库连接池都是其代表应用。在 Web 前端开发中，对象池使用最多的场景大概就是跟 DOM 有关的操作。

##### 通用对象池实现
```js
/* 
 * 对象池的通用实现
 */

var objectPoolFactory = function (createObjFn) {
  var objectPool = []

  return {
    create: function () {
      var obj = objectPool.length === 0 ?
        createObjFn.apply(this, arguments) : objectPool.shift()
    },
    recover: function (obj) {
      objectPool.push(obj)
    }
  }
}

var iframeFactory = objectPoolFactory(function () {
  var iframe = document.createElement('iframe')
  document.body.appendChild(iframe)

  iframe.onload = function () {
    iframe.onload = null // 防止 iframe 重复加载的 bug
    iframeFactory.recover(iframe) // iframe 加载完成之后回收节点
  }

  return iframe
})

var iframe1 = iframeFactory.create()
iframe1.src = 'http://baidu.com'

var iframe2 = iframeFactory.create()
iframe2.src = 'http://qq.com'

setTimeout(function () {
  var iframe3 = iframeFactory.create()
  iframe3.src = 'http://163.com'
}, 3000)
```

对象池是另外一种性能优化方案，它跟享元模式有一些相似，但没有分离内部状态和外部状态这个过程。上述的文件上传案例用对象池+事件委托来代替实现。

### 第十三章 职责链模式
职责链模式的定义是：使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。

现实案例：1. 高峰时期递公交卡 2. 作弊传纸条

最大优点：请求发送者只需要直到链中的第一个节点，从而弱化了发送者和一组接收者之间的强联系。如果不使用职责链模式，那么在公交车上，需要先搞清楚谁是售票员后，才能把硬币递给他。同样在考试中，也许就要先了解同学中有哪些可以解答这道题。

![使用职责链前后](https://camo.githubusercontent.com/1343f6f64d81b3f0465a07681cdbb0e4d09db026e3c080e0e5ba55a9cd58aae9/68747470733a2f2f626c6f672d313235313437373232392e636f732e61702d6368656e6764752e6d7971636c6f75642e636f6d2f6a6176617363726970742d7061747465726e2f31332e332e706e67)

#### 实际案例
```js
/*
 * 预定抢购活动：根据定金得优惠券
 * orderType 表示订单类型（500定金用户、200定金用户、无优惠券用户）
 * pay 表示用户是否已经支付定金
 * stock 表示当前手机库存数量
 */

var order = function (orderType, pay, stock) {
  if (orderType === 1) {
    if (pay === true) {
      console.log('500 元定金预约，得到100优惠券')
    } else { // 未交付定金，降级到普通购买模式
      if (stock 0) { // 用于普通购买的手机还有库存
        console.log('普通购买，无优惠券')
      } else {
        console.log('手机库存不足')
      }
    }
  } else if (orderType === 2) { // 200 元定金购买模式
    if (pay === true) {
      console.log('200元定金预约，得到 50 优惠券')
    } else {
      if (stock 0) {
        console.log('普通购买，无优惠券')
      } else {
        console.log('手机库存不足')
      }
    }
  } else if (orderType === 3) {
    if (stock 0) {
      console.log('普通购买，无优惠券')
    } else {
      console.log('手机库存不足')
    }
  }
}

order(1, true, 500) // 500 元定金预约，得到100优惠券


/* 
 * 灵活可拆分的职责链节点
 * 约定某个节点不能处理请求，则返回一个特定的字符串 'nextSuccessor' 
 * 来表示该请求需要继续往后面传递
 */

var order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('500 元定金预购，得到100优惠券')
  } else {
    return 'nextSuccessor' // 不知道下一个节点是谁，反正把请求往后面传递
  }
}

var order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log('200元定金预购，得到50优惠券')
  } else {
    return 'nextSuccessor' // 不知道下一个节点是谁，反正把请求往后面传递
  }
}

var orderNormal = function (orderType, pay, stock) {
  if (stock 0) {
    console.log('普通购买，无优惠券')
  } else {
    console.log('手机库存不足')
  }
}

// 接下来需要将函数包装进职责链节点。
var Chain = function (fn) {
  this.fn = fn
  this.successor = null
}

Chain.prototype.setNextSuccessor = function (successor) {
  return this.successor = successor
}

Chain.prototype.passRequest = function () {
  var ret = this.fn.apply(this, arguments)

  if (ret === 'nextSuccessor') {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments)
  }

  return ret
}

var chainOrder500 = new Chain(order500)
var chainOrder200 = new Chain(order200)
var chainOrderNormal = new Chain(orderNormal)

chainOrder500.setNextSuccessor(chainOrder200)
chainOrder200.setNextSuccessor(chainOrderNormal)

chainOrder500.passRequest(1, true, 500) // 500元定金预购，得到100优惠券
chainOrder500.passRequest(2, true, 500) // 200元定金预购，得到50优惠券
chainOrder500.passRequest(3, true, 500) // 普通购买，无优惠券
chainOrder500.passRequest(1, false, 0) // 手机库存不足

// 现在就可以自由灵活地添加、移除和修改链中的节点顺序
// 下面增加300元定金的案例

var order300 = function () {
  // ...
}

chainOrder300 = new Chain(order300)
chainOrder500.setNextSuccessor(chainOrder300)
chainOrder300.setNextSuccessor(chainOrder200)
```

##### 异步的职责链
```js
/* 
 * 异步的职责链
 * 增加 next 方法表示手动传递请求给职责链中的下一个节点
 */

Chain.prototype.next = function () {
  return this.successor && this.successor.passRequest.apply(this.successor, arguments)
}

var fn1 = new Chain(function () {
  console.log(1)
  return 'nextSuccessor'
})

var fn2 = new Chain(function () {
  console.log(2)
  var self = this
  setTimeout(function () {
    self.next()
  }, 1000)
})

var fn3 = new Chain(function () {
  console.log(3)
})

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3)
fn1.passRequest()
```

#### 职责链模式的优缺点
解耦了请求者和 N 个接收者之间的复杂关系，由于链中的哪个节点可以处理你发出的请求，所以只需把请求传递给第一个节点即可。

其他优点：

1. 将充斥着条件分支语句的巨大函数，拆分为多个节点，节点之间都有各自的处理函数而互不影响；
2. 链中的节点可灵活拆分重组；
3. 可手动指定起始节点，请求并不一定非得从链中的第一个节点开始传递。而 if 语句是做不到的。

缺点：

1. 不能保证某个请求一定会被链中的节点处理。可在链尾增加一个保底的接收者节点来处理这个即将离开链尾的请求
2. 增加额外的节点对象，避免过长的职责链。

#### 用 AOP 实现职责链
```js
Function.prototype.after = function (fn) {
  var self = this
  return function () {
    var ret = self.apply(this, arguments)
    if (ret === 'nextSuccessor') {
      return fn.apply(this, arguments)
    }

    return ret
  }
}

var order = order500.after(order200).after(orderNormal)

order(1, true, 500) // 500定金购买，得到100优惠券
order(2, true, 500) // 200元定金购买，得到50优惠券
order(1, true, 500) // 普通购买，无优惠券
```

#### 用职责链模式获取文件上传对象
第七章有一个用迭代器获取文件上传对象的例子，其实这里用职责链实现更简单：

```js
var getActiveUploadObj = function () {
  try {
    return new ActiveXObject('TXFTNActiveX.FTMUpload') // IE 上传控件
  } catch (e) {
    return 'nextSuccessor'
  }
}

var getFlashUploadObj = function () {
  if (supportFlash()) {
    var str = '<object type="application/x-shockwave-flash"></object>'
    return $(str).appendTo($('body'))
  }
  return 'nextSuccessor'
}

var getFormUploadObj = function () {
  return $('<form><input name="file" type="file" /></form>').appendTo($('body'))
}

var getUploadObj = getActiveUploadObj.after(getFlashUploadObj).after(getFormUploadObj)
console.log(getUploadObj())
```

#### 小结
职责链可以帮助我们管理代码，降低发起请求的对象和处理请求对象之间的耦合性。职责链中的节点数量和顺序是可以自由变化的，我们可以在运行时决定链中包含哪些节点。

无论是作用域链、原型链，还是 DOM 节点中的事件冒泡，我们都能从中找到职责链模式的影子。

### 第十四章 中介者模式
面向对象设计鼓励将行为分布到各个对象中，把对象划分成更小的粒度，有助于增强对象的可复用性，但由于这些细粒度对象之间的联系激增，又有可能会反过来降低它们的可复用性。

中介者模式的作用就是解除对象与对象之间的耦合关系。增加一个中介者对象后，所有的相关对象都通过中介者对象来通信，而不是相互作用，所以当一个对象发生改变时，只需要通知中介者对象即可。中介者使各对象之间耦合松散，而且可以独立地改变它们之间的交互。中介者模式使网状的多对多关系变成了相对简单的一对多关系。

![中介者模式](https://camo.githubusercontent.com/e3c3b32c222742417e501b9faab5ed0977e6d11a2521d9be6d2525aa8f7385a0/68747470733a2f2f626c6f672d313235313437373232392e636f732e61702d6368656e6764752e6d7971636c6f75642e636f6d2f6a6176617363726970742d7061747465726e2f31342e322e312e706e67)

对于前者，如果对象 A 发生了改变，则需要同时通知跟 A 发生引用关系的 B、D、E、F 这 4 个对象；而后者则只需通知中介者对象即可。

#### 泡泡堂游戏
```js
/*
 * 每个玩家都是紧密耦合
 * 每个玩家对象都有两个属性：this.partners 和 this.enemies
 * 用来保存其他玩家对象的引用，但每个对象的状态发生改变时，
 * 比如角色移动、吃到道具或者死亡时，都必须显示遍历通知所有玩家 
 */

function Player (name) {
  this.partners = [] // 队友列表
  this.enemies = [] // 敌人列表
  this.state = 'live' // 玩家状态
  this.name = name // 角色名字
  this.teamColor = teamColor // 队伍颜色
}

Player.prototype.win = function () {
  console.log(this.name + 'won ')
}

Player.prototype.lose = function () {
  console.log(this.name + 'lost ')
}

// 在每个玩家死亡的时候，都需要遍历其他队友的生存状况，若全死则游戏结束
Player.prototype.die = function () {
  var all_dead = true
  this.state = 'dead'
  
  // 遍历队友列表
  for (var i = 0, partner; partner = this.partners[i++]; ) {
    if (partner.state !== 'dead') {
      all_dead = false
      break
    }
  }

  if (all_dead === true) {
    this.lose()
    // 通知所有队友玩家游戏失败
    for (var i = 0, partner; partner = this.partners[i++]; ) {
      partner.lose()
    }
    // 通知所有敌人游戏胜利
    for (var i = 0, enemy; enemy = this.enemies[i++]; ) {
      enemy.win()
    }
  }
}

var playerFactory = function (name, teamColor) {
  var newPlayer = new Player(name, teamColor)

  // 通知所有玩家有新角色加入
  for (var i = 0, player; player === players[i++]; ) {
    // 如果是同一队，则相互添加队友列表
    if (player.teamColor === newPlayer.teamColor) {
      player.partners.push(newPlayer)
      newPlayer.partners.push(player)
    } else {
      // 相互添加敌人列表
      player.enemies.push(newPlayer)
      newPlayer.enemies.push(player)
    }
  }
  players.push(newPlayer)

  return newPlayer
}

var players = []

var player1 = playerFactory('皮蛋1', 'red')
var player2 = playerFactory('皮蛋2', 'red')
var player3 = playerFactory('皮蛋3', 'red')
var player4 = playerFactory('皮蛋4', 'red')

var player5 = playerFactory('黑妞1', 'blue')
var player6 = playerFactory('黑妞2', 'blue')
var player7 = playerFactory('黑妞3', 'blue')
var player8 = playerFactory('黑妞4', 'blue')

// 让红队所有玩家死亡
player1.die()
player2.die()
player3.die()
player4.die()


/* 
 * 用中介者模式改造
 * 首先定义 Player 构造函数和 player 对象的原型方法
 * 在 player 对象的这些原型方法中，不再负责具体的执行逻辑，
 * 而是吧操作转交给中介者对象 PlayDirector
 */

function Player (name, teamColor) {
  this.name = name
  this.teamColor = teamColor
  this.state = 'alive'
}

Player.prototype.win = function () {
  console.log(this.name + ' won')
}

Player.prototype.lose = function () {
  console.log(this.name + ' lost')
}

// 玩家死亡
Player.prototype.die = function () {
  this.state = 'dead'
  // 给中介者发送消息，玩家死亡
  playerDirector.ReceiveMessage('playerDead', this)
}

// 移除玩家
Player.prototype.remove = function () {
  // 给中介者发送消息，移除一个玩家
  playerDirector.ReceiveMessage('removePlayer', this)
}

// 玩家换队
Player.prototype.changeTeam = function (color) {
  // 给中介者发送消息，玩家换队
  playerDirector.ReceiveMessage('changeTeam', this, color)
}

var playerFactory = function (name, teamColor) {
  var newPlayer = new Player(name, teamColor)
  // 向中介者发送消息，新增玩家
  playerDirector.ReceiveMessage('addPlayer', newPlayer)

  return newPlayer
}

/* 
 * 实现中介者 playerDirector 对象一般有以下两种方式：
 * 1. 发布-订阅模式，将 playerDirector 实现为订阅者，各 player 作为发布者，
 * 一旦 player 的状态发生改变，便推送消息给 playerDirector，
 * playerDirector 处理消息后将反馈发送给其他 player
 * 2. 在 playerDirector 中开发一些接收信息的接口，各 player 可以直接调用该接口
 * 来给 playerDirector 发送消息， player 只需传递一个参数给 playerDirector，
 * 这个参数的目的是使 playerDirector 可以识别发送者。同样，playerDirector 接收
 * 到信息之后会将处理结果反馈给其他 player。
 * 
 * 这两种方式的实现没什么本质上的区别。以下采用第二种方式。
 * 对外暴露 ReceiveMessage，负责接收 player 对象发送的消息，
 * player 对象发送消息的时候，总是把自身 this 作为参数发送给 playerDirector，
 * 以便 playerDirector 识别消息来自于哪个玩家对象
 */

var playerDirector = (function () {
  var players = {} // 保存所有玩家
  var operations = {} // 中介者可以执行的操作

  // 新增一个玩家
  operations.addPlayer = function (player) {
    var teamColor = player.teamColor
    players[teamColor] = players[teamColor] || []
    players[teamColor].push(player)
  }

  // 移除一个玩家
  operations.removePlayer = function (player) {
    var teamColor = player.teamColor
    var teamPlayers = players[teamColor] || []

    for (var i = teamPlayers.length - 1; i >= 0; i++) {
      if (teamPlayers[i] === player) {
        teamPlayers.splice(i, 1)
      }
    }
  }

  // 玩家换队
  operations.changeTeam = function (player, newTeamColor) {
    operations.removePlayer(player)
    player.teamColor = newTeamColor
    operations.addPlayer(player)
  }

  operations.playerDead = function (player) {
    var teamColor = player.teamColor
    var teamPlayers = players[teamColor]
    var all_dead = true

    for (var i = 0, player; player = teamPlayers[i++]; ) {
      if (player.state !== 'dead') {
        all_dead = false
        break
      }
    }

    if (all_dead === true) {
      for (var i = 0, player; player = teamPlayers[i++]; ) {
        player.lose()
      }

      for (var color in players) {
        if (color !== teamColor) {
          var teamPlayers = players[color]
          for (var i = 0, player; player = teamPlayers[i++];) {
            player.win()
          }
        }
      }
    }
  }

  var ReceiveMessage = function () {
    // arguments 的第一个参数作为消息名称
    var message = Array.prototype.shift.call(arguments)
    operations[message].apply(this, arguments)
  }

  return {
    ReceiveMessage
  }
})()
```

#### 小结
中介者模式是迎合迪米特法则的一种实现。迪米特法则也叫最小知识原则，是指一个对象应该尽可能少地了解另外的对象。如果对象之间的耦合性太高，一个对象发生改变后，难免会影响到其他对象。而在中介者模式里，对象之间几乎不知道彼此的存在，它们只能通过中介者对象来相互影响对方。

因此，中介者模式使各个对象之间得以解耦，以中介者和对象之间的一对多关系取代了对象之间的网状多对多关系。各个对象只需关注自身功能的实现，对象之间的交互关系交给了中介者对象来实现和维护。

中介者模式存在的最大缺点是：新增一个中介者对象，因为对象之间交付的复杂性，转移成了中介者对象的复杂性，使得中介者对象经常是巨大的，中介者对象自身往往就是一个难以维护的对象。

一般来说，如果对象之间的复杂耦合确实导致调用和维护出现了困难，而且这些耦合度随项目的变化呈指数增长，那我们就可以考虑用中介者模式来重构代码。

### 第十五章 装饰者模式
装饰者模式可以动态地给某个对象添加一些额外的职责，而不会影响从这个类中派生的其他对象。

又称为包装器模式。

#### 装饰函数
想要为函数添加一些功能，最简单粗暴的方式就是直接改写该函数，但这是最差的办法，直接违反了开发-封闭原则：

```js
var a = function () {
    alert(1)
}

// 改成：

var a = function () {
    alert(1)
    alert(2)
}
```

很多时候我们不想碰原函数。现在需要一个方法，在不改变函数源代码的情况下，给函数增加功能，这正是开发-封闭原则给我们指出的光明道路。

```js
var a = function () {
    alert(1)
}

var _a = a

var a = function () {
    _a()
    alert(2)
}

a()
```

这是实际开发中很常见的一种做法，比如我们想给 window 绑定 onload 事件，但又不确定这个事件是否已经被其他人绑定过，为了避免覆盖之前的 window.onload 函数中的行为，我们一般都会先保存好原先的 window.onload，把它放入新的 window.onload 里执行。

```js
window.onload = function () {
    alert(1)
}

var _onload = window.onload || function () {}

window.load = function () {
    _onload()
    alert(2)
}
```

#### 用 AOP 装饰函数
```js
Function.prototype.before = function (beforefn) {
  var __self = this // 保存原函数的引用
  return function () { // 返回包含了元函数和新函数的“代理”函数
    // 执行新函数，且保证 this 不被劫持，新函数接受的参数
    // 也会被原封不动地传入原函数，新函数在原函数之前执行
    beforefn.apply(this, arguments)
    
    // 执行原函数并返回原函数的执行结果，并保证 this 不被劫持
    return __self.apply(this, arguments)
  }
}

Function.prototype.after = function (afterfn) {
  var __self = this
  return function () {
    var ret = __self.apply(this, arguments)
    afterfn.apply(this, arguments)
    return ret
  }
}

// 之前的 window.onload 例子

window.onload = function () {
  alert(1)
}

window.onload = (window.onload || function () {}).after(function () {
  alert(2)
}).after(function () {
  alert(3)
}).after(function () {
  alert(4)
})
```

不污染原型的方式：把原函数和新函数都作为参数传入 before 或 after 方法：

```js
var before = function (fn, beforefn) {
  return function () {
    beforefn.apply(this, arguments)
    return fn.apply(this, arguments)
  }
}

var a = before(
  function () {alert(3)},
  function () {alert(2)}
)
a = before(a, function () {alert(1)})

a()
```

#### AOP 的应用案例
##### 1. 数据统计上报
分离业务代码和数据统计代码，无论在什么语言中，都是 AOP 的经典应用之一。在项目开发的结尾开阶段难免要加上很多统计数据的代码，这些过程可能让我们被迫改动早已封装好的函数。

```js
/* 
<html
  <button tag="login" id="button">点击打开登录浮层</button
</html
*/
var showLogin = function () {
  console.log('打开登录浮层')
  log(this.getAttribute('tag'))
}

var log = function (tag) {
  console.log(`上报标签为：${tag}`)
  // (new Image).src = `http://xxx.com/report?tag=${tag}` // 真正的上报代码略
}

document.getElementById('button').onclick = showLogin
```

showLogin 函数里既要负责打开登录图层，又要负责数据上报，这是两个层面的功能，在此处却要被耦合在一个函数里。使用 AOP 分离之后，代码如下：

```js
/* 
<html
  <button tag="login" id="button">点击打开登录浮层</button
</html
*/

Function.prototype.after = function (afterfn) {
  var __self = this

  return function () {
    var ret = __self.apply(__self, arguments)
    afterfn.apply(this, arguments)
    return ret
  }
}

var showLogin = function () {
  console.log('打开登录浮层')
}

var log = function () {
  console.log('上报标签为：', this.getAttribute('tag'))
}

showLogin = showLogin.after(log) // 打开登录浮层之后上传数据

document.getElementById('button').onclick = showLogin
```

##### 2. 用 AOP 动态改变函数的参数
观察 Function.prototype.before 方法：

```js
Function.prototype.before = function (beforefn) {
    var __self = this
    return function () {
        beforefn.apply(this, arguments)
        return __self.apply(this, arguments)
    }
}
```

```js
var func = function (param) {
  console.log(param) // { a: 'a', b: 'b' }
}

func = func.before(function (param) {
  param.b = 'b'
})

func({ a: 'a' })

var ajax = function (type, url, param) {
  console.dir(param)
  // 发送 ajax 请求的代码略
}

ajax('get', 'http://xxx.com/userinfo', { name: 'sven' })


// 由于受到 CSRF 攻击，最简单的办法是在 HTTP 请求中带上一个 Token 参数。
var getToken = function () {
  return 'token'
}

var ajax = function (type, url, param) {
  param = param || {}
  param.Token = getToken()
}
```

用 AOP 的方式给 ajax 函数动态装饰上 Token 参数，保证了 ajax 函数是一个相对纯净的函数，提高了 ajax 函数的可复用性，它在被迁往其他项目的时候，不需要做任何修改。

```js
var ajax = function (type, url, param) {
  console.dir(param)
}

// 把 Token 参数通过 Function.prototype.before 装饰到 ajax 函数的参数 param 对象中：

var getToken = function () {
  return 'Token'
}

ajax = ajax.before(function (type, url, param) {
  param.token = getToken()
})

ajax('get', 'http://xxx.com/userinfo', { name: 'sven' })

// 从 ajax 函数打印的 log 可以看到，Token 参数已经被附加到了 ajax 请求的参数中：

{ name: 'sven', Token: 'token' }
```

##### 3. 插件式的表单验证
formSubmit 函数在此处承担了两个职责，除了提交 ajax 请求之外，还要验证用户输入的合法性。这种代码以来会造成函数臃肿，职责混乱，二来谈不上任何可复用性。代码如下：

```js
var username = document.getElementById('username')
var password = document.getElementById('password')
var submitBtn = document.getElementById('submitBtn')

var formSubmit = function () {
  if (username.value === '') {
    return alert('用户名不能为空')
  }
  if (password.value === '') {
    return alert('密码不能为空')
  }

  var param = {
    username: username.value,
    password: password.value
  }

  ajax('http://xxx.com/login', param)
}

submitBtn.onclick = function () {
  formSubmit()
}
```

现在的代码有一些改进，把校验的逻辑都放到了 validate 函数中，但 formSubmit 函数内部还要计算 validate 函数的返回值，因为返回的结果表明了是否通过校验。代码如下：

```js
var validate = function () {
  if (username.value === '') {
    alert('用户名不能为空')
    return false
  }
  if (password.value === '') {
    alert('密码不能为空')
    return false
  }
}

var formSubmit = function () {
  if (validate() === false) {
    return
  }
  var param = {
    username: username.value,
    password: password.value
  }
  ajax('http://xxx.com/login', param)
}

submitBtn.onclick = function () {
  formSubmit()
}
```

校验输入和提交表单的代码完全分离开开来，不再有任何耦合关系。代码如下：

```js
Function.prototype.before = function (beforefn) {
  var __self = this
  return function () {
    // beforefn 返回 false 的情况直接 return，不再执行后面的函数
    if (beforefn.apply(this, arguments) === false) {
      return
    }
    return __self.apply(this, arguments)
  }
}

var validate = function () {
  if (username.value === '') {
    alert('用户名不能为空')
    return false
  }
  if (password.value === '') {
    alert('密码不能为空')
    return false
  }
}

var formSubmit = function () {
  var param = {
    username: username.value,
    password: password.value
  }
  ajax('http://xxx.com', param)
}

formSubmit.before(validate)

submitBtn.onclick = function () {
  formSubmit()
}
```

函数通过 Function.prototype.before 或 Function.prototype.after 被装饰之后，返回的实际上是一个新的函数，如果在原函数保存了一些属性，那么这些属性会丢失。另外，装饰方式也叠加了函数的作用域，如果装饰的链条过长，性能上也会受到一些影响。

#### 装饰者模式和代理模式
两者的机构看起来非常相像，都描述了怎样为对象提供一定程度上的间接引用，它们的实现部分都保留了对另外一个对象的引用，并且向那个对象发送请求。

代理模式和装饰者模式最重要的区别在于它们的意图和目的。

代理模式的目的是：当直接访问本体不方便或者不符合需求时，为这个本体提供一个替代者。本体定义了关键功能，而代理提供货拒绝对它的访问，或者在访问本体之前做一些额外的事情。

装饰者模式的作用就是为对象动态加入行为。

换句话说，代理模式强调一种关系（Proxy 与它的实体之间的关系），这种关系可以静态的表达，也就是说，这种关系在一开始就可以被确定。而装饰者模式用于一开始不能确定对象的全部功能时。代理模式通常只有一层代理-本体的引用，而装饰者模式经常会形成一条常常的装饰链。

在虚拟代理实现突破预加载的例子中，本体负责设置 img 节点的 src，代理则提供了预加载的功能，这看起来也是“加入行为”的一种方式，但这种加入行为的方式和装饰者模式的偏重点是不一样的。装饰者模式是实实在在的为对象增加新的职责和行为，而代理做的事情还是跟本体一样，最终都是设置 src。但代理可以加入一些“聪明”的功能，比如在图片真正加载好之前，先使用一张站位的 loading 图片。

#### 小结
除了上述提到的例子，装饰者模式在框架开发中也十分有用。作为框架坐着，我们希望框架里的函数提供的是一些稳定而方便移植的功能，那些个性化的功能可以在框架之外动态装饰上去，这可以避免为了让框架拥有更多功能，而去使用一些 if、else 语句预测用户的实际需要。

### 第十六章 状态模式
状态模式的关键是区分事物内部的状态，事物内部状态的改变往往会带来事物的行为改变。

#### 初识状态模式
```js
/**
 * 同一个开关切换灯的状态。
 * 然而灯的种类有多种，如：强弱关状态的灯。
 * 因此不能不改造 buttonWasPressed 方法
 * 这有以下几点缺点：
 * 1. buttonWasPressed 违反开发-封闭原则
 * 2. 所有状态有关的行为都被封装在 buttonWasPressed 方法里，会随着迭代不能膨胀
 * 3. 状态的切换不明显，需看完 buttonWasPressed 方法才能知道有多少种状态
 * 4. 状态之间的切换状态，不过是往 buttonWasPressed 里堆砌 if、else 语句，难以阅读和维护
 */

var Light = function () {
  this.state = 'off'
  this.button = null
}

Light.prototype.init = function () {
  var button = document.createElement('button')
  var self = this

  button.innerHTML = '开关'
  this.button = document.body.appendChild(button)
  this.button.onclick = function () {
    self.buttonWasPressed()
  }
}

Light.prototype.buttonWasPressed = function () {
  if (this.state === 'off') {
    console.log('开灯')
    this.state = 'on'
  } else if (this.state === 'on') {
    console.log('关灯')
    this.state = 'off'
  }
}

var light = new Light()
light.init()
```

##### 状态模式改进电灯程序
通常我们谈到封装，一般都会优先封装对象的行为，而不是对象的状态。但在状态模式中刚好相反，状态模式的关键是把事物的每种状态都封装成单独的类，跟此种状态有关的行为都被封装在这个类的内部，所以 button 被按下的时候，只需要在上下文中，把这个请求委托给当前的状态对象即可，该状态对象会负责执行它自身的行为，如下图所示：

![16.1](https://camo.githubusercontent.com/9fab0315d034af1553d1fc000f3af12a42bc8b889bf1651628d62604f31f2f2e/68747470733a2f2f626c6f672d313235313437373232392e636f732e61702d6368656e6764752e6d7971636c6f75642e636f6d2f6a6176617363726970742d7061747465726e2f31362e312e706e67)

同时我们还可以把状态的切换规则事先分布在状态类中，这样就有效地消除了原本存在的大量条件分支语句，如下图所示：

![16.2](https://camo.githubusercontent.com/96879d62931c83f3b64f3cf8fc9abd29e1182e86cda01ce53bf5ac27dacbd7fb/68747470733a2f2f626c6f672d313235313437373232392e636f732e61702d6368656e6764752e6d7971636c6f75642e636f6d2f6a6176617363726970742d7061747465726e2f31362e322e706e67)

```js
/**
 * 状态模式改进电灯程序
 * 首先定义 3 个状态类，分别是 OffLightState、WeakLightState、StrongLightState
 * 这三个类都有一个原型方法 buttonWasPressed，代表各自状态下，按钮被按下时将发生的行为
 */

// OffLightState

var OffLightState = function (light) {
  this.light = light
}

OffLightState.prototype.buttonWasPressed = function () {
  console.log('弱光') // offLightState 对应的行为
  this.light.setState(this.light.weakLightState) // 切换状态到 weakLightState
}

// WeakLightState

var WeakLightState = function (light) {
  this.light = light
}

WeakLightState.prototype.buttonWasPressed = function () {
  console.log('强光')
  this.light.setState(this.light.strongLightState)
}

// WeakLightState

var StrongLightState = function (light) {
  this.light = light
}

StrongLightState.prototype.buttonWasPressed = function () {
  console.log('关灯')
  this.light.setState(this.light.offLightState)
}

/**
 * 改写 Light 类
 * 不使用字符串记录当前状态，而是使用更加立体化的状态对象。
 * 在构造函数里为每个状态都创建一个状态对象，这样对多少种状态一目了然
 */

var Light = function () {
  this.offLightState = new OffLightState(this)
  this.weakLightState = new WeakLightState(this)
  this.strongLightState = new StrongLightState(this)
  this.button = null
}

Light.prototype.init = function () {
  var button = document.createElement('button')
  var self = this

  this.button = document.body.append(button)
  this.button.innerHTML = '开关'

  this.currState = this.offLightState // 设置当前状态

  this.button.onclick = function () {
    self.currState.buttonWasPressed()
  }
}

Light.prototype.setState = function (newState) {
  this.currState = newState
}

var light = new Light()
light.init()
```

状态模式使得每一种状态和它对应的行为之间的关系局部化，这些行为被分散和封装在各自对应的状态类之中，便于阅读和管理代码。

当需要增加一种新状态时，只需增加一个新的状态类，再更改与之相关联的状态即可。

#### 缺少抽象类的变通方式
我们看到，在状态类中将定义一些共同的行为方法，Context 最终会将请求委托给状态对象的这些方法。在上述例子中，这个方法就是 buttonWasPressed。无论增加了多少种状态类，它们都必须实现 buttonWasPressed 方法。

由于 JavaScript 既不支持抽象类，也没有接口的概念，所以难以避免出现状态类未定义 buttonWasPressed 方法，导致在状态切换时抛出异常。

```js
var State = function () {}

State.prototype.buttonWasPressed = function () {
  throw new Error('父类的 buttonWasPressed 方法必须被重写')
}

var SuperStrongLightState = function (light) {
  this.light = light
}

SuperStrongLightState.prototype = new State() // 继承抽象父类

SuperStrongLightState.prototype.buttonWasPressed = function () { // 重写 buttonWasPressed 方法
  console.log('关灯')
  this.light.setState(this.light.offLightState)
}
```

#### 另一个状态模式示例——文件上传
实际上，不论是文件上传，还是音乐，视频播放器，都可以找到一些明显的状态区分。比如文件上传程序中有扫描、正在上传、暂停、上传成功、上传失败这几种状态，音乐播放器可以分为加载中、正在播放、暂停、播放完毕这几种状态。点击同一个按钮，在上传中和暂停状态下的行为表现是不一样的。

相对于电灯的例子，文件上传不同的地方在于，现在我们将面临更加复杂的条件切换关系。电灯的状态总是循规蹈矩的 A->B->C->A，所以即使不使用状态模式来编写电灯的程序，而是使用原始的 if、else 来控制状态切换也能胜任。

而文件上传的状态切换相比要复杂得多，有暂停/继续上传与删除文件两个按钮：

* 文件在扫描状态中，是不能进行任何操作的，既不能暂停也不能删除文件，只能等待扫描完成。扫描完成之后，根据文件的 md5 值判断，若确认该文件已经存在于服务器，则直接跳到上传完成状态。如果该文件的大小超过允许上传的最大值，或者该文件已经损坏，则跳往上传失败状态。剩下的情况下才进入上传中状态。
* 上传过程中可以点击暂停按钮来暂停上传，暂停后点击同一个按钮会继续上传。
* 扫描和上传过程中，点击删除按钮无效，只要在暂停、上传完成、上传失败之后，才能删除文件。

##### 一些准备工作
在本例子中，上传是一个异步的过程，所以控件会不停地调用 JavaScript 提供的一个全局函数 window.external.upload，来通知 JavaScript 目前的上传进度，控件会把当前的文件状态作为参数 state 塞进 window.external.upload。这里我们简单地用 setTimeout 来模拟文件的上传进度，window.external.upload 函数在此例也只负责打印一些 log。

```js
/**
 * 反例：与电灯第一个案例一样
 * 充斥着 if、else 条件语句，状态与行为都被耦合成一个巨大的方法里
 * 难以修改和扩展这个状态机。
 */

/* S 保持不变：上传插件及 window.external.upload 函数 */
window.external.upload = function (state) {
  console.log(state) // 可能为 sign、uploading、done、error
}

// 用于上传的插件对象
var plugin = (function () {
  var plugin = document.createElement('embed')
  plugin.style.display = 'none'

  plugin.type = 'application/txfn-webkit'

  plugin.sign = function () {
    console.log('开始文件扫描')
  }

  plugin.pause = function () {
    console.log('暂停文件上传')
  }

  plugin.uploading = function () {
    console.log('开始文件上传')
  }

  plugin.del = function () {
    console.log('删除文件上传')
  }

  plugin.done = function () {
    console.log('文件上传完成')
  }

  plugin.body.appendChild(plugin)

  return plugin
})()
/* E 保持不变：上传插件及 window.external.upload 函数 */

var Upload = function (fileName) {
  this.plugin = plugin
  this.fileName = fileName
  this.button1 = null
  this.button2 = null
  this.state = 'sign' // 设置初始状态为 waiting
}

Upload.prototype.init = function () {
  var that = this
  this.dom = document.createElement('div')
  this.dom.innerHTML = 
    '<span>文件名称：'+ this.fileName +'</span>\
    <button data-action="button1">扫描中</button>\
    <button data-action="button2">删除</button>'

  document.body.appendChild(this.dom)
  this.button1 = this.dom.querySelector('[data-action="button1"]')
  this.button2 = this.dom.querySelector('[data-action="button2"]')
  this.bindEvent()
}

Upload.prototype.bindEvent = function () {
  var self = this
  this.button1.onclick = function () {
    if (self.state === 'sign') {
      console.log('扫描中，点击无效...')
    } else if (self.state === 'uploading') {
      this.changeState('pause')
    } else if (self.state === 'pause') {
      this.changeState('uploading')
    } else if (self.state === 'done') {
      console.log('文件已完成上传，点击无效')
    } else if (self.state === 'error') {
      console.log('文件上传失败，点击无效')
    }
  }

  this.button2.onclick = function () {
    if (self.state === 'done' ||
      self.state === 'error' ||
      self.state === 'pause') {
        self.changeState('del')
      } else if (self.state === 'sign')  {
        console.log('文件正在扫描中，不能删除')
      } else if (self.state === 'uploading') {
        console.log('文件正在上传中，不能删除')
      }
  }
}

Upload.prototype.changeState = function (state) {
  switch (state) {
    case 'sign':
      this.plugin.sign()
      this.button1.innerHTML = '扫描中，任何操作无效'
      break
    case 'uploading':
      this.plugin.uploading()
      this.button1.innerHTML = '正在上传，点击暂停'
      break
    case 'pause':
      this.plugin.pause()
      this.button1.innerHTML = '已暂停，点击继续上传'
      break
    case 'done':
      this.plugin.done()
      this.button1.innerHTML = '上传完成'
      break
    case 'error':
      this.plugin.error()
      this.button1.innerHTML = '上传失败'
      break
    case 'del':
      this.plugin.del()
      this.dom.parentNode.removeChild(this.dom)
      console.log('删除完成')
      break
  }
  this.state = state
}

var uploadObj = new Upload('uploader')

uploadObj.init()

// 插件调用 JavaScript 的方法
window.external.upload = function (state) {
  uploadObj.changeState(state)
}

// 文件开始扫描
window.external.upload('sign')

// 1 秒后开始上传
setTimeout(() ={
  window.external.upload('uploading')
}, 1000)

// 5 秒后上传完成
setTimeout(() ={
  window.external.upload('done')
}, 5000)
```

##### 状态模式重构文件上传程序
```js
/**
 * 状态模式重构文件上传程序
 */

var Upload = function (fileName) {
  this.plugin = plugin
  this.fileName = fileName
  this.button1 = null
  this.button2 = null
  this.signState = new SignState(this)
  this.uploadingState = new UploadingState(this)
  this.pauseState = new PauseState(this)
  this.doneState = new DoneState(this)
  this.errorState = new ErrorState(this)
  this.currState = this.signState
}

// 保持不变，仍负责往页面中创建跟上传流程有关的 DOM 节点，并开始绑定按钮事件
Upload.prototype.init = function () {
  var that = this
  this.dom = document.createElement('div')
  this.dom.innerHTML = 
    '<span>文件名称：'+ this.fileName +'</span>\
    <button data-action="button1">扫描中</button>\
    <button data-action="button2">删除</button>'

  document.body.appendChild(this.dom)
  this.button1 = this.dom.querySelector('[data-action="button1"]')
  this.button2 = this.dom.querySelector('[data-action="button2"]')
  this.bindEvent()
}

// 负责具体的按钮事件实现，在点击按钮后，Context 并不做任何具体的操作，
// 而是把请求委托给当前的状态类来执行
Upload.prototype.bindEvent = function () {
  var self = this
  this.button1.onclick = function () {
    self.currState.clickHandler1()
  }
  this.button2.onclick = function () {
    self.currState.clickHandler2()
  }
}

// 把状态对应的逻辑放在 Upload 类中
Upload.prototype.sign = function () {
  this.plugin.sign()
  this.currState = this.signState
}

Upload.prototype.uploading = function () {
  this.button1.innerHTML = '正在上传，点击暂停'
  this.plugin.uploading()
  this.currState = this.uploadingState
}

Upload.prototype.pause = function () {
  this.button1.innerHTML = '已暂停，点击继续上传'
  this.plugin.pause()
  this.currState = this.pauseState
}

Upload.prototype.done = function () {
  this.button1.innerHTML = '上传完成'
  this.plugin.done()
  this.currState = this.doneState
}

Upload.prototype.error = function () {
  this.button1.innerHTML = '上传失败'
  this.currState = this.errorState
}

Upload.prototype.del = function () {
  this.plugin.del()
  this.dom.parentNode.removeChild(this.dom)
}

// 编写各个状态类的实现。这里使用 StateFactory 来避免因 JavaScript 中午抽象类所带来的问题

var StateFactory = (function () {
  var state = function () {}

  State.prototype.clickHandler1 = function () {
    throw new Error('子类必须重写父类的 clickHandle1 方法')
  }

  State.prototype.clickHandler2 = function () {
    throw new Error('子类必须重写父类的 clickHandle2 方法')
  }

  return function (param) {
    var F = function (uploadObj) {
      this.uploadObj = uploadObj
    }

    F.prototype = new State()
    
    for (var key in param) {
      F.prototype[key] = param[key]
    }

    return F
  }
})

var SignState = StateFactory({
  clickHandler1 () {
    console.log('扫描中，点击无效...')
  },
  clickHandler2 () {
    console.log('文件正在上传中，不能删除')
  }
})

var UploadingState = StateFactory({
  clickHandler1 () {
    this.uploadObj.pause()
  },
  clickHandler2 () {
    console.log('文件正在上传中，不能删除')
  }
})

var PauseState = StateFactory({
  clickHandler1 () {
    this.uploadObj.uploading()
  },
  clickHandler2 () {
    this.uploadObj.del()
  }
})

var DoneState = StateFactory({
  clickHandler1 () {
    console.log('文件已完成上传，点击无效')
  },
  clickHandler2 () {
    this.uploadObj.del()
  }
})

var ErrorState = StateFactory({
  clickHandler1 () {
    console.log('文件上传失败，点击无效')
  },
  clickHandler2 () {
    this.uploadObj.del()
  }
})

// 测试

var uploadObj = new Upload('uploader')
uploadObj.init()

window.external.upload = function (state) {
  uploadObj[state]()
}

window.external.upload('sign')


// 1 秒后开始上传
setTimeout(() ={
  window.external.upload('uploading')
}, 1000)

// 5 秒后上传完成
setTimeout(() ={
  window.external.upload('done')
}, 5000)
```

#### 状态模式的优缺点
**优点**：

* 状态模式定义了状态与行为之间的关系，并将它们封装在一个类里。通过增加新的状态类，很容易增加新的状态和转换。
* 避免 Context 无限膨胀，状态切换的逻辑被分布在状态类中，也去掉了 Context 中原本过多的条件分支。
* 用对象代替字符串来记录当前状态，使得状态的切换更加一目了然。
* Context 中的请求动作和状态类中封装的行为可以非常独立变化而互不影响。

**缺点**：

* 需要定义许多状态类，较为枯燥和占用内存
* 逻辑分散在状态类中，无法在一个地方看出整个状态机的逻辑

#### 状态模式和策略模式的关系
两者像是一对双胞胎，都封装了一系列算法或行为。它们的类图看起来几乎一致，但在意图上有很大不同。

两者相同点是：它们都有一个上下文、一些策略或状态类，上下文把请求委托给这些类来执行。

它们之间的区别是：

* 策略模式中的各个策略类之间是平等且平行的，它们之间没有任何联系，所以客户必须熟知这类策略类的作用，以便客户可以随时主动切换算法；
* 状态模式中，状态和状态对应的行为是早已被封装好的，状态之间的切换也早被规定完成，“改变行为”这件事情发生在状态模式内部。对客户来说，并不需要了解这些细节。这正是状态模式的作用所在。

#### JavaScript 版本的状态机
前面两个示例都是模拟传统面向对象语言的状态模式实现，我们为每种状态都定义一个状态之类，然后在 Context 中持有这些状态对象的引用，以便把 currState 设置为当前的状态对象。

状态模式是状态机的实现之一。JavaScript 可以非常方便地使用委托技术，并不需要事先让一个对象持有另一个对象。下面的状态机选择了通过 Function.prototype.call 方法直接把请求委托给某个字面量对象来执行。

```js
/**
 * JavaScript 版本的状态机
 * 1. 利用 Function.prototype.call
 * 2. 用闭包替代面向对象
 */

// 1. 利用 Function.prototype.call
var Light = function () {
  this.currState = FSM.off
  this.button = null
}

Light.prototype.init = function () {
  var button = document.createElement('button')
  var self = this

  button.innerHTML = '已关灯'
  this.button = document.body.appendChild(button)

  this.button.onclick = function () {
    // 把请求委托给 FSM 状态机
    self.currState.buttonWasPressed.call(self)
  }
}

var FSM = {
  off: {
    buttonWasPressed () {
      console.log('关灯')
      this.button.innerHTML = '下一次按我是开灯'
      this.currState = FSM.on
    }
  },
  on: {
    buttonWasPressed () {
      console.log('开灯')
      this.button.innerHTML = '下一次按我是关灯'
      this.currState = FSM.off
    }
  }
}

var light = new Light()
light.init()

// 2. 闭包代替面向对象

var delegate = function (client, delegation) {
  return {
    buttonWasPressed () {
      return delegation.buttonWasPressed.apply(client, arguments)
    }
  }
}


var FSM = {
  off: {
    buttonWasPressed () {
      console.log('关灯')
      this.button.innerHTML = '下一次按我是开灯'
      this.currState = this.onState
    }
  },
  on: {
    buttonWasPressed () {
      console.log('开灯')
      this.button.innerHTML = '下一次按我是关灯'
      this.currState = this.offState
    }
  }
}

var Light = function () {
  this.offState = delegate(this, FSM.off)
  this.onState = delegate(this, FSM.on)
  this.currState = this.offState
  this.button = null
}

Light.prototype.init = function () {
  var button = document.createElement('button')
  var self = this

  button.innerHTML = '已关灯'
  this.button = document.body.appendChild(button)
  this.button.onclick = function () {
    self.currState.buttonWasPressed()
  }
}

var light = new Light()
light.init()
```

#### 表驱动的有限状态机
基于表驱动的是实现状态机的另一种方式。我们可以在表中很清楚地看到下一个状态是由当前状态和行为共同决定。这样一来，我们就可以在表中查找状态，而不必定义很多条件分支。

状态转移表		
当前状态→条件 ↓	状态A	状态B	状态C
条件X	...	...	...
条件Y	...	状态C	...
条件Z	...	...	...
Github 上有个对应的库实现，通过这个库，可以很方便地创建出 FSM：

```js
var fsm = StateMachine.create({
  initial: 'off',
  events: [
    { name: 'buttonWasPressed', from: 'off', to: 'on' },
    { name: 'buttonWasPressed', from: 'on', to: 'off' }
  ],
  callbacks: {
    onbuttonWasPressed (event, from, to) {
      console.log(arguments)
    }
  },
  error (eventName, from, to, args, errorCode, errorMessage) {
    // 从一种状态试图切换到一种不可能到达的状态的时候
    console.log(arguments)
  }
})
```

库地址：https://github.com/jakesgordon/javascript-state-machine

### 第十七章 适配器模式
适配器模式的作用是解决两个软件实体间的接口不兼容的问题。使用适配器模式之后，原本由于接口不兼容而不能工作的两个软件实体可以一起工作。

适配器的别名是包装器（wrapper）。

#### 适配器模式的应用
适配器是一种“亡羊补牢”的模式，我们不会在程序设计之初就使用它。

```js
/**
 * 对于最初的地图案例，假如百度的展示不叫 show 而叫 display。
 * 由于百度是第三方对象，正常情况下我们都不应该去改动它。
 * 此时我们可以通过增加适配器来解决这个问题
 */

var googleMap = {
  show () {
    console.log('开始渲染谷歌地图')
  }
}

var baiduMap = {
  display () {
    console.log('开始渲染百度地图')
  }
}

var baiduMapAdapter = {
  show () {
    return baiduMap.display()
  }
}

renderMap(googleMap) // 输出：开始渲染谷歌地图
renderMap(baiduMapAdapter) // 输出：开始渲染百度地图
```

#### 小结
适配器模式是一种相对简单的模式。在本书提及的设计模式中，有一些模式跟适配器模式的结构非常相似，如装饰者模式、代理模式和外观模式（第十九章提及）。这几种模式都属于“包装模式”，都是由一个对象来包装另一个对象。区别它们的关键仍是模式的意图。

* 适配器模式主要用来解决两个已有接口之间不匹配的问题，它不考虑这些接口是怎么实现的，也不考虑它们将来可能会如何演化。适配器模式不需要改变已有的接口，就能够使它们协同作用。
* 装饰者模式和代理模式也不会改变原有对象的接口，但装饰者模式的作用是为了给对象增加功能。装饰者模式常常形成一条长的装饰链，而适配器模式通常只包装一次。代理模式是为了控制对象的访问，通常也只包装一次。
* 外观模式的作用与适配器比较相似。外观模式最显著的特点是定义了一个新的接口。

## 第三部分 设计原则和编程技巧
设计原则通常指单一职责原则、里氏替换原则、依赖倒置原则、接口隔离原则、合成复用原则和最少知识原则。

### 第十八章 单一职责原则 SRP
单一原则的职责被定义为“引起变化的原因”。如果我们有两个动机去改写一个方法，那么这个方法就具有两个职责。职责越多，那么在需求的变迁过程中，需要改写这个方法的可能性就越大。

SRP 的原则体现为：一个对象（方法）只能做一件事。

SRP 原则在很多设计模式中都有着广泛的应用，如代理模式、迭代器模式、单例模式和装饰者模式。

### 第十九章 最少知识原则 LKP
最少知识原则说的是一个软件实体应当尽可能少地与其他实体发生相互作用。这里的软件实体是一个广义的概念，不仅包括对象，还包括系统、类、模块、函数、变量等。

#### 减少对象之间的联系
单一职责原则指导我们把对象划分成较小的粒度，这样可以提高对象的可复用性。但越来越多的对象之间可能会产生错综复杂的关系，如果修改了其中一个对象，很可能会影响到跟它相互引用的其他对象。

最少知识原则要求我们在设计程序时，应该尽量减少对象之间的交互。如果两个对象之间不必彼此直接通信，那么这两个对象就不要发生直接的互相联系。常见的做法是引入一个第三者对象来承担这些对象之间的通信作用。

#### 设计模式中的最少知识原则
最少知识原则在设计模式中体现得最多的地方是中介者模式和外观模式。

**外观模式**

![外观模式](https://camo.githubusercontent.com/3ff0a7d4b83a58a59f91e4ed9f46fdace63aaf698b9fe11bb8347baa57bed09a/68747470733a2f2f626c6f672d313235313437373232392e636f732e61702d6368656e6764752e6d7971636c6f75642e636f6d2f6a6176617363726970742d7061747465726e2f31392e312e706e67)

外观模式主要是为子系统的一组接口提供一个一致的界面，外观模式定义了一个高层接口，使得子系统更佳容易使用。

外观模式的作用是对客户屏蔽一组子系统的复杂性。外观模式对客户提供了一个简单易用的高层接口，高层接口会把客户的请求转发给子系统来完成具体的功能实现。请求外观并不是强制的，如果外观不能满足客户的个性化需求，那么客户也可以选择越过外观来直接访问子系统。

全自动洗衣机的一键洗衣按钮就是一个外观。

### 第二十章 开放-封闭原则
定义：软件实体（类、模块、函数）等应该是可以扩展的，但是不可修改。

#### 扩展 window.onload 函数
为 window.onload 新增需求，我们往往是直接在原来函数内进行修改。但修改代码是一种危险的行为。因此，这里我们可以通过装饰者模式在不修改原代码的情况下，新增函数。新增代码和原代码可以进水不犯河水。

**开放-封闭原则的思想：当需要改变一个程序的功能或者给这个程序增加新功能时，可以使用增加代码的方式，但是不允许改动程序的源代码。**

#### 用对象的多态性消除条件分支
过多的条件分支语句是造成程序违反开放-封闭原则的一个常见原因。每当增加一个新的 if 语句时，都要被迫改动原函数。把 if 换成 switch-case 是没用的，这是换汤不换药的做法。实际上，每当我们看到一大片的 if 或者 switch-case 语句时第一时间就应该考虑能否利用对象的多态性来重构它们。

利用对象的多态性来让程序遵守开放-封闭原则是一个常用的技巧。

#### 找出变化的地方
开放-封闭原则并没有实际的模板教导我们怎样亦步亦趋地实现它。但我们还是能找到一些让程序尽量遵守开放-封闭原则的规律，最明显的就是找出程序中将要发生变化的地方，然后把变化封装起来。

其他可以帮助我们编写遵守开发-封闭原则代码的方式还有：放置挂钩（第十一章——模板方法模式）、使用回调函数。

#### 设计模式中的开放-封闭原则
几乎所有的设计模式都遵守开放-封闭原则。可以这么说，开放-封闭原则是编写一个好程序的目标，其他设计原则都是达到这个目标的过程。

读书笔记至此完毕！

