<template lang="jade">
	div.wrap-app
		// MENU
		nav.wrap-menu
			.container-fluid
				.row
					.col-sm-12.text-left
						menu-component.menu--inline
		// - END MENU
		
		// - HEADER
		header.wrap-header
			header-component
		// - END HEADER
		
		main
			.container
				.row
					.col-sm-12
						h1 О сервисе
			section.wrap-pages
				.container
					.row
						.col-sm-12
							p Stroy.sale – онлайн сервис по продаже строительных материалов со значительными скидками. За счет реализации складских остатков и неликвидов строительных, торговых и производственных компаний.
							br
							h4 Как работать с сервисом?
							p Для покупки товара через сервис, достаточно оформить и оплатить заказ на сайте онлайн. В течении 3-х часов с Вами свяжется менеджер и согласует условия доставки. Для получения дополнительных скидок, необходимо зарегистрироваться на сайте и оформлять заказы через личный кабинет.
							p Обратите внимание, что способ оплаты «при получении» (в том числе на складе), предусматривает дополнительную комиссию за выезд курьера с кассой на склад или к клиенту.
							p Чтобы договориться о просмотре товара на складе, нужно позвонить по телефону из раздела контакты. Так как часть товаров находятся на складских комплексах с пропускным режимом, для просмотра товара необходимо зарегистрироваться и корректно заполнить анкету в личном кабинете.
							br
							h4 Как устроен сервис?
							img(src="img/service.jpg" alt="")
						
	
		
		
		// SUBSCRIBE
		//.wrap-subscribe
			Subscribe
		// FOOTER
		footer.wrap-footer
			footer-component
</template>

<script>
	import MenuComponent   from '../../modules/MenuModules/index.vue'
	import HeaderComponent from '../../modules/HeaderModules/index.vue'
	import Subscribe       from '../../modules/SubscribeModules/index.vue'
	import FooterComponent from '../../modules/FooterModules/index.vue'

	export default {
		name: 'ServicePage',
		props: [
		],
		components: {
			MenuComponent,
			HeaderComponent,
			Subscribe,
			FooterComponent,
		},
		data : function () {
			return {

			}
		}
	}
</script>
