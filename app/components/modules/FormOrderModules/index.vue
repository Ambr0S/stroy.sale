<template lang="jade">
	form.form-order
		// статус формы
		.form-order__msgs
		
		// форма подписки на главной странице
		input.form-order__input(name="form__name", placeholder="Укажите товар", v-if="propTemplate=='subscribe'")
		input.form-order__input(name="form__email", placeholder="Введите email", v-if="propTemplate=='subscribe'")
		input.form-order__input(type="submit", @click="sendOrder", :class="'button--' + propButtonStyle", value="Отправить", v-if="propTemplate=='subscribe'")
		
		// форма заказа
		fieldset(v-if="propTemplate=='order'")
			h3 Контакты:
			label Введите email
			input(name="form__email", id="form__email")
			label Введите номер телефона
			input(name="form__phone", id="form__phone")
		fieldset(v-if="propTemplate=='order'")
			h3 Доставка:
			select(name="form__delivery", id="form__delivery", v-model="deliveryKind", class="ui selection dropdown")
				option(value="" disabled selected) - Выберите способ -
				option(value="1") Самовывоз -- бесплатно
				option(value="2") Доставка курьерской службой
			br
			label Адрес
			input(name="form__address", id="form__address", disabled, v-bind:placeholder='address')
		fieldset(v-if="propTemplate=='order'")
			h3 Оплата:
			select(name="form__payment", id="form__payment",  v-model="paymentKind",  class="ui selection dropdown")
				option(value="" disabled selected) - Выберите способ -
				option(value="1") Онлайн --- бесплатно
				option(value="2") Банковский счёт --- бесплатно
				option(value="3") Наличными в офисе --- бесплатно
				option(value="4") При получении --- 1 500р за выезд курьера
		fieldset.order-form__b-cost(v-if="propTemplate=='order'")
			h2 Стоимость - <strong>{{fullcost}}</strong> руб.
			button.button.ui.button--orange.order-form__button-submit(type="submit", @click="sendOrder") ЗАКАЗАТЬ
			div
				strong Условия акции действительны только<br>при покупке на сумму от 5 000 рублей
		fieldset(class="hidden", v-if="propTemplate=='order'")
			input(name="form__cost", v-bind:value='fullcost')
			input(name="form__order", v-bind:value='ordernumber')
			input(name="form__address", v-bind:value='address')
</template>

<script>
	export default {
		name: 'FormOrderComponent',
		props: [
			'propTemplate',
			'propButtonStyle'
		],
		data: function () {
			return {
				orderNumber: null
			}
		},
		methods: {
			sendOrder: function () {
				/**
				 * В зависимости от формы, которые мы получаем проводим валидацию
				 */

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
									message.css({'background': 'none'});
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