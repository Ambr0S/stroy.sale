import Vue         from '../../libs/vue.js';
import VueRouter   from 'vue-router';

import catalog     from './catalog.vue';
import catalogsub  from './catalog--sub.vue';
import blog        from './blog.vue';
import blogpost    from './blogpost.vue';
import modal       from './modal.vue';
import social       from './social.vue';

Vue.use(VueRouter)

var router = new VueRouter({
    routes : [
        { path: '/', redirect: '/catalog/0' },
        { path: '/catalog/:id', name:'catalog',  component: catalog , children : [
            {
                path: '/catalog/:id/:idEnd', name:'catalogsub', component: catalogsub
            }
        ]},
         { path: '/blog', name:'blog',  component: blog , children : [
            {
                path: '/blog/:id', name:'blogpost', component: blogpost
            }
        ]},       
    ]
});


var eventHub = new Vue();

eventHub.$on('exit', function (msg) {
    vm.menuTarget = msg;
})

var vm = new Vue({
    el: '#test',
    router: router,
    components : {
        catalog,
        catalogsub,
        blog,
        modal,
        social
    },
    data: function() {
        return {
            eventHub:eventHub,
            catalogArray : [
                {
                    id: 0,
                    name: 'Товары недели',
                    jsonfile: 'json/all.json'
                },
                {
                    id: 1,
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
                    id: 2,
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
                },
                {
                    id: 3,
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
                },
                {
                    id: 4,
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
                },
                {
                    id: 5,
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
                },
                {
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
                },
                {
                    id: 8,
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
                    id: 9,
                    name: 'Материалы б/у, некондиция, неликвид',
                    jsonfile: 'json/80.json'
                },                {
                    id: 10,
                    name: 'Акция! Материалы на штукатурные работы',
                    category: [
											{
												id: 0,
												name: 'Первая категория',
												jsonfile: 'json/shtukaturka.json'
											},
											{
												id: 1,
												name: 'Вторая категория',
												jsonfile: 'json/71.json'
											},
                    ]

                },
            ],
            
            menuTarget : '',
            buttonmodal : false

        }
    },
    mounted: function() {
        console.log('v.1.0.0.10');
        VK.Widgets.Group("vk_groups", {mode: 4, width: "350", height: "450"}, 60332047);
    },
    computed: {

    },
    methods: {
        goModal : function(e) {
            this.menuTarget = e.target.dataset.modal;
        }
    }

})