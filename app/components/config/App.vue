<template lang="jade">
  #app
    menu-mobile-component
    // - ROUTER
    router-view(:propCartList="rootPropCartList", :propCartListFullCost="rootPropCartListFullCost", v-on:delete='deleteProduct', v-on:add='addProduct', v-on:increment="changeCountProduct")
    // - END ROUTER
</template>

<script>
  import MenuMobileComponent from '../modules/MenuMobileModules/index.vue'
  export default {
    name: 'app',
    components: {
      MenuMobileComponent
    },
    props: [
      'rootPropCartList',
	    'rootPropCartListFullCost'
    ],
	  methods: {
		  addProduct(i) {
			  this.$emit('add', i)
		  },
		  deleteProduct(i) {
			  this.$emit('delete', i)
		  },
			changeCountProduct(i) {
				this.$emit('increment', i)
			}
	  }
  }
</script>
