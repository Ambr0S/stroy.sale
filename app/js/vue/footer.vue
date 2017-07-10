<template lang="jade">

.container-fluid.footer
    .row
        .col-sm-12.text-center
            .logo.footer__logo
                img.logo__img(src="img/logo--footer.png", alt="")
            .footer__menu.menu
                ul.menu__list
                    li.menu__item
                        a(@click="goModal" href="/#/catalog/0", title="", data-modal="catalog").menu__link Каталог
                    li.menu__item
                        a(@click.prevent="goModal" href="#", title="", data-modal="pay").menu__link Доставка и оплата
                    li.menu__item
                        a(@click.prevent="goModal" href="#", title="", data-modal="back").menu__link Возврат товара
                    li.menu__item
                        router-link(@click="goModal", to="/blog", title="", data-modal="blog").menu__link Блог
                    li.menu__item
                        a(@click.prevent="goModal" href="#", title="", data-modal="service").menu__link О сервисе
                    li.menu__item
                        a(@click.prevent="goModal" href="#", title="", data-modal="contacts").menu__link Контакты
                    li.menu__item
                        a(@click.prevent="goModal" href="#", title="", data-modal="provider").menu__link Хотите продавать на STROY.SALE?
            .copyright__menu.menu
                ul.menu__list
                    li.menu__item
                        a.menu__link(href="#") Задайте вопрос
                    li.menu__item
                        a.menu__link(href="#") Пользовательское соглашение
                    li.menu__item ©STROY.SALE | 2013-2017 | Все права защищены  

</template>

<script>
    module.exports = {
        name : 'footers',
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
            goModal : function(e) {
                console.log('тута')
                this.menuTarget = e.target.dataset.modal;
            }
        },
        filters: {

        }
    }
</script>