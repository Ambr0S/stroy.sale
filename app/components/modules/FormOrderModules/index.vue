<template lang="jade">
	form.form-order.form.ui(:class="classList")
		// статус формы
		.form-order__msgs
		
		// форма подписки на главной странице
		input.form-order__input(name="form__name", placeholder="Укажите товар", v-if="propTemplate=='subscribe'")
		input.form-order__input(name="form__email", placeholder="Введите email", v-if="propTemplate=='subscribe'")
		input.form-order__input(type="submit", @click="sendOrder", :class="'button--' + propButtonStyle", value="Отправить", v-if="propTemplate=='subscribe'")
		
		// форма заказа
		fieldset(v-if="propTemplate=='order'")
			legend <i class="ui icon big address book outline"></i> <span>Контакты</span>
			label Введите email
			input(name="form__email", id="form__email", placeholder="Например, info@stroy.sale")
			label Введите номер телефона
			input(name="form__phone", id="form__phone", placeholder="Например, +7 904 600-80-20")
		fieldset(v-if="propTemplate=='order'")
			legend <i class="ui icon big shipping"></i> <span>Доставка</span>
			select(name="form__delivery", id="form__delivery", class="ui dropdown", v-model='valueFormDelivery')
				option(value="") - Выберите способ -
				option(value="1") Самовывоз -- г. Москва, Очаковское шоссе, д.5, стр.28
				option(value="2") Доставка курьерской службой
			label(v-if='valueFormDelivery==2') Адрес
			input(v-if='valueFormDelivery==2', name="form__address", id="form__address", placeholder='Например, г. Москва, Очаковское шоссе, д.5, стр.28, кв.145, подъезд 2')
		fieldset(v-if="propTemplate=='order'")
			legend <i class="ui icon big handshake"></i> <span>Оплата</span>
			select(name="form__payment", id="form__payment", class="ui dropdown", v-model='valueFormPayment')
				option(value="") - Выберите способ -
				option(value="1") Онлайн
				option(value="2") Банковским переводом
				option(value="3") Наличными при получении
				option(value="4") Безналичная оплата по счёту
		fieldset.form-order__full-cost(v-if="propTemplate=='order'")
			legend <i class="ui icon big ruble"></i><span>Стоимость заказа:</span> 	<strong>{{ propCartListFullCost }}</strong> руб.
			button.button.ui.primary.button.form-order__button-submit(type="submit", @click="sendOrder") <i class="big check circle outline icon"></i>  Заказать
			div Условия акции действительны только<br>при покупке на сумму от 5 000 рублей
			
		fieldset(class="hidden", v-if="propTemplate=='order'")
			input(name="form__order", v-bind:value='propCartList')

</template>

<script>
	export default {
		name: 'FormOrderComponent',
		props: [
			'propTemplate',
			'propButtonStyle',
			'propCartListFullCost',
      'propCartList'
		],
		data: function () {
			return {
				orderNumber: null,
				valueFormDelivery: '',
				valueFormPayment: '',
			}
		},
		computed: {
			
			// в зависимости от формы присваиваем нужный класс элементу form
			classList: function () {
				return (this.propTemplate === 'order') ?
					'form-order--order' :
					'form-order--subscribe'
			}
		},
		methods: {
			sendOrder: function () {
				/**
				 * В зависимости от формы, которые мы получаем проводим валидацию
				 */

				console.log('Форма активна')
				// валидация формы подписки
				$("#form--subscribe").validate({
					rules: {
						form__email: {required: true, email: true},
						form__name: 'required',
					},
					messages: {
						form__email: '',
						form__name: ''
					}
				});

				// валидация формы заказа
				$("#form--order").validate({
					rules: {
						form__email: 'required',
						form__phone: 'required',
						form__delivery: 'required',
						form__address: 'required',
						form__payment: 'required'
					},
					messages: {
						form__email: '',
						form__phone: '',
						form__delivery: '',
						form__address: '',
						form__payment: ''
					}
				});

				// отправляем форму
				$(".form-order").on('submit', function () {
					if ($(this).valid()) {
						let formID = $(this).attr('id');
						let formNm = $('#' + formID);
						let message = $(formNm).find(".form-order__msgs");
						$.ajax({
							type: "POST",
							url: 'action.php',
							data: formNm.serialize(),

							success: function (data) {
								this.orderNumber = randomInteger(1500, 9999);

								// возможные тексты в .form-order__msgs
								let messageData = [
									'Благодарим за доверие! Мы вышлем Вам информацию о наличии товара, как только он появится в сервисе. Пожалуйста, ожидайте оповещение',
									'Благодарим за заказ! Номер заказа m-' + this.orderNumber + '. В скором времени с Вами свяжется наш менеджер. Пожалуйста, ожидайте!'
								];

								message.text(($(this).hasClass('form--subscribe')) ? messageData[0] : messageData[1]);
								message.addClass('active');
								setTimeout(function () {
									message.removeClass('active');
									message.html('');
									$('input').not(':input[type=submit], :input[type=hidden]').val('');
								}, 30000);

								// получение рандомного числа
								function randomInteger(min, max) {
									return (Math.random() * (max - min + 1) + min - 0.5);
								}
							},

							error: function (jqXHR, text, error) {
								message.html('Упс...Письмо не отправилось');
								message.css({'background': 'red'});
								setTimeout(function () {
									message.html('');
									message.css({'background': 'none'});
									$('input').not(':input[type=submit], :input[type=hidden]').val('');
								}, 3000);
							}

						});
						return false;
					}
				});
				
			}
		}
	}
</script>