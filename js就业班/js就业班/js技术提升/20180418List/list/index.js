var oInp = document.getElementById('inp');

// 防抖功能  
function debounce(handler,delay) {
    var timer = null;
    return function(){
        var self = this;
        var arg = arguments;
        clearTimeout(timer);
        timer = setTimeout(function(){
            handler.apply(self,arg);
        },delay)
    }
}

// 实现功能
function event() {
    console.log(this.value)
}

// 绑定事件
oInp.oninput = debounce(event, 500);



// oInp.oninput = function(){
//     console.log(self.value)
// }


