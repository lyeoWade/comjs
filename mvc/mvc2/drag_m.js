
function drag(obj,arr){
	obj.onmousedown=function(ev){
		var oEvent=event||ev;
		var pol=oEvent.clientX-obj.offsetLeft;
		var poT=oEvent.clientY-obj.offsetTop;
		document.onmousemove=function(ev){		//oDiv.onmousemove=function(ev) oDiv改成了document,移动速度快也不会掉
			var oEvent=event||ev;
			obj.style.left=oEvent.clientX-pol +'px';
			obj.style.top=oEvent.clientY-poT +'px';
			
			arr.push({left:oEvent.clientX-pol,top:oEvent.clientY-poT});
			
			return false;
		};
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
			
		};
		return false;    //解决选中文字bug；（return false 解决了高级浏览器这个bug）
	};
}
