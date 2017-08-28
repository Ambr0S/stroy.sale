<template lang="jade">
    // MENU
    .wrap-menu
        .container-fluid
            .row
                .col-sm-8.text-left
                    Menu.menu--inline
                .col-sm-4.text-right
                    .wrap-menu__content.menu
                        ul.menu__list
                            li.menu__item
                                a.menu__link.menu__link--cart(@click.prevent="goCart", href="#", title="") <i class="big in cart icon"></i> В корзине 0 тов.
    // - END MENU

    // - HEADER
    Header
    // - END HEADER

    // - CONTROLLERS
    Controllers(:propCatalogList="catalogList")
    // - END CONTROLLERS

    // - CATALOG
    Catalog(:propCatalogList="catalogList")
    // - END CATALOG

    // SUBSCRIBE
    Subscribe
    // FOOTER
    Footer
</template>

<script>
    import Menu        from '../Menu/Menu.vue'
    import Header      from '../Header/Header.vue'
    import Controllers from '../Controllers/Controllers.vue'
    import Subscribe   from '../Subscribe/Subscribe.vue'
    import Footer      from '../Footer/Footer.vue'

    export default {
        name: 'Catalog',
        props: [
            'propCatalogList'
        ],
        components: [
            Menu,
            Header,
            Controllers,
            Subscribe,
            Footer
        ],
        data: function () {
            return {

                // список отрендеренных товаров
                catalogRender: []
            }
        },
        methods: {

            // загрузка JSON файла
            loadJSON: function () {
                let _this = this;
                axios.get(jsonfile)
                    .then(function (response) {
                            _this.catalogRender = response.data;

                            // ограничение количества товаров в ленте
                            //_this.canSort(response.data, _this)
                        },
                        function (err) {
                            console.log(err)
                        }
                    )
            }
        }
    }
</script>
