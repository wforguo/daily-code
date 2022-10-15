/**
 * @Author: forguo
 * @Date: 2022/4/7 11:14
 * @Description: 数值摊平
 */


let flat = function (arr) {
    let res = [];
    arr.map((item) => {
        if (item instanceof Array) {
            res = [
                ...res,
                ...flat(item)
            ];
        } else {
            res.push(item);
            console.log(res);
        }
    })
    return res;
};

let arr = [1, [2], [[3]], [6, [5,[4]]]]
