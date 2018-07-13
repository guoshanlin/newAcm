<template>
  <div class="home-item">
      <div class="fbox home-item-title">
        <div class="home-title">
          <h2>{{option.title}}</h2>
        </div>
        <div class="flex t-right">
          <a>更多》</a>
        </div>
      </div>
      <div class="home-modular">
        <Row>
          <i-col :span="12" v-for="(row, index) in  option.rows" :key ='index' v-if="index < 4">
            <div class="home-item-content" @click="routePush('/index/activities',row.id,'home')">
              <div class="index-home">
                <img width="100%" height="100%" v-lazy="url + row.posterUrl">
                <span class="tips b1 c">{{getActiveStatus(row.status)}}</span>
              </div>
              <div class="info-home flex c2">
                <h3 class="fz24 td-render" :title="row.name">{{row.name}}</h3>
                <div class="fbox fz14">
                  <div class="flex">
                    <Icon type="person"></Icon>
                    发布者：{{row.memberNickName}}
                  </div>
                </div>
                <div class="fbox">
                  <div class="flex">
                    <div>活动时间：{{formatterObjTime(row.beginTime)}} ~ {{formatterObjTime(row.endTime)}}</div>
                  </div>
                </div>
                <div class="fbox">
                  <div class="flex">
                    <Icon type="ios-location"></Icon> {{row.city1 + row.city2 + row.city3 +row.address}}
                  </div>
                  <div class="t-right">
                    <Icon type="eye"></Icon>浏览数：{{row.count}}
                  </div>
                </div>
              </div>
            </div>
          </i-col>
        </Row>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        url: process.env.NODE_ENV === 'production' ? '' : process.env.API
      }
    },
    props: {
      option: '',
      button: ''
    },
    methods: {
      clickItem () {
        this.$emit('click', this.row)
      },
      exmine () {
        this.$emit('exmine', this.row)
      }
    }
  }
</script>

<style scoped>
  .home-item{position: relative; border: 1px solid #e3e2e5; padding: 10px; border-radius: 5px; margin: 10px;}

  .index-home {height: 300px;position: relative;border-radius: 4px;overflow: hidden;}

  .home-item-title{border-bottom:2px solid #1c2438; margin-bottom: 10px; line-height: 40px;}

  .home-item-title .home-title{width: 200px;}

  .home-item-content{border: 1px solid #e3e2e5;padding: 10px;border-radius: 5px;line-height: 26px; margin: 5px; cursor: pointer;}

  .index-home .tips {
    position: absolute;
    top: 0;
    right: 0;
    padding: 3px 10px;
    border-radius: 0 4px 0 4px;
  }

  .info-home {
    padding: 10px 30px;
    line-height: 34px;
    height: 160px;
  }
  .home-modular{min-height: 400px}
  .meeting-version {
    padding: 2px 8px;
    border-radius: 3px;
    margin-left: 8px
  }
</style>
