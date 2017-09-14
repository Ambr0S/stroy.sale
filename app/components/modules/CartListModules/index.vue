<template lang="jade">
	.cart-list
		.cart-list__item(v-for="(item,index) in propCartList", :key="item.key")
			.cart-list__img
				img(:src='item.img', alt='')
			.cart-list__description
				.cart-list__name {{ item.name }}
				.cart-list__price Цена за шт. {{ (item.price * (1-item.sale)).toFixed(2) }} руб.
				.cart-list__sale(v-if='item.sale > 0') Скидка {{ item.sale * 100 }}%
				.cart-list__counter.product-counter
					span
						button.product-counter__button.button.ui.icon(@click="cartListCounterChange(index,'minus')") <i class="icon minus"></i>
					span.field
						input.product-counter__input.ui.input(:value="+item.count", v-model="item.count")
					span
						button.product-counter__button.button.ui.icon.basic.positive(@click="cartListCounterChange(index,'plus')") <i class="icon plus"></i>
				.cart-list__price--sum Стоимость: <span class="cart-list__price--sum-new">{{ (item.price * item.count * (1-item.sale)).toFixed(2) }}</span> руб. <span class="cart-list__price--sum-old" v-if="item.sale > 0">{{(item.price * item.count).toFixed(2)}} руб.</span>
			button.cart-list__button-delete.button.ui.icon.mini(@click="deleteProduct(index)") <i class="icon remove"></i>
			
</template>

<script>
	import Vue from 'vue'
	
	export default {
		name: 'CartListComponent',
		props: [
			'propCartList'
		],
		data : function () {
			return {
			}
		},
		methods: {
			
			// метод добавления и удаления единицы товара
			cartListCounterChange(index, symb) {
			  let value = this.propCartList[index].count;
				if (symb == 'plus') {
					value++
				} else if (symb == 'minus' && this.propCartList[index].count > 1) {
          value--
        }
        Vue.set(this.propCartList[index], 'count', value);
        this.$root.eventHub.$emit('carter', this.propCartList);
			},
			
			// метод удаления товара из корзины и Local Storage
			deleteProduct(index) {
				this.propCartList.splice(index,1);
        this.$root.eventHub.$emit('carter', this.propCartList);
				localStorage.cartList = JSON.stringify(this.propCartList);
			}
		}
	}
</script>
