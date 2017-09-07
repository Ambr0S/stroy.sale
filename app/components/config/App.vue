<template lang="jade">
  #app
    // - ROUTER
    router-view(:propCartList="rootPropCartList")
    // - END ROUTER
</template>

<script>

  export default {
    name: 'app',
    props: [
      'rootPropCartList'
    ]
  }
</script>
