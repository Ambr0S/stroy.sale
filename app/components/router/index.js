import Vue    from "../../libs/vue"
import Router from 'vue-router'
import Catalog from '../Catalog/Catalog.vue'

Vue.use(Router);

export default new Router({
    routes: [
        { path: '/catalog/:id', name:'Catalog',  component: Catalog }
    ]
});