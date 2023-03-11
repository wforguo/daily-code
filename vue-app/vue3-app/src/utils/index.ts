/**
 * min到max的随机数
 * @param min
 * @param max
 */
export const random = function (min: number = 0, max: number = 10) {
    return Math.round(Math.random() * (max - min) + min)
}
