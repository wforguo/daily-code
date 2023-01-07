/**
 * @Author: forguo
 * @Date: 2023/1/7 20:23
 * @Description: 行程
 */

interface ICar {
    number: number
    name: string
    price?: number
}

// 车
class Car {
    public number: number
    public name: string
    constructor(number: number, name: string) {
        this.number = number
        this.name = name
    }
}

// 专车
class ProfessionalCar extends Car {
    public price: number
    constructor(number: number, name: string) {
        super(number, name)
        this.price = 100
    }
}

// 快车
class ExpressCar extends Car {
    public price: number
    constructor(number: number, name: string) {
        super(number, name)
        this.price = 50
    }
}

// 行程
class Trip {
    public car: ICar
    constructor(car: ICar) {
        this.car = car
    }
    start() {
        console.log(`行程开始，车辆：${this.car.name}，车牌号：${this.car.number}`)
    }
    end(distance: number = 1) {
        console.log(
            `行程结束，车辆：${this.car.name}，车牌号：${this.car.number}，价格：${(this.car.price || 0) * distance}`
        )
    }
}

const car = new ExpressCar(10086, '桑塔纳')
const trip = new Trip(car)
trip.start()
trip.end(10)

export default Car
