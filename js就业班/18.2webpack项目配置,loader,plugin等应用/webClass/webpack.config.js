module.exports = {
  //单个入口   entry : './src/demo.js',
  //多个入口,就需要多个输出了。
    entry : {
        demo : './src/demo.js',
        index : './src/index.js',
    },

    output : {
  // __dirname-->webClass父级文件夹,'/out'-->out文件，会自动帮创建
        path: __dirname + '/out',
        //输出的之后的名称js
        //改变配置文件之后，需要重新webpack
      //单个输出 --》  filename : 'demo.js',
      //多个输出,[name]代表前面入口的属性名，demo,index
        filename :'[name].bundle.js',
           //图片
        //图片属于静态资源，所有静态资源路径。
        publicPath :  './out'
    },
    //图片需要加载进来，就需要图片加载器。有不同加载，有js，css的，选择什么格式的文件，用什么加载器。
    module : {
        rules : [//符合规则，test : 正则，use : 要用到什么样的加载器。后面可以跟字符串或者数组，
                //要用到多个loader解析器的话，放到数组里面，解析的顺序，是从后往前加载的
                //需要用到解析器，要下载 npm install url-loader --save-dev
         //url-loader?limit=10(小于10k图片就用base64)  &name=./[name].[ext](./[name]还是当前名字，[ext]还是当前格式。
        //打包到publicPath的./out路径下。)
        //第一次没安装file-loader，会报这个file-loader的错，安装 npm install file-loader --save-dev
            {test : /.jpg$/,use : ['url-loader?limit=10&name=./[name].[ext]']}
        ]
    },

    mode : 'development',//开发环境，不设置，会提示警告

}