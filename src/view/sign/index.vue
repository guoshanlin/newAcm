<template>
  <div class="b wrapper-box">
    <h3 class="fz14">签到管理</h3>
    <div class="content-wrapper m-t10 wrapper-border">
      <div class="fbox m-b10">
        <div class="flex sign-item wrapper-border">
          <div class="fbox">
            <div class="sign-wrapper">
              <img width="100%" height="100%" src="../../assets/sign.jpg">
            </div>
            <div class="info-wrapper flex c2">
              <div class="fbox l-h40">
                <div class="flex">
                  <h4>小程序扫码签到</h4>
                </div>
                <div class="flex t-right">
                  <a :href="url">下载签到二维码</a>
                </div>
              </div>
              <div class="sign-tip">下载签到二维码，张贴于活动现场<br>
                活动参与人通过小程序扫码签到二维码进行签到</div>
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
        loadImg: '',
        data: '',
        url: ''
      }
    },
    created () {
      setTimeout(() => {
        this.initItem()
      }, 20)
    },
    methods: {
      /**
       * 提交表单
       * @param url
       * @param obj
       */
      initItem () {
        this.requestAjax('GET', 'activitys', {id: this.$route.query.id}).then((data) => {
          if (data.success) {
            this.data = data.data.rows[0]
            this.url = 'https://daas.coreware.cn:8443/gather/files/down?path=' + this.data.signUrl
          }
        })
      }
    }
  }
</script>

<style scoped>
  .sign-item{
      width: 100%;
    }
  .sign-wrapper{
    width: 130px;
    height: 130px;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .sign-item .info-wrapper{
    padding: 10px;
    line-height: 20px;
  }
  .sign-tip{
    margin-top: 5px;
    width: 60%;
  }

</style>
