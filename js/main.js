$(document).ready(function(){

	// Необходимые переменные 
	var screenHeight = screen.height;

	/*** Вспомогательные функции ***/

	// Проверка на наличие атрибута элемента 
	$.fn.hasAttr = function(name) {  
	   return this.attr(name) !== undefined;
	};

	// Функция - видим ли элемент при скролле вниз
	function isVisible(elem, screenHeight){
		var elemTopPosition = elem.getBoundingClientRect().top;
		var result = elemTopPosition < screenHeight - 150;
		
		return result;
	}

	// Раскрытие текста по клику
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

		if(isVisible(document.querySelector(".about"), screenHeight)){
			$(".about__photo").addClass("about__photo--visible");
		} 
	});

	// Slick sliders - настройка и активация
	(function(){
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

		$(".projects__list .client-logo").slick({
			slidesToShow: 1,
			fade: true,
			arrows: false
		});

		// Слайдер для тарифов 
		if($(window).width() < 550){
			$(".prices__list").slick({ 
				slidesToShow: 1,
				dots: true, 
				arrows: false,
				adaptiveHeight: true
			});
		}

		$(".examples__projects").slick({
			slidesToShow: 1,
			prevArrow: "<button class='project__arrow project__arrow--prev' title='Предыдущая картинка'></button>",
			nextArrow: "<button class='project__arrow project__arrow--next' title='Следующая картинка'></button>",
			fade: true
		});	

		if($(window).width() < 510){
			// Слайдер
			$(".examples__cats").slick({
				slidesToShow: 1,
				arrows: true
			});
		}

		// Конец активаций слик слайдера
	})();



	//Начинать показ логотипов проектов с разных индексов
	$(".client-logo.slick-initialized.slick-slider").each(function(i){
		$(this).slick("slickGoTo", i);
	});

	// Плавная смена логотипов проектов 
	var timer = setInterval(function(){
		var duration = 1000; //'slow'
		$(".logos-list--theme-slider .logos-list__item").each(function(index) {
		    $(this).delay(duration * index).slick("slickNext");
		});		
		clearInterval(timer);
	}, 6000);

	// Плавное перемещение к блоку с примерами
	(function(){
		var path;
		$(".js-to-examples").click(function(e){
			e.preventDefault();

			path = $(this).attr("href");
			$('html, body').animate({ scrollTop: $(path).offset().top }, 500); 

		});		
	})();

	// Табы категорий работ на Главной 
	(function(){
		// При клике на категории на десктопах
		$(".examples__cats .link").click(function(e){
			e.preventDefault();
			var currentCat = $(this).attr("data-cat");

			$(".examples__cats .link").removeClass("link--active");
			$(this).addClass("link--active");

			$(".examples__list").removeClass("examples__list--active");
			$(".examples__list[data-cat='" + currentCat + "']").addClass("examples__list--active");
		});

		// При перелистывании слайдера на мобилках
		$(".examples__cats").on("afterChange", function(slick, currentSlide, index, i){
			$(".examples__list--active").removeClass("examples__list--active");
			$(".examples__list[data-cat='" + index + "']").addClass("examples__list--active");
		});

	})();

	// Перелистывание к работам по нажатию на превью(справа мелкие картинки - превью)
	(function(){
		$(".previews img").click(function(){
			var $currentImg = $(this);
			var currentIndex = +$currentImg.attr("data-index");
			var $parentSlider = $currentImg.parent().parent().parent().parent();

			$parentSlider.find(".examples__projects").slick("slickGoTo", currentIndex);
		})
	})();


	// Раскрытие открытие текста для отзывов
	if($(window).width() < 510){
		$(".reviews__text").click(function(){ 
			$(this).toggleClass("reviews__text--opened");
		});
	}


	// Проверка форм
	(function(){
		// Перечисления регулярок для проверки форм
		var UserRegExp = {
			PHONE: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/,
			NAME: /^[а-яА-ЯёЁa-zA-Z]{2,20}$/
		}
		var isPhoneValid = function(value){
			return UserRegExp.PHONE.test(value);
		}
		var isNameValid = function(value){
			return UserRegExp.NAME.test(value);
		}

		// Удаление встроенных шаблонов - проверка через js
		$("input").removeAttr("pattern");

		// Проверка в попап окне
		var $modalUserNameField = $(".modal__field[name='user_name']");
		var $modalUserPhoneField = $(".modal__field[name='user_phone']");
		var $modalSubmitBtn = $(".modal__submit-btn");
		var isReadyToSend = false;

		$(".modal__form").submit(function(e){	
			var data = new FormData(this);
			var visibleZoneCoords = document.querySelector(".modal__form-group").getBoundingClientRect();
			var visibleZoneWidth = visibleZoneCoords.right - visibleZoneCoords.left;

			e.preventDefault();
			// Если это последнее поле, значит это поле с телефоном и
			// проверка идет уже поля с Телефоном
			// Иначе идет проверка поля с Именем пользователя
			if($(".modal__submit-btn").is("[data-is-last-field='true']")){
				if(isPhoneValid($modalUserPhoneField.val())){
					$modalUserPhoneField.removeClass("field--error");
					//Если это последнее поле и оно верно, значит можем отправлять
					isReadyToSend = true;
				} else {
					$modalUserPhoneField.addClass("field--error");
				}
			} else {
				if(isNameValid($modalUserNameField.val())){
					// Переход к другому полю и фокус на него
					$(".modal__form-group div").css("transform", "translateX(-" + visibleZoneWidth +"px)");
					$modalUserPhoneField.focus();

					$modalUserNameField.removeClass("field--error");
					$modalSubmitBtn.text("Заказать");
					$modalSubmitBtn.attr("data-is-last-field", "true");
				} else {
					$modalUserNameField.addClass("field--error");
				}			
			}

			if(isReadyToSend){
				data.append("action", "send_mail");
				$(this).unbind('submit').submit();
				// Происходит по успешной проверке 
			}
		});

		// Проверка на главной странице
		var $userNameField = $(".feedback__field[name='user_name']");
		var $userPhoneField = $(".feedback__field[name='user_phone']");
		var $userCommentField = $(".feedback__field[name='user_comment']");
		isReadyToSend = false;

		// Проверка Валидации формы на странице(не попап)
		$(".feedback__form").submit(function(e){
			var data = new FormData(this);
			if(!isNameValid($userNameField.val())){
				$userNameField.addClass("field--error");
				e.preventDefault();
			} else {
				$userNameField.removeClass("field--error");
			}

			if(!isPhoneValid($userPhoneField.val())){
				$userPhoneField.addClass("field--error");
				e.preventDefault();
			} else {
				$userPhoneField.removeClass("field--error");
			}
			
			// Если не найдено ни одного поля с ошибкой, то можно отправлять
			if(!$(".field").is(".field--error")){
				// Происходит по успешной проверке
			}
		});
	})();

	

	// Попап окно
	(function(){
		// Открытие попап окна
		$(".js-open-popup").click(function(){
			$(".modal").fadeIn();
			$("html").addClass("popup-opened");
			// Запись тарифа в скрытый инпут(если окно открывается после нажатия на тарифы)
			if($(this).hasAttr("data-tariff")){
				$("input[name='user_tariff']").val($(this).attr("data-tariff"));
			}
		});


		// Закрытие попап окна
		$(".modal__close").click(function(){
			$("html").removeClass("popup-opened");
			// Закрытие окна и очищение данных форм
			$("input[name='user_tariff']").val("");
			$(".modal").fadeOut();
			$(".modal__field").val("");
			$(".modal__form-group div").removeAttr("style");
			$(".modal__field").removeClass("field--error");
			$(".modal__submit-btn").text("Далее");
			$(".modal__submit-btn").attr("data-is-last-field", "false");
		});
	})();

	// Табы отзывов
	// Выбор отзыва при клике на логотип в Секции "Отзывы"
	$(".reviews__logos .client-logo").click(function(){
		var $index = $(this).attr("data-index");
		$(".reviews__logos .client-logo").removeClass("client-logo--active");
		$(this).addClass("client-logo--active");
		$(".reviews__item").css("display", "none");
		$(".reviews__item[data-index='" + $index + "']").fadeIn(600);
	});

	//Смена ссылки при свайпе работ в слайдере
	// на мобилках
	var $linkMore = $(".examples__more");
	var href = $(".examples__list--active .examples__projects a").attr("href");
	
	// При загрузке страницы и при перелистывании слайдов
	$linkMore.attr("href", href);

	$(".examples__projects").on("afterChange", function(slick, slide, currentIndex){
		href = $(this).find(".slick-slide.slick-current a").attr("href");

		$linkMore.attr("href", href);
	});

	$(".examples__cats").on("afterChange", function(slick, slide, currentIndex){
		href = $(".examples__list--active .examples__projects a").attr("href");

		$linkMore.attr("href", href);
	});

	

});