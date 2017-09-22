<template lang="jade">
	div.wrap-app.wrap-app-contacts
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
						h1 Контакты
			section.wrap-pages
				.container
					.row
						.col-sm-12
							p Телефон: <b>+7 977 880-60-14, +7 904 600-80-20</b>
							p Email: <b>info@stroy.sale</b>
							p Адрес: <b>г. Москва: Очаковское шоссе, д.5, стр.28</b>
							a.map-link(href="img/map.png" target="_blank")
							img.map-link__img(src="img/map.png" alt="")
		
		
		
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
