/**
 * @Author: forguo
 * @Date: 2022/3/28 17:17
 * @Description: promise.js
 */

/**
 * Question 1
 */

var name = 'window'

var person1 = {
    name: 'person1',
    show1: function () {
        console.log(this.name)
    },
    show2: () => console.log(this.name),
    show3: function () {
        return function () {
            console.log(this.name)
        }
    },
    show4: function () {
        return () => console.log(this.name)
    }
}
var person2 = { name: 'person2' }

person1.show1()  // person1
person1.show1.call(person2)  // person2

person1.show2() // window
person1.show2.call(person2)  // window

person1.show3()() // window
person1.show3().call(person2) // person2
person1.show3.call(person2)()// window

person1.show4()() // person1
person1.show4().call(person2) // person1
person1.show4.call(person2)() // person2


/**
 * Question 2
 */
var name = 'window'

function Person (name) {
    this.name = name;
    this.show1 = function () {
        console.log(this.name)
    }
    this.show2 = () => console.log(this.name)
    this.show3 = function () {
        return function () {
            console.log(this.name)
        }
    }
    this.show4 = function () {
        return () => console.log(this.name)
    }
}

var personA = new Person('personA')
var personB = new Person('personB')

personA.show1() // personA
personA.show1.call(personB) // personB

personA.show2() // personA
personA.show2.call(personB) // personA

personA.show3()() // window
personA.show3().call(personB) // personB
personA.show3.call(personB)() // window

personA.show4()() // personA
personA.show4().call(personB) // personA
personA.show4.call(personB)() // personB
