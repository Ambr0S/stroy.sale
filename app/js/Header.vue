<template lang="jade">
.wrap-menu
    .container-fluid
        .row
            .col-sm-8.text-left
                .wrap-menu__content.menu
                    ul.menu__list
                        li.menu__item
                            a(@click="toOpenModal", href="#", data-modal="catalog").menu__link Каталог
                        li.menu__item
                            a(@click.prevent="toOpenModal", href="#", data-modal="pay").menu__link Доставка и оплата
                        li.menu__item
                            a(@click.prevent="toOpenModal", href="#", data-modal="back").menu__link Возврат товара
                        li.menu__item
                            a(@click.prevent="toOpenModal", href="#", data-modal="blog").menu__link Блог
                        li.menu__item
                            a(@click.prevent="toOpenModal", href="#", data-modal="contacts").menu__link Контакты
            .col-sm-4.text-right
                .wrap-menu__content.menu
                    ul.menu__list
                        li.menu__item
                            a.menu__link.menu__link--cart(@click.prevent="goCart", href="#", title="") <i class="big in cart icon"></i> В корзине 0 тов.
</template>

<script>
	export default {
		name: 'Header',
        data : function () {
            return {
                openModal: null
            }
        },
        methods: {
			// открыть модальное окно
            toOpenModal : function(e) {
                this.openModal = e.target.dataset.modal;
            }
		}
    }
</script>
