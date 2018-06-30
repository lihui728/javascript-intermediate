<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="Generator" content="EditPlus®">
  <meta name="Author" content="">
  <meta name="Keywords" content="">
  <meta name="Description" content="">
  <title>Document</title>
 </head>
 <body>
   <script>
      //getScrollOffset()  兼容ie获取窗口滚动X,Y距离
      function getScrollOffset(){

	   if(window.pageXOffset){

		   return {

			   X : window.pageXOffset,

			   Y : window.pageYOffset 

		   }

	   }else{

		   return {

			   X : document.body.scrollLeft + document.documentElement.scrollLeft,

			   Y : document.body.scrollTop + document.documentElement.scrollTop,

		   }

	   }

   } 

   
	 //getViewportOffset() 兼容ie，怪异模式，获取可视窗口宽度，高度
   function getViewportOffset(){

		   if(window.innerWidth){   //新版浏览器

		      return {   

				windowWidth : window.innerWidth,

				windowHeight : window.innerHeight,

		   }

		   }
		   else{
		   
			 if(document.compatMode == "BackCompat"){  //怪异模式
				 
				return {

				   windowWidth : document.body.clientWidth,

				   windowHeight : document.body.clientHeight 

			 }
		 }else{

			   return {  //标准模式

				   windowWidth : document.documentElement.clientWidth,

				   windowHeight : document.documentElement.clientHeight

			 }

	       }

	    }
		   
     }

	 //兼容方法获取计算样式的某个属性   
	 function getStyle(elem,prop){    //第一个形参为元素，第二个形参为元素的某个属性

		 if(window.getComputedStyle){

		   return window.getComputedStyle(elem,null)[prop];

		 }else{

			 return elem.currentStyle[prop];
		 }

	 }

     
	//兼容绑定事件

	 function addEvent(elem,type,handle){

         if(elem.addEventListener){    

			 elem.addEventListener(type,handle,false);

		 }else if(elem.attachEvent){  //IE浏览器

            elem.attachEvent('on' + type,function (){handle.call(elem)});

		 }else{

			 elem['on'+type] = handle;
			
		 }
	 }

    //兼容取消冒泡事件
	 function stopBubble(event){

		  if(event.stopPropagation){

		     event.stopPropagation();

		  }else{

			  event.cancelBubble = true;  //IE
		  }
	  }


   
       //阻止默认事件
	  function cancelHandler(event){

		  if(event.preventDefault){

			  event.preventDefault();

		  }else{

			  event.returnValue = false;//兼容ie

		  }
	  }


     
	 //拖动
	 function drag(elem){

	 var disX,
	     disY;

	 elem.onmousedown = function (e){

		 disX = e.pageX - parseInt(elem.style.left);//获取鼠标在元素的中心的X

		 disY = e.pageY - parseInt(elem.style.top);//获取鼠标在元素的中心的Y

		 document.onmousemove = function (e){

			 var event = e || window.event;

			 elem.style.left = e.pageX - disX + "px";//让鼠标停在元素的中心的X

			 elem.style.top  = e.pageY - disY + "px";//让鼠标停在元素的中心的Y

		 }

		 document.onmouseup = function (){

			 document.onmousemove = null;

		 }

	 }
	 }
   </script>
 </body>
</html>
