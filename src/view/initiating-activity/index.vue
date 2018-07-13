<template>
  <div class="wrapper">
    <Row>
      <i-col span="18">
        <div class="initiating">
          <router-view></router-view>
        </div>
      </i-col>
      <i-col span="6">
        <right-aside></right-aside>
      </i-col>
    </Row>
  </div>
</template>

<script>
  import rightAside from 'components/right-aside/index'
  export default {
    data () {
      return {}
    },
    components: {
      rightAside
    }
  }
</script>

<style scoped>

  .wrapper{
    margin: 10px;
  }
  .list-wrapper{
    margin: 10px 0;
  }
  .list-item{
    position: relative;
    border: 1px solid #e3e2e5;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
  }
</style>
