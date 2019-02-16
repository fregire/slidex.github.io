(function(){
	var UserRegExp = {
		PHONE: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/,
		NAME: /^[а-яА-ЯёЁa-zA-Z]{2,20}$/
	}

	// Функции, необходимые на каждой странице
	var App = {
		isVisible: function(elem, screenHeight){
			var elemTopPosition = elem.getBoundingClientRect().top;
			var result = elemTopPosition < screenHeight - 150;
			
			return result;
		},
		openPopup: function(){
			$(".modal").fadeIn();
			$("html").addClass("popup-opened");
			// Запись тарифа в скрытый инпут(если окно открывается после нажатия на тарифы)
			if($(this).hasAttr("data-tariff")){
				$("input[name='user_tariff']").val($(this).attr("data-tariff"));
			}			
		},
		closePopup: function(){
			$("html").removeClass("popup-opened");
			// Очищение полей
			$("input[name='user_tariff']").val("");
			$(".modal").fadeOut();
			$(".modal__field").val("");
			$(".modal__form-group div").removeAttr("style");
			$(".modal__field").removeClass("field--error");
			$(".modal__submit-btn").text("Далее");
			$(".modal__submit-btn").attr("data-is-last-field", "false");
		},
		isVisible: function(elem, screenHeight){
			var elemTopPosition = elem.getBoundingClientRect().top;
			var result = elemTopPosition < screenHeight - 150;
			
			return result;
		},
		isPhoneValid: function(value){
			return UserRegExp.PHONE.test(value);
		},
		isNameValid: function(value){
			return UserRegExp.NAME.test(value);
		}

	}
	window.App = App;

	$(document).ready(function(){
			// Другие функции	

			//Наличие атрибута
			$.fn.hasAttr = function(name) {  
			   return this.attr(name) !== undefined;
			};

			// Плавное перемещение к блокам
			(function(){
				var path;
				$(".js-to-examples").click(function(e){
					e.preventDefault();

					path = $(this).attr("href");
					$('html, body').animate({ scrollTop: $(path).offset().top }, 500); 

				});		
			})();

			// Удаление встроенных шаблонов, проверка через js полей попапа
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
					if(App.isPhoneValid($modalUserPhoneField.val())){
						$modalUserPhoneField.removeClass("field--error");
						//Если это последнее поле и оно верно, значит можем отправлять
						isReadyToSend = true;
					} else {
						$modalUserPhoneField.addClass("field--error");
					}
				} else {
					if(App.isNameValid($modalUserNameField.val())){
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

			$(".js-open-popup").click(App.openPopup);
			$(".modal__close").click(App.closePopup);
	});


})();


