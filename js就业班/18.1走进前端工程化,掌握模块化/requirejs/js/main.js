require.config({
	baseUrl : './tool', //基础路径
	paths : {
		'jquery' : 'jquery',//路径
		'math' : 'math',
		'myLib' : 'myLib'
	}
})

//也可以这样写require(['/tool/jquery'])
require(['jquery','math'],function ($,math){//路径
      console.log(math.add(1,2));
})