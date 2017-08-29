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
        Header
        // - END HEADER

        // - CONTROLLERS
        Controllers(:propCatalogList="catalogList")
        // - END CONTROLLERS

        // - CATALOGLIST
        catalog-list(:propCatalogList="catalogList")
        // - END CATALOGLIST

        // SUBSCRIBE
        Subscribe
        // FOOTER
        Footer
</template>

<script>
    import Menu        from '../Menu/Menu.vue'
    import Header      from '../Header/Header.vue'
    import Controllers from '../Controllers/Controllers.vue'
    import Subscribe   from '../Subscribe/Subscribe.vue'
    import Footer      from '../Footer/Footer.vue'
    import CatalogList from './CatalogList/CatalogList.vue'

    export default {
        name: 'Catalog',
        props: [

        ],
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
						jsonfile: 'json/all.json'
					},
					{
						id: 1,
						name: 'Материалы на штукатурные работы',
						jsonfile: 'json/vetonitRotband.json',
						category: [
							{
								id: 0,
								name: 'Штукатурка',
								jsonfile: 'json/shtukaturka.json'
							},
							{
								id: 1,
								name: 'Шпаклёвка',
								jsonfile: 'json/vetonit.json'
							},
						]

					},
					{
						id: 2,
						name: 'Общестроительные материалы',
						jsonfile: 'json/0.json',
						category: [
							{
								id: 0,
								name: 'Кирпич/Газобетон/Блоки',
								jsonfile: 'json/00.json'
							},
							{
								id: 1,
								name: 'Арматура',
								jsonfile: 'json/01.json'
							},
							{
								id: 2,
								name: 'Поликарбонат',
								jsonfile: 'json/02.json'
							},
							{
								id: 3,
								name: 'Тротуарная плитка / Бордюрный камень',
								jsonfile: 'json/03.json'
							},
							{
								id: 4,
								name: 'Пены, герметики, клеи',
								jsonfile: 'json/04.json'
							},
						]
					},
					{
						id: 3,
						name: 'Фасадные и кровельные материалы',
						jsonfile: 'json/4.json',
						category: [
							{
								id: 0,
								name: 'Листовая кровля',
								jsonfile: 'json/40.json'
							},
							{
								id: 1,
								name: 'Рулонная кровля',
								jsonfile: 'json/41.json'
							},
							{
								id: 2,
								name: 'Мастика / Битум',
								jsonfile: 'json/42.json'
							},
							{
								id: 3,
								name: 'Сайдинг',
								jsonfile: 'json/43.json'
							}
						]
					},
					{
						id: 4,
						name: 'Электрика',
						jsonfile: 'json/7.json',
						category: [
							{
								id: 0,
								name: 'Кабель',
								jsonfile: 'json/70.json'
							},
							{
								id: 1,
								name: 'Каналы кабельные',
								jsonfile: 'json/71.json'
							},
							{
								id: 2,
								name: 'Розетки',
								jsonfile: 'json/72.json'
							},
							{
								id: 3,
								name: 'Выключатели',
								jsonfile: 'json/73.json'
							}
						]
					},
					{
						id: 5,
						name: 'Материалы б/у, некондиция, неликвид',
						jsonfile: 'json/80.json'
					},
					/*{
                        id: 6,
                        name: 'Водоснабжение / Отопление / Канализация',
                        jsonfile: 'json/5.json',
                        category: [
                            {
                                id: 0,
                                name: 'Сан.тех.инсталяция',
                                jsonfile: 'json/50.json'
                            },
                            {
                                id: 1,
                                name: 'Радиаторы',
                                jsonfile: 'json/51.json'
                            },
                            {
                                id: 2,
                                name: 'Трубы для водоснабжения',
                                jsonfile: 'json/52.json'
                            },
                            {
                                id: 3,
                                name: 'Канализация',
                                jsonfile: 'json/53.json'
                            }
                        ]
                    },*/
					/*{
                        id: 7,
                        name: 'Отделочные материалы',
                        jsonfile: 'json/6.json',
                        category: [
                            {
                                id: 0,
                                name: 'Обои',
                                jsonfile: 'json/60.json'
                            },
                            {
                                id: 1,
                                name: 'Краски для наружных работ',
                                jsonfile: 'json/61.json'
                            },
                            {
                                id: 2,
                                name: 'Подготовка поверхности',
                                jsonfile: 'json/62.json'
                            },
                            {
                                id: 4,
                                name: 'Краски для внутренних работ',
                                jsonfile: 'json/64.json'
                            },
                            {
                                id: 5,
                                name: 'Эмали',
                                jsonfile: 'json/65.json'
                            },
                            {
                                id: 7,
                                name: 'Стеновые панели',
                                jsonfile: 'json/67.json'
                            },
                            {
                                id: 8,
                                name: 'Ламинат',
                                jsonfile: 'json/68.json'
                            },
                            {
                                id: 9,
                                name: 'Ламинат 31 класс',
                                jsonfile: 'json/69.json'
                            },
                            {
                                id: 10,
                                name: 'Линолеум',
                                jsonfile: 'json/610.json'
                            },
                            {
                                id: 11,
                                name: 'Ковровые покрытия',
                                jsonfile: 'json/611.json'
                            },
                            {
                                id: 12,
                                name: 'Ковролин принт',
                                jsonfile: 'json/612.json'
                            },
                            {
                                id: 13,
                                name: 'Плитка',
                                jsonfile: 'json/613.json'
                            },
                            {
                                id: 14,
                                name: 'Система потолков',
                                jsonfile: 'json/614.json'
                            },
                        ]
                    },*/
					/*{
    id: 3,
    name: 'Гипсокартон и листовые материалы',
    jsonfile: 'json/1.json',
    category: [
        {
            id: 0,
            name: 'Гипсокартон стандартный ',
            jsonfile: 'json/10.json'
        },
        {
            id: 1,
            name: 'Профиль / Маяки / Уголки',
            jsonfile: 'json/11.json'
        }
    ]
},*/
					/*{
                        id: 4,
                        name: 'Строительные смеси и грунты',
                        jsonfile: 'json/2.json',
                        category: [
                            {
                                id: 0,
                                name: 'Штукатурка ',
                                jsonfile: 'json/20.json'
                            },
                            {
                                id: 1,
                                name: 'Гидроизоляция',
                                jsonfile: 'json/21.json'
                            },
                            {
                                id: 2,
                                name: 'Строительный клей',
                                jsonfile: 'json/22.json'
                            },
                            {
                                id: 3,
                                name: 'Грунты / Добавки ',
                                jsonfile: 'json/23.json'
                            },
                            {
                                id: 4,
                                name: 'Смеси для заливки полов',
                                jsonfile: 'json/24.json'
                            },
                            {
                                id: 5,
                                name: 'Цемент и основы смесей',
                                jsonfile: 'json/25.json'
                            },
                        ]
                    },*/
					/*{
                        id: 5,
                        name: 'Изоляционные и защитные материалы',
                        jsonfile: 'json/3.json',
                        category: [
                            {
                                id: 0,
                                name: 'Вата каменная (минеральная вата) ',
                                jsonfile: 'json/30.json'
                            },
                            {
                                id: 1,
                                name: 'Пенополистирол (пенопласт) 30',
                                jsonfile: 'json/31.json'
                            },
                            {
                                id: 2,
                                name: 'Стекловата',
                                jsonfile: 'json/32.json'
                            },
                            {
                                id: 3,
                                name: 'Пенополистирол экструдированный (xps)',
                                jsonfile: 'json/33.json'
                            },
                            {
                                id: 4,
                                name: 'Мембрана / Пленка изоляционная',
                                jsonfile: 'json/34.json'
                            }
                        ]
                    },*/
				],
            }
        }
    }
</script>
