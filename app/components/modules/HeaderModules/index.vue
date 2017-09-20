<template>
  <div class="header">
    <div class="container">
      <div class="row" v-if="!isMobile">
        <div class="col-12 text-left">
          <div class="logo header__logo">
            <img src="img/logo.png" alt="" class="logo__img">
          </div>
        </div>
      </div>
      <div class="row" v-if="isMobile">
        <div class="col-xs-4 header__button-menu" @click="openMenuMobile">
          <i class="icon menu big"></i>
        </div>
        <div class="col-xs-8">
          <div class="logo header__logo">
            <img src="img/logo.png" alt="" class="logo__img">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		name: 'HeaderComponent',
		components: {
		},
		data: function () {
			return {
			  isMobile: false
      }
		},
    mounted() {
		  this.isMobile = true
    },
    methods: {
		  openMenuMobile() {
        let menu = document.querySelector('.menu-mobile');
        let app = document.querySelector('.wrap-app');

		    menu.classList.add('menu-mobile--open');
		    menu.classList.remove('menu-mobile--close');
		    app.style.cssText = `overflow: hidden`
      }
    }
	}
</script>
