/**
 * @Author: forguo
 * @Date: 2021/12/19 21:49
 * @Description: postcss.config
 */

module.exports = {
    ident: 'postcss',
    plugins: [
        require("precss")(),
        require('autoprefixer')(),
    ]
};
