<template>
  <div class="wrapper clearFix">
    <div class="wrapper-box b float-l" style="width: 150px;margin-right: 10px;height: fit-content;">

      <Menu theme="light" :active-name="activeNenu" width="auto"  class="menu-wrapper" @on-select="changeMenu">
        <MenuGroup title="财务管理">
          <template v-for="(item,i) in menuList">
            <MenuItem :name="item.path" :key="i"><Icon :type="item.icon"></Icon>{{item.title}}</MenuItem>
          </template>
        </MenuGroup>
      </Menu>

    </div>
    <div class="float-l" style="width:calc(100% - 170px);">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeNenu: this.$route.path,
        menuList: [
          {icon: 'ios-person', path: "/finance/myAccount", title: "我的账户"},
          {icon: 'arrow-graph-up-right', path: "/finance/incomeDetails", title: "收入明细"},
          {icon: 'arrow-graph-down-right', path: "/finance/withdrawalDetails", title: "提现明细"}
        ]
      }
    },
    created() {
      setTimeout(() => {

      }, 20)
    },
    watch: {
      '$route' (to, from) {
        this.activeNenu = to.path
      }
    },
    methods: {
      changeMenu(name){
        this.$router.push(name)
      }
    }
  }
</script>

<style scoped>

  .wrapper {
    margin: 10px;
  }

</style>
