$(document).ready(function(){

	// Необходимые переменные 
	var screenHeight = screen.height;
	// Раскрытие текста по клику
	$(".about__text").click(function(){
		$(this).toggleClass("about__text--opened");
	});

	// Появление блоков с фактами при скролле
	$(window).scroll(function(){
		var topBorderElems = document.querySelectorAll(".facts__item");

		for(var i = 0; i < topBorderElems.length; i++){
			if(App.isVisible(topBorderElems[i], screenHeight)){
				topBorderElems[i].classList.add("facts__item--visible");
			}
		}

		if(App.isVisible(document.querySelector(".steps__inner"), screenHeight)){
			$(".steps__notification").addClass("steps__notification--visible");
		}

		if(App.isVisible(document.querySelector(".about"), screenHeight)){
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
			prevArrow: "<button class='project__arrow project__arrow--prev arrow arrow--prev' title='Предыдущая картинка'></button>",
			nextArrow: "<button class='project__arrow project__arrow--next arrow arrow--next' title='Следующая картинка'></button>",
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

		// Проверка на главной странице
		var $userNameField = $(".feedback__field[name='user_name']");
		var $userPhoneField = $(".feedback__field[name='user_phone']");
		var $userCommentField = $(".feedback__field[name='user_comment']");
		isReadyToSend = false;

		// Проверка Валидации формы на странице(не попап)
		$(".feedback__form").submit(function(e){
			var data = new FormData(this);
			if(!App.isNameValid($userNameField.val())){
				$userNameField.addClass("field--error");
				e.preventDefault();
			} else {
				$userNameField.removeClass("field--error");
			}

			if(!App.isPhoneValid($userPhoneField.val())){
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
	$(".examples__projects").on("afterChange", function(slick, slide, currentIndex){
		href = $(this).find(".slick-slide.slick-current a").attr("href");
		var $linkMore = $(this).siblings(".examples__more");

		$linkMore.attr("href", href);
	});

	// Переход по ссылке в виде картинки запрещен 
	// на мобилках
	if($(window).width() <= 510){
		$(".examples__projects a").click(function(e){
			e.preventDefault();
		});
	}


	//Появление стрелок работ при скролле страницы
	var onWindowScrollShowArrows = function(){
		var navList = document.querySelector(".nav__list");
		var coordsY = navList.getBoundingClientRect().top;
		var pageArrows = document.querySelectorAll(".page-nav");

		if(coordsY - window.pageYOffset <= 0){
			pageArrows.foreach(function(elem){
				elem.classList.add("page-nav--visible");
			});
		}
	}
	

});