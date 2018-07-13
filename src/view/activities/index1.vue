<template>
  <div>
    <active-deltail :id="rowId" type="activities"></active-deltail>
  </div>
</template>

<script>
  import activeDeltail from 'components/active-deltail/index'

  export default {
    name: 'index',
    data () {
      return {
        rowId: this.$route.query.id
      }
    },
    components: {
      activeDeltail
    }
  }
</script>

<style scoped>

</style>
