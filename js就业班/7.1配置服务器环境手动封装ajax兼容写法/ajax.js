 function ajax(method,url,date,callback,flag){
			 var xhr = null;
			 if(window.XMLHttpRequest){
				 xhr = new XMLHttpRequest();
			 }else{
				 xhr = new ActiveXObject('Microsoft.XMLHttp');
			 }
			 method = method.toUpperCase()
			 if(method == 'POST'){
				  xhr.open(method,url,flag);
				  xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
				  xhr.send(date);
			 }else if(method == 'GET'){
				 xhr.open(method,url + '?' + date,flag);
				  xhr.send();

			 }
			
			 xhr.onreadystatechange = function (){
				 if(xhr.readyState == 4){
					 if(xhr.status == 200){
						
						callback(xhr.responseText);
					 }
				 }
			 }
			 }