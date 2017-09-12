<template lang="jade">
	.controllers
		.controllers__category
			router-link.controllers__item.controllers__item--category.button.ui(:to="{name: 'Category', params: {idCategory: index}}", :active-class="'secondary'", :exact-active-class="'secondary'", v-for="(item,index) in propCatalogList", :key="item.id") {{ item.name }}
		.controllers__subCategory(v-if='propCatalogList[propIdCategory].category')
			router-link.controllers__item.controllers__item--subCategory.button.ui.basic.black(:to="{name: 'subCategory', params: {idSubCategory: index}}", :active-class="'secondary'", :exact-active-class="'secondary'", v-for="(item,index) in  propCatalogList[propIdCategory].category", :key="item.id") {{ item.name }}
</template>

<script>
	export default {
		name    : 'ControllersComponent',
		props   : [
			'propCatalogList',
			'propIdCategory',
			'propIdSubCategory'
		],
		data    : function () {
			return {

			}
		},
		mounted : function () {

			// проверка наличия подкатегории. если true, то показать контроллеры для подкатегорий
			if (this.idSubCategory) {
				this.isSubCategory = this.propCatalogList[this.idSubCategory].hasOwnProperty('category')
			}

			// добавление стилей к активной кнопке

		}
	}
</script>
