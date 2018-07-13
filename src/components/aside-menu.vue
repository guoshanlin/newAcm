<template>
  <div class="heigthFull">
    <Row class="heigthFull">
      <i-col class="heigthFull main-left-wrapper" style="background: rgba(0,0,0, .2);">
        <Menu :active-name="activeName" ref="refName" theme="light" width="auto"  class="heigthFull menuScroll" style="overflow: auto" @on-select="changeMenu">
           <template v-for="(v,i) in loadMian">
            <Submenu v-if="v.children != undefined" :name="v.path" class="text-a-left" :key="i">
              <template slot="title">
                {{v.title}}
              </template>
              <Menu-item v-for="(v2, k2, i2) in v.children" :name="v2.path" :key="i2">
                <span class="layout-text">{{v2.title}}</span>
              </Menu-item>
            </Submenu>
            <Menu-item v-else :name="v.path" class="text-a-left" :key="i">
              {{v.title}}
            </Menu-item>
          </template>
        </Menu>
      </i-col>
    </Row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        // openNames:['1','2','3'],
        loadMian: [
          {path: '/index/role', title: '会员管理'},
          {path: '/index/examine', title: '审批管理'}
          // {path: '/IndexManagement', title:  '数据管理',children:[
          //     {path: '/IndexManagement', title:  '数据管理',},
          //     {path: '/hostManagement',title:  '主机管理'},
          //     {path: '/objectManagement',title:  '对象管理'},
          //   ]},
        ],
        activeName: this.$route.path
      }
    },
    destroyed () {

    },
    methods: {
      changeMenu (name) {
        this.$router.push(name)
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.$refs.refName.updateActiveName()
      })
    }
  }
</script>

<style scoped>
</style>
