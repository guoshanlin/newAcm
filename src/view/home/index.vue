<template>

  <div>
    <div class="wrapper">
      <div class="fbox m-t10">
        <section class="bulletin_title">
          <Icon type="android-notifications" style="vertical-align: middle"></Icon>
          <span class="fz14 c">公告</span>
        </section>
        <swiper class="notice flex" :options="noticeOption" v-if='option[1].rows.length> 0'>
          <swiper-slide  v-for="item in option[1].rows" :key="item.id">
            <div class="hzline1"><a class="c2" href="javascript:void(0)" @click="routePush('/activities',item.id,'home')">最新发布活动：{{item.name}} </a></div></swiper-slide>
        </swiper>
        <div class="fz20 notice-btn-wrapper">
          <a class="notice-prev" href="javascript:void(0)"><Icon type="android-arrow-dropleft-circle"></Icon></a>
          <a class="notice-next" href="javascript:void(0)"><Icon type="android-arrow-dropright-circle"></Icon></a>
        </div>
      </div>
      <div class="slides-sticky m-t10  clear">
        <div class="slider b">
          <swiper :options="swiperOption" v-if='rowSwiper.length> 0'>
            <swiper-slide v-for="(item, index) in rowSwiper" :key="index"><img width='100%' height='100%' :src="item.url" @click="routePush('/activities',item.id,'home')"></swiper-slide>
            <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
            <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
            <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
          </swiper>
        </div>

        <div class="sticky box triangle b">
          <ul>
            <li v-for="item in dataTop" :key="item.id">
              <article class="postlist cursor-p">
                <figure>
                  <img class="thumb" v-lazy="url + item.posterUrl" @click="routePush('/activities',item.id,'home')" />
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
          <a class="more c3" href="javascript:void(0)" title="查看更多置顶推荐的活动" @click="routePush('/category')"><span>更多热度榜活动</span>
            <Icon class="fr" type="chevron-right"></Icon>
          </a>
        </div>
      </div>

      <div class="category-wrapper box m-t10 triangle b" v-for="item in option" v-if="item.rows.length > 0" :key="item.title">
        <section class="home_title clear">
          <h3 class="fl">{{item.title}}</h3>
          <section class="title-tag fr">
            <a href="javascript:void(0)" class="home_button c3" title="查看更多" @click="routePush('/category')">
              <Icon type="ios-more"></Icon>
            </a>
          </section>
        </section>
        <section class="post_list post_bottom">
          <ul class="layout_ul">
            <li class="layout_li" v-for="row in item.rows" :key="row.id">
              <article class="postgrid">
                <figure class="t-center">
                  <a href="javascript:void(0)" @click="routePush('/activities',row.id,'home')">
                  <img class="thumb" v-lazy="url + row.posterUrl"></a>
                </figure>
                <div class="home-content">
                  <h2 class="fz16 c2 hzline1">{{row.name}}</h2>
                  <div class="homeinfo c3">
                    <span class="category">  <Icon type="person"></Icon> {{row.memberNickName}}</span>
                  </div>
                  <div class="homeinfo c3 m-t10">
                    <span class="date"><Icon type="clock"></Icon> {{formatterObjTime(row.beginTime,'yyyy-MM-dd')}}</span>
                  </div>
                  <div class="homeinfo c3 m-t10 category td-render" :title="row.city1 + row.city2 + row.city3 +row.address">
                    <Icon type="ios-location"></Icon> {{row.city1 + row.city2 + row.city3 +row.address}}
                  </div>
                </div>
              </article>
            </li>
          </ul>
        </section>
      </div>
    </div>

  </div>

</template>

<script>

  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'

  export default {
    data () {
      return {
        noticeOption: {
          direction: 'vertical',
          slidesPerView: 1,
          mousewheel: true,
          height: 34,
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          navigation: {
            nextEl: '.notice-next',
            prevEl: '.notice-prev'
          }
        },
        swiperOption: {
          slidesPerView: 1,
          speed: 400,
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        url: process.env.NODE_ENV === 'production' ? '' : process.env.API,
        option: [
          {
            title: '推荐活动',
            rows: []
          },
          {
            title: '最新活动',
            rows: []
          }
        ],
        rowSwiper: [],
        dataTop: [],
        timer: {}
      }
    },
    destroyed () {
      window.onresize = function () {
      }
      clearInterval(this.timer)
    },
    created () {
      setTimeout(() => {
        this.loadActivity()
        this.loadActivityTop()
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          this.loadActivity()
          this.loadActivityTop()
        }, 60 * 1000)
      }, 20)
    },
    methods: {
      loadImportance () {
        this.requestAjax('get', 'activitys', {importance:1}).then((data) => {
          this.option[0].rows = data.data.rows
          this.option[1].rows = data.data.rows
        })
      },
      loadActivity () {
        let arr = ['1', '2', '']
        for (let i = 0; i < 3; i++) {
        //  this.requestAjax('get', 'activitys', {importance: arr[i], status: '1,2',limit: 8}).then((data) => {
          this.requestAjax('get', 'activitys', {importance: arr[i], status: '>0',limit: 8}).then((data) => {
            if (data.success) {
              if (i == 0) {
                this.rowSwiper = []
                for (let n = 0; n < data.data.rows.length; n++) {
                  if (n < 5) {
                    this.rowSwiper.push({id: data.data.rows[n].id, url: this.url + data.data.rows[n].posterUrl, name: data.data.rows[n].name})
                  }
                }
              }
              if (i > 0) {
                this.option[i - 1].rows = data.data.rows
              }
            }
          })
        }
      },
      loadActivityTop () {
      //  activityTopN
        this.requestAjax('get', 'activityTopN', {topN: 4}).then((data) => {
          if (data.success) {
            this.dataTop = data.data
          }
        })
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style scoped>

  .wrapper {
    width: 1200px;
    margin: 0 auto;
  }

  .slider {
    float: left;
    width: 800px;
    height: 450px;
  }

  .bulletin_title {
    width: 80px;
    height: 34px;
    background-color: #222;
    color: #f2e6d8;
    text-align: center;
    font-size: 14px;
    padding: 4.5px;
    position: relative;
    margin-right: 20px;
  }
  .bulletin_title:before {
    content: '';
    height: 0;
    width: 0;
    display: block;
    border: 12px transparent solid;
    border-right-width: 0;
    border-left-color: #222;
    position: absolute;
    top: 5px;
    right: -12px;
    -webkit-transform: scaleY(1.45);
    transform: scaleY(1.45);
  }
  .notice{
    height: 34px;
    line-height: 34px;
    overflow: hidden;
  }
  .notice-btn-wrapper{margin-left: 10px}
  .notice-btn-wrapper a{
    color: #b3b3b3;
  }
  .notice-btn-wrapper a:hover{
    color: #333;
  }
  .notice .swiper-slide{
    height: 50px;
  }

  .slides-sticky .swiper-slide {
    width: 800px;
    height: 450px;
    background-position: center;
    background-size: cover;
  }
  .swiper-button-prev, .swiper-button-next{
    height: 25px!important;
  }

  .swiper-pagination-white .swiper-pagination-bullet-active{
    background: #e1244e!important;
  }
  .swiper-pagination-bullet{
    background: #fff!important;
    opacity: 0.5!important;
  }

  .sticky {
    float: right;
    width: 390px;
    height: 450px;
    position: relative;
  }

  .postlist {
    overflow: hidden;
    padding: 0 0 20px 136px;
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

  .sticky a.more {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    display: block;
    background-color: #fbfbfb;
    border-top: 1px #f4f4f4 solid;
    padding: 12px 20px;
  }

  .home_title {
    background-color: #fdfdfd;
    margin: -20px -20px 20px;
    padding: 12px 12px 12px 20px;
    border-bottom: 1px #f2f2f2 solid;
    height: 48px;
  }

  .title-tag ul {
    display: inline-block;
  }

  .title-tag ul li {
    display: inline-block;
  }

  .title-tag ul li a {
    display: block;
    color: #999;
    padding: 2px 8px;
  }
  .title-tag ul li a:hover{
    color: #e1244e;
  }

  .title-tag .home_button {
    color: #ccc;
    font-size: 16px;
    margin-left: 8px;
    padding-left: 12px;
    padding-right: 2px;
    border-left: 1px #eee solid;
  }

  .post_list ul {
    margin-right: -20px;
  }
  .post_list ul li {
    width: 25%;
    font-size: 12px;
    display: inline-block;
    vertical-align: top;
  }
  .post_bottom ul li:nth-last-child(-n+4) .postgrid {
    margin-bottom: 0;
  }
  .postgrid {
    margin: 0 20px 20px 0;
    overflow: hidden;
  }
  figure a {
    display: block;
    overflow: hidden;
    position: relative;
  }

  figure a img{
    /*max-width: 100%;*/
    width: 100%;
    /*height: auto;*/
    height: 160px;
    display: block;
    opacity: 1!important;
  }
  figure a img:hover{
    transform: scale(1.3);
  }
  .postgrid h2{font-weight: 500;margin: 8px 0 4px;}
  .postgrid h2 a {
    color: #333;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: block;
  }
.home-content {
  border: 1px solid #eeeeee;
  border-top:  0px;
  width: 100%;
  height: 125px;
  padding: 5px;
}
</style>
