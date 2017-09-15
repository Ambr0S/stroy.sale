import Vue         from "vue/dist/vue"
import router      from "./config/router/index.js"
import App         from "./config/App.vue"

let eventHub = new Vue();

let vm = new Vue({
	el: "#app",
	template: "<App :rootPropCartList='cartList' :rootPropCartListFullCost='cartListFullCost' v-on:delete='deleteProduct' v-on:add='addProduct' v-on:increment='changeCountProduct'></App>",
	router,
	components: {
		App
	},
	data: function () {
		return {
			eventHub: eventHub,
			cartList: [],
			//cartListFullCost: 0
		}
	},
	computed: {

		cartListFullCost() {
			let fullCost = 0;
			fullCost = this.cartList.reduce( (sum, item) => {
				return sum + (+item.price * ( 1 - +item.sale )) * item.count;
			},0);

			return fullCost
		}

	},
	mounted() {

		// добавляем в корзину товар из Local Storage, если он там есть
		if (localStorage.hasOwnProperty('cartList')) {
			this.cartList = JSON.parse(localStorage.cartList) || [];
		}

	},

	methods: {
		addProduct(item) {
			Vue.set(this.cartList, this.cartList.length, item);
			localStorage.setItem('cartList', JSON.stringify(this.cartList));
		},

		deleteProduct(i) {
			this.cartList.splice(i,1);
			localStorage.setItem('cartList', JSON.stringify(this.cartList));
		},

		changeCountProduct(i) {
			this.cartList.forEach((item,index) => {
				if (i.number === item.number) {
					//console.log(this.cartList);
					Vue.set(this.cartList, index, i)
				}
			})
		}
	}
});