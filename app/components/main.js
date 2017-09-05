import Vue from "../libs/vue"
import router from './router/index.js'
import App from "./App.vue"

let eventHub = new Vue();

eventHub.$on('carter', (msg) => {
	vm.cartList = msg;
});

let vm = new Vue({
	el: "#app",
	template: "<App :rootPropCartList='cartList'></App>",
	router,
	components: {
		App
	},
	data: function () {
		return {
			eventHub: eventHub,
			cartList: null
		}
	},
	mounted() {

		// добавляем в корзину товар из Local Storage, если он там есть
		if (localStorage.hasOwnProperty('cartList')) {
			this.cartList = JSON.parse(localStorage.cartList) || [];
		}

	}
});