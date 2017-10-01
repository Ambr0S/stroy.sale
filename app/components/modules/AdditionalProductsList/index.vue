<template lang="jade">
	.additional-products
		.additional-products__item(v-for="(item,index) in propCartList")
			.additional-products__img
				img(:src='item.image', alt='')
			.additional-products__description
				.additional-products__name {{ item.name }}
				.additional-products__price {{ item.price }}.00 руб.
				button.additional-products__button.button.ui В корзину
</template>

<script>
	export default {
		name: 'AdditionalProductsListComponent',
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

		
		}
	}
</script>
