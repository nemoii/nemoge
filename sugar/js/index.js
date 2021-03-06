﻿/// <reference path="../typings/jquery/jquery.d.ts"/>
/* global Garden */
/* global returnCitySN */

var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();
var offsetX, offsetY;

var nicks = ["宝宝", "巾巾", "蠢巾", "可爱巾", "脑残巾", "聪明巾", "活力巾", "仙女巾", "媳妇", "sugar", "神巾病", "卫生巾", "萌巾", "春虫虫", "夏宝宝", "淘气巾", "臭宝宝", "香宝宝", "卖炭巾", "猪坚强"]

$(function () {
    // setup garden
	var $loveHeart = $("#loveHeart");
	offsetX = $loveHeart.width() / 2;
	offsetY = $loveHeart.height() / 2 - 55;
    $garden = $("#garden");
    gardenCanvas = $garden[0];
	gardenCanvas.width = $loveHeart.width();
    gardenCanvas.height = $loveHeart.height()
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);
	var together = new Date();
	together.setFullYear(2015, 6, 18);
	together.setHours(0);
	together.setMinutes(0);
	together.setSeconds(0);
	together.setMilliseconds(0);

	if (!document.createElement('canvas').getContext) {
		var msg = document.createElement("div");
		msg.id = "errorMsg";
		msg.innerHTML = "Your browser doesn't support HTML5!<br/>Recommend use Chrome 14+/IE 9+/Firefox 7+/Safari 4+";
		document.body.appendChild(msg);
		document.execCommand("stop");
	}
	else {
		setTimeout(function () {
			startHeartAnimation();
		}, 500);

		timeElapse(together);
		setInterval(function () {
			timeElapse(together);
		}, 500);
	}
	$("#content").css("width", $loveHeart.width() + $("#code").width());
	$("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
	$("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 2, 10));
	$("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));

    // renderLoop
    setInterval(function () {
        garden.render();
    }, Garden.options.growSpeed);
	
	rec();
});

$(window).resize(function () {
	location.replace(location.href);
});

function getHeartPoint(angle) {
	var t = angle / Math.PI;
	var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
	var y = - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
	return new Array(offsetX + x, offsetY + y);
}

function startHeartAnimation() {
	var interval = 50;
	var angle = 10;
	var heart = new Array();
	var animationTimer = setInterval(function () {
		var bloom = getHeartPoint(angle);
		var draw = true;
		for (var i = 0; i < heart.length; i++) {
			var p = heart[i];
			var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
			if (distance < Garden.options.bloomRadius.max * 1.3) {
				draw = false;
				break;
			}
		}
		if (draw) {
			heart.push(bloom);
			garden.createRandomBloom(bloom[0], bloom[1]);
		}
		if (angle >= 30) {
			clearInterval(animationTimer);
			showMessages();
		} else {
			angle += 0.2;
		}
	}, interval);
}

function timeElapse(date) {
	var current = Date();
	var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
	var days = Math.floor(seconds / (3600 * 24));
	seconds = seconds % (3600 * 24);
	var hours = Math.floor(seconds / 3600);
	if (hours < 10) {
		hours = "0" + hours;
	}
	seconds = seconds % 3600;
	var minutes = Math.floor(seconds / 60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	seconds = seconds % 60;
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	var result = "<span class=\"digit\">" + days + "</span> days <span class=\"digit\">" + hours + "</span> hours <span class=\"digit\">" + minutes + "</span> minutes <span class=\"digit\">" + seconds + "</span> seconds";
	$("#elapseClock").html(result);
}

function showMessages() {
	adjustWordsPosition();
	$('#messages').fadeIn(5000, function () {
		showLoveU();
	});
}

function adjustWordsPosition() {
	$('#words').css("position", "absolute");
	$('#words').css("top", $("#garden").position().top + 195);
	$('#words').css("left", $("#garden").position().left + 70);
}

function adjustCodePosition() {
	$('#code').css("margin-top", ($("#garden").height() - $("#code").height()) / 2);
}

function showLoveU() {
	$('#loveu').fadeIn(3000, function(){
		recurFader("#my-sugar", shuffle(nicks));
	});
}

function shuffle(aArr){
    return aArr.sort(function(){
        return (0.5 - Math.random());
    });
}

function rec() {
	if (typeof (returnCitySN) == "undefined") {
		setTimeout('rec()', 1000);
		return;
	}
	$.get("http://api.nemoge.com/rec.php?from=lovetimer&ip=" + returnCitySN["cip"] + "&city=" + returnCitySN["cname"]);
}