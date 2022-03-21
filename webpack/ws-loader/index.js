/**
 * @Author: forguo
 * @Date: 2021/12/11 15:13
 * @Description: 一个自定义的loader
 */

module.exports = function (resource) {
    /**
     * 将$xx转换成 wei-xxx
     * @type {RegExp}
     */
    const reg = /\$\(/g;
    try {
        return resource.replace(reg, 'wei-').replace(')', '');
    } catch (e) {
        console.log('ws-loader-error', e);
    }
}
