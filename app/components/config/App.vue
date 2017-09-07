<template lang="jade">
  #app

    md-button.md-raised.md-primary Button

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
