var lastTime = new Date().getTime();;
onmessage = function (e){
	postMessage(e.data);
	
	//close();
	close();
	postMessage(get(e.data));
	
}
function get(data){
	var num = data;
	for(var i=0;i<1000022120;i++){
         num += data*2 + 2;
	}
	var T = new Date().getTime() - lastTime;
	
	return {num,T};
}