<template lang="jade">
    .controllers
        .controllers__category.controllers-category
            .controllers-category__item(v-for="(item,index) in propCatalogList", :key="item.id")
                a.controllers-category__button(href="#") {{item.name}}
        .controllers__subcategory.controllers-category(v-if='isSubCategory')
            .controllers-category__item(v-for="(item,index) in propCatalogList[idSubCategory].category", :key="item.id")
                a.controllers-category__button(href="#") {{item.name}}
</template>

<script>


    export default {
        name: 'Controllers',
        props: [

        	// список всех категорий
            'propCatalogList'
        ],
        data: function () {
            return {
                idSubCategory: this.$route.params.idSubCategory,
                isSubCategory: null
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
