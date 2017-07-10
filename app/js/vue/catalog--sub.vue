<template lang="jade">
    .container-fluid
        //.row
            .col-sm-12
                .catalog__search.search
                    label(for="search__input" class="search__label") <i class="search icon"></i> Я ищу...
                    input(type="text" id="search__input" class="search__input" v-model="search")
        .row
            div.catalog__list.col-sm-12
                .catalog__product.product(v-for="(item, index) in filteredName")
                    .product__sale Скидка {{(item.sale * 100).toFixed(0)}}%
                    .product__name {{item.name}}
                    .product__img
                        img(:src='item.image | withImage', alt='')
                    .product__number {{item.number}}
                    .product__text(:data-tooltip='item.text | checkoutText' data-inverted="" data-position="bottom center") Характеристики <i class="info circle icon"></i>
                    .product__price
                        .product__price--old {{item.price | deleteLastSymb}}.00 руб.
                        .product__price--new {{item.price | deleteLastSymb(item.sale)}} руб.
                        .product__price--costm {{item.costm | withCostm(item.sale) }}
                        
                    .product__button.text-center
                        .button.ui(:data-id='index', @click="goModal",onclick="yaCounter45187896.reachGoal('cart'); return true;") <i class="shop icon"></i> Купить со скидкой 
        .row.modal.is-active(v-show="showmodal")
            .col-sm-12
                    .container.modal-content.order__content
                        .row.order
                            .col-sm-4.order__description.order-description
                                .order-description__name {{order.name}}
                                .order-description__img
                                    img(:src='order.image | withImage', alt='')
                                .order-description__number {{order.number}}
                                .order-description__text {{order.text | checkoutText}}
                                .order-description__price--old {{order.price | deleteLastSymb}}.00 руб.
                                .order-description__price--new {{order.price | deleteLastSymb(order.sale)}} руб.
                                .order-description__price--costm {{order.costm | withCostm(order.sale)}}
                            .col-sm-8.order__data.order-data
                                .order-data__header Оформление заказа
                                form.order-data__form.order-form#form--category(onsubmit="yaCounter45187896.reachGoal('order'); return true;")
                                    .form__msgs
                                    fieldset
                                        h3 Контакты:
                                        label Введите email
                                        input(type="text" placeholder="", name="form__email", id="form__email")
                                        label Введите номер телефона
                                        input(type="text" placeholder="", name="form__phone", id="form__phone")
                                    fieldset
                                        h3 Доставка:
                                        select(name="form__delivery", id="form__delivery", v-model="deliveryKind", class="ui selection dropdown")
                                            option(value="" disabled selected) - Выберите способ -
                                            option(value="1") Самовывоз -- бесплатно
                                            option(value="2") Доставка курьерской службой
                                        br
                                        label Адрес
                                        input(type="text", name="form__address", id="form__address", disabled, v-bind:placeholder='address')
                                    fieldset
                                        h3 Оплата:
                                        select(name="form__payment", id="form__payment",  v-model="paymentKind",  class="ui selection dropdown")
                                            option(value="" disabled selected) - Выберите способ -
                                            option(value="1") Онлайн --- бесплатно
                                            option(value="2") Банковский счёт --- бесплатно
                                            option(value="3") Наличными в офисе --- бесплатно
                                            option(value="4") При получении --- 1 500р за выезд курьера
                                    fieldset.order-form__b-items
                                        h3 Количество:
                                        button.order-form__items-button.button.ui(@click.prevent="orderitemamountRemove" type="button") -
                                        input.order-form__items-amount(:value="orderitemamount", v-model="orderitemamount", type="text" )
                                        button.order-form__items-button.button.ui(@click.prevent="orderitemamount++" type="button") +  
                                    fieldset.order-form__b-cost
                                        h2 Стоимость - <strong>{{fullcost}}</strong> руб.
                                        button.button.ui.button--orange.order-form__button-submit(type="submit", @click="sendOrder") ЗАКАЗАТЬ
                                    fieldset(class="input--hidden")
                                        input(type="text", name="form__cost", v-bind:value='fullcost')
                                        input(type="text", name="form__amount", v-bind:value='orderitemamount')
                                        input(type="text", name="form__price", v-bind:value='order.price')
                                        input(type="text", name="form__name", v-bind:value='order.name')
                                        input(type="text", name="form__sale", v-bind:value='order.sale')
                                        input(type="text", name="form__number", v-bind:value='order.number')
                                        input(type="text", name="form__order", v-bind:value='ordernumber')
                                        input(type="text", name="form__address", v-bind:value='address')      
                            .modal-close(@click="endModal") <i class="angle double left icon"></i>
</template>

<script>
    module.exports = {
        name : 'catalogsub',
        data : function() {
            return {
                search : '',
                myjson: [],
                showmodal : false,
                order: {        
                    "name": "",
                    "price": "",
                    "number": "",
                    "image": "",
                    "text": [],
                    "sale": ""
                },
                orderitemamount: 1,
                address: '',
                deliveryKind: '',
                paymentKind: '0',
                ordernumber: '0'
            }
        },
        props : ['catalogdescend'],
        methods : {
            loadJSON : function() {
                var self = this;
                axios.get(this.catalogdescend[this.catalogId].jsonfile)
                .then(function(response) {
                        self.myjson = response.data;
                    }, 
                    function(err) {
                        console.log(err)
                    }
                )     
            },
            goModal : function(e) {
                document.body.style.overflow = 'hidden';
                this.order = this.myjson[e.target.dataset.id];
                this.showmodal = true;
            },
            endModal : function(e) {
                document.body.style.overflow = 'auto';
                this.showmodal = false;
            },
            orderitemamountRemove : function() {
                if (this.orderitemamount == 1) {
                    return;
                } 
                this.orderitemamount--
            },
            sendOrder : function() {
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
                                message.addClass('active')
                                message.text('Благодарим за заказ! Номер заказа m-' + form__orderNumber + '. В скором времени с Вами свяжется наш менеджер. Пожалуйста, ожидайте!');
                                setTimeout(function(){
                                    message.removeClass('active')
                                    message.html('');
                                    $('input').not(':input[type=submit], :input[type=hidden]').val('');
                            }, 30000);
                            },
                            error: function (jqXHR, text, error) {
                                message.html('Упс...Письмо не отправилось');
                                message.css({'background':'red'});
                                setTimeout(function(){
                                    message.css({'background':'none'});
                                    message.html('');
                                    $('input').not(':input[type=submit], :input[type=hidden]').val('');
                                }, 3000);
                            }
                        });
                        return false;

                        function randomInteger(min,max) {
                            var integer = (Math.random() * (max - min + 1) + min - 0.5);
                            return integer = Math.round(integer);
	                    }

                    }
                });
            }
         },
        watch : {
            catalogId : function() {
                this.loadJSON();
            },
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
        computed : {
            salecost : function() {
                return this.kat;
            },
            filteredName: function(){
                return this.myjson.filter((i) => {
                    let item = i;
                    return item.name.toLowerCase().replace('ё','е').match(this.search.toLowerCase().replace('ё','е'))
                })
            },
            catalogId : function() {
                return this.$route.params.idEnd;
            },
            catalogActive: function() {
                return this.catalogdescend[this.catalogId]
            },
            fullcost: function() {
                let sum = 0;
                let k = this.order.sale;
                let payment = (this.paymentKind == 4) ? 1500 : 0;
                sum = (( (1 - k) * (this.order.price)) * this.orderitemamount) + payment;
                return sum.toFixed(2);
            }

        },
        mounted : function() {
            this.loadJSON();
            /*number order*/
            var a = 1000,
                b = 9999;
            this.ordernumber = randomInteger(a, b);

            function randomInteger(min,max) {
                var integer = (Math.random() * (max - min + 1) + min - 0.5);
                return integer = Math.round(integer);
            }
            /*end number order*/

            /*activeClass*/
            let allReferences = document.querySelectorAll('.category-wp .controllers-button__link');
            allReferences[this.catalogActive.id].classList.add('active');
            /*end activeClass*/
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
            }
        }
    }
</script>