<template lang="jade">
	.cart-list
		.cart-list__item(v-for="(item,index) in propCartList")
			.cart-list__img
				img(:src='item.img', alt='')
			.cart-list__description
				.cart-list__name {{ item.name }}
				.cart-list__price Цена за шт. {{ item.price }}.00 руб.
				.cart-list__counter.product-counter
					span
						button.product-counter__button.button.ui.icon(@click="cartListCounterChange(index,'minus')") <i class="icon minus"></i>
					span.field
						input.product-counter__input.ui.input(:value="item.count", v-model="item.count")
					span
						button.product-counter__button.button.ui.icon.basic.positive(@click="cartListCounterChange(index,'plus')") <i class="icon plus"></i>
				.cart-list__price--sum Стоимость: <span>{{ item.price * item.count }}</span>. 00 руб.
			button.cart-list__button-delete.button.ui.icon.mini(@click="deleteProduct(index)") <i class="icon remove"></i>
			
</template>

<script>
	import Vue from 'vue'
	
	export default {
		name: 'CartListComponent',
		props: [
			'propCartList',
			
		],
		components: {
		},
		data : function () {
			return {
			
			}
		},
		computed: {

		},
		methods: {
			
			// метод добавления и удаления единицы товара
			cartListCounterChange(index, symb) {
				let item = this.propCartList[index];
				if (symb == 'plus') {
					let value = item.count + 1;
					Vue.set(item, 'count', value);
				} else if (symb == 'minus' && this.propCartList[index].count > 1) {
					let value = item.count - 1;
					Vue.set(item, 'count', value);
        }

        this.$root.eventHub.$emit('carter', this.propCartList);
			},
			
			// метод удаления товара из корзины и Local Storage
			deleteProduct(index, number) {
				this.propCartList.splice(index,1);
				localStorage.cartList = JSON.stringify(this.propCartList);
			}
		}
	}
</script>
