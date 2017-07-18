<template lang="jade">
.modal-wp
    .row
        .col-sm-12
                .container.modal-content.modal-content--page
                    .row.modal.is-active(v-show="showmodal")
                        .col-sm-12
                            .modal__pay.modal__content(v-if="pay")
                                h3 Условия оплаты и доставки
                                h4 Способы оплаты товара:
                                p - <b><i>Онлайн оплата.</i></b> Оплата на сайте с помощью банковских карт или электронных денег. Самый выгодный способ оплаты.<br> - <b><i>Банковским переводом.</i></b> Оплата производится в банке по выписанному счёту. Рекомендуемый способ при больших суммах платежей.<br> - <b><i>Наличными при получении.</i></b> Так как данный способ оплаты требует выезд курьера с ККТ к покупателю или на склад самовывоза, он предусматривает дополнительную комиссию.<br> - <b><i>Наличными в офисе.</i></b> Адрес офиса указан в разделе контакты. О встрече рекомендуем договариваться заранее.<br>
                                <br>
                                h4 Способы получения товара:
                                p -<b><i> доставка курьерской службой</i></b>;<br> - <b><i>самовывоз со склада</i></b>.
                                p Стоимость доставки рассчитывается курьерской службой исходя из базовых тарифов и озвучивается по телефону менеджером. Оплата доставки осуществляется при получении товара.
                            .modal__back.modal__content(v-if="back") 
                                h3 Гарантии и возврат товара                            
                                p На все товары из сервиса действуют гарантийные обязательства, предусмотренные компаниями-производителями стройматериалов.
                                p Большую часть товаров в сервисе размещают <b>производственные и оптовые компании</b>. На данные товары надлежащего качества действуют условия возврата согласно действующему законодательству РФ <b>в течении 14 дней</b> с момента покупки, за исключением материалов, отпускаемых на метраж (согласно Постановлениям № 1222, №55). Обмен товара надлежащего качества проводится, если указанный товар не был в употреблении, сохранены его товарный вид, потребительские свойства, пломбы, фабричные ярлыки, а также имеется товарный чек или кассовый чек. 
                                p В случае приобретения товара у <b>физических лиц, условия возврата не действуют</b>. Уточнить условия возврата конкретных товаров, можно по телефону из раздела контакты.

                            .modal__provider.modal__content(v-if="provider") 
                                h3 Для поставщиков
                                h4 О сервисе
                                p Stroy.sale - сервис с помощью которого можно быстро продать/купить товарные остатки стройматериалов, неликвиды, и материал б/у.
                                br
                                h4 Как продать товар
                                p Товар на сервис может выложить любой желающий, как юридическое, так и физическое лицо. Для этого необходимо зарегистрироваться в качестве поставщика на сайте Stroy.sale. Регистрация и публикация товаров на сайте проходят ручную модерацию. Пожалуйста, при регистрации указывайте корректные данные. Вся представленная информация является конфиденциальной, её обработка соответствует ФЗ «О персональных данных». Главное условие участия в сервисе – значительный дисконт на материал.
                                br
                                h4 Для кого полезен сервис:
                                p - строительные компании; <br> - компании по торговле стройматериалами; <br> - частные бригады, мастера, прорабы; <br> - частные лица с остатками стройматериала <br> - организации по демонтажу.
                            .modal__blog.modal__content(v-if="blog")
                                h3 Блог
                            .modal__service.modal__content(v-if="service") 
                                h3 О сервисе
                                p Stroy.sale – онлайн сервис по продаже строительных материалов со значительными скидками. За счет реализации складских остатков и неликвидов строительных, торговых и производственных компаний.
                                br
                                h4 Как работать с сервисом?
                                p Для покупки товара через сервис, достаточно оформить и оплатить заказ на сайте онлайн. В течении 3-х часов с Вами свяжется менеджер и согласует условия доставки. Для получения дополнительных скидок, необходимо зарегистрироваться на сайте и оформлять заказы через личный кабинет.
                                p Обратите внимание, что способ оплаты «при получении» (в том числе на складе), предусматривает дополнительную комиссию за выезд курьера с кассой на склад или к клиенту.
                                p Чтобы договориться о просмотре товара на складе, нужно позвонить по телефону из раздела контакты. Так как часть товаров находятся на складских комплексах с пропускным режимом, для просмотра товара необходимо зарегистрироваться и корректно заполнить анкету в личном кабинете.
                                br
                                h4 Как устроен сервис?
                                img(src="img/service.jpg" alt="")
                            .modal__contacts.modal__content(v-if="contacts")
                                h3 Контакты
                                p Телефон: <b>+7 977 880-60-14, +7 904 600-80-20</b>
                                p Email: <b>info@stroy.sale</b>
                                p Адрес: <b>г. Москва: Варшавское шоссе, д.28 A</b>
                                img(src="img/map.png" alt="")
                            .modal__callback.modal__content(v-if="callback")
                                h3 Получение скидки на первую покупку
                                form.modal__form.text-center.order-form#form-rub500(onsubmit="yaCounter45187896.reachGoal('rub500'); return true;")
                                    .form__msgs
                                    input.catalog-unfound__input.modal__input(type="text", name="form__email", placeholder="Введите email")
                                    input.catalog-unfound__input.modal__input.button--green(type="submit", @click="sendOrder", value="Отправить")


                        .modal-close(@click="endModal") <i class="angle double left icon"></i>
</template>

<script>
    module.exports = {
        name : 'modal',
        props : ['target'],
        data : function() {
            return {
                showmodal : false,
                catalog   : false,
                pay       : false,
                back      : false,
                provider  : false,
                blog      : false,
                service   : false,
                contacts  : false,
                buttonmodal : false
            }
        },
        watch : {
            menuTarget : function() {
                if (this.menuTarget == 'catalog') return;
                if (this.menuTarget == 'blog') return;
                if (this.menuTarget == 'exit') return;
                document.body.style.overflow = 'hidden';
                this.showmodal = true;
                this[this.menuTarget] = true;
            }
        },
        computed : {
            menuTarget : function() {
                return this.target
            }
        },
        mounted : function() {
            
        }, 
        methods: {
            endModal : function(e) {
                document.body.style.overflow = 'auto';
                this.showmodal = false;
                this[this.menuTarget] = false;
                this.$root.eventHub.$emit('exit','exit')
            },
            sendOrder : function() {
                $("#form-rub500").validate({
                    rules: {
                        form__email: { required: true, email: true }
                    },
                    messages: {
                        form__email: ''
                    }
                });
            
                $(".order-form").on('submit', function () {
                    if ($(this).valid()) {
                        var formID = $(this).attr('id');
                        var formNm = $('#' + formID);
                        var message = $(formNm).find(".form__msgs");
                        $.ajax({
                            type: "POST",
                            url: 'mt.action.php',
                            data: formNm.serialize(),
                            success: function (data) {
                                message.text('В ближайшее время Вам вышлют письмо с номером купона на 500 рублей. Пожалуйста, ожидайте');
                                message.addClass('active');
                                setTimeout(function(){
                                    message.removeClass('active')
                                    message.css({'background':'none'});
                                    message.html('');
                                    $('input').not(':input[type=submit], :input[type=hidden]').val('');
                                }, 30000);
                            },
                            error: function (jqXHR, text, error) {
                                message.html('Упс...Письмо не отправилось');
                                message.css({'background':'red'});
                                setTimeout(function(){
                                message.html('');
                                message.css({'background':'none'});
                                $('input').not(':input[type=submit], :input[type=hidden]').val('');
                                }, 3000);
                            }
                        });
                        return false;

                    }
                });
            }
        },
        filters: {

        }
    }
</script>