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
        <div class="col-xs-3 header__button-cart" v-if="elHeaderIsVisible">
          <router-link to="/cart">
            <i class="icon cart big"></i>
          </router-link>
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
        clientWidth: document.documentElement.clientWidth,
        routeName: this.$route.name
      }
		},
    computed: {
			elHeaderIsVisible() {
				if (this.routeName == 'Cart' || this.routeName == 'Order') {
          return false
				}
				return true
      }


    },
    mounted() {
      this.setMobile();
	    window.onresize = () => {
				this.clientWidth = document.documentElement.clientWidth;
        this.setMobile()
			}
    },
    methods: {
      setMobile() {
        this.isMobile = this.clientWidth < 992;

      },
      openMenuMobile() {
        let menu = document.querySelector('.menu-mobile');
        let app = document.querySelector('.wrap-app');

        menu.classList.add('menu-mobile--open');
        menu.classList.remove('menu-mobile--close');
        document.body.style.overflow = 'hidden'
      }
    }
	}
</script>
