<template lang="jade">
    .controllers
        .controllers__category.controllers-category
            .controllers-category__item(v-for="(item,index) in propCatalogList", :key="item.id")
                a.controllers-category__button(href="#") {{item.name}}
</template>

<script>
    export default {
        name: 'Controllers',
        props: [
            'propCatalogList'
        ],
        data: function () {
            return {

            }
        }
    }
</script>
