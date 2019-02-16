(function(){
	var onWindowScrollShowArrows = function(){
		var $navList = $(".nav__list");
		var $pageArrows = $(".page-nav");
		var coordsYBottom = $navList.offset().top + $navList.innerHeight();

		if(coordsYBottom < $(window).scrollTop()){
			$pageArrows.addClass("page-nav--visible");
		} else {
			$pageArrows.removeClass("page-nav--visible");
		}
	}
	$(window).scroll(onWindowScrollShowArrows);

	var goToUrl = function(url){
		document.location.href = url;
	}

	var startX, 
			startTime, 
			maxTime = 300,
			minDist = 150,
			swipeDir = "none",
			pageArrowPrevHref = document.querySelector(".page-nav--prev").href,
			pageArrowNextHref = document.querySelector(".page-nav--next").href;

	var onTouchStartBody = function(e){
		var touchedObj = e.changedTouches[0];
		startTime = new Date().getTime();
		startX = touchedObj.pageX;
	}

	var onTouchEndBody = function(e){
		var touchedObj = e.changedTouches[0];
		var distX = touchedObj.pageX - startX; 
		var elapsedTime = new Date().getTime() - startTime;

		if(elapsedTime < maxTime){
			if(Math.abs(distX) > minDist){
				swipeDir = (distX > 0) ? "left" : "right";
			}
		}
		console.log(distX);

		switch(swipeDir){
			case 'left':
				goToUrl(pageArrowPrevHref);
			case 'right':
				goToUrl(pageArrowNextHref);
		}

	}
	document.body.addEventListener("touchstart", onTouchStartBody);
	document.body.addEventListener("touchend", onTouchEndBody);
})();