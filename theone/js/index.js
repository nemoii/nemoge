document.onreadystatechange = load;//当页面加载状态改变的时候执行这个方法. 

function load()
{
	var http_request = false;
	//开始初始化XMLHttpRequest对象
	if(window.XMLHttpRequest) { //Mozilla 浏览器
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {//设置MiME类别
			http_request.overrideMimeType('text/xml');
		}
	}
	else if (window.ActiveXObject) { // IE浏览器
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	if (!http_request) { // 异常，创建对象实例失败
		window.alert("不能创建XMLHttpRequest对象实例.");
		return false;
	}
	// 确定发送请求的方式和URL以及是否同步执行下段代码
	http_request.open("GET", "http://api.nemoge.com/rec.php?ip=".returnCitySN["cip"], true);
	http_request.send(null);
}

function loadfinished()
{
	var loading = document.getElementById('loading');
	loading.parentNode.removeChild(loading);
	
	document.getElementById("starter").style.display="block";
}

function start()
{
	var starter = document.getElementById("starter");
	starter.parentNode.removeChild(starter);
	var bgaudio = document.getElementById('bgaudio');
	bgaudio.play();
	
    setInterval("new firework();",600);
	document.getElementById('bg').style.display="block";
}

var firework = function(){
	this.size = 40;
	this.speed = 0.1;
	this.rise();
}

firework.prototype = {
	color:function(){
		var c = ['0','3','6','9','c','f'];
		var t = [c[Math.floor(Math.random()*100)%6],'0','f'];
		t.sort(function(){return Math.random()>0.5?-1:1;});
		return '#'+t.join('');
	},
	aheight:function(){
		var h = document.documentElement.clientHeight;
		return Math.abs(Math.floor(Math.random()*h-200))+201;
	},
	firecracker:function(){
		var b = document.createElement('div');
		var w = document.body.clientWidth;
		b.style.color = this.color();
		b.style.position = 'fixed';
		b.style.bottom = 0;
		b.style.left = Math.floor(Math.random()*w)+1+'px';
		document.body.appendChild(b);
		return b;
	},
	rise:function(){
		var o = this.firecracker();
		var n = this.aheight();
		var speed = this.speed;
		var e = this.expl;
		var s = this.size;
		var k = n;
		var m = function(){
			o.style.bottom = parseFloat(o.style.bottom)+k*speed+'px';
			k-=k*speed;
			if(k<2){
				clearInterval(clear);
				e(o,n,s,speed);
			}
		}
		o.innerHTML = '.';
		if(parseInt(o.style.bottom)<n){
			var clear = setInterval(m,20);
		}
	},
	expl:function(o,n,s,speed){
		var R = n/3;
		var Ri = n/6;
		var r = 0;
		var ri = 0;
		for(var i=0;i<s;i++){
			var span = document.createElement('span');
			var p = document.createElement('p');
			span.style.position = 'absolute';
			span.style.left = 0;
			span.style.top = 0;
			span.innerHTML = '❤';
			p.style.position = 'absolute';
			p.style.left = 0;
			p.style.top = 0;
			p.innerHTML = '❤';
			o.appendChild(span);
			o.appendChild(p);
		}
		function spr(){
			r += R*speed;
			ri += Ri*speed/2;
			sp = o.getElementsByTagName('span');
			p = o.getElementsByTagName('p');
			for(var i=0; i<sp.length;i++){
				sp[i].style.left=r*Math.cos(360/s*i)+'px';
				sp[i].style.top=r*Math.sin(360/s*i)+'px';
				p[i].style.left=ri*Math.cos(360/s*i)+'px';
				p[i].style.top=ri*Math.sin(360/s*i)+'px';
			}
			R-=R*speed;
			if(R<2){
				clearInterval(clearI);
				o.parentNode.removeChild(o);
			}
		}
		var clearI = setInterval(spr,20);
	}
}