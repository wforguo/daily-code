/**
 * @Author: forguo
 * @Date: 2022/5/11 13:24
 * @Description: deepClone.js
 */
//使用Map函数
function deepCopy(obj,map = new Map()){
    if (typeof obj != 'object') return
    var newObj = Array.isArray(obj)?[]:{}
    if(map.get(obj)){
        return map.get(obj);
    }
    map.set(obj, newObj);
    console.log(map);
    for(var key in obj){
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] == 'object') {
                newObj[key] = deepCopy(obj[key],map);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    return newObj;
}
const obj1 = {
    x:1,
    y:2,
    d:{
        a:3,
        b:4
    }
}
obj1.z = obj1;
const obj2 = deepCopy(obj1);
console.log(obj2)

//node 输出{ x: 1, y: 2, d: { a: 3, b: 4 }, z: [Circular] }
//控制台输出{x: 1, y: 2, d: {…}, z: {…}}
