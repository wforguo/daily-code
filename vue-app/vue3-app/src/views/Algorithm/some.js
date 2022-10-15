/**
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
 *
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
 *
 * 你可以按任意顺序返回答案。
 *
 *
 * 作者：力扣 (LeetCode)
 * 链接：https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x2jrse/
 */

// 两数之和等于目标数值

/**
 * @desc 空间换时间
 * @param arr
 * @param target
 * @return {[*,*]}
 */
// let twoSome = function (arr, target) {
//     let arrObj = {};
//     arr.map((item, index) => {
//         arrObj[item] = index;
//     });
//     let length = arr.length;
//     let i;
//     for (i = 0; i < length; i++) {
//         let item = arr[i];
//         if (arrObj[target - item] && arrObj[target - item] != i) {
//             return [i, arrObj[target - item]]
//         }
//     }
// };
//
// let res = twoSome([1,3,4,2], 6);
// console.log(res);

// 两数之和等于目标数值
/**
 * @desc 双指针的方式来求解
 * @param arr
 * @param target
 * @return {[*,*]}
 */
let twoSome = function (arr, target) {
    let sortArr = JSON.parse(JSON.stringify(arr)).sort((a, b) => a - b)
    let length = sortArr.length
    let i = 0
    let j = length - 1
    let res = []
    while (i < j) {
        if (sortArr[i] + sortArr[j] === target && i !== j) {
            res = [sortArr[i], sortArr[j]]
            let a = arr.indexOf(res[0])
            let b = arr.lastIndexOf(res[1])
            return [a, b]
        } else if (sortArr[i] + sortArr[j] < target) {
            i = i + 1
        } else {
            j = j - 1
        }
    }
}

let res = twoSome([3, 6, 9, 4, 2, 0], 7)
console.log(res)
