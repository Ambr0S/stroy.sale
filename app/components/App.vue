<template lang="jade">
#app
    // MENU
    Menu
    Header
    Subscribe

</template>

<script>
    import Menu from './Menu/Menu.vue'
    import Header from './Header/Header.vue'
    import Subscribe from './Subscribe/Subscribe.vue'
	export default {
		name: 'app',
        components: {
            Menu,
            Header,
            Subscribe
        },
        data: function() {
		    return {
                a: 1000
            }
        }
	}
</script>
