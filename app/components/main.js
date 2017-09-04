import Vue from "../libs/vue"
import router from './router/index.js'
import App from "./App.vue"

let vm = new Vue({
	el: "#app",
	template: "<App/>",
	router,
	components: {
		App
	},
	data: function () {
		return {}
	}
});