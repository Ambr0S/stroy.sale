<template lang="jade">
#app
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
    // HEADER
    Header
    // SUBSCRIBE
    Subscribe
    // FOOTER
    Footer

</template>

<script>
    import Menu from './Menu/Menu.vue'
    import Header from './Header/Header.vue'
    import Subscribe from './Subscribe/Subscribe.vue'
    import Footer from './Footer/Footer.vue'
	export default {
		name: 'app',
        components: {
            Menu,
            Header,
            Subscribe,
            Footer
        },
        data: function() {
		    return {

            }
        },
        mounted: function () {

			//- запускаем виджет ВК в Footer.vue
			VK.Widgets.Group(
				"vk_groups",
                {
                    mode: 4,
                    width: "350",
                    height: "450"
                },
                60332047
            );
			//- END

		}
	}
</script>
