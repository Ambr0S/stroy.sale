<template lang="jade">
	div
		// MENU
		.wrap-menu
			.container-fluid
				.row
					.col-sm-8.text-left
						Menu.menu--inline
					.col-sm-4.text-right
						.wrap-menu__content.menu
							ul.menu__list
								li.menu__item
									a.menu__link.menu__link--cart(@click.prevent="goCart", href="#", title="") <i class="big in cart icon"></i> В корзине 0 тов.
		// - END MENU
		
		// - HEADER
		.wrap-header
			Header
		// - END HEADER
		main
			// - CONTROLLERS
			.wrap-controllers
				Controllers(:propCatalogList="catalogList", :propIdCategory="idCategory", :propIdSubCategory="idSubCategory")
			// - END CONTROLLERS
			
			// - CATALOGLIST
			.wrap-catalog
				.container
					catalog-list(:propCatalogList="catalogList", :propIdCategory="idCategory", :propIdSubCategory="idSubCategory")
			// - END CATALOGLIST
		
		// SUBSCRIBE
		.wrap-subscribe
			Subscribe
		// FOOTER
		.wrap-foooter
			Footer
</template>

<script>
	import Menu from '../Menu/Menu.vue'
	import Header from '../Header/Header.vue'
	import Controllers from '../Controllers/Controllers.vue'
	import Subscribe from '../Subscribe/Subscribe.vue'
	import Footer from '../Footer/Footer.vue'
	import CatalogList from '../CatalogList/CatalogList.vue'

	export default {
		name: 'Catalog',
		props: [],
		components: {
			Menu,
			Header,
			Controllers,
			Subscribe,
			Footer,
			CatalogList
		},
		data: function () {
			return {

				// список всех категорий
				catalogList: [
					{
						id: 0,
						name: 'Все товары',
						jsonFile: 'json/all.json'
					},
					{
						id: 1,
						name: 'Материалы на штукатурные работы',
						jsonFile: 'json/vetonitRotband.json',
						category: [
							{
								id: 0,
								name: 'Штукатурка',
								jsonFile: 'json/shtukaturka.json'
							},
							{
								id: 1,
								name: 'Шпаклёвка',
								jsonFile: 'json/vetonit.json'
							},
						]

					},
					{
						id: 2,
						name: 'Общестроительные материалы',
						jsonFile: 'json/0.json',
						category: [
							{
								id: 0,
								name: 'Кирпич/Газобетон/Блоки',
								jsonFile: 'json/00.json'
							},
							{
								id: 1,
								name: 'Арматура',
								jsonFile: 'json/01.json'
							},
							{
								id: 2,
								name: 'Поликарбонат',
								jsonFile: 'json/02.json'
							},
							{
								id: 3,
								name: 'Тротуарная плитка / Бордюрный камень',
								jsonFile: 'json/03.json'
							},
							{
								id: 4,
								name: 'Пены, герметики, клеи',
								jsonFile: 'json/04.json'
							},
						]
					},
					{
						id: 3,
						name: 'Фасадные и кровельные материалы',
						jsonFile: 'json/4.json',
						category: [
							{
								id: 0,
								name: 'Листовая кровля',
								jsonFile: 'json/40.json'
							},
							{
								id: 1,
								name: 'Рулонная кровля',
								jsonFile: 'json/41.json'
							},
							{
								id: 2,
								name: 'Мастика / Битум',
								jsonFile: 'json/42.json'
							},
							{
								id: 3,
								name: 'Сайдинг',
								jsonFile: 'json/43.json'
							}
						]
					},
					{
						id: 4,
						name: 'Электрика',
						jsonFile: 'json/7.json',
						category: [
							{
								id: 0,
								name: 'Кабель',
								jsonFile: 'json/70.json'
							},
							{
								id: 1,
								name: 'Каналы кабельные',
								jsonFile: 'json/71.json'
							},
							{
								id: 2,
								name: 'Розетки',
								jsonFile: 'json/72.json'
							},
							{
								id: 3,
								name: 'Выключатели',
								jsonFile: 'json/73.json'
							}
						]
					},
					{
						id: 5,
						name: 'Материалы б/у, некондиция, неликвид',
						jsonFile: 'json/80.json'
					},
					/*{
                        id: 6,
                        name: 'Водоснабжение / Отопление / Канализация',
                        jsonFile: 'json/5.json',
                        category: [
                            {
                                id: 0,
                                name: 'Сан.тех.инсталяция',
                                jsonFile: 'json/50.json'
                            },
                            {
                                id: 1,
                                name: 'Радиаторы',
                                jsonFile: 'json/51.json'
                            },
                            {
                                id: 2,
                                name: 'Трубы для водоснабжения',
                                jsonFile: 'json/52.json'
                            },
                            {
                                id: 3,
                                name: 'Канализация',
                                jsonFile: 'json/53.json'
                            }
                        ]
                    },*/
					/*{
                        id: 7,
                        name: 'Отделочные материалы',
                        jsonFile: 'json/6.json',
                        category: [
                            {
                                id: 0,
                                name: 'Обои',
                                jsonFile: 'json/60.json'
                            },
                            {
                                id: 1,
                                name: 'Краски для наружных работ',
                                jsonFile: 'json/61.json'
                            },
                            {
                                id: 2,
                                name: 'Подготовка поверхности',
                                jsonFile: 'json/62.json'
                            },
                            {
                                id: 4,
                                name: 'Краски для внутренних работ',
                                jsonFile: 'json/64.json'
                            },
                            {
                                id: 5,
                                name: 'Эмали',
                                jsonFile: 'json/65.json'
                            },
                            {
                                id: 7,
                                name: 'Стеновые панели',
                                jsonFile: 'json/67.json'
                            },
                            {
                                id: 8,
                                name: 'Ламинат',
                                jsonFile: 'json/68.json'
                            },
                            {
                                id: 9,
                                name: 'Ламинат 31 класс',
                                jsonFile: 'json/69.json'
                            },
                            {
                                id: 10,
                                name: 'Линолеум',
                                jsonFile: 'json/610.json'
                            },
                            {
                                id: 11,
                                name: 'Ковровые покрытия',
                                jsonFile: 'json/611.json'
                            },
                            {
                                id: 12,
                                name: 'Ковролин принт',
                                jsonFile: 'json/612.json'
                            },
                            {
                                id: 13,
                                name: 'Плитка',
                                jsonFile: 'json/613.json'
                            },
                            {
                                id: 14,
                                name: 'Система потолков',
                                jsonFile: 'json/614.json'
                            },
                        ]
                    },*/
					/*{
    id: 3,
    name: 'Гипсокартон и листовые материалы',
    jsonFile: 'json/1.json',
    category: [
        {
            id: 0,
            name: 'Гипсокартон стандартный ',
            jsonFile: 'json/10.json'
        },
        {
            id: 1,
            name: 'Профиль / Маяки / Уголки',
            jsonFile: 'json/11.json'
        }
    ]
},*/
					/*{
                        id: 4,
                        name: 'Строительные смеси и грунты',
                        jsonFile: 'json/2.json',
                        category: [
                            {
                                id: 0,
                                name: 'Штукатурка ',
                                jsonFile: 'json/20.json'
                            },
                            {
                                id: 1,
                                name: 'Гидроизоляция',
                                jsonFile: 'json/21.json'
                            },
                            {
                                id: 2,
                                name: 'Строительный клей',
                                jsonFile: 'json/22.json'
                            },
                            {
                                id: 3,
                                name: 'Грунты / Добавки ',
                                jsonFile: 'json/23.json'
                            },
                            {
                                id: 4,
                                name: 'Смеси для заливки полов',
                                jsonFile: 'json/24.json'
                            },
                            {
                                id: 5,
                                name: 'Цемент и основы смесей',
                                jsonFile: 'json/25.json'
                            },
                        ]
                    },*/
					/*{
                        id: 5,
                        name: 'Изоляционные и защитные материалы',
                        jsonFile: 'json/3.json',
                        category: [
                            {
                                id: 0,
                                name: 'Вата каменная (минеральная вата) ',
                                jsonFile: 'json/30.json'
                            },
                            {
                                id: 1,
                                name: 'Пенополистирол (пенопласт) 30',
                                jsonFile: 'json/31.json'
                            },
                            {
                                id: 2,
                                name: 'Стекловата',
                                jsonFile: 'json/32.json'
                            },
                            {
                                id: 3,
                                name: 'Пенополистирол экструдированный (xps)',
                                jsonFile: 'json/33.json'
                            },
                            {
                                id: 4,
                                name: 'Мембрана / Пленка изоляционная',
                                jsonFile: 'json/34.json'
                            }
                        ]
                    },*/
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
			
		}
	}
</script>
