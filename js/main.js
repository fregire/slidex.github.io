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

	$(".projects__item").slick({
		slidesToShow: 1,
		fade: true,
		arrows: false
	});

	var timer = setInterval(function(){
		var duration = 1000; //'slow'
		$(".projects__item").each(function(index) {
			console.log($(this));
		    $(this).delay(duration * index).slick("slickNext");
		});		
		clearInterval(timer);
	}, 6000);



	$(".examples__counter-all").text($(".examples__list").attr("data-amount"));

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

	var UserRegExp = {
		PHONE: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
		NAME: /^[а-яА-ЯёЁa-zA-Z0-9]+$/
	}
	var $userNameField = $(".modal__field[name='user_name']");
	var $userPhoneField = $(".modal__field[name='user_phone']");
	var $modalSubmitBtn = $(".modal__submit-btn");
	var isReadyToSend = false;

	$(".modal__form").submit(function(e){	
		e.preventDefault();

		if($(".modal__submit-btn").is("[data-is-last-field='true']")){
			if(UserRegExp.PHONE.test($userPhoneField.val())){
				$userPhoneField.removeClass("field--error");
				$modalSubmitBtn.text("Заказать");
			} else {
				$userPhoneField.addClass("field--error");
			}
		} else {
			if(UserRegExp.NAME.test($userNameField.val())){
				// Переход к другому полю и фокус на него
				$(".modal__form-group div").css("transform", "translateX(-270px)");
				$userPhoneField.focus();

				$userNameField.removeClass("field--error");
				$modalSubmitBtn.text("Заказать");
				$modalSubmitBtn.attr("data-is-last-field", "true");
				isReadyToSend = true;
			} else {
				$userNameField.addClass("field--error");
			}			
		}

		if(isReadyToSend){
			$.ajax({
				// TODO: Отправка на почту средствами Ajax
			});
		}



	});

	// TODO: Сделать при открытии окна проверку на наличие
	// атрибута тарифа и если таков есть, то записывать в hidden input
	$(".js-open-popup").click(function(){
		$(".modal").fadeIn();
	});

	$(".modal__close").click(function(){
		// Закрытие окна и очищение данных форм
		$(".modal").fadeOut();
		$(".modal__field").val("");
		$(".modal__form-group div").removeAttr("style");
		$(".modal__field").removeClass("field--error");
		$modalSubmitBtn.text("Далее");
		$modalSubmitBtn.attr("data-is-last-field", "false");
	});
});