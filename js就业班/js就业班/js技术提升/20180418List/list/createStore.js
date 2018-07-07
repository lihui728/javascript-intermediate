


function createStore(initState) {
    var state = initState || {};  //{text: '',sex:'all'}
    // 存函数的数组---》公众号列表名
    var list = [];//创建新数组
    // 取到初始状态
    function getState() {
        return state;//返回状态
    }

    // 修改state状态
    function dispatch(action) {//
        // {type:text,value:'王'}
        // {type:sex,value:'mele'}
        state[action.type] = action.value;//state[type.text] = wang
        // 执行每一个函数
        list.forEach(function(ele,index){//?
            ele();
        })
    }
    // 订阅函数
    function subScribe(hander) {  
        list.push(hander);
    }
    return {
        getState: getState,
        dispatch: dispatch,
        subScribe: subScribe
    }
}
//store.dispatch({type:'text',value:this.value});

createStore();