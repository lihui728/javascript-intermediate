define(['myLib'],function (myLib){//依赖myLib模块
    function add(a,b){
        return a + b;
    }
    myLib.test();
    return {
        add : add,
    }
})