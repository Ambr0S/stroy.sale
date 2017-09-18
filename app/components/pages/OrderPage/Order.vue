<template lang="jade">
	div.wrap-app
		// - HEADER
		header.wrap-header
			header-component
		// - END HEADER
		
		main
			.wrap-order
				.container
					.row
						.col-sm-12
							h1 Оформление заказа
							router-link.button.ui.labeled.icon(to="/cart") <i class="left arrow icon large"></i> Назад в корзину
					
					.row
						.col-sm-12
							form-order(:propTemplate="'order'", :propCartList="propCartList", :propCartListFullCost="propCartListFullCost")
	
					


</template>

<script>
	import HeaderComponent from '../../modules/HeaderModules/index.vue'
	import FormOrder from '../../modules/FormOrderModules/index.vue'

	export default {
		name: 'CartComponent',
		props: [
			'propCartList',
			'propCartListFullCost'
		],
		components: {
			HeaderComponent,
			FormOrder
		},
		data : function () {
			return {
				formTemplate: 'order'
			}
		}
	}
</script>
