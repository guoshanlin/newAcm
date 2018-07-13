<template>
  <div class="fbox">
    <div class="pic-wrapper">
      <img width="100%" height="100%" v-lazy="loadImg">
      <span class="tips b1 c">{{getActiveStatus(row.status)}}</span>
    </div>
    <div class="info-wrapper flex c2">
      <h3 class="fz13">{{row.name}}&nbsp;&nbsp;<a class="fz14" @click="clickItem"> 查看详情</a></h3>
      <Button class="manage-btn" v-if="row.status == 0" type="primary" @click="exmine">{{button}}</Button>
      <div class="fbox">
      <!--  <div class="flex">
          <div class="">状态：<span class="b2 c3 meeting-version">{{getActiveStatus(row.status)}}</span> </div>
        </div>-->
        <div class="flex">
          <div class="">发布时间：{{formatterObjTime(row.createTime)}}</div>
        </div>
      </div>
      <div class="fbox">
        <div class="flex">
          <div>报名时间：{{formatterObjTime(row.applyBeginTime)}} ~ {{formatterObjTime(row.applyEndTime)}}</div>
        </div>
        <div class="flex">
          <Icon type="person"></Icon>
          发布者：{{row.memberNickName}}
        </div>
      </div>
      <div class="fbox">
        <div class="flex">
          <div>活动时间：{{formatterObjTime(row.beginTime)}} ~ {{formatterObjTime(row.endTime)}}</div>
        </div>
        <div class="flex">
          <Icon type="ios-location"></Icon>
          {{row.city1 + row.city2 + row.city3 +row.address}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        loadImg: process.env.NODE_ENV === 'production' ? this.row.posterUrl : process.env.API + this.row.posterUrl
      }
    },
    props: {
      row: '',
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
/*  .manage-btn {
    position: absolute;
    top: 23px;
    right: 30px;
  }*/

  .pic-wrapper {
    width: 130px;
    height: 130px;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .pic-wrapper .tips {
    position: absolute;
    top: 0;
    right: 0;
    padding: 3px 10px;
    border-radius: 0 4px 0 4px;
  }

  .info-wrapper {
    padding: 10px 20px;
    line-height: 28px;
  }

.manage-btn{
  position: absolute;
  top: 23px;
  right: 30px;
}

  .meeting-version {
    padding: 2px 8px;
    border-radius: 3px;
    margin-left: 8px
  }
</style>
