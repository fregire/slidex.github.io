$(document).ready(function(){

	// Проверка на наличие атрибута элемента 
	$.fn.hasAttr = function(name) {  
	   return this.attr(name) !== undefined;
	};
	var screenHeight = screen.height;

	// Функция - видим ли элемент при скролле вниз
	function isVisible(elem, screenHeight){
		var elemTopPosition = elem.getBoundingClientRect().top;
		var result = elemTopPosition < screenHeight + 100;
		
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

	// Появление блоков с фактами при скролле
	$(window).scroll(function(){
		var topBorderElems = document.querySelectorAll(".facts__item");

		for(var i = 0; i < topBorderElems.length; i++){
			if(isVisible(topBorderElems[i], screenHeight)){
				topBorderElems[i].classList.add("facts__item--visible");
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
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 1090,
				settings: {
					slidesToShow: 2,
					vertical: false
				}
			}



		]
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

	$(".logos-list--theme-slider .logos-list__item").slick({
		slidesToShow: 1,
		fade: true,
		arrows: false
	});

	// Плавная смена проектов 
	var timer = setInterval(function(){
		var duration = 1000; //'slow'
		$(".logos-list--theme-slider .logos-list__item").each(function(index) {
		    $(this).delay(duration * index).slick("slickNext");
		});		
		clearInterval(timer);
	}, 6000);


	// При загрузке страницы 
	$(".examples__counter-all").text($(".examples__list").attr("data-amount"));

	$(".examples__arrow").click(function(){
		// Счетчик текущей работы в слайдере
		var $slide = $(".examples__list > .slick-list > .slick-track > .slick-slide.slick-current.slick-active");
		var currentIndex = parseInt($($slide[$slide.length - 1]).attr("data-slick-index"));
		$(".examples__counter-current").text(++currentIndex);
	});

	$(".examples__arrow").click(function(){
		$(".examples__arrow").removeClass("examples__arrow--active");
		$(this).addClass("examples__arrow--active");
	});


	// Плавное перемещение к блоку с примерами
	var path;
	$(".js-to-examples").click(function(e){
		e.preventDefault();

		path = $(this).attr("href");
		$('html, body').animate({ scrollTop: $(path).offset().top }, 500); 

	});

	// При загрузке страницы если нет Js, то будут 
	// использоваться встроенные средства проверки html5 форм
	// иначе с помощью js
	$("input").removeAttr("pattern");
	// Перечисления регулярок для проверки форм
	var UserRegExp = {
		PHONE: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/,
		NAME: /^[а-яА-ЯёЁa-zA-Z0-9]+$/
	}
	var $modalUserNameField = $(".modal__field[name='user_name']");
	var $modalUserPhoneField = $(".modal__field[name='user_phone']");
	var $modalSubmitBtn = $(".modal__submit-btn");
	var isReadyToSend = false;

	$(".modal__form").submit(function(e){	
		e.preventDefault();

		// Если это последнее поле, значит это поле с телефоном и
		// проверка идет уже поля с Телефоном
		// Иначе идет проверка поля с Именем пользователя
		if($(".modal__submit-btn").is("[data-is-last-field='true']")){
			if(UserRegExp.PHONE.test($modalUserPhoneField.val())){
				$modalUserPhoneField.removeClass("field--error");
			} else {
				$modalUserPhoneField.addClass("field--error");
				alert("yes");
			}
		} else {
			if(UserRegExp.NAME.test($modalUserNameField.val())){
				// Переход к другому полю и фокус на него
				$(".modal__form-group div").css("transform", "translateX(-270px)");
				$modalUserPhoneField.focus();

				$modalUserNameField.removeClass("field--error");
				$modalSubmitBtn.text("Заказать");
				$modalSubmitBtn.attr("data-is-last-field", "true");
				isReadyToSend = true;
			} else {
				$modalUserNameField.addClass("field--error");
			}			
		}

		if(isReadyToSend){
			$.ajax({
				// TODO: Отправка на почту средствами Ajax
			});
		}



	});

	var $userNameField = $(".feedback__field[name='user_name']");
	var $userPhoneField = $(".feedback__field[name='user_phone']");
	var $userCommentField = $(".feedback__field[name='user_comment']");
	isReadyToSend = false;

	// Проверка Валидации формы на странице(не попап)
	$(".feedback__form").submit(function(e){
		e.preventDefault();
		if(!UserRegExp.NAME.test($userNameField.val())){
			$userNameField.addClass("field--error");
		} else {
			$userNameField.removeClass("field--error");
		}

		if(!UserRegExp.PHONE.test($userPhoneField.val())){
			$userPhoneField.addClass("field--error");
		} else {
			$userPhoneField.removeClass("field--error");
		}
		
		// Если не найдено ни одного поля с ошибкой, то можно отправлять
		if(!$(".field").is(".field--error")){
			// Ajax
		}
	});

	// Открытие попап окна
	$(".js-open-popup").click(function(){
		$(".modal").fadeIn();
		$("html").addClass("popup-opened");
		// Запись тарифа в скрытый инпут
		if($(this).hasAttr("data-tariff")){
			$("input[name='user_tariff']").val($(this).attr("data-tariff"));
		}
	});

	// Закрытие попап окна
	$(".modal__close").click(function(){
		$("html").removeClass("popup-opened");
		// Закрытие окна и очищение данных форм
		$(".modal").fadeOut();
		$(".modal__field").val("");
		$(".modal__form-group div").removeAttr("style");
		$(".modal__field").removeClass("field--error");
		$modalSubmitBtn.text("Далее");
		$modalSubmitBtn.attr("data-is-last-field", "false");
	});

	// Выбор отзыва при клике на логотип в Секции "Отзывы"
	$(".logos-list--tabs .logos-list__item").click(function(){
		var $index = $(this).attr("data-index");
		$(".logos-list--tabs .logos-list__item").removeClass("logos-list__item--active");
		$(this).addClass("logos-list__item--active");
		$(".reviews__item").css("display", "none");
		$(".reviews__item[data-index='" + $index + "']").fadeIn(600);
	})
});