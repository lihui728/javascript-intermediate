/* $.ajax({
	 type : 'GET',
	 url : './data.txt',//�����Ա�����ݽṹ���������ݽṹ�ĸ�ʽ�����Լ�����ģ�⡣�Ⱥ��д�꣬�ڸ���ַ�Ϳ����ˡ�
//   url : 'http://localhost/index/getPics.php?cpage=1',//Ϊʲô��ֱ�ӷ��������ַ����Ҫ����php�ļ�������ͬԴ���ԣ���Ҫ�������������
	 success : function (data){
		 console.log(JSON.parse(data));
	 }
 });*/

 (function (){
	 var oLi = $('li'),//��ȡ���е�li
	     num = 1,
	     flag = false;//����������������֮�󣬼���������֮�����ܷ�������
	 getData();//������������
	 function getData(){
		 if(!flag){
			console.log(num);
            flag = true;//����
			$.ajax({
			 type : 'GET',
		//	 url : './data.txt',//�����Ա�����ݽṹ���������ݽṹ�ĸ�ʽ�����Լ�����ģ�⡣�Ⱥ��д�꣬�ٸ�����ַ�Ϳ����ˡ�
			 //Ϊʲô��ֱ�ӷ��������ַ����Ҫ����php�ļ�������ͬԴ���ԣ���Ҫ�������������
			  url : 'http://localhost/index/getPics.php?cpage=' + num,//num��ֵ���̶ܹ�����Ϊ��������������Ҫ�����µ�����
				  
			 success : addDom,//�ɹ�����
				// console.log(JSON.parse(data));
			   
			 beforeSend : function (data){//��һ��ajax����ʼʱ����,data����״̬
				// console.log(data.readyState);//״̬0
				 if(data.readyState == 0){
					 $(".loading").fadeIn(300);//����ʱ����
				 }
			   },
			 complete : function (data){//ajax�������ʱִ�к�����data����״̬
				//console.log(data.status);//״̬200
				if(data.status == 200){
					$(".loading").fadeOut(300);//����󵭳�
				} 
			  }
			 });
			 num++;//�����꣬��������ҳ��
			 console.log(num);
		  }
		
	 };
	 function addDom(data){//suceess, �ɹ���������
         var dataList = JSON.parse(data);//ת��JSON
		 if(dataList.length > 1){//���ݴ���1��ִ�У��ݴ�
             dataList.forEach(function (ele,index){//���ݱ���
            //ele.preview ͼƬ    ele.title ����
			var iDiv = $('<div class="item"></div>'),//����item��div
			    imgBox = $('<div class="imgBox"></div>'),//����imgBox��div
				oP = $('<p></p>'),//����p��ǩ
				img = new Image();//����Image��ǩ
				img.src = ele.preview;//img��src����
				oP.text(ele.title);//p��ǩ������
				img.onload = function (){//ͼƬ�������
					imgBox.append(img);//div��imgBox����img
					iDiv.append(imgBox).append(oP);//item����imgbox��p
					  //li --> append(iDiv),��height��̵Ĳ�
					var index = getMinLi(oLi);//����li����ȡ��li�����height��index
					$(oLi[index]).append(iDiv);//��̵�height��li����div
				}
		 }) 
		 flag = false;//����
	   }
		 
	 };
	 function getMinLi(dom){//��ȡ��li�����height��index
         var minHeight = parseInt($(dom[0]).css("height"));//��ȡ����һ��li��height��Ϊ���ڵ�li�Ƚ�height
		 var index = 0;//����
		 for(var i = 1;i < dom.length;i++){//�ӵ�һ��li��ʼ������Ҫ�ӵ�0����ʼ
			 var height = parseInt($(dom[i]).css("height"));//���������li��height
			 if(height < minHeight){//���к͵�0��li��height�Ƚ�
				 minHeight = height;//�����������и���
				 index = i; //�����������������
			 }
		 }	
		 return index;
	 };
    $(window).scroll(function (){//����������
         var scrollHeight = $(this).scrollTop();//��ȡ�������������߶�
		 var clientHeight = $(window).height();//��ȡ���ӿڵĸ߶�
		 var pageHeight = parseInt($(oLi[getMinLi(oLi)]).css('height'))//��ȡ��ǰ���height��li�����бȽϣ���Ϊ���li��������࣬
		 if(scrollHeight + clientHeight > pageHeight){//��������� + �ӿ� > ���li��height����������
			  getData();//���·�������
		 }
	})
 }());

//�ٲ��� 1����ÿ��ͼƬ���뵽dom�ṹװ��̵�һ��(addDom,getMinLi --> index);
//2:��������������һ�μ����������ͼƬ��ʾ��������һ�η�������num++,����ҳ����--��getData()