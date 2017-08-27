<template lang="jade">
   .menu(:class="classList")
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
   </template>

<script>
	export default {
		name: 'Menu',
        props: [
        	'propClassList'
        ],
        data : function () {
            return {
                openModal: null,
                // список классов из родителя
                classList: this.propClassList
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
