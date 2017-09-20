<template lang="jade">
	div.wrap-app
		// MENU
		nav.wrap-menu
			.container-fluid
				.row
					.col-sm-8.text-left
						menu-component.menu--inline
					.col-sm-4.text-right
						.wrap-menu__content.menu
							ul.menu__list.menu__list--cart
								li.menu__item
									router-link.menu__link.menu__link--cart(to="/cart")
										i.large.in.cart.icon(v-if="propCartList.length > 0")
										i.large.cart.icon(v-if="propCartList.length == 0")
										span В корзине {{ propCartList.length }} тов.
		// - END MENU
		
		// - HEADER
		header.wrap-header
			header-component
		// - END HEADER
		main
			// - CONTROLLERS
			.wrap-controllers
				Controllers(:propCatalogList="catalogList", :propIdCategory="idCategory", :propIdSubCategory="idSubCategory")
			// - END CONTROLLERS
			
			// - CATALOGLIST
			.wrap-catalog.main--load
				.container
					catalog-list(:propCatalogList="catalogList", :propCartList="cartList", :propIdCategory="idCategory", :propIdSubCategory="idSubCategory", v-on:add='addProduct')
			// - END CATALOGLIST

		// SUBSCRIBE
		section.wrap-subscribe
			Subscribe
		// FOOTER
		footer.wrap-foooter
			footer-component
</template>

<script>
	import MenuComponent   from '../../modules/MenuModules/index.vue'
	import HeaderComponent from '../../modules/HeaderModules/index.vue'
	import Controllers 		 from '../../modules/ControllersModules/index.vue'
	import Subscribe 			 from '../../modules/SubscribeModules/index.vue'
	import FooterComponent from '../../modules/FooterModules/index.vue'
	import CatalogList 		 from '../../modules/CatalogListModules/index.vue'

	
	export default {
		name: 'Catalog',
		props: [
			'propCartList'
		],
		components: {
			MenuComponent,
			HeaderComponent,
			Controllers,
			Subscribe,
			FooterComponent,
			CatalogList
		},
		data: function () {
			return {
				cartList: this.propCartList,
				
				// список всех категорий
				catalogList: [
					{
						id: 0,
						name: 'Все товары',
						jsonFile: 'json/0000.json'
					},
					{
						id: 1,
						name: 'Штукатурные работы',
						jsonFile: 'json/0010.json',
						category: [
							{
								id: 0,
								name: 'Штукатурка',
								jsonFile: 'json/0011.json'
							},
							{
								id: 1,
								name: 'Шпатлёвка',
								jsonFile: 'json/0012.json'
							},
							{
								id: 2,
								name: 'Грунтовка',
								jsonFile: 'json/0013.json'
							},
							{
								id: 3,
								name: 'Стеклосетка штукатурная и малярная',
								jsonFile: 'json/0014.json'
							},
						]

					},
					{
						id: 2,
						name: 'Укладка плитки и камня',
						jsonFile: 'json/0020.json'
					},
					{
						id: 3,
						name: 'Возведение стен и перегородок',
						jsonFile: 'json/0030.json',
						category: [
							{
								id: 0,
								name: 'Перегородки из гипсокартона',
								jsonFile: 'json/0031.json'
							},
							{
								id: 1,
								name: 'Газоблоки',
								jsonFile: 'json/0032.json'
							},
							{
								id: 2,
								name: 'Пазогребневые плиты',
								jsonFile: 'json/0033.json'
							}
						]
					},
					{
						id: 4,
						name: 'Малярные работы',
						jsonFile: 'json/0040.json'
					},
					{
						id: 5,
						name: 'Устройство полов',
						jsonFile: 'json/0050.json'
					},
					{
						id: 6,
						name: 'Теплоизоляция',
						jsonFile: 'json/0060.json'
					},
					{
						id: 7,
						name: 'Гидроизоляция',
						jsonFile: 'json/0070.json'
					},
					{
						id: 8,
						name: 'Инструменты и приспособления',
						jsonFile: 'json/0080.json'
					},
				],
				
			}
		},
		computed: {
			
			// получение из роутера id текущей категории товаров
			idCategory() {
				let routeParams = this.$route.params;
				return (routeParams.hasOwnProperty('idCategory')) ? routeParams['idCategory'] : null;
			},
			
			// получение из роутера id текущей подкатегории товаров
			idSubCategory() {
				let routeParams = this.$route.params;
				return (routeParams.hasOwnProperty('idSubCategory')) ? routeParams['idSubCategory'] : null;
			},
			
		},
    mounted() {
	    //this.scrollCatalog();
    },
		methods: {
			addProduct(i) {
				this.$emit('add', i)
			}
		}
	}
</script>
