$(document).ready(function(){

	$('h2').css({
		'height': $('h2').css('width')
	})

	/* H2 */
	$('.build-owl__bckg').css({
		'height': $('.b-fifth .owl-carousel').css('height')
	})
	/* END H2 */


	/*URL*/


	if (location.search.indexOf('google') !== -1) {
		var $headerPhone = document.querySelectorAll('[data-phone]');
		var $logo = document.querySelectorAll('.logo__img');

		$headerPhone.forEach(function(i) {
			i.textContent = '642-09-62';
		});
		$logo.forEach(function(i) {
			i.setAttribute('src', '../img/logo2.png'/*tpa=http://beton-armatura.ru/assets/img/logo2.png*/);
		});
	}


	/*end URL*/





	/* GENERATE DATE */

	var price__date = new Date();
	price__date = price__date.setDate( price__date.getDate() - 2 );
	
	function formatDate(date) {

	  var dd = date.getDate();
	  if (dd - 2 < 10) dd = '0' + dd;

	  var mm = date.getMonth() + 1;
	  if (mm < 10) mm = '0' + mm;

	  var yy = date.getFullYear() % 100;
	  if (yy < 10) yy = '0' + yy;

	  return dd + '.' + mm + '.20' + yy;
	}

	var d = new Date(price__date); // 30 Янв 2014
	$('#price-date').html(formatDate(d));
	/* END GEN DATE */



	/* GENERATE SALE */
	function randomInteger(min,max) {
		var integer = (Math.random() * (max - min) + min);
		return integer = Math.round( (integer) * 100 ) / 100;
	}

	var firstGen_a = 15, // мин скидка при первой генерации
		firstGen_b = 25; // макс скидка при первой генерации




	
	if ( !(getCookie('sodr-percent')) ) {	
		$('.gen__button').addClass('noactive');

		var gen_sale_1 = setInterval (function(){
			var firstGen_r = randomInteger(firstGen_a, firstGen_b); // генерация первой скидки
			
			setCookie('sodr-percent', firstGen_r, {expires: 86400});
			setCookie('sodr-percent-repeat', 'true', {expires: 86400});

			$('#cur-sale__percent').html(firstGen_r).attr({'data-percent' : firstGen_r});
			$('.gen__button').addClass('noactive');
			$('#sale-fixed_percent').html(firstGen_r);
			$('#form__sale').val(firstGen_r + '%');
		}, 1)

		setTimeout(function() {
			$('.gen__cb_concrete, .gen__cb_fittings').removeClass('noactive');
			$('.gen__button').addClass('noactive');

			clearInterval(gen_sale_1);
		}, 2000)

	}
	if  ( getCookie('sodr-percent') ) {
		$('#cur-sale__percent').html( getCookie('sodr-percent')).attr({'data-percent' : getCookie('sodr-percent')});
		$('.gen__cb_concrete, .gen__cb_fittings').removeClass('noactive');
		$('.gen__button').addClass('noactive');
		$('#form__sale').val( $('#cur-sale__percent').html() + '%')
		$('#sale-fixed_percent').html($('#cur-sale__percent').html());
		$('.sale-fixed').show('slow');
	}

	$('.gen__cb_fittings, .gen__cb_concrete').on('click', function() {
		if ( getCookie('sodr-percent-repeat') === 'true') {
			$(this).removeAttr('style')
			$(this).toggleClass('active');
			if ( $('.gen__cb_fittings').hasClass('active') || $('.gen__cb_concrete').hasClass('active') ) {
				$('.gen__button').removeClass('noactive')
			} else {
				$('.gen__button').addClass('noactive');
			}
		}
	})


		$('.gen__button').on('click', function(){

			if ( getCookie('sodr-percent-repeat') === 'true' && $('.gen__cb_concrete').hasClass('active') || $('.gen__cb_fittings').hasClass('active') ) {
				var gen_sale_2 = setInterval (function(){
					var secondGen_c = +($('#cur-sale__percent').attr('data-percent'));
					var secondGen_r = randomInteger(secondGen_c, 10);
					
					setCookie('sodr-percent', secondGen_r, {expires: 86400});
					setCookie('sodr-percent-repeat', 'false', {expires: 86400});

					$('#form__sale').val(secondGen_r + '%');
					$('#cur-sale__percent').html(secondGen_r);
					$('.gen__button, .gen__cb_concrete, .gen__cb_fittings').addClass('noactive');
					$('.gen__cb_concrete, .gen__cb_fittings').removeClass('active')
					$('#sale-fixed_percent').html($('#cur-sale__percent').html());
				}, 1)

				setTimeout(function() {
					clearInterval(gen_sale_2);
				}, 2000)
			} else {
				$('.gen__button, .gen__cb_concrete, .gen__cb_fittings').addClass('noactive');
			}
		});

		if ( getCookie('sodr-percent-repeat') === 'false' ) {
			$('.gen__button, .gen__cb_concrete, .gen__cb_fittings').addClass('noactive');
		}
	

	//deleteCookie('sodr-percent');
	//deleteCookie('sodr-percent-repeat');

	/* END GEN SALE */


	// установка куки
	function setCookie(name, value, options) {
	  options = options || {};

	  var expires = options.expires;
	  	
	  if (typeof expires == 'number' && expires) {
	    var d = new Date();
	    d.setTime(d.getTime() + expires * 1000);
	    expires = options.expires = d;
	  }
	  if (expires && expires.toUTCString) {
	    options.expires = expires.toUTCString();
	  }

	  value = encodeURIComponent(value);

	  var updatedCookie = name + '=' + value;

	  for (var propName in options) {
	    updatedCookie += '; ' + propName;
	    var propValue = options[propName];
	    if (propValue !== true) {
	      updatedCookie += '=' + propValue;
	    }
	  }

	  document.cookie = updatedCookie;
	}

	// возвращает куки с именем name, если есть, если нет, то undefined
	function getCookie(name) {
	  var matches = document.cookie.match(new RegExp(
	    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
	  ));
	  return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	// удаление куки
	function deleteCookie(name) {
	  setCookie(name, '', {
	    expires: -1
	  })
	}


	/* POP */

	$("form").submit(function () {

		let woo = {
			go: function () {
				let a = 'go function';
				console.log(a);
				var formID = $(this).attr('id'); // Получение ID формы
                var formNm = $('#' + formID); // Добавление решётки к имени ID
                var message = $(formNm).find(".form__msgs"); // Ищес класс .msgs в текущей форме  и записываем в переменную
                var formTitle = $(formNm).find(".form__title"); // Ищес класс .formtitle в текущей форме и записываем в переменную
                for (let obj in a) {
					
                }
            }
		}

		let b = document.querySelector('.button');

        var formID = $(this).attr('id'); // Получение ID формы
        var formNm = $('#' + formID); // Добавление решётки к имени ID
        var message = $(formNm).find(".form__msgs"); // Ищес класс .msgs в текущей форме  и записываем в переменную
        var formTitle = $(formNm).find(".form__title"); // Ищес класс .formtitle в текущей форме и записываем в переменную
        $('#form__sale-ui').val( $('#form__sale').val() )
        $(formNm).find(".form__info").val(formID)
        $.ajax({
            type: "POST",
            url: 'http://promo.washgazon.ru/mt.action.php',
            data: formNm.serialize(),
            success: function (data) {
              message.css({'background':'#66e8a1'});
              message.text('Письмо отправлено!');
              setTimeout(function(){
              	message.css({'background':'#fff'});
                message.html('');
                $('input').not(':input[type=submit], :input[type=hidden]').val('');
                $.fancybox.close();
              }, 3000);
            },
            error: function (jqXHR, text, error) {
                message.html('Упс...Письмо не отправилось');
                setTimeout(function(){
                  message.html('');
                  $('input').not(':input[type=submit], :input[type=hidden]').val('');
                }, 3000);
            }
        });
        return false;
    });
    //для стилей формы
      var $input = $('.form-fieldset > input');
      $input.blur(function (e) {
        $(this).toggleClass('filled', !!$(this).val());
      });
	/* END POP */


	/* NAV SCROLL*/
/*

	var header = $("nav"); // Меню
	var scrollPrev = 0 // Предыдущее значение скролла
	var winw = $(window).width();
	
	$(window).scroll(function() {
		if ( winw > 992 ) {
		var scrolled = $(window).scrollTop(); // Высота скролла в px
		var firstScrollUp = false; // Параметр начала сколла вверх
		var firstScrollDown = false; // Параметр начала сколла вниз
		
		// Если скроллим
		if ( scrolled > 0 ) {
			// Если текущее значение скролла > предыдущего, т.е. скроллим вниз
			if ( scrolled > scrollPrev ) {
				firstScrollUp = false; // Обнуляем параметр начала скролла вверх
				// Если меню видно
				if ( scrolled < header.height() + header.offset().top ) {
					// Если только начали скроллить вниз
					if ( firstScrollDown === false ) {
						var topPosition = header.offset().top; // Фиксируем текущую позицию меню
						header.css({
							"top": topPosition + "px"
						});
						firstScrollDown = true;
					}
					// Позиционируем меню абсолютно
					header.css({
						"position": "absolute"
					});
				// Если меню НЕ видно
				} else {
					// Позиционируем меню фиксированно вне экрана
					header.css({
						"position": "fixed",
						"top": "-" + header.height() + "px",
						"padding": '0'
					});
				}
				
			// Если текущее значение скролла < предыдущего, т.е. скроллим вверх
			} else {
				firstScrollDown = false; // Обнуляем параметр начала скролла вниз
				// Если меню не видно
				if ( scrolled > header.offset().top ) {
					// Если только начали скроллить вверх
					if ( firstScrollUp === false ) {
						var topPosition = header.offset().top; // Фиксируем текущую позицию меню
						header.css({
							"top": topPosition + "px"
						});
						firstScrollUp = true;
					}

					// Позиционируем меню абсолютно
					header.css({
						"position": "absolute"
					});
				} else {
					// Убираем все стили
					header.removeAttr("style");
				}
			}
			// Присваеваем текущее значение скролла предыдущему
			scrollPrev = scrolled;
		}
	}
	});			
*/
	/* END NAV SCROLL*/

	$(window).scroll(function() {
	  if ( $(this).scrollTop() >= $('#b-third').offset().top + 30 ) {
	  	$('.sale-fixed').show('slow');
	  }	
	});

	$(document).mousemove(function(event){

	function parallax() {
		var x_mouse = event.pageX; // позиция курсора по оси x
		var y_mouse = event.pageY; // позиция курсора по оси y
		//var w_center = $(this).width() / 2;
		//var y_center = $

		var obj = $('[data-parallax="true"]'); // объекты
		var allObj = {};

		$.each(obj, function(i, val) {
			allObj.number = i;
			allObj.x_pos = $(val).offset().left + ( $(val).width() / 2 ) ; // определяем центр объекта
			allObj.y_pos = $(val).offset().top + ( $(val).height() / 2 ) ; // определяем центр объекта

			var x_parallax = -((  allObj.x_pos - x_mouse ) / 50);
			var y_parallax =  -((  allObj.y_pos - y_mouse ) / 10);

			$(val).css({
				'-webkit-transform' : 'translateZ(0) translate(' + x_parallax  + 'px, ' + y_parallax  + 'px) ',
				'-webkit-transition': '-webkit-transform 0.5s cubic-bezier(.92,2.01,.63,.85) 0s',
				'-o-transform' : 'translateZ(0) translate(' + x_parallax  + 'px, ' + y_parallax  + 'px) ',
				'-o-transition': '-o-transform 0.5s cubic-bezier(.92,2.01,.63,.85) 0s',
				'-moz-transform' : 'translateZ(0) translate(' + x_parallax  + 'px, ' + y_parallax  + 'px) ',
				'-moz-transition': '-moz-transform 0.5s cubic-bezier(.92,2.01,.63,.85) 0s',
				'transform' : 'translateZ(0) translate(' + x_parallax  + 'px, ' + y_parallax  + 'px) ',
				'transition': 'transform 0.5s cubic-bezier(.92,2.01,.63,.85) 0s',
			});
		});		
	};

	parallax();
});



});

