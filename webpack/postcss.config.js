/**
 * @Author: forguo
 * @Date: 2021/12/19 21:49
 * @Description: postcss.config
 */
/*********** sprites config ***************/
let spritesConfig = {
    spritePath: './dist/img'
}
/******************************************/

module.exports = {
    ident: 'postcss',
    plugins: [
        require("precss")(),
        require('autoprefixer')(),
        /*********** loader for sprites ***************/
        // require('postcss-sprites')(spritesConfig)
        /*********************************************/
    ]
};
