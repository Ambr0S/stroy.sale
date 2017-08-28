import Vue    from "../../libs/vue"
import Router from 'vue-router'
import Catalog from '../Catalog/Catalog.vue'

Vue.use(Router);

export default new Router({
	// TODO FIXME: надо проверить на сервере, как работает мод хистори

	//mode: 'history',
    routes: [
        { path: '/catalog/:idCategory/', name:'Catalog',  component: Catalog, children: [
			{
				path: '/catalog/:idCategory/:idSubCategory', name:'subCatalog', component: Catalog
			}
        ]}
    ]
});