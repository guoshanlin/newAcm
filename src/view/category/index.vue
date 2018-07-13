<template>

  <div class="cBg">
    <top-header @search="search"></top-header>

    <div class="w1200">
      <section class="box triangle crumbs_wrap b m-t10 ct c2" v-if="title && title != ''">
        <h3>{{title}}</h3>
        <div class="t-left">
          <RadioGroup type="button" size="small">
            <Radio label="" value="">不限</Radio>
            <Radio v-for="value in childrenTree" :label="value.title + ',' + value.id" :key="value.title" :value="value.title + ',' + value.id">
              {{value.title}}
            </Radio>
          </RadioGroup>
        </div>
        <!--<p class="c3">绘画，最享受的一件事情，那种忘我的境地是其他任何事都无法比拟！</p>-->
      </section>

      <div class="content clear m-t10">
        <div class="content-wrap fl">
          <!--<article class="box triangle b m-b10">-->
            <!--<a title="LensNews" href="javascript:void(0)"><img src="https://yfdxs.com/wp-content/themes/lensnews/images/ad.jpg" alt="LensNews"></a>-->
          <!--</article>-->

          <article class="box triangle b m-b10" v-for="item in dataOptions.rows" :key="item.id">
            <article class="post_main" @click="routePush('/activities',item.id,'category')">
              <figure>
                <!--<a href="https://yfdxs.com/country-painting-art.html" title="乡间绘画艺术" target="_blank">-->
                <a href="javascript:void(0)"><img class="thumb" v-lazy="url + item.posterUrl"> </a>
              </figure>
              <h2><a href="javascript:void(0)" :title="item.name">{{item.name}}</a></h2>
              <div class="postinfo clear">
                <div class="fl">
                  <span class="author">
                    <a href="javascript:void(0)" class="c3">
                      <!--<img class="avatar" src="https://secure.gravatar.com/avatar/c9bd07d563393c25e5f8812b47e6e640?s=120">{{item.memberName}}-->
                      <Icon type="person"></Icon>&nbsp;{{item.memberNickName}}
                    </a>
                  </span>
                  <span class="category">{{item.label.replace(/,/g, ' ')}}</span>
                  <span class="date">{{formatterObjTime(item.beginTime,'yyyy-MM-dd')}}</span>
                </div>
                <div class="fr">
                  <!--<span class="view"><Icon class="fz20" style="vertical-align: sub;" type="ios-eye"></Icon> 6.71K</span>-->
                  <!--<span class="like"><Icon type="android-favorite"></Icon> 99</span>-->
                </div>
              </div>
              <div class="excerpt hzline3 c2" style="word-break: break-all;display: -webkit-box;-webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">{{item.remark}}</div>
            </article>
          </article>

          <div class="ias-noneleft b m-b10" v-if="loading">内容加载中,请耐心等待...</div>
          <div class="ias-noneleft b m-b10" v-if="!loading && params.limit == dataOptions.total">已经加载到天涯海角了！</div>
          <div class="ias-noneleft b m-b10" v-if="!loading && dataOptions.rows && dataOptions.rows.length == 0 && params.keyWord != ''">没有搜索结果</div>
          <div class="ias-noneleft b m-b10" v-if="!loading && dataOptions.rows && dataOptions.rows.length == 0 && params.keyWord == ''">暂时没有相关活动 <a @click="routePush('/initiatingActivity')">去发布</a></div>
          <div class="ias-noneleft b m-b10 cursor-p"  v-if="!loading && params.limit < dataOptions.total" @click="loadMore">点击加载更多</div>
        </div>
        <div class="sidebar fr">
          <div class="sticky box triangle b m-b10">
            <div class="sidebar_title"><h3>热门活动</h3></div>
            <ul class="hot-wrapper">
              <li v-for="item in dataTop" :key="item.id" @click="routePush('/activities',item.id,'category')">
                <article class="postlist">
                  <figure>
                    <img class="thumb" v-lazy="url + item.posterUrl"/>
                  </figure>
                  <h3 class="c2 td-render" :title="item.name">{{item.name}}</h3>
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

  export default {
    data () {
      return {
        url: process.env.NODE_ENV === 'production' ? '' : process.env.API,
        dataOptions: {},
        params: {
          status: '>0',
          limit: 5,
          keyWord: '',
          configId: ''
        },
        title: this.$route.query.category,
        configPid: '',
        dataTop: {},
        findTree: '',
        childrenTree: '',
        loading: true
      }
    },
    created () {
      setTimeout(() => {
        if (this.$route.query.keyWord) {
          this.params.keyWord = this.$route.query.keyWord
        }
        this.configPid = this.$route.query.pid
        this.activitysConfig()
        this.loadActivityTop()
      }, 20)
    },
    watch: {
      $route (to, from) {
          this.$nextTick(() => {
            this.configPid = this.$route.query.pid
            this.title = this.$route.query.category
            this.params.limit = 5
            this.params.keyWord = to.query.keyWord
            this.activitysConfig()
          })
      }
    },
    methods: {
      loadActivitys () {
        this.loading = true
        this.requestAjax('get', 'activitys', this.params).then((data) => {
          if (data.success) {
            this.dataOptions = data.data
          }
          this.loading = false
        })
      },
      loadActivityTop () {
        //  activityTopN
        this.requestAjax('get', 'activityTopN', {topN: 4}).then((data) => {
          if (data.success) {
            this.dataTop = data.data
          }
        })
      },
      loadMore () {
        if (this.params.limit == this.dataOptions.total) return
        this.params.limit = this.params.limit + 5
        if (this.params.limit > this.dataOptions.total) {
          this.params.limit = this.dataOptions.total
        }
        this.loadActivitys()
      },
      activitysConfig () {
        this.requestAjax('get', 'findTree', {}).then((data) => {
          // {title: '行业', radio: ['IT互联网', '创业', '科技', '金融','游戏','文娱','电商','教育','营销','设计','地产','医疗','服务业']},
          this.findTree = []
          if (data.success) {
            this.findTree = JSON.parse(data.data.rows).children
          }
          for (let i = 0; i < this.findTree.length; i++) {
            if (this.findTree[i].id == this.$route.query.pid) {
              this.childrenTree = this.findTree[i].children
            }
          }
          this.$nextTick(() => {
            this.loadActivitys()
          })
        }, () => {})
      },
      search (val) {
        this.params.limit = 5
        this.params.keyWord = val
        this.loadActivitys()
      }
    },
    components: {
      topHeader,
      iFooter
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

  .post_main {
    padding-left: 262px;
    overflow: hidden;
    line-height: 24px;
  }
  .post_main figure {
    margin-left: -262px;
    float: left;
  }
  figure a{
    display: block;
    overflow: hidden;
    position: relative;
  }
  figure a img.thumb:hover {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }
  .post_main img.thumb {
    width: 250px;
    height: 140px;
    overflow: hidden;
  }
  .post_main h2 {
    font-size: 14px;
    margin: 2px 0 4px;
  }
  .post_main h2 a {
    color: #333;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: block;
  }
  .postinfo {
    color: #999;
    margin: 2px 0 8px;
    overflow: hidden;
  }
  .postinfo>span, .postinfo>div>span {
    padding: 0 6px;
    position: relative;
    display: inline-block;
  }
  .postinfo .author {
    padding-left: 0;
  }
  .postinfo>div>span:before {
    position: absolute;
    content: '';
    width: 1px;
    height: 10px;
    background-color: #ddd;
    right: -1px;
    top: 7px;
  }
  .postinfo>div>span:nth-last-child(1):before{
    background-color: transparent;
  }
  .postinfo .author img {
    width: 18px;
    display: inline-block;
    vertical-align: middle;
    border-radius: 100%;
    margin-right: 6px;
  }
  .excerpt{
    text-align: justify;
  }
  .ias-noneleft {
    color: #999;
    text-align: center;
    font-size: 14px;
    padding: 7px 20px;
    border: 1px #f4f4f4 solid;
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

  .ivu-radio-wrapper{margin: 5px!important;}
  .ivu-radio-group-button .ivu-radio-wrapper:last-child,.ivu-radio-group-button.ivu-radio-group-small .ivu-radio-wrapper:first-child{border-radius:0;}

</style>
