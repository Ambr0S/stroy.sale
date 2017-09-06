<template lang="jade">
	div
		// - HEADER
		.wrap-header
			header-component
		// - END HEADER
		
		main
			.container
				.row
					.col-sm-12
						h1 Оформление заказа
						router-link.menu__link.menu__link--cart(to="/cart") Назад в корзину
				
				.row
					.col-sm-12
						form-order(:propTemplate="'order'")
	
					


</template>

<script>
	import HeaderComponent from '../../modules/HeaderModules/index.vue'
	import FormOrder from '../../modules/FormOrderModules/index.vue'

	export default {
		name: 'CartComponent',
		props: [
			'propCartList',
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
