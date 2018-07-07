//²éÑ¯ÑùÊ½
function getStyle(obj,attr){
	if(obj.currentStyle){
	  return obj.currenStyle[attr];
	}else{
	  return window.getComputedStyle(obj,false)[attr];
	}
}

function startMove(obj,json,callback){
	clearInterval(obj.timer);
	var iSpeed,iCur;
	obj.timer = setInterval(function (){
		var bStop = true;
		for(var attr in json){
			if(attr === "opacity"){
				iCur = parseFloat(getStyle(obj,attr)) * 100;
			}else{
				iCur = parseInt(getStyle(obj,attr));
			}
			iSpeed = (json[attr] - iCur) / 7;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(attr == "opacity"){
				obj.style.opacity = (iCur + iSpeed)/100;
			}else{
				obj.style[attr] = iCur + iSpeed + "px";
			}
		
			if(iCur != json[attr]){
				bStop = false;		
			}
		}
		if(bStop){
			clearInterval(obj.timer);
			typeof callback == "function" ? callback() :"";
		}
	},30)
}