var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry : {//入口
        demo : './src/demo.js',
        index : './src/index.js'
    },
    output : {//出口  
        //父级文件夹/dist
        path : __dirname + "/out",
        filename : '[name].bundle.js'
    },
    module: {
        rules: [
          {test : /.css$/, use: ExtractTextPlugin.extract({
              use : [{
                  loader : 'css-loader',
                  options : {
                      minimize : true
                  }
              }],
              fallback : 'style-loader' 
          })
         }
        ]
    
      },
      plugins: [
        new ExtractTextPlugin("[name].css")
      ]
    }