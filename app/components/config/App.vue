<template lang="jade">
  #app
    // - ROUTER
    router-view(:propCartList="rootPropCartList", :propCartListFullCost="rootPropCartListFullCost", v-on:delete='deleteProduct', v-on:add='addProduct', v-on:increment="changeCountProduct")
    // - END ROUTER
</template>

<script>

  export default {
    name: 'app',
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
