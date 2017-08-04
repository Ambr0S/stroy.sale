<template lang="jade">
    .container-fluid
        .row
            .catalog__list.catalog__list--full.col-sm-12
                .row
                    div(v-for="(item, index) in filteredName", :class='"col-sm-" + item.img__size' )
                        .row(v-if="item.img__size")
                            .col-sm-12
                                .product.product--week.catalog__product.catalog__product(:style='"background: url(" + item.img + ")"')
                                    .product__name {{item.name}}
                                    .product__description {{item.description}}
                                    .product__price--new {{item.price}} {{item.amount}} <br>
                                    .product__sale Скидка {{item.sales | setSale}}%
                                    .product__compare.product-compare
                                        .product-compare__header <i class="search icon"></i><b>Цены в других магазинах</b>
                                        .compare(v-if="item.price__lerua") <img src="img/ico__lerua.jpg" alt="" /> <i>Леруа:</i> {{item.price__lerua}} {{item.amount}}
                                        .compare(v-if="item.price__obi") <img src="img/ico__obi.jpg" alt="" /> <i>Оби:</i> {{item.price__obi}} {{item.amount}}
                                        .compare(v-if="item.price__krauta") <img src="img/ico__krauta.jpg" alt="" /> <i>К-раута:</i> {{item.price__krauta}} {{item.amount}}
                                        .compare(v-if="item.price__kastorama") <img src="img/ico__kastorama.jpg" alt="" /> <i>Касторама:</i> {{item.price__kastorama}} {{item.amount}}
                                        .compare(v-if="item.price__middle") <i>Средняя цена:</i> {{item.price__middle}} {{item.amount}}
                                    .product__button
                                        .button.ui(:data-id='index', @click="goModal", onclick="yaCounter45187896.reachGoal('cart'); return true;") <i class="shop icon"></i> Добавить в корзину
                        .row(v-else-if="item.main")
                            .col-sm-12
                                .product.catalog__product.catalog__product--main
                                    .catalog__product--main-left
                                        .product__img
                                            img(:src='item.image | withImage', alt='')
                                    .catalog__product--main-right
                                        .product__name.product__name--main {{item.name}}
                                        .product__description.product__description--main <strong>Описание</strong>: <br> {{item.description}}
                                        .product__price--new.product__price--new-main <strong> {{item.price}}.00 {{item.amount}}</strong>
                                        .product__price--old {{item.price | deleteLastSymb}}.00 руб.
                                        .product__sale Скидка {{item.sales | setSale}}%
                                        .product__compare.product-compare.product__compare--main
                                            .product-compare__header <i class="search icon"></i><b>Цены в других магазинах</b>
                                            .compare(v-if="item.price__lerua") <img src="img/ico__lerua.jpg" alt="" /> <i>Леруа:</i> {{item.price__lerua}} {{item.amount}}
                                            .compare(v-if="item.price__obi") <img src="img/ico__obi.jpg" alt="" /> <i>Оби:</i> {{item.price__obi}} {{item.amount}}
                                            .compare(v-if="item.price__krauta") <img src="img/ico__krauta.jpg" alt="" /> <i>К-раута:</i> {{item.price__krauta}} {{item.amount}}
                                            .compare(v-if="item.price__kastorama") <img src="img/ico__kastorama.jpg" alt="" /> <i>Касторама:</i> {{item.price__kastorama}} {{item.amount}}
                                            .compare(v-if="item.price__middle") <i>Средняя цена:</i> {{item.price__middle}} {{item.amount}}
                                        .product__button.product__button--main
                                            .button.button--green.ui(:data-id='index', @click="goModal", onclick="yaCounter45187896.reachGoal('cart'); return true;") <i class="shop icon"></i> Добавить в корзину
                                        .product__benefits
                                            img(src="img/benefit.jpg" alt="")

                            .col-sm-12
                                br
                                h2.text-center С этим товаром покупают
                        .row(v-else)
                            .col-sm-12
                                .product.catalog__product
                                    .product__sale Скидка {{ item.sale | setSale }}%
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
                                        .button.ui(:data-id='index', @click="goModal", onclick="yaCounter45187896.reachGoal('cart'); return true;") <i class="shop icon"></i> Добавить в корзину
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
                ordernumber: '0',
                cart: []
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
                this.cart.push(this.myjson[e.target.dataset.id]);
                this.cart.forEach( (i) => i.count = 1);
                this.$root.eventHub.$emit('order', this.cart);
                this.$root.eventHub.$emit('order', this.cart);
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
            },
            setSale(val) {
                return (val * 100).toFixed(0);
            }
        }
    }
</script>