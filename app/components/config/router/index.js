import Vue                   from 'vue/dist/vue'
import Router                from 'vue-router'
import Catalog               from '../../pages/CatalogPage/Catalog.vue'
import Cart                  from '../../pages/CartPage/Cart.vue'
import Order                 from '../../pages/OrderPage/Order.vue'
import DeliveryPage          from '../../pages/DeliveryPage/index.vue'
import PurchaseReturnsPage   from '../../pages/PurchaseReturnsPage/index.vue'
import ServicePage           from '../../pages/ServicePage/index.vue'
import ContactsPage          from '../../pages/ContactsPage/index.vue'

Vue.use(Router);

export default new Router({

	//mode: 'history',
	routes: [
		{
			path: '/catalog/:idCategory/',
			name: 'Category',
			component: Catalog,
			children: [
				{
					path: '/catalog/:idCategory/:idSubCategory',
					name: 'subCategory',
					component: Catalog
				}
			],
		},
		{
			path: '/cart',
			name: 'Cart',
			component: Cart,
		  meta: { scrollToTop: true }
		},
		{
			path: '/order',
			name: 'Order',
			component: Order,
			meta: { scrollToTop: true }
		},
		{
			path: '/delivery',
			name: 'DeliveryPage',
			component: DeliveryPage
		},
		{
			path: '/purchase-returns',
			name: 'PurchaseReturnsPage',
			component: PurchaseReturnsPage
		},
		{
			path: '/service',
			name: 'ServicePage',
			component: ServicePage
		},
		{
			path: '/contacts',
			name: 'ContactsPage',
			component: ContactsPage
		}
	],
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	}
});