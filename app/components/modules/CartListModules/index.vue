<template lang="jade">
	.cart-list
		.cart-list__item(v-for="(item,index) in propCartList")
			.cart-list__img
				img(:src='item.image', alt='')
			.cart-list__description
				.cart-list__name {{ item.name }}
				.cart-list__price Цена за шт. {{ item.price }}.00 руб.
				.cart-list__counter
					span Количество:
					button.counter--minus(@click="cartListCounterChange(index,'minus')") -
					input(:value="item.count")
					button.counter--plus(@click="cartListCounterChange(index,'plus')") +
				.cart-list__price--sum Стоимость: <span>{{ item.price * item.count }}</span>. 00 руб.
			button.cart-list__button--delete(@click="deleteProduct(index)")


</template>

<script>
	export default {
		name: 'CartListComponent',
		props: [
			'propCartList'
		],
		components: {
		},
		data : function () {
			return {
			
			}
		},
		methods: {
			
			// метод добавления и удаления единицы товара
			cartListCounterChange(index, symb) {
				if (symb == 'plus') {
					this.propCartList[index].count++
				} else if (symb == 'minus' && this.propCartList[index].count > 1) {
					this.propCartList[index].count--
				}
			},
			
			// метод удаления товара из корзины и Local Storage
			deleteProduct(index, number) {
				this.propCartList.splice(index,1);
			
				
				localStorage.cartList = JSON.stringify(this.propCartList);
			}
		}
	}
</script>
