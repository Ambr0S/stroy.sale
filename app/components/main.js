import Vue         from "vue/dist/vue"
import router      from "./config/router/index.js"
import App         from "./config/App.vue"

let eventHub = new Vue();

eventHub.$on('carter', (msg) => {
	vm.cartList = msg;
});

eventHub.$on('cartListFullCost', (msg) => {
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
	mounted() {

		// добавляем в корзину товар из Local Storage, если он там есть
		if (localStorage.hasOwnProperty('cartList')) {
			this.cartList = JSON.parse(localStorage.cartList) || [];
		}

	}
});