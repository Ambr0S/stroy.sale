<template>
  <div class="header">
    <div class="container">
      <div class="row" v-if="!isMobile">
        <div class="col-sm-12 header__logo text-left">
          <div class="logo ">
            <img src="img/logo.png" alt="" class="logo__img">
          </div>
        </div>
      </div>
      <div class="row" v-if="isMobile">
        <div class="col-xs-3 header__button-menu" @click="openMenuMobile">
          <i class="icon sidebar big"></i>
        </div>
        <div class="col-xs-6 header__logo header__logo--mobile">
          <div class="logo">
            <img src="img/logo.png" alt="" class="logo__img">
          </div>
        </div>
        <div class="col-xs-3 header__button-cart">
          <i class="icon cart big"></i>
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
			  isMobile: false,
        clientWidth: document.documentElement.clientWidth
      }
		},
    mounted() {
	    window.onresize = () => {
				console.log('resize')
				this.clientWidth = document.documentElement.clientWidth;
				if (this.clientWidth < 992) {
					this.isMobile = true
				} else {
					this.isMobile = false
				}
			}
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
