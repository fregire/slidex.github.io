$(document).ready(function(){
	// Появление картинки проектов при скролле
	$(window).scroll(function(){
		var $elem = $(".about__photo");
		var windowBottomCoord = $(window).scrollTop() + $(window).height();
		// console.log("Window - " + ($elem.offset().top - $(window).scrollTop()));
		// console.log("Elem - " + $elem.offset().top);
		var top_of_element = $(".about__photo").offset().top;
	    var bottom_of_element = $(".about__photo").offset().top + $(".about__photo").outerHeight();
	    var bottom_of_screen = $(window).scrollTop() + window.innerHeight;
	    var top_of_screen = $(window).scrollTop();

	   	if($(window).scrollTop() > 400){
	   		$elem.addClass("about__photo--visible");
	   	}
	});

	$(".about__text").click(function(){
		$(this).toggleClass("about__text--opened");
	});


	var screenHeight = screen.height;
	$(window).scroll(function(){
		var topBorderElems = document.querySelectorAll(".unknown__item");
		var elemTopPosition;
		for(var i = 0; i < topBorderElems.length; i++){
			elemTopPosition = topBorderElems[i].getBoundingClientRect().top;
			if(elemTopPosition > screenHeight - 100){
				continue;
			} else {
				topBorderElems[i].classList.add("unknown__item--visible");
			}
		}
	});
});