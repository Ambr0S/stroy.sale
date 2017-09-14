import Vue         from "vue/dist/vue"
import router      from "./config/router/index.js"
import App         from "./config/App.vue"
import _    			 from 'lodash'

let eventHub = new Vue();

/**
 * TODO(@mtsymlov 14.09.17)
 *
 * Этот колбэк можно реализовать проще:
 * vm.cartList = msg;
 *
 * Но мы потеряем реактивность при изменени количества товаров в корзине.
 * Число товаров будет останавливаться на двух
 *
 */
eventHub.$on('carter', (msg) => {
  let list = msg;
  list = _.uniqBy(list, 'number');
  list.forEach(function(item,index) {
    Vue.set(vm.cartList, index, item);
    for (var key in item) {
      if (!item.hasOwnProperty(key)) return;
      Vue.set(item, key, item[key]);
    }
  });
});

eventHub.$on('cartListFullCost', (msg) => {
  console.log(msg);
	vm.cartListFullCost = msg;
});



let vm = new Vue({
	el: "#app",
	template: "<App :rootPropCartList='cartList' :rootPropCartListFullCost='cartListFullCost'></App>",
	router,
	components: {
		App
	},
	data: function () {
		return {
			eventHub: eventHub,
			cartList: [],
			cartListFullCost: 0
		}
	},
	computed: {

	},
	mounted() {

		// добавляем в корзину товар из Local Storage, если он там есть
		if (localStorage.hasOwnProperty('cartList')) {
			this.cartList = JSON.parse(localStorage.cartList) || [];
		}

	}
});