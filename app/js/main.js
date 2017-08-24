import Vue from "../libs/vue.js";
import App from "../js/App.vue";

let vm = new Vue({
    el: "#app",
    template: "<App/>",
    components: {
        App
    },
    data: {
        a: 123
    },
    methods: {},
    computed: {},
    watch: {},
    filters: {}
});