var xmlHttp;

function init()
{
	xmlHttp = GetXmlHttpObject();
	if (xmlHttp == null)
	{
		alert ("Browser does not support HTTP Request");
		return;
	} 

	if (window.location.search != "")
	{
		initList();
		return;
	}
	
	xmlHttp.onreadystatechange = onGetStat;
	xmlHttp.open("GET", "http://api.nemoge.com/exercise/api.php?event=stat", true);
	xmlHttp.send(null);
}

function onGetStat() 
{ 
	if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete")
	{ 
		var stat = xmlHttp.responseXML.getElementsByTagName("Stat")[0].firstChild.data;
		var btn = window.document.getElementById("btn");
		switch(stat)
		{
		case "0":
			btn.textContent = "通信错误";
			break;
		case "1":
			btn.textContent = "开始！";
			btn.disabled = false;
			btn.onclick = function(){start()};
			break;
		case "2":
			btn.textContent = "停止！";
			btn.disabled = false;
			btn.onclick = function(){stop()};
			break;
		case "3":
			btn.textContent = "已结束";
			break;
		}
	} 
}

function start()
{
	btn.disabled = true;
	xmlHttp.onreadystatechange = onStarted;
	xmlHttp.open("GET", "http://api.nemoge.com/exercise/api.php?event=start", true);
	xmlHttp.send(null);
}

function stop()
{
	btn.disabled = true;
	xmlHttp.onreadystatechange = onStoped;
	xmlHttp.open("GET", "http://api.nemoge.com/exercise/api.php?event=stop", true);
	xmlHttp.send(null);
}

function onStarted() 
{ 
	if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete")
	{ 
		var flag = xmlHttp.responseXML.getElementsByTagName("Flag")[0].firstChild.data;
		var btn = window.document.getElementById("btn");
		
		if(flag == "1")
		{
			btn.textContent = "已开始";
		}
		else
		{
			btn.textContent = "错误";
		}
	}
}

function onStoped() 
{ 
	if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete")
	{ 
		var flag = xmlHttp.responseXML.getElementsByTagName("Flag")[0].firstChild.data;
		var btn = window.document.getElementById("btn");
		
		if(flag == "1")
		{
			btn.textContent = "已结束";
		}
		else
		{
			btn.textContent = "错误";
		}
	}
}

function initList()
{
	wrapper = document.getElementById("wrapper");
}

function GetXmlHttpObject()
{
	var xmlHttp = null;

	try
	{
		// Firefox, Opera 8.0+, Safari
		xmlHttp = new XMLHttpRequest();
	}
	catch (e)
	{
		// Internet Explorer
		try
		{
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xmlHttp;
}

function getQueryStringArgs()
{
    var qs = (location.search.length > 0 ? location.search.substring(1) : ""),

        args = {},

        items = qs.length ? qs.split("&") : [],
        item = null,
        name = null,
        value = null,

        i = 0,
        len = items.length;

    for(i = 0; i < len;i++)
    {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);

        if(name.length)
        {
            args[name] = value;
        }
    }

    return args;
}

function getQueryStringValue(name)
{
    return getQueryStringArgs()[name];
}