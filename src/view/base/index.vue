<template>
  <div class="wrapper clear">
    <div class="wrapper-box b float-l" style="width: 150px;margin-right: 10px;height: fit-content;">

      <Menu theme="light" :active-name="activeNenu" width="auto"  class="menu-wrapper" @on-select="changeMenu">
        <template  v-for="(item,i) in menuList">
        <MenuGroup :title="item.title">
          <template v-for="(childItem,c) in item.child">
            <MenuItem :name="childItem.path" :key="c"><Icon :type="childItem.icon"></Icon>{{childItem.title}}</MenuItem>
          </template>
        </MenuGroup>
        </template>
      </Menu>
    </div>
    <div class="float-r" style="width: calc( 100% - 160px)">
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
          {
            title: '概况',
            child: [
              {icon: 'android-send', path: '/base/overview', title: '活动概况'}
            ]
          },
          {
            title: '会前',
            child: [
              {icon: 'android-textsms', path: '/base/info', title: '活动信息'},
              {icon: 'android-send', path: '/base/entrylist', title: '门票管理'},
              {icon: 'ios-body', path: '/base/invitelist', title: '活动邀请'}
            ]
          },
          {
            title: '会中',
            child: [
              {icon: 'compose', path: '/base/sign', title: '签到管理'},
              {icon: 'ios-ionic-outline', path: '/base/walllist', title: '微信互动'}
            ]
          },
          {
            title: '参会管理',
            child: [
              {icon: 'ios-people', path: '/base/userlist', title: '人员管理'},
              {icon: 'clipboard', path: '/base/orderlist', title: '订单管理'}
            ]
          },
          {
            title: '数据统计',
            child: [
              {icon: 'calculator', path: '/base/joinStatistics', title: '参会统计'},
              {icon: 'calculator', path: '/base/interactivityStatistics', title: '互动统计'},
              {icon: 'calculator', path: '/base/flowedStatistics', title: '流量统计'}
            ]
          }
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
        this.routePush(name, this.$route.query.id)
      }
    }
  }
</script>

<style scoped>

  .wrapper {
    margin: 10px;
  }

</style>
