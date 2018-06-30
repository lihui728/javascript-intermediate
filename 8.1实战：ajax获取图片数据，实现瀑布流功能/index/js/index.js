/* $.ajax({
	 type : 'GET',
	 url : './data.txt',//后端人员给数据结构，按照数据结构的格式，在自己本地模拟。等后端写完，在更地址就可以了。
//   url : 'http://localhost/index/getPics.php?cpage=1',//为什么不直接访问这个地址，需要访问php文件，存在同源策略，需要服务器代理跨域。
	 success : function (data){
		 console.log(JSON.parse(data));
	 }
 });*/

 (function (){
	 var oLi = $('li'),//获取所有的li
	     num = 1,
	     flag = false;//加锁，发送请求完之后，加载完数据之后，再能发送请求
	 getData();//发送数据请求
	 function getData(){
		 if(!flag){
			console.log(num);
            flag = true;//上锁
			$.ajax({
			 type : 'GET',
		//	 url : './data.txt',//后端人员给数据结构，按照数据结构的格式，在自己本地模拟。等后端写完，再更换地址就可以了。
			 //为什么不直接访问这个地址，需要访问php文件，存在同源策略，需要服务器代理跨域。
			  url : 'http://localhost/index/getPics.php?cpage=' + num,//num的值不能固定，因为滚动条触发，需要请求新的数据
				  
			 success : addDom,//成功函数
				// console.log(JSON.parse(data));
			   
			 beforeSend : function (data){//当一个ajax请求开始时触发,data监听状态
				// console.log(data.readyState);//状态0
				 if(data.readyState == 0){
					 $(".loading").fadeIn(300);//加载时淡入
				 }
			   },
			 complete : function (data){//ajax请求完成时执行函数。data监听状态
				//console.log(data.status);//状态200
				if(data.status == 200){
					$(".loading").fadeOut(300);//请求后淡出
				} 
			  }
			 });
			 num++;//请求完，更新数据页数
			 console.log(num);
		  }
		
	 };
	 function addDom(data){//suceess, 成功触发函数
         var dataList = JSON.parse(data);//转换JSON
		 if(dataList.length > 1){//数据大于1才执行，容错
             dataList.forEach(function (ele,index){//数据遍历
            //ele.preview 图片    ele.title 描述
			var iDiv = $('<div class="item"></div>'),//创建item的div
			    imgBox = $('<div class="imgBox"></div>'),//创建imgBox的div
				oP = $('<p></p>'),//创建p标签
				img = new Image();//创建Image标签
				img.src = ele.preview;//img的src链接
				oP.text(ele.title);//p标签的内容
				img.onload = function (){//图片加载完成
					imgBox.append(img);//div的imgBox插入img
					iDiv.append(imgBox).append(oP);//item插入imgbox和p
					  //li --> append(iDiv),往height最短的插
					var index = getMinLi(oLi);//传入li，获取到li的最短height的index
					$(oLi[index]).append(iDiv);//最短的height的li插入div
				}
		 }) 
		 flag = false;//开锁
	   }
		 
	 };
	 function getMinLi(dom){//获取到li的最短height的index
         var minHeight = parseInt($(dom[0]).css("height"));//获取到第一个li的height，为后期的li比较height
		 var index = 0;//索引
		 for(var i = 1;i < dom.length;i++){//从第一个li开始，不需要从第0个开始
			 var height = parseInt($(dom[i]).css("height"));//遍历后面的li的height
			 if(height < minHeight){//进行和第0个li的height比较
				 minHeight = height;//符合条件进行覆盖
				 index = i; //符合条件的索引变更
			 }
		 }	
		 return index;
	 };
    $(window).scroll(function (){//监听滚动条
         var scrollHeight = $(this).scrollTop();//获取滚动条，滚动高度
		 var clientHeight = $(window).height();//获取到视口的高度
		 var pageHeight = parseInt($(oLi[getMinLi(oLi)]).css('height'))//获取当前最短height的li，进行比较，因为最短li的留白最多，
		 if(scrollHeight + clientHeight > pageHeight){//如果滚动条 + 视口 > 最短li的height，发送请求
			  getData();//重新发送数据
		 }
	})
 }());

//瀑布流 1：将每张图片插入到dom结构装最短的一列(addDom,getMinLi --> index);
//2:滚动条，看到第一次加载完的所有图片显示，进行下一次发送请求num++,更新页数，--》getData()