
(function (){
	var num = 1,
		key = true,
		lastTime = new Date().getTime();
	request();
	function request(){
		if(key){
	    console.log(777);
		key = false;
			$.ajax({
			type : "GET",
			url : "http://localhost/index/getPics.php?",
			data : "cpage="+num,
			success : addDom,
			beforeSend : function (data){
				$(".loading").fadeIn(300);
			},
			complete : function (data){
				if(data.status == 200){
				  
				}
			},
			error : function (){
				alter("加载失败");
			}
			
		   });
		}
	   };
   function addDom(data){
	    console.log(data);
		var dataList = JSON.parse(data),
			index = null; 
		if(dataList.length == 0){
			     key = false;
				  $(".loading").css("display","block");
				  $(".loading").text("没有更多");
		
			  
		}else{
			 $(".loading").fadeOut(300);
			 dataList.forEach(function (ele,index){
			  //ele.image ele.preview  ele.title
			  var box = $('<div class="box"></div>'),
				imgBox = $('<div class="imgBox"></div>'),
				p = $('<p></p>'),
				oImg = new Image();
			   oImg.src = ele.preview;
				p.text(ele.title);
			
				 box.append(imgBox).append(p);
				 imgBox.append(oImg);
				 index = getMinLi();
				 $("li").eq(index).append(box);
				 
				 console.log(666);
				 
			   
		  });
		   num++;
		    key = true;
		     console.log(num);
		 }
	  
		
		
	};
	function getMinLi(){
		var minHeight = parseInt($('li').eq(0).css("height")),
			 _index = null;
			len = $("li").length;
		for(var i = 1;i < len;i++){
			if(parseInt($('li').eq(i).css("height")) < minHeight){
				minHeight = parseInt($('li').eq(i).css('height'));
				_index = $('li').eq(i).index();
			}
		}
		return _index;
	};

	$(window).scroll(function (){
       yeaTime();
	  
	  
	});
	function yeaTime(){
		 var newTime = new Date().getTime();
         if(newTime - lastTime > 10000){
			 console.log(123);
            lastTime = newTime;
			if($(window).scrollTop() + $(window).height() > parseInt($('li').eq(getMinLi()).css("height"))){	 
               request();
			   console.log(456);
           }
		 }
	}
 
}());



