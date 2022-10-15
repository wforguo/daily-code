/**
 * 给你一个 升序排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。元素的 相对顺序 应该保持 一致 。
 *
 * 由于在某些语言中不能改变数组的长度，所以必须将结果放在数组nums的第一部分。更规范地说，如果在删除重复项之后有 k 个元素，那么 nums 的前 k 个元素应该保存最终结果。
 *
 * 将最终结果插入 nums 的前 k 个位置后返回 k 。
 *
 * 不要使用额外的空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
 *
 * 作者：力扣 (LeetCode)
 * 链接：https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x2gy9m/
 */

/**
 * @param {number[]} nums
 * @return {number}
 */

const removeDuplicates = function (nums) {
    let left = 0

    for (let right = 1; right < nums.length; right++) {
        if (nums[left] !== nums[right]) {
            left++
            nums[left] = nums[right]
        }
    }
    left++
    return left
}

console.log(removeDuplicates([1, 1, 2]))
