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
					.row(v-if="propCartList.length > 0")
						.col-md-8.col-sm-12
							.cart-status
								.cart-status__wrap-left
									.cart-status__description Стоимость заказа:<br><span class="cart-status__price">{{ cartListFullCost }}</span> руб.
								.cart-status__wrap-right
									router-link.button.ui.primary.right.labeled.icon(to="/order") <i class="right arrow icon large"></i> Оформить заказ
							cart-list(:propCartList="computedCartList")
						.col-md-4.col-sm-12.wrap-additional-products-list
							h3.text-center Также вам может понадобиться
							AdditionalProductsList(:propCartList="propCartList")
					.row(v-else)
						.col-md-12
							span Ваша корзина пуста. Посетите&nbsp;
							router-link.button.ui.gray(to="/catalog") наш каталог
							span , чтобы наполнить её товарами
		
		
		// SUBSCRIBE
		.wrap-subscribe(v-if="propCartList.length > 0")
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
  import Vue from 'vue'
  import _ from 'lodash'

	export default {
		name: 'CartComponent',
		props: [
			'propCartList',
			'propCartListFullCost'
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

        // список товаров в корзине
        cartList: []
			}
		},
		computed: {

		  // возвращаем реактивный список товаров в корзине
		  computedCartList() {
        let list = this.propCartList;
        list = _.uniqBy(list, 'number');
        for(let i = 0; i < list.length; i++) {
          Vue.set(this.cartList, i, list[i]);
        }
        return this.cartList
      },
			
			// -высчитываем полную стоимость заказа
			cartListFullCost() {
				
				if (this.propCartList.length === 0) return;
				
				let fullCost = (this.propCartList.length > 0) ?
					this.propCartList.reduce((sum, item) => {
						return sum + (item.price * item.count * (1 - item.sale) )
					},0).toFixed(2) :
					0;

				// -/- отправка события корневому родителю
				this.$root.eventHub.$emit('cartListFullCost', fullCost);

				return fullCost;
			}
		}
	}
</script>
