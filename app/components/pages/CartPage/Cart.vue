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
			.wrap-cart-header
				.container
					.row
						.col-sm-12
							h1 Корзина
			.wrap-cart-list.cart
				.container
					.row
						.col-md-7.col-sm-12
							.cart-status
								.cart-status__wrap-left
									.cart-status__description Стоимость заказа:<br><span class="cart-status__price">{{ cartListFullCost }}</span> руб.
								.cart-status__wrap-right
									router-link.button.ui.primary.right.labeled.icon(to="/order") <i class="right arrow icon large"></i> Оформить заказ
							cart-list(:propCartList="propCartList")
						.col-md-5.col-sm-12
							h3 Также вам может понадобиться
							AdditionalProductsList(:propCartList="propCartList")
		
		
		
		
		// SUBSCRIBE
		.wrap-subscribe
			Subscribe
		// FOOTER
		.wrap-foooter
			footer-component
</template>

<script>
	import MenuComponent   from '../../modules/MenuModules/index.vue'
	import HeaderComponent from '../../modules/HeaderModules/index.vue'
	import Subscribe 			 from '../../modules/SubscribeModules/index.vue'
	import FooterComponent from '../../modules/FooterModules/index.vue'
	import CartList 			 from '../../modules/CartListModules/index.vue'
	import AdditionalProductsList from '../../modules/AdditionalProductsList/index.vue'

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
			CartList,
			AdditionalProductsList
		},
		data : function () {
			return {

			}
		},
		computed: {
			
			// -высчитываем полную стоимость заказа
			cartListFullCost() {
				let fullCost = (this.propCartList.length > 0) ?
					this.propCartList.reduce((sum, item) => {
						return sum + (item.price * (item.count))
					},0) :
					0;

				// -/- отправка события корневому родителю
				this.$root.eventHub.$emit('cartListFullCost', fullCost);

				return fullCost;
			}
		}
	}
</script>
