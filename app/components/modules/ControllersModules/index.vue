<template lang="jade">
	.controllers
		.controllers__category
			router-link.controllers__item.controllers__item--category.button.ui(v-on:click.native="closeMenuMobile", :to="{name: 'Category', params: {idCategory: index}}", :active-class="'secondary'", :exact-active-class="'secondary'", v-for="(item,index) in propCatalogList", :key="item.id") {{ item.name }}
		.controllers__subCategory(v-if='!propMenuMobile')
			router-link.controllers__item.controllers__item--subCategory.button.ui.basic.black(:to="{name: 'subCategory', params: {idSubCategory: index}}", :active-class="'secondary'", :exact-active-class="'secondary'", v-for="(item,index) in  propCatalogList[propIdCategory].category", :key="item.id") {{ item.name }}
</template>

<script>
	export default {
		name    : 'ControllersComponent',

		props   : [
			'propCatalogList',
			'propIdCategory',
			'propIdSubCategory',
      'propMenuMobile'
		],

		data    : function () {
			return {
        idCategory: this.propIdCategory,
        idSubCategory: this.propIdSubCategory
			}
		},

    computed : {

    },

		methods: {
			closeMenuMobile() {
				this.$emit('closeMenu', true);
			}
		}
	}
</script>
