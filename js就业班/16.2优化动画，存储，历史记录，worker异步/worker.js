	onmessage = function (e){
				postMessage(deay(e.data));
		  }
		function deay(data){
				return data * data;
	    }