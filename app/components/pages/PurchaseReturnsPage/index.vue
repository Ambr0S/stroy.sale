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
						h1 Гарантии и возврат товара
			section.wrap-pages
				.container
					.row
						.col-sm-12
							p На все товары из интернет магазина story.sale действуют гарантийные обязательства, предусмотренные заводами-производителями стройматериалов.
							p На товары надлежащего качества действуют условия возврата согласно действующему законодательству РФ в течении 14 дней с момента покупки, за исключением материалов, отпускаемых на метраж (согласно Постановлениям № 1222, №55). Обмен товара надлежащего качества проводится, если указанный товар не был в употреблении, сохранены его товарный вид, потребительские свойства, пломбы, фабричные ярлыки, а также имеется товарный чек.

						
	
		
		
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
		name: 'PurchaseReturnsPage',
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
