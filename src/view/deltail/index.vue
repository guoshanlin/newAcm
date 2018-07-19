<template>
  <div class="wechat" id="wechat">
    <div v-html="content"></div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        id: this.$route.query.id,
        content: ''
      }
    },
    created() {
      setTimeout(() => {
        this.requestActivityInfo()
      }, 20)
    },
    methods: {
      requestActivityInfo() {
        console.log(this.id)
        this.requestAjax('get', 'activitys', {
          id: this.id
        }).then(res => {
          console.log(JSON.stringify(res))
          if (res.success && res.data.rows.length > 0) {
            this.content = res.data.rows[0].content
            this.$nextTick(() => {
              this.bindAClick(document.querySelectorAll('#wechat img'))
            })
          }
        })
      },
      bindAClick (damo) {
        if (damo != null && damo.length !== 0) {
          for (let i = 0; i < damo.length; i++) {
            let item = damo[i]
            // item.crossOrigin = 'Anonymous'
            if (item.src.indexOf('files/xheditor') != -1) {
              item.style.width = "auto"
              item.src = process.env.NODE_ENV === 'production' ? process.env.API + 'files' + item.src.split('files')[1] : 'https://daas.coreware.cn:8443/gather/' + 'files' + item.src.split('files')[1]
            }
          }
        }
      }
    }
  }
</script>

<style>
  .wechat {
    max-width: 650px;
    margin: 0 auto;
    padding: 10px;
    background: #fff;
  }

  .wechat img {
    max-width: 100%;
  }
</style>
