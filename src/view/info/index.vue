<template>
  <div class="b wrapper-box">
    <h3 class="fz14">活动信息</h3>
    <!--<Menu mode="horizontal" :active-name="activeName" @on-select="menuSelect">-->
      <!--<MenuItem name="1">基本信息</MenuItem>-->
      <!--&lt;!&ndash;<MenuItem name="2">活动议程</MenuItem>&ndash;&gt;-->
      <!--<MenuItem name="3">周边信息</MenuItem>-->
    <!--</Menu>-->
    <div class="content-wrapper m-t20">
      <div class="fbox">
        <div class="flex m-r10">
          <div class="wrapper-box">
            <!--<h3 class="fz14">基本信息</h3>-->
            <div class="box triangle b m-b10" style="margin:0 5px; padding: 10px;">
              <div class="fbox">
                <div class="flex"><h3 class="fz14 l-h30">基本信息</h3></div>
                <div class="t-left">
                  <!--<i-button @click="copy" type="primary">复制活动链接</i-button>-->
                  <i-button @click="html2canvas" type="primary">生成活动图片</i-button>
                </div>
              </div>
            </div>
            <active-deltail :id="rowId" type="info" ref="activeItem"></active-deltail>
          </div>

          <!--<div id="link" style="opacity:0;">https://daas.coreware.cn:8443/gather/deltail?id={{rowId}}</div>-->
        </div>
        <div class="sidebar">
            <div class="sticky box triangle b m-b10">
              <div class="sidebar_title"><h3>周边热门</h3></div>
              <ul class="hot-wrapper">
                <li v-for="item in dataTop" :key="item.id" @click="routePush('/activities',item.id,'category')">
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
  </div>
</template>

<script>
  import activeDeltail from 'components/active-deltail/meeting-deltail'
  export default {
    name: "index",
    data () {
      return {
       activeName: 1,
        rowId: this.$route.query.id,
        dataTop: '',
        url: process.env.NODE_ENV === 'production' ? '' : process.env.API,
        isCopy: false
      }
    },
    created () {
      setTimeout(() => {
        this.loadActivityTop()
      }, 20)
    },
    components: {
      activeDeltail
    },
    methods: {
      menuSelect (name) {
        this.activeName = name
        this.$Message.warning(name)
      },
      loadActivityTop () {
        //  activityTopN
        this.requestAjax('get', 'activityTopN', {topN: 4}).then((data) => {
          if (data.success) {
            this.dataTop = data.data
          }
        })
      },
      copy () {
          let range = document.createRange()
          range.selectNode(document.getElementById('link'))
          let selection = window.getSelection()
          if (selection.rangeCount > 0) selection.removeAllRanges()
          selection.addRange(range)
          document.execCommand('copy')
      },
      html2canvas () {
        this.$refs.activeItem.setImgMadal()
      }
    }
  }
</script>

<style scoped>
  .sidebar{
    width: 390px;
    /*padding-left: 10px*/
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
</style>
