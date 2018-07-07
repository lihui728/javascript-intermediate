define(function (require,exports,module){
     exports.module1 = function (){
         console.log('aa');
     }
     exports.fun = function (){
          document.onclick = function (){
              console.log('cc');
          }
    var hello = require('hello');
    console.log(hello);
     }
})