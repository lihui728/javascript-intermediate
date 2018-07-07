module.exports = function (){
    return {
        a : 1,
        b : 2,
    }
};
var img = new Image();
//可以把图片当做一个模块，路径会找输出的文件夹
//img.src = "./src/img/1.jpg";
//图片属于静态资源，要在webpack.config.js配置,publicPath,
//要在output输出配置，
img.src = require('./img/1.jpg');
document.body.appendChild(img);