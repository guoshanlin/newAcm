<template>
  <div class="meeting-deltail">
    <!--<div class="copy">-->
      <!--<i-button @click="copy" type="primary">生成活动图片</i-button>-->
    <!--</div>-->
    <div id="deltail">
      <datails-item :id='id' :showObj='showModal' ref="datails"></datails-item>
      <!--<div class="wrapper b wrapper-box">-->
        <!--<div class="datails-item">-->
          <!--<datails-item :row='data' :button="buttonName"></datails-item>-->
        <!--</div>-->
        <!--<div class="datails-item m-t10">-->
          <!--<div class="fbox">-->
            <!--<div class="datails-flex-item t-right"><h3>活动分类:</h3></div>-->
            <!--<div class="flex t-left">-->
              <!--<div>{{data.style}}</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="datails-item m-t10">-->
          <!--<div class="fbox">-->
            <!--<div class="datails-flex-item t-right"><h3>票种:</h3></div>-->
            <!--<div class="flex t-left">-->
              <!--<div v-if="data.isNeedPay == 0">免费</div>-->
              <!--<div v-if="data.isNeedPay == 1">&nbsp;<span class="span-title">非会员价:</span>&nbsp;{{data.nonMBPrice}}元&nbsp;&nbsp;&nbsp;<span class="span-title">会员价:</span>&nbsp;{{data.mbPrice}}元</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="datails-item m-t10">-->
          <!--<div class="fbox">-->
            <!--<div class="datails-flex-item t-right"><h3>活动标签:</h3></div>-->
            <!--<div class="flex t-left">-->
              <!--<Tag v-if="data.label != ''" color="blue" v-for="item in label" :key="item">{{item}}</Tag>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="datails-item m-t10">-->
          <!--<div class="fbox">-->
            <!--<div class="datails-flex-item t-right"><h3>活动摘要:</h3></div>-->
            <!--<div class="flex t-left">-->
              <!--<div>-->
                <!--<pre v-html = 'data.remark'></pre>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="datails-item m-t10">-->
          <!--<div class="fbox">-->
            <!--<div class="datails-flex-item t-right"><h3>活动议程:</h3></div>-->
            <!--<div class="flex t-left">-->
              <!--<div>-->
                <!--<pre v-html = 'data.agenda'></pre>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="datails-item m-t10">-->
          <!--<div class="fbox">-->
            <!--<div class="datails-flex-item t-right"><h3>详细内容:</h3></div>-->
            <!--<div class="flex t-left">-->
              <!--<div id="content">-->
                <!--<pre v-html = 'data.content'></pre>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <Modal
      v-model="setImg"
      title="设置生成图片模块"
      :mask-closable="false"
      @on-ok="ok"
      @on-cancel="cancel" :width="400">
      <div class="t-center">
        <div class="t-left in-line">
          <div  v-for="(item, index) in checkboxArr" :key="index">
            <Checkbox v-model="showModal[item.id]" @on-change="checkedChange" :disabled="item.disabled"><span class="in-line" style="width: 70px;">{{item.name}}</span>&nbsp;&nbsp; 宽x高:({{modalSpec[item.id]}})</Checkbox>
          </div>
        </div>
        <div class="m-t15 t-left p-10">
           备注：宽高都缩小了80%,当按钮为禁用状态时，说明生成图片大小超限制，无法生成图片，建议移除宽高较大模块。
          <!--<Icon type="android-notifications c4"></Icon> <span class="c4">{{msg}}</span>-->
        </div>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="cancel">取消</Button>
        <Button type="primary" @click="ok" :disabled="disabled">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  // import datailsItem from 'components/datails-item/index'
  import datailsItem from 'components/active-deltail/active-deltail'
  import html2canvas from 'html2canvas'

  export default {
    name: 'index',
    data () {
      return {
        data: {},
        label: [],
        buttonName: '',
        buttonType: '',
        showModal: {
          poster: true,
          abstract: true,
          agenda: true,
          deltails: true,
          promoCode: true
        },
        checkboxArr: [
          {id: 'poster', name: '海报'},
          {id: 'abstract', name: '活动摘要', disabled: true},
          {id: 'agenda', name: '活动议程', disabled: true},
          {id: 'deltails', name: '活动详情'},
          {id: 'promoCode', name: '活动二维码', disabled: true}
        ],
        disabled: true,
        setImg: false,
        msg: '',
        modalSpec: '',
        timer: {}
      }
    },
    components: {
      datailsItem
    },
    props: {
      id: '',
      type: ''
    },
    methods: {
      /**
       * 提交表单
       * @param url
       * @param obj
       */
      initItem () {
        const _type = 'GET'
        const _params = {id: this.id}
        const _url = 'activitys'
        this.requestAjax(_type, _url, _params).then((data) => {
          if (data.success) {
            this.data = data.data.rows[0]
            this.label = this.data.label.split(',')
            // this.$nextTick(() => {
            //   this.bindAClick(document.querySelectorAll('#content img'))
            // })
          }
        })
      },
      setImgMadal () {
        this.setImg = true
         this.modalSpec = this.$refs.datails.getDamoHeight()
         this.getcCanvas(true)
      },
      copy () {
        let _this = this
        html2canvas(document.getElementById('deltail'), {useCORS: true, scale: 0.8}).then((canvas) => {
          console.log(canvas)
          _this.showModal = {poster: true, abstract: true, agenda: true, deltails: true, promoCode: true}
          let imgUri = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
            let _save = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
            _save.href = imgUri
            _save.download = this.id + '.png'
            let event = document.createEvent('MouseEvents')
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
            _save.dispatchEvent(event)
        })
       },
      getcCanvas (val) {
        let damo = document.getElementById('deltail')
        if ((damo.clientWidth * damo.clientHeight * 0.8 * 0.8) < (656 * 3000)) {
          this.msg = ''
          this.disabled = false
        } else {
          if (val) {
            this.msg = '所有模块生成图片大小超限制，无法生成图片，建议移除较长的详细内容模块'
            // this.$Message.error('所有模块生成图片大小超限制，建议移除较长的详细内容模块')
          } else {
            this.msg = '选择的模块使生成总图片大小超限制，无法生成图片，请重新选择'
            // this.$Message.error('选择的模块使生成总图片大小超限制，无法生成图片，请重新选择')
          }
        }
      },
      bindAClick (damo) {
        if (damo != null && damo.length !== 0) {
          for (let i = 0; i < damo.length; i++) {
            let item = damo[i]
            // item.crossOrigin = 'Anonymous'
            if (item.src.indexOf('files/xheditor') != -1) {
              item.src = process.env.NODE_ENV === 'production' ? process.env.API + 'files' + item.src.split('files')[1] : 'https://daas.coreware.cn:8443/gather/' + 'files' + item.src.split('files')[1]
            }
          }
        }
      },
      ok () {
        this.setImg = false
        this.copy()
      },
      cancel () {
        this.showModal = {poster: true, abstract: true, agenda: true, deltails: true, promoCode: true}
        this.setImg = false
        this.$Message.info('点击了取消')
      },
      checkedChange () {
        if (this.showModal.deltails) {
          this.$refs.datails.initImg()
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.getcCanvas()
        }, 0.7 * 1000)
      }
    },
    beforeCreate () {
      this.$nextTick(() => {
        // this.initItem()
      })
    }
  }
</script>

<style scoped>
  .wrapper{margin: 10px}
  .datails-flex-item { display: inline-block; width: 100px; margin-right: 10px}
  .span-title{ font-weight: bold}
  .meeting-deltail{position: relative}
  .meeting-deltail .copy{position: absolute;top: 20px; right: 30px; z-index: 999}
  .datails-item{position: relative; border: 1px solid #e3e2e5; padding: 10px; border-radius: 5px; line-height: 26px;}
   pre {
    white-space: pre-wrap; /*css-3*/
    white-space: -moz-pre-wrap; /*Mozilla,since1999*/
    white-space: -pre-wrap; /*Opera4-6*/
    white-space: -o-pre-wrap; /*Opera7*/
    word-wrap: break-word; /*InternetExplorer5.5+*/
  }
  pre img{max-width: 80%;}
  #deltail {
    padding: 5px;
  }
</style>
