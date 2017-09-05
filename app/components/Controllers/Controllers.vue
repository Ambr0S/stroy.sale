<template lang="jade">
	.controllers
		.controllers__category
			router-link.controllers__item.controllers__item--category(:to="{name: 'Category', params: {idCategory: index}}", v-for="(item,index) in propCatalogList", :key="item.id") {{ item.name }}
		.controllers__subCategory(v-if='propCatalogList[propIdCategory].category')
			router-link.controllers__item.controllers__item--subCategory(:to="{name: 'subCategory', params: {idSubCategory: index}}", v-for="(item,index) in  propCatalogList[propIdCategory].category", :key="item.id") {{ item.name }}
</template>

<script>


	export default {
		name: 'Controllers',
		props: [
			'propCatalogList',
			'propIdCategory',
			'propIdSubCategory'
		],
		data: function () {
			return {

			}
		},
		mounted: function () {

			// проверка наличия подкатегории. если true, то показать контроллеры для подкатегорий
			if (this.idSubCategory) {
				this.isSubCategory = this.propCatalogList[this.idSubCategory].hasOwnProperty('category')
			}
		}
	}
</script>
