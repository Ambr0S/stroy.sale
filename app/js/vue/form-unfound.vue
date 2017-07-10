<template lang="jade">

.container-fluid.catalog-unfound
    .row
        .col-sm-12
            .catalog-unfound__header.text-center Не нашли нужный товар?
            .catalog-unfound__description.text-center Оставьте заявку и мы уведомим вас о поступлении и<br>подарим 500 рублей на покупку!
            form.catalog-unfound__form.text-center.order-form#form-unfound(onsubmit="yaCounter45187896.reachGoal('subscribe'); return true;")
                .form__msgs
                input.catalog-unfound__input(type="text", name="form__name", placeholder="Укажите товар")
                input.catalog-unfound__input(type="text", name="form__email", placeholder="Введите email")
                input.catalog-unfound__input.button--green(type="submit", @click="sendOrder", value="Отправить")

            

</template>

<script>
    module.exports = {
        name : 'formunfound',
        props : [],
        data : function() {
            return {

            }
        },
        watch : {

        },
        computed : {

        },
        mounted : function() {

        }, 
        methods : {
            sendOrder : function() {
                $("#form-unfound").validate({
                    rules: {
                        form__email: { required: true, email: true },
                        form__name: 'required',
                    },
                    messages: {
                        form__email: '',
                        form__name: ''
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
                                message.text('Благодарим за доверие! Мы вышлем Вам информацию о наличии товара, как только он появится в сервисе. Пожалуйста, ожидайте оповещение');
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

                        function randomInteger(min,max) {
                            var integer = (Math.random() * (max - min + 1) + min - 0.5);
                            return integer = Math.round(integer);
	                    }

                    }
                });
            }
        },
        filters: {

        }
    }
</script>