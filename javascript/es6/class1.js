class People {
    constructor(name, gender) {
        this.name = name;
        this.gender = gender;
    }

    hello() {
        console.log(`hello mys name is ${this.name},i am ${this.gender}`)
    }
}

class Student extends People {
    constructor(name, gender, stno) {
        super(name, gender);
        this.stno = stno;
    }

    study() {
        console.log(`${this.name} is study`)
    }
}

const wei = new People('forguo', 'girl');
const guo = new Student('guo', 'boy');
console.log(wei);
console.log(guo);
wei.hello();
guo.study();
