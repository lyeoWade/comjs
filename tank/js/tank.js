

/*
*  每隔多少毫秒 随机升成一架飞机( oTargetPlans )--->飞机的速度,不一样 
*
*		自己控制的飞机(oPlan),上下左右移动 （不能过界） ， 每按一次enter发送一颗炮弹 
*				炮弹和其他飞机碰上发生暴炸
* 		
*    
*
*
*
*/

function Plan(){
	this.warp=document.getElementById('plane_warp');
	this.PlanBox=document.querySelectorAll('.plane')[0];
	this.bg=document.querySelectorAll('.bg')[0];
	this.plane=document.querySelectorAll('.myPlane')[0];
	this.oContent=document.getElementById('content');
	
	this.planeX=0;
	this.planeY=0;
	this.moveBg();
	this.cPlan();
	this.creatTarget();

}

Plan.prototype.moveBg=function(){
	var _this=this;
	this.bgmoves(1,_this.bg,'top',-1);

	//console.log(_this.getStyle(_this.PlanBox,'height'))
}

Plan.prototype.creatTarget=function(){
	
	var _this=this;

	var oEnemyPlane_timer=null;
	oEnemyPlane_timer=setInterval(function(){
		var oEnemyPlane=document.createElement('div');
		oEnemyPlane.className='enemyplean';
		_this.oContent.appendChild(oEnemyPlane);

		oEnemyPlane.style.top=_this.roundNum(-200,0)+'px';
		oEnemyPlane.style.left=_this.roundNum(0,_this.oContent.offsetWidth-oEnemyPlane.offsetWidth)+'px';
		_this.bgmoves(0,oEnemyPlane,'top',3,function(){
			if(oEnemyPlane.offsetTop>=_this.oContent.offsetHeight+30){
				console.log(oEnemyPlane.offsetTop)
				_this.oContent.removeChild(oEnemyPlane);
			}
		});
	},2000);


}

Plan.prototype.cPlan=function(){
	var _this=this;
	var timer=null;
	

	_this.plane.style.left=_this.oContent.offsetWidth/2-_this.plane.offsetWidth/2+'px';
	_this.plane.style.top=_this.oContent.offsetHeight-_this.plane.offsetHeight+'px';

	document.onkeydown=function(ev){
		var ev=ev||event;
		clearInterval(timer)
		console.log(ev.keyCode);
		_this.planeX=_this.plane.offsetLeft;
		_this.planeY=_this.plane.offsetTop;
		timer=setInterval(function(){

			var ispeed=3;
			switch(ev.keyCode){
				case 37:
					if(_this.plane.offsetLeft<=0)_this.plane.style.left=0;

					_this.plane.style.left=_this.plane.offsetLeft-ispeed+'px';
					_this.planeX=_this.plane.offsetLeft;
					_this.planeY=_this.plane.offsetTop;
					break;
				case 38:
					
					if(_this.plane.offsetTop<=0)_this.plane.style.top=0;
					_this.plane.style.top=_this.plane.offsetTop-ispeed+'px';
					_this.planeX=_this.plane.offsetLeft;
					_this.planeY=_this.plane.offsetTop;
					break;
				case 39:

					if(_this.plane.offsetLeft>=_this.oContent.offsetWidth-_this.plane.offsetWidth){
						_this.plane.style.left=_this.oContent.offsetWidth-_this.plane.offsetWidth+'px';
					}
					_this.plane.style.left=_this.plane.offsetLeft+ispeed+'px';	
					_this.planeX=_this.plane.offsetLeft;
					_this.planeY=_this.plane.offsetTop;
					break;
				case 40:
					if(_this.plane.offsetTop>=_this.oContent.offsetHeight-_this.plane.offsetHeight){
						_this.plane.style.top=_this.oContent.offsetHeight-_this.plane.offsetHeight+'px';;
					}
					_this.plane.style.top=_this.plane.offsetTop+ispeed+'px';
					_this.planeX=_this.plane.offsetLeft;
					_this.planeY=_this.plane.offsetTop;
					break;

			}


		},10);


		//创建一颗炮弹
		if (ev.keyCode==32) {
			//alert(_this.planeX)
			var oBullet=document.createElement('div');
			oBullet.className='bullet';
			_this.oContent.appendChild(oBullet);

			oBullet.style.left=_this.planeX+_this.plane.offsetWidth/2-4+'px';
			oBullet.style.top=_this.planeY+'px';

			
			_this.bgmoves(0,oBullet,'top',-5,function(){
				//console.log(oBullet.offsetTop)
				if(oBullet.offsetTop<=-20){
					_this.oContent.removeChild(oBullet);
				}
			});
		};
		
	}


	document.onkeyup=function(){
		
		if(_this.plane.offsetLeft<0){
			_this.plane.style.left=0
		}else if(_this.plane.offsetLeft>=_this.oContent.offsetWidth-_this.plane.offsetWidth){
			_this.plane.style.left=_this.oContent.offsetWidth-_this.plane.offsetWidth+'px';
		}
		if(_this.plane.offsetLeft>=_this.oContent.offsetWidth-_this.plane.offsetWidth){
			_this.plane.style.left=_this.oContent.offsetWidth-_this.plane.offsetWidth+'px';
		}
		if(_this.plane.offsetTop>=_this.oContent.offsetHeight-_this.plane.offsetHeight){
			_this.plane.style.top=_this.oContent.offsetHeight-_this.plane.offsetHeight+'px';;
		}
		clearInterval(timer);

	}
}

Plan.prototype.creates=function(){

};

Plan.prototype.bgmoves=function(num,obj,attr,iSpeed,fn){
	var _this=this;

	obj.Timer=null;
	clearInterval(obj.Timer);
	obj.Timer=setInterval(function(){
		//var iSpeed=-1;
		
		obj.style[attr]=obj.offsetTop+iSpeed+'px';
		
		//console.log(Math.abs(parseInt(_this.getStyle(obj,'top')))+'--'+(obj.offsetHeight/2))
		if(num==1){
			if(Math.abs(parseInt(_this.getStyle(obj,'top')))==(obj.offsetHeight/2)){
				obj.style[attr]=0;
			}
		}
		

		fn&&fn();
		//
	},20);
}
Plan.prototype.getStyle=function (obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
}


// 运动
Plan.prototype.move=function(obj, json, options)
{
	options=options||{};
	options.time=options.time||300;
	options.type=options.type||'ease-out';
	
	var start={};
	var dis={};
	
	for(var name in json)
	{
		//left
		if(name=='opacity')
		{
			start[name]=parseFloat($_.tool.getStyle(obj, name));
		}
		else if(name=='scrollTop')
		{
			start[name]=document.body.scrollTop||document.documentElement.scrollTop;	
		}
		else
		{
			start[name]=parseInt($_.tool.getStyle(obj, name));
			if(!start[name])
			{
				switch(name)
				{
					case 'left':
						start[name]=obj.offsetLeft;
					   break;
					case 'top':
						start[name]=obj.offsetTop;
					   break;
					case 'width':
						start[name]=obj.offsetWidth;
					   break;
					case 'height':
						start[name]=obj.offsetHeight;
					   break;
				};
			};
		}
		dis[name]=json[name]-start[name];
	}
	
	var n=0;
	var count=parseInt(options.time/30);
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		
		for(var name in json)
		{
			switch(options.type)
			{
				case 'linear':
					var cur=start[name]+n*dis[name]/count;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[name]+(a*a*a)*dis[name];
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[name]+(1-a*a*a)*dis[name];
					break;
			}
			
			if(name=='opacity')
			{
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}
			else if(name=='scrollTop')
			{
				document.body.scrollTop=document.documentElement.scrollTop=cur;
			}
			else
			{
				
				obj.style[name]=cur+'px';
			}
		}
		
		if(n==count)
		{
			clearInterval(obj.timer);
			
			options.end && options.end();
		}
	}, 30);
};

Plan.prototype.roundNum=function(s, b){
	return parseInt( Math.random()*(b-s+1)+s);
};
