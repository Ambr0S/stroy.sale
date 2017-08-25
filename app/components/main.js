import Vue from "../libs/vue";
import App from "./App.vue";

let vm = new Vue({
    el: "#app",
    template: "<App/>",
    components: {
        App
    },
    data: function () {
        return {
            a: 123
        }
    },
    methods: {},
    computed: {},
    watch: {},
    filters: {}
});