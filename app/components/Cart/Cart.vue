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
						h1 Корзина
			.wrap-cart-list.cart
				.container
					.row
						cart-list.col-sm-8(:propCartList="propCartList")
						.col-sm-4
							.cart-status
								.cart-status__header В корзине {{ propCartList.length }} тов.
								.cart-status__description Стоимость заказа:<br><span class="cart-status__price">40000</span> руб.<br>
								router-link(to="/order") Оформить заказ
		
		
		
		
		// SUBSCRIBE
		.wrap-subscribe
			Subscribe
		// FOOTER
		.wrap-foooter
			footer-component
</template>

<script>
	import MenuComponent from '../Menu/Menu.vue'
	import HeaderComponent from '../Header/Header.vue'
	import Subscribe from '../Subscribe/Subscribe.vue'
	import FooterComponent from '../Footer/Footer.vue'
	import CartList from '../CartList/CartList.vue'
	
	export default {
		name: 'CartComponent',
		props: [
			'propCartList'
		],
		components: {
			MenuComponent,
			HeaderComponent,
			Subscribe,
			FooterComponent,
			CartList
		},
		data : function () {
			return {

			}
		}
	}
</script>
