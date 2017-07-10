<template lang="jade">
.row
    .col-sm-2.logo
        img.logo__img(src="img/logo.png", alt="")
    .col-sm-10.header__menu.menu.text-right
        ul.menu__list
            li.menu__item
                a(@click="goModal" href="#", title="", data-modal="pay").menu__link Доставка и оплата
            li.menu__item
                a(@click="goModal" href="#", title="", data-modal="back").menu__link Возврат товара
            li.menu__item
                a(@click="goModal" href="#", title="", data-modal="provider").menu__link Для поставщиков
            //li.menu__item
                router-link(@click="goModal", to="/blog", title="", data-modal="blog").menu__link Блог
            li.menu__item
                a(@click="goModal" href="#", title="", data-modal="service").menu__link О сервисе
            li.menu__item
                a(@click="goModal" href="#", title="", data-modal="contacts").menu__link Контакты
</template>

<script>
    module.exports = {
        name : 'header',
        props : [],
        data : function() {
            return {
                this.showmodal = false;
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
                let target = e.target.dataset.modal;
                this.menuTarget = target;
                
                this[this.menuTarget] = true;
                this.showmodal = true;
                }
            }
        filters: {

        }
    }
</script>