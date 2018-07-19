<template>
  <div class="b wrapper-box">
    <h3 class="fz14">活动邀请</h3>
    <div class="content-wrapper m-t10 wrapper-border">
      <div class="fbox m-b10">
        <div class="flex invitelist-item wrapper-border">
          <div class="fbox">
            <div class="invitelist-wrapper">
              <img width="100%" height="100%" src="../../assets/spread.jpg">
            </div>
            <div class="info-wrapper flex c2">
                <div class="fbox l-h40">
                  <div class="flex">
                    <h4>活动二维码</h4>
                  </div>
                  <div class="flex t-right">
                    <a :href="url">下载活动二维码</a>
                  </div>
                </div>
               <div class="invitelist-tip">下载活动二维码，用户通过微信扫描二维码进入小程序报名</div>
            </div>
          </div>
        </div>
        <div  class="flex m-b10">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data () {
      return {
        loadImg: '../../assets/spread.jpg',
        row: '',
        url: ''
      }
    },
    created () {
      setTimeout(() => {
        this.initItem()
      }, 20)
    },
    methods: {
      initItem () {
        const _type = 'GET'
        const _params = {id: this.$route.query.id}
        const _url = 'activitys'
        this.requestAjax(_type, _url, _params).then((data) => {
          if (data.success) {
            this.row = data.data.rows[0]
            this.url = 'https://daas.coreware.cn:8443/gather' + data.data.rows[0].appUrlImg
          }
        })
      }
    }
  }
</script>

<style scoped>
  .invitelist-item{
    width: 100%;
  }
  .invitelist-wrapper{
    width: 130px;
    height: 130px;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .invitelist-item .info-wrapper{
    padding: 10px;
    line-height: 20px;
  }
  .invitelist-tip{
    margin-top: 5px;
    width: 60%;
  }

</style>
