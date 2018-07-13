<template>
  <div class="layout">
    <!--顶部栏-->
    <top-header></top-header>
    <!--<div class="index-tab">-->
      <!--<Row type="flex" justify="center">-->
        <!--<i-col><h3 :class="active.home" @click="tabSwitch('/index','home')"><a>首页</a></h3></i-col>-->
        <!--<i-col><h3 :class="active.industry" @click="tabSwitch('/index/industry','industry')"><a>行业</a></h3></i-col>-->
        <!--<i-col><h3 :class="active.life" @click="tabSwitch('/index/life','life')"><a>生活</a></h3></i-col>-->
        <!--<i-col><h3 :class="active.parenting" @click="tabSwitch('/index/parenting','parenting')"><a>亲子</a></h3></i-col>-->
        <!--<i-col><h3 :class="active.learn" @click="tabSwitch('/index/learn','learn')"><a>学习</a></h3></i-col>-->
        <!--<i-col><h3 :class="active.map" @click="tabSwitch('/index/map','map')"><a>地图测试</a></h3></i-col>-->
<!--&lt;!&ndash;        <i-col><h3 @click="routePush('/index')"><a>展会</a></h3></i-col>&ndash;&gt;-->
      <!--</Row>-->
    <!--</div>-->
    <div class="layout-content min-height clearFix m-0">
       <router-view></router-view>
    </div>
    <div class="layout-copy">
       <i-footer></i-footer>
    </div>
  </div>
</template>

<script>
  import topHeader from 'components/header'
  import iFooter from 'components/footer'

  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        active: {
          home: 'active',
          industry: '',
          life: '',
          parenting: '',
          learn: '',
          map: ''
        }
      }
    },
    methods: {
      tabSwitch (url, type) {
        for (let key in this.active) {
          if (type == key) {
            this.active[key] = 'active'
          } else {
            this.active[key] = ''
          }
        }
       this.routePush(url)
      }
    },
    computed: {
      ...mapGetters([
        'isLogin'
      ])
    },
    components: {
      topHeader,
      iFooter
    },
    mounted () {
     this.$nextTick(() => {
       if (this.$route.query.type) {
         for (let key in this.active) {
           if (this.$route.query.type == key) {
             this.active[key] = 'active'
           } else {
             this.active[key] = ''
           }
         }
       } else {
         this.active = {home: '', industry: '', life: '', parenting: '', learn: ''}
         switch ('' + this.$route.path) {
           case '/index/industry':
             this.active.industry = 'active'
                 break
           case '/index/life':
             this.active.life = 'active'
             break
           case '/index/parenting':
             this.active.parenting = 'active'
             break
           case '/index/learn':
             this.active.learn = 'active'
             break
           default:
             this.active.home = 'active'
         }
       }
     })
    }
  }
</script>

<style>
  .layout {background-color: #f8f8f8;
    background-repeat: repeat;
    background-size: inherit;
    background-attachment: fixed;
    background-position: center center;
    background-image: url(../assets/body.png);
    height: 100%;
    overflow-y: auto}
  .layout-copy {text-align: center; color: #9ea7b4;}
  .index-tab{height: 50px;line-height: 50px;background-color: #712e2e}
  .index-tab h3{height: 50px;}
  .index-tab h3:hover{background-color: #60393B;}
  .index-tab h3.active{background-color: #550704;}
  .index-tab a{display: inline-block; height: 45px; font-size: 20px;padding: 0 30px;color: #fff}
  .min-height{ min-height: calc( 100% - 220px)}
</style>
