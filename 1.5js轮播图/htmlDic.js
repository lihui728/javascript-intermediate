	HTMLDivElement.prototype.addAutoMove = function (Lbtn,Rbtn,Dindex,Sty){
		var Lbtn = Lbtn || "",
			Rbtn = Rbtn || "",
			Dindex = Dindex || "",
			Sty = Sty || "";
		if(Lbtn && Rbtn && Dindex){

			if(Lbtn.indexOf("#") == 0){
			  var leftBtn = document.getElementById(Lbtn.split("#")[1]);
			}
			else if(Lbtn.indexOf(".") == 0){
			   var leftBtn = this.getElementsByClassName(Lbtn.split(".")[1])[0];
			}
			if(Rbtn.indexOf("#") == 0){
			  var rightBtn = document.getElementById(Rbtn.split("#")[1]);
			}
			else if(Rbtn.indexOf(".") == 0){
		 	  var rightBtn = this.getElementsByClassName(Rbtn.split(".")[1])[0];
			}
			if(Dindex.indexOf("#") == 0){
			  var sliderIndex = document.getElementById(Dindex.split("#")[1]);
			}
			else if(Dindex.indexOf(".") == 0){
			   var sliderIndex = this.getElementsByClassName(Dindex.split(".")[1])[0];
			}
			
			
			var timer = null;
			var sliderPage = this.getElementsByTagName("ul")[0];
			var moveWidth = sliderPage.children[0].offsetWidth;//获取需要移动的left，移动一个子元素li的width
			var num = sliderPage.children.length-1;//记录有多少li移动
			var oSpanArray = sliderIndex.getElementsByTagName('span');
			var lock = true;//加锁
			var index = 0;//索引
			leftBtn.onclick = function (){
				autoMove("right->left");
			}
			rightBtn.onclick = function (){
				autoMove("left->right");
			}
			//direction
			//默认轮播方向 'left->right' /undefined
			//点击left按钮 'right-->left'；
			//加锁，当一个定时器还没做完，另外一个定时器又触发。则会发生混乱，锁是开着的，第一个事情开始，加上锁，做完锁打开，下一个事情类推。
			function autoMove(direction){
				if(lock){
				lock = false;//锁锁上
				clearTimeout(timer);//清理计时器，清理了，没计时器了，不执行轮播了。还要在后面添加回计时器
				if(!direction || direction == 'left->right'){
					index++;//索引
					startMove(sliderPage,{left:sliderPage.offsetLeft - moveWidth},function (){
					   if(sliderPage.offsetLeft == -num * moveWidth){//判断是否到了最后一张图片
						   index = 0;//到了最后一张索引变零
						   sliderPage.style.left = "0px";
					   }
					   timer = setTimeout(autoMove,2000);//清理计时器，重新执行。
					   lock = true;//开锁
					   changeIndex(index);//传进index，索引类名添加
					})
				}else if(direction == "right->left"){
					if(sliderPage.offsetLeft == 0){
						sliderPage.style.left = -num * moveWidth + "px";////需要清理计时器。要不出现计时器争抢。
						index = num;//开始索引0，变成最后一张索引
					}
					 index--;//最后一张索引减减
					 startMove(sliderPage,{left:sliderPage.offsetLeft + moveWidth},function (){
						 timer = setTimeout(autoMove,2000);//清理计时器，重新执行。
						 lock = true;//开锁
						 changeIndex(index);//索引类名添加
				   })

				}

			}
				
		}
		
			function changeIndex(_index){//小圆点
				for(var i=0;i < oSpanArray.length;i++){
					oSpanArray[i].className = " ";
				}
				oSpanArray[_index].className = Sty;
			}
			
			for(var i = 0;i < oSpanArray.length;i++){
				  (function (myIndex){
					  oSpanArray[i].onclick = function (){
						  lock = false;//锁上
						  clearTimeout(timer);
						  index = myIndex; //全局的index = myIndex
						  startMove(sliderPage,{left: -index * moveWidth},function (){//移动当前位置多少个span * li的width 
							  lock = true;//开锁
							  timer = setTimeout(autoMove,2000);//重新执行计时器
							  changeIndex(index);//索引也要更新
						  });
					  }
				  }(i))
			}

			timer =  setTimeout(autoMove,2000)
		}
		
	}