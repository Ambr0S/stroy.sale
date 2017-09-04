import Vue    from "../../libs/vue"
import Router from 'vue-router'
import Catalog from '../Catalog/Catalog.vue'

Vue.use(Router);

export default new Router({

	//mode: 'history',
    routes: [
        { path: '/catalog/:idCategory/', name:'Category',  component: Catalog, children: [
			{
				path: '/catalog/:idCategory/:idSubCategory', name:'subCategory', component: Catalog
			}
        ]}
    ]
});