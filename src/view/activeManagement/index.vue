<template>
    <div class="clearFix">
      <div class="float-l layout-content-menu heigthFull">
        <aside-menu></aside-menu>
      </div>
      <div class="float-r layout-content-main heigthFull">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
  import asideMenu from 'components/aside-menu'
    export default {
        name: 'index',
        components: {
           asideMenu
        }
    }
</script>

<style scoped>
  .layout-content-menu{ width: 140px}
  .layout-content-main{width: calc(100% - 140px); padding: 10px;}
</style>
