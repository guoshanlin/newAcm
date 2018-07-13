<template>
  <div class="fbox meeting-item">
    <div class="pic-wrapper">
      <img width="100%" height="100%" v-lazy="loadImg">
      <span class="tips b1 c">{{getActiveStatus(row.status)}}</span>
    </div>
    <div class="info-wrapper flex c2">
        <div class="fbox">
          <div class="flex">
              <h3 class="fz13">{{row.name}}</h3>
              <div class="fbox">
                <div class="flex">
                  <div>活动ID：{{row.id}} <span class="b2 c3 meeting-version">体验版</span></div>
                </div>
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
          <div>
            <Button type="primary" @click="routePush('/base/overview',row.id)">管理</Button>
            <br>
            <Button v-if='row.status == 1 && row.numberActual < row.number' class="m-t10" @click="cancel">取消</Button>
          </div>
        </div>
        <div class="fbox tools-wrapper">
          <div class="flex"><a class="c2" @click="routePush('/base/info',row.id)">
            <Icon type="ios-paper-outline c1"></Icon>
            基本信息</a></div>
          <div class="flex"><a class="c2" @click="routePush('/base/entrylist',row.id)">
            <Icon type="ios-paper-outline c1"></Icon>
            门票管理</a></div>
          <div class="flex"><a class="c2" @click="routePush('/base/invitelist',row.id)">
            <Icon type="ios-paper-outline c1"></Icon>
            活动邀请</a></div>
          <div class="flex"><a class="c2" @click="routePush('/base/userlist',row.id)">
            <Icon type="ios-paper-outline c1"></Icon>
            人员管理</a></div>
          <div class="flex"><a class="c2" @click="routePush('/base/orderlist',row.id)">
            <Icon type="ios-paper-outline c1"></Icon>
            订单管理</a></div>
          <div class="flex"><a class="c2" @click="routePush('/base/walllist',row.id)">
            <Icon type="ios-paper-outline c1"></Icon>
            微信互动</a></div>
          <div class="flex"><a class="c2" @click="routePush('/base/joinStatistics',row.id)">
            <Icon type="ios-paper-outline c1"></Icon>
            参会统计</a></div>
          <div class="flex"><a class="c2">
            <Icon type="ios-paper-outline c1"></Icon>
            复制活动</a></div>
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
      cancel () {
        this.requestAjax('post', 'activitys', {id: this.row.id, status: 3}).then((data) => {
          if (data.success) {
            this.$Message.success('取消成功')
            this.$emit('cancel')
          } else {
            this.$Message.success('取消失败')
          }
        }, () => {
          this.$Message.success('取消失败')
        })
      }
    }
  }
</script>

<style scoped>
  .meeting-item{
    width: 100%;
  }
/*  .manage-btn{
    position: absolute;
    top: 23px;
    right: 30px;
  }
  .manage-btn-c{
    position: absolute;
    top: 65px;
    right: 30px;
  }*/
  .pic-wrapper{
    width: 130px;
    height: 130px;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .pic-wrapper .tips{
    position: absolute;
    top: 0;
    right: 0;
    padding: 3px 10px;
    border-radius: 0 4px 0 4px;
  }
  .info-wrapper{
    padding: 10px;
    line-height: 20px;
  }
  .meeting-version{
    padding: 2px 8px;
    border-radius: 3px;
    margin-left: 8px
  }
  .tools-wrapper{
    border-top: 1px solid #e3e2e5;
    margin-top: 8px;
    padding-top: 5px;
  }

</style>
