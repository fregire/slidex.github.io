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

	// Активация и настройка слайдеров slick
	$(".project__picts-list").slick({
		vertical: true,
		slidesToShow: 2,
		adaptiveHeight: true,
		dots: false,
		arrows: false,
		asNavFor: ".project__main-pict",
		draggable: false,
		focusOnSelect: true
	});

	$(".project__main-pict").slick({
		slidesToShow: 1,
		prevArrow: "<button class='project__main-pict-arrow project__main-pict-prev' title='Предыдущая картинка'></button>",
		nextArrow: "<button class='project__main-pict-arrow project__main-pict-next' title='Следующая картинка'></button>",
		asNavFor: ".project__picts-list"
	});

	$(".examples__list").slick({
		slidesToShow: 1,
		fade: true,
		prevArrow: "<button class='examples__arrow examples__arrow-prev' title='Предыдущая картинка'></button>",
		nextArrow: 
		"<button class='examples__arrow examples__arrow-next' title='Следующая картинка'></button>" +
		"<span class='examples__counter'><span class='examples__counter-current'>1</span> из <span class='examples__counter-all'>10</span></span>",
		draggable: false
	});

	$(".examples__counter-all").text($(".examples__list").attr("data-amount"));
	var isFirstTime = false;
	var nextIndex;
	$(".examples__list").on("afterChange", function(slick, currentSlide, index){
		$(".examples__counter-current").text(++index);
	});

	$(".examples__arrow").click(function(){
		$(".examples__arrow").removeClass("examples__arrow--active");
		$(this).addClass("examples__arrow--active");
	});

	var path;
	$(".js-to-examples").click(function(e){
		e.preventDefault();

		path = $(this).attr("href");
		$('html, body').animate({ scrollTop: $(path).offset().top }, 500); 

	});


	$(".js-open-popup").click(function(){
		$(".modal").fadeIn();
	});

	$(".modal__close").click(function(){
		$(".modal").fadeOut();
	});

	$(".modal__form").submit(function(e){
		e.preventDefault();
		if($(".modal__submit-btn").attr('data-send') === "false"){
			if($(".modal__field[name='user_name']").val() != ""){
				$(".modal__submit-btn").attr("data-send", "true");
				$(".modal__submit-btn").text("Заказать");
				$(".modal__form-group div").css("transform", "translateX(-270px)");
			}
		} else {
			//Ajax
		}
	});
});