<template lang="jade">
	.container-fluid.footer
		.row
			.col-sm-12
				social-api
			.col-sm-12
				.logo.footer__logo.text-center
					img.logo__img(src="img/logo--footer.png", alt="")
			.col-sm-12
				menu-component.menu--column.text-center
			.col-sm-12
				.footer__copyright.menu.menu--column.text-center
					ul.menu__list
						li.menu__item
							a.menu__link(href="#") Пользовательское соглашение
						li.menu__item ©STROY.SALE | 2013-2017 | Все права защищены

</template>

<script>
	import SocialApi from '../SocialApi/SocialApi.vue'
	import MenuComponent from '../Menu/Menu.vue'

	export default {
		name: 'Footer',
		components: {
			SocialApi,
			MenuComponent
		},
		data: function () {
			return {}
		},
		methods: {
			goModal: function (e) {
				console.log('тута');
				this.menuTarget = e.target.dataset.modal;
			}
		}
	}
</script>
