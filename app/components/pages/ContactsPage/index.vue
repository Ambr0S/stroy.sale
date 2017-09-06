<template lang="jade">
	div
		// MENU
		.wrap-menu
			.container-fluid
				.row
					.col-sm-12.text-left
						menu-component.menu--inline
		// - END MENU
		
		// - HEADER
		.wrap-header
			header-component
		// - END HEADER
		
		main
			.container
				.row
					.col-sm-12
						h1 Контакты
			section.wrap-pages
				.container
					.row
						.col-sm-12
							p Телефон: <b>+7 977 880-60-14, +7 904 600-80-20</b>
							p Email: <b>info@stroy.sale</b>
							p Адрес: <b>г. Москва: Очаковское шоссе, д.5, стр.28</b>
							img(src="img/map.png" alt="")
		
		
		
		// SUBSCRIBE
		//.wrap-subscribe
			Subscribe
		// FOOTER
		.wrap-foooter
			footer-component
</template>

<script>
	import MenuComponent   from '../../modules/MenuModules/index.vue'
	import HeaderComponent from '../../modules/HeaderModules/index.vue'
	import Subscribe       from '../../modules/SubscribeModules/index.vue'
	import FooterComponent from '../../modules/FooterModules/index.vue'

	export default {
		name: 'ContactsPage',
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
