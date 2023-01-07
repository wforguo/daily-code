/**
 * @Author: forguo
 * @Date: 2023/1/7 20:23
 * @Description: 停车场
 */

const rawCode = () => {
    // 生成uuid
    function uuid() {
        const s: any[] = []
        const hexDigits = '0123456789abcdef'

        for (let i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
        }

        s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010

        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01

        s[8] = s[13] = s[18] = s[23] = '-'

        return s.join('')
    }

    // 随机数
    function randomNum() {
        return Math.floor(Math.random() * 100)
    }
    // 车辆
    class Car {
        // 车牌号
        public carPlate: string
        space: Space | null
        enterTime: number
        constructor(carPlate: string) {
            this.carPlate = carPlate
            this.space = null
            this.enterTime = 0
        }
    }

    // 车位
    class Space {
        // 车位是否空
        public empty: boolean
        public spaceId: number

        constructor(spaceId: number) {
            this.spaceId = spaceId
            // 默认车位为空
            this.empty = true
        }
        enter() {
            this.empty = false
        }
        leave() {
            this.empty = true
        }
    }

    // 楼层
    class Floor {
        // 楼层
        public level: number
        // 当前楼层所有车位
        public spaceList: Space[]

        constructor(level: number, spaceList: Space[] = []) {
            this.level = level
            this.spaceList = spaceList || []
        }
        // 剩余车位
        emptySpaceNum() {
            return this.spaceList.filter(item => item.empty).length
        }
    }

    interface IParkCar {
        carId: {
            // 进入时间
            enterTime: string
            // 停车时长
            stayTime: number
        }
    }

    // 摄像头
    class Camera {
        // 抓拍识别
        shoot(car: Car) {
            return {
                ...car,
                enterTime: new Date().toLocaleString()
            }
        }
    }

    // 屏幕
    class Screen {
        constructor() {}
        // 展示车辆信息
        showEnter(car: Car) {
            console.log(`车辆开始驶入++++++++\n车牌号：${car.carPlate}\n驶入时间：${car.enterTime}\n\n`)
        }
        // 展示车辆信息
        showLeave(car: Car) {
            const stayTime = (Date.now() - new Date(car.enterTime).getTime()) / 1000
            console.log(
                `车辆开始驶出--------\n车牌号：${car.carPlate}\n
                驶入时间：${car.enterTime}\n
                驶出时间：${new Date().toLocaleString()}\n
                停车时长：${stayTime}s\n\n`
            )
        }
    }

    // 停车场
    class Park {
        // 停车场所有楼层
        public floorList: Floor[]
        public camera: Camera
        public screen: Screen
        public carList: {
            [propName: string]: IParkCar
        }
        constructor(floorList: Floor[] = []) {
            console.log('停车场初始化--------\n')
            this.floorList = floorList || []
            this.camera = new Camera()
            this.screen = new Screen()
            this.carList = {}
        }
        // 驶入
        enter(car: Car) {
            // 抓拍/摄像头抓拍
            const info: any = this.camera.shoot(car)
            // 随机一个车位
            const spaceIndex = randomNum()
            // 车位驶入
            const space: any = this.floorList[0].spaceList[spaceIndex]
            space.enter(car)

            // 记录信息
            info.space = space
            this.carList[car.carPlate] = info
            this.screen.showEnter(info)
            this.emptySpaceNum()
        }
        // 驶出
        leave(car: Car) {
            const info: any = this.carList[car.carPlate]
            const space = info.space
            space.leave()
            this.screen.showLeave(info)
        }
        emptySpaceNum() {
            const emptyNum = this.floorList
                .map(floor => `${floor.level}层还有${floor.emptySpaceNum()}个车位\n`)
                .join('\n')
            console.log(emptyNum)
            return emptyNum
        }
    }

    // 开始Test
    // 停车场初始化
    const floorList = []
    const floorCount = 3
    for (let i = 0; i < floorCount; i++) {
        const spaceList = []
        const spaceCount = 100
        for (let j = 0; j < spaceCount; j++) {
            // 车位初始化
            const space = new Space(j)
            spaceList.push(space)
        }
        // 楼层初始化
        const floor = new Floor(i, spaceList)
        floorList.push(floor)
    }
    const park = new Park(floorList)
    console.clear()
    console.log(park)

    // 车辆初始化
    const car1 = new Car(uuid())
    const car2 = new Car(uuid())
    const car3 = new Car(uuid())

    park.enter(car1)
    park.enter(car2)
    setTimeout(() => {
        park.leave(car1)
        park.enter(car3)
        park.leave(car2)
        park.emptySpaceNum()
    }, 5000)
}

export default rawCode
