<template lang="jade">
	.menu(:class="classList")
		ul.menu__list
			li.menu__item
				router-link(to="/catalog/0", @click.native="closeMenuMobile").menu__link Каталог
			li.menu__item
				router-link(to="/delivery", @click.native="closeMenuMobile").menu__link Доставка и оплата
			li.menu__item
				router-link(to="/purchase-returns", @click.native="closeMenuMobile").menu__link Возврат товара
			//li.menu__item
				router-link(to="/blog").menu__link Блог
			li.menu__item
				router-link(to="/contacts", @click.native="closeMenuMobile").menu__link Контакты
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
		},
    methods: {
      closeMenuMobile() {
        this.$emit('closeMenu', true)
      }
    }
	}
</script>
