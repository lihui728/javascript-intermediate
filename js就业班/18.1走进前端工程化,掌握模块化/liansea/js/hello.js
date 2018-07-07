define(['target'],function (require,exports,module){
    exports.hello = function (){console.log('hello')}
    var target = require('target');
    console.log(target);
})