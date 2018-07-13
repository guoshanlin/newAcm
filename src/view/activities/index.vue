<template>

  <div class="cBg">
    <top-header></top-header>

    <div class="w1200">
      <!--<section class="box triangle crumbs_wrap b m-t10 ct c2">-->
      <!--<h3>{{row.name}}</h3>-->
      <!--<p class="c3">这是一个面包屑</p>-->
      <!--</section>-->

      <div class="content clear m-t10">
        <div class="content-wrap fl">
          <active-deltail :id="id"></active-deltail>
        </div>
        <div class="sidebar fr">
          <div class="sticky box triangle b m-b10">
            <div class="sidebar_title"><h3>热门活动</h3></div>
            <ul class="hot-wrapper">
              <li v-for="item in dataTop" :key="item.id" @click="routePush('/activities',item.id,'activities')">
                <article class="postlist">
                  <figure>
                    <img class="thumb" v-lazy="url + item.posterUrl"/>
                  </figure>
                  <h3 class="c2">{{item.name}}</h3>
                  <div class="info c3 m-t5">
                    <span class="category"> <Icon type="person"></Icon> {{item.memberName}}</span>
                    <span class="like fr"><Icon class="fz20" style="vertical-align: sub;margin-right: 3px" type="ios-eye"></Icon> {{item.ct}}</span>
                  </div>
                  <div class="info c3 m-t10">
                    <span class="date"><Icon type="clock"></Icon> {{formatterObjTime(item.beginTime,'yyyy-MM-dd')}}</span>
                  </div>
                </article>
              </li>
            </ul>
          </div>

          <!--<div class="sticky box triangle b m-b10">-->
          <!--<div class="sidebar_title"><h3>分类目录</h3></div>-->
          <!--<ul>-->
          <!--<li class="cat-item" v-for="item in [1,2,3,4,1,2,3,4,1,2,3,4]">-->
          <!--<Icon type="ios-arrow-right"></Icon> <a href="javascript: void(0)">分类</a><span>(22)</span>-->
          <!--</li>-->
          <!--</ul>-->
          <!--</div>-->
        </div>
      </div>

    </div>

    <div class="layout-copy">
      <i-footer :showSlogan="false"></i-footer>
    </div>

  </div>

</template>

<script>

  import topHeader from 'components/header'
  import iFooter from 'components/footer'
  import activeDeltail from 'components/active-deltail/active-deltail'

  export default {
    data () {
      return {
        url: process.env.NODE_ENV === 'production' ? '' : process.env.API,
        params: {
          id: this.$route.query.id
        },
        id: this.$route.query.id,
        row: '',
        dataTop: {}
      }
    },
    created () {
      setTimeout(() => {
        // this.loadActivitys()
        this.loadActivityTop()
      }, 20)
    },
    watch: {
      $route (to, from) {
        this.$nextTick(() => {
          this.params.id = this.$route.query.id
          this.id = this.$route.query.id
          // this.loadActivitys()
          this.loadActivityTop()
        })
      }
    },
    methods: {
      loadActivitys () {
        this.requestAjax('GET', 'activitysInfo', {}, this.$route.query.id).then((data) => {
          if (data.success) {
            this.row = data.data
          }
        })
        // this.requestAjax('get', 'activitys', this.params).then((data) => {
        //   if (data.success) {
        //     this.row = data.data.rows[0]
        //   }
        // })
      },
      loadActivityTop () {
        this.requestAjax('get', 'activityTopN', {topN: 4}).then((data) => {
          if (data.success) {
            this.dataTop = data.data
          }
        })
      }
    },
    components: {
      topHeader,
      iFooter,
      activeDeltail
    }
  }
</script>

<style scoped>

  .crumbs_wrap h3 {
    position: relative;
    border-bottom: 1px #eee solid;
    padding-bottom: 12px;
    margin: 0 -20px 20px;
  }
  .crumbs_wrap h3:before {
    position: absolute;
    content: '';
    bottom: -2px;
    left: 50%;
    width: 36px;
    height: 3px;
    background-color: #e1244e;
    margin-left: -18px;
  }

  .content-wrap{
    width: 800px;
  }
  .sidebar{
    width: 390px;
  }

  .sticky {
    float: right;
    width: 390px;
    position: relative;
  }
  .hot-wrapper li:nth-child(n+2){
    padding-top: 20px;
  }
  .postlist {
    overflow: hidden;
    padding-left: 136px;
  }
  .postlist figure {
    margin-left: -136px;
    float: left;
  }
  .postlist figure img.thumb {
    width: 128px;
    height: 75px;
  }
  .postlist h3 {
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 4px;
    margin-top: -2px;
  }
  .sidebar_title {
    margin: -20px -20px 20px;
    padding: 12px;
    background-color: #fdfdfd;
    border-bottom: 1px #f4f4f4 solid;
  }

  .cat-item{
    width: 50%;
    font-size: 12px;
    display: inline-block;
    vertical-align: top;
    padding: 4px 4px 4px 12px;
    line-height: 30px;
    border-bottom: 1px #f4f4f4 solid;
    color: #999;
    position: relative;
    white-space: nowrap;
  }
  .cat-item a{
    color: #333;
  }

</style>
