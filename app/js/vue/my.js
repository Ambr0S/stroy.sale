import Vue         from '../../libs/vue.js';
import VueRouter   from 'vue-router';

import catalog     from './catalog.vue';
import catalogsub  from './catalog--sub.vue';
import blog        from './blog.vue';
import blogpost    from './blogpost.vue';
import modal       from './modal.vue';
import social      from './social.vue';

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


// для получения данных из события необходимо использовать стрелочные функции
eventHub.$on('orderCategory', (msg) => {
    vm.orderCategory = msg;
});
eventHub.$on('orderCatalog', (msg) => {
    vm.orderCatalog = msg;
});

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
            eventHub:             eventHub,
            showmodal:            false,
            orderitemamount:      1,
            address:              '',
            deliveryKind:         '',
            paymentKind:          '0',
            ordernumber:          '0',
            menuTarget:           '',
            buttonmodal:          false,
            addFullOrderCountKey: null,
            orderCategory:        [],
            orderCatalog:         [],
            fullOrder:            [],
            catalogArray:         [
                {
                    id: 0,
                    name: 'Все товары',
                    jsonfile: 'json/all.json'
                },
                  {
                    id: 1,
                    name: 'Материалы на штукатурные работы',
                    jsonfile: 'json/shtukaturka.json',
                    category: [
                      {
                        id: 0,
                        name: 'Штукатурка',
                        jsonfile: 'json/shtukaturka.json'
                      },
                      {
                        id: 1,
                        name: 'Шпатлёвка',
                        jsonfile: 'json/71.json'
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
            ],
            orderCount: 0
        }
    },



    mounted: function() {
        VK.Widgets.Group("vk_groups", {mode: 4, width: "350", height: "450"}, 60332047);

        /* Скролл до карточки товара*/
        function getCoords(elem) { // кроме IE8-
            let box = elem.getBoundingClientRect();
            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        }

        if (this.$route.params.id == 1 && this.$route.params.idEnd == 0) {
            let el = document.querySelector('.catalog__header');
            let position = getCoords(el);
            console.log(position);
            window.scroll(0,position.top);
        }
        /* КОНЕЦ Скролл до карточки товара*/

        /* Добавляем товары в корзину */
				if(localStorage.orderCatalog) {
					this.orderCatalog = JSON.parse(localStorage.orderCatalog);
				}

				if(localStorage.orderCategory) {
					this.orderCategory = JSON.parse(localStorage.orderCategory);
				}

			/* end */
    },



    methods: {
			goModal: function (e) {
				this.menuTarget = e.target.dataset.modal;
			},

			goCart: function (e) {
				if (this.orderCount === 0) {
					return
				}
				document.body.style.overflow = 'hidden';
				this.showmodal = true;
			},

			endModal: function (e) {
				document.body.style.overflow = 'auto';
				this.showmodal = false;
			},

			sendOrder: function () {
				$(".order-form").validate({
					rules: {
						form__email: 'required',
						form__phone: 'required',
						form__delivery: 'required',
						form__address: 'required',
						form__payment: 'required'
					},
					messages: {
						form__email: '',
						form__phone: '',
						form__delivery: '',
						form__address: '',
						form__payment: ''
					}
				});

				var form__orderNumber = this.ordernumber;

				$(".order-form").on('click', function () {

					if ($(this).valid()) {
						var formID = $(this).attr('id');
						var formNm = $('#' + formID);
						var message = $(formNm).find(".form__msgs");

						$.ajax({
							type: "POST",
							url: 'mt.action.php',
							data: formNm.serialize(),
							success: function (data) {
								message.addClass('active');
								message.text('Благодарим за заказ! Номер заказа m-' + form__orderNumber + '. В скором времени с Вами свяжется наш менеджер. Пожалуйста, ожидайте!');
								setTimeout(function () {
									message.removeClass('active');
									message.html('');
									$('input').not(':input[type=submit], :input[type=hidden]').val('');
								}, 30000);
							},
							error: function (jqXHR, text, error) {
								message.html('Упс...Письмо не отправилось');
								message.css({'background': 'red'});
								setTimeout(function () {
									message.css({'background': 'none'});
									message.html('');
									$('input').not(':input[type=submit], :input[type=hidden]').val('');
								}, 3000);
							}
						});
						return false;

						function randomInteger(min, max) {
							var integer = (Math.random() * (max - min + 1) + min - 0.5);
							return integer = Math.round(integer);
						}

					}
				});
			},

			setFullOrderCount: function (index, symb, number) {
				let el = this.fullOrder[index];
				if (symb === 'minus') {
					el.count = (el.count === 0) ? 0 : el.count - 1
				} else if (symb === 'plus') {
					el.count += 1
				} else if (symb === 'delete') {
					if (localStorage.orderCatalog) {
						let storage = JSON.parse(localStorage.orderCatalog);
						clearCartAfterDelete(storage);
						localStorage.orderCatalog = JSON.stringify(storage);
					}
					if (localStorage.orderCategory) {
						let storage = JSON.parse(localStorage.orderCategory);
						clearCartAfterDelete(storage);
						localStorage.orderCategory = JSON.stringify(storage);
					}
					clearCartAfterDelete(this.fullOrder);
					clearCartAfterDelete(this.orderCategory);
					clearCartAfterDelete(this.orderCatalog);
					function clearCartAfterDelete(obj) {
						obj.forEach( (i,yndex) => {
							if (i.number === number) {
								obj.splice(yndex,1)
							}
						});
					}
				}
				this.fullOrder.splice(index, 1, el)
			},
    },



    computed: {
        fullcost: function() {
            let sum = 0;
            this.fullOrder.forEach(function (i) {
                sum += (i.count * parseInt(i.price, 10))
            });
            return sum;
        },
        setfullOrder: function () {
          let arr = this.orderCatalog;
          this.fullOrder = arr.concat(this.orderCategory);
          this.orderCount = this.fullOrder.length;
          return this.fullOrder
        }
    },



    watch : {
        deliveryKind : function() {
            if (this.deliveryKind === '1') {
                let addressInput = document.querySelector('#form__address');
                addressInput.setAttribute('disabled', 'disabled');
                this.address = 'Варшавское шоссе, д.28 A, оф.212';
            } else if (this.deliveryKind === '2') {
                let addressInput = document.querySelector('#form__address');
                addressInput.removeAttribute('disabled');
                this.address = 'Укажите адрес';
            }
        }
    },



    filters: {
        deleteLastSymb(val,k) {
            return (k !== undefined) ? ((val) * (1 - k)).toFixed(2) : (val) ;
        },

        checkoutText(val) {
            return (val.length != 0) ? val.join('  ||  ') : 'Характеристик нет'
        },

        withCostm(val,k) {
            return (val) ? 'Цена за м2 - ' + val * k + 'руб.' : '';
        },

        withImage(val) {
            if (val.includes('no_photo')) { return 'img/no_image.png'; }
            return val;
        },

        setSale(val) {
            return (val * 100).toFixed(0);
        }
    }
})