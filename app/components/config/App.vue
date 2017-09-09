<template lang="jade">
  #app
    // - ROUTER
    router-view(:propCartList="rootPropCartList", :propCartListFullCost="rootPropCartListFullCost")
    // - END ROUTER
</template>

<script>

  export default {
    name: 'app',
    props: [
      'rootPropCartList',
	    'rootPropCartListFullCost'
    ]
  }
</script>
