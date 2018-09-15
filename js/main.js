$(document).ready(function(){
	var screenHeight = screen.height;
	// Функция - видим ли элемент при скролле вниз
	function isVisible(elem, screenHeight){
		var elemTopPosition = elem.getBoundingClientRect().top;
		var result = elemTopPosition < screenHeight - 200;
		
		return result;
	}
	// Появление картинки проектов при скролле
	$(window).scroll(function(){
		var elem = document.querySelector(".about__photos");
		if(isVisible(elem, screenHeight)){
			$(".about__photo").addClass("about__photo--visible");
		}
	});

	// Раскритие текста по клику
	$(".about__text").click(function(){
		$(this).toggleClass("about__text--opened");
	});


	$(window).scroll(function(){
		var topBorderElems = document.querySelectorAll(".unknown__item");

		for(var i = 0; i < topBorderElems.length; i++){
			if(isVisible(topBorderElems[i], screenHeight)){
				topBorderElems[i].classList.add("unknown__item--visible");
			}
		}

		if(isVisible(document.querySelector(".steps__inner"), screenHeight)){
			$(".steps__notification").addClass("steps__notification--visible");
		} 
	});
});