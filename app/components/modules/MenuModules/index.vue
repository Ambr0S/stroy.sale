<template lang="jade">
	.menu(:class="classList")
		ul.menu__list
			li.menu__item
				router-link(to="/catalog/0").menu__link Каталог
			li.menu__item
				router-link(to="/delivery").menu__link Доставка и оплата
			li.menu__item
				router-link(to="/purchase-returns").menu__link Возврат товара
			li.menu__item
				router-link(to="/blog").menu__link Блог
			li.menu__item
				router-link(to="/contacts").menu__link Контакты
</template>

<script>
	export default {
		name: 'MenuComponent',
		props: [
			'propClassList'
		],
		data: function () {
			return {
				openModal: null,
				
				// список классов из родителя
				classList: this.propClassList
			}
		}
	}
</script>
