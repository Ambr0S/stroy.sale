<template lang="jade">

  .menu-mobile.menu-mobile--close
    .menu-mobile__button-close(@click="closeMenuMobile")
      span Назад&nbsp;
      i.arrow.right.icon
    controllers-component.controllers--row(:propCatalogList="catalogList", :propIdCategory="idCategory", :propIdSubCategory="idSubCategory", :propMenuMobile="true", v-on:closeMenu="closeMenuMobile")
    menu-component.menu--column(v-on:closeMenu="closeMenuMobile")


</template>

<script>
  import MenuComponent from '../MenuModules/index.vue'
  import ControllersComponent from '../ControllersModules/index.vue'
  export default {
    name: 'MenuMobileComponent',

    components: {
      MenuComponent,
      ControllersComponent
    },

    props: [],

    data: function () {
      return {
        catalogList: [
          {
            id: 0,
            name: 'Все товары',
            jsonFile: 'json/0000.json'
          },
          {
            id: 1,
            name: 'Штукатурные работы',
            jsonFile: 'json/0010.json',
            category: [
              {
                id: 0,
                name: 'Штукатурка',
                jsonFile: 'json/0011.json'
              },
              {
                id: 1,
                name: 'Шпатлёвка',
                jsonFile: 'json/0012.json'
              },
              {
                id: 2,
                name: 'Грунтовка',
                jsonFile: 'json/0013.json'
              },
              {
                id: 3,
                name: 'Стеклосетка штукатурная и малярная',
                jsonFile: 'json/0014.json'
              },
            ]

          },
          {
            id: 2,
            name: 'Укладка плитки и камня',
            jsonFile: 'json/0020.json'
          },
          {
            id: 3,
            name: 'Возведение стен и перегородок',
            jsonFile: 'json/0030.json',
            category: [
              {
                id: 0,
                name: 'Перегородки из гипсокартона',
                jsonFile: 'json/0031.json'
              },
              {
                id: 1,
                name: 'Газоблоки',
                jsonFile: 'json/0032.json'
              },
              {
                id: 2,
                name: 'Пазогребневые плиты',
                jsonFile: 'json/0033.json'
              }
            ]
          },
          {
            id: 4,
            name: 'Малярные работы',
            jsonFile: 'json/0040.json'
          },
          {
            id: 5,
            name: 'Устройство полов',
            jsonFile: 'json/0050.json'
          },
          {
            id: 6,
            name: 'Теплоизоляция',
            jsonFile: 'json/0060.json'
          },
          {
            id: 7,
            name: 'Гидроизоляция',
            jsonFile: 'json/0070.json'
          },
          {
            id: 8,
            name: 'Инструменты и приспособления',
            jsonFile: 'json/0080.json'
          },
        ],
      }
    },

    computed: {

      // получение из роутера id текущей категории товаров
      idCategory() {
        let routeParams = this.$route.params;
        return (routeParams.hasOwnProperty('idCategory')) ? routeParams['idCategory'] : null;
      },

      // получение из роутера id текущей подкатегории товаров
      idSubCategory() {
        let routeParams = this.$route.params;
        return (routeParams.hasOwnProperty('idSubCategory')) ? routeParams['idSubCategory'] : null;
      },

    },

    methods: {
      closeMenuMobile() {
	      let menu = document.querySelector('.menu-mobile');
        let app = document.querySelector('.wrap-app');

        menu.classList.remove('menu-mobile--open');
        menu.classList.add('menu-mobile--close');
        document.body.style.overflow = '';
      }
    }
  }
</script>
