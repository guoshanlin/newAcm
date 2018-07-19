<template>
  <!--<div>-->
    <!--<div class="copy">-->
      <!--<i-button @click="copy" type="primary">生成活动图片并下载</i-button>-->
    <!--</div>-->
    <!--&lt;!&ndash;<div id="img"></div>&ndash;&gt;-->
    <!--<div id="deltail">-->
      <div class="wrapper b wrapper-box">
        <div class="datails-item">
          <datails-item :row='data' :button="buttonName"  @exmine="exmine"></datails-item>
        </div>
        <div class="datails-item m-t10">
          <div class="fbox">
            <div class="datails-flex-item t-right"><h3>活动分类:</h3></div>
            <div class="flex t-left">
              <div>{{data.style}}</div>
            </div>
          </div>
        </div>
        <div class="datails-item m-t10">
          <div class="fbox">
            <div class="datails-flex-item t-right"><h3>票种:</h3></div>
            <div class="flex t-left">
              <div v-if="data.isNeedPay == 0">免费</div>
              <div v-if="data.isNeedPay == 1">&nbsp;<span class="span-title">非会员价:</span>&nbsp;{{data.nonMBPrice}}元&nbsp;&nbsp;&nbsp;<span class="span-title">会员价:</span>&nbsp;{{data.mbPrice}}元</div>
            </div>
          </div>
        </div>
        <div class="datails-item m-t10">
          <div class="fbox">
            <div class="datails-flex-item t-right"><h3>活动标签:</h3></div>
            <div class="flex t-left">
              <Tag v-if="data.label != ''" color="blue" v-for="item in label" :key="item">{{item}}</Tag>
            </div>
          </div>
        </div>
        <div class="datails-item m-t10">
          <div class="fbox">
            <div class="datails-flex-item t-right"><h3>活动摘要:</h3></div>
            <div class="flex t-left">
              <div>
                <pre v-html = 'data.remark'></pre>
              </div>
            </div>
          </div>
        </div>
        <div class="datails-item m-t10">
          <div class="fbox">
            <div class="datails-flex-item t-right"><h3>活动议程:</h3></div>
            <div class="flex t-left">
              <div>
                <pre v-html = 'data.agenda'></pre>
              </div>
            </div>
          </div>
        </div>
        <div class="datails-item m-t10">
          <div class="fbox">
            <div class="datails-flex-item t-right"><h3>详细内容:</h3></div>
            <div class="flex t-left">
              <div id="content">
                <pre v-html = 'data.content'></pre>
              </div>
            </div>
          </div>
        </div>
        <!--新增表单承载标签-->
        <input-from v-if="inputForm.show" @changeOptions="getExmineVal" :options="inputForm.option" :value="inputForm.value" :modalDisabled="inputForm.modalDisabled" :modalshow="inputForm.modalshow"/>
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import datailsItem from 'components/datails-item/index'
  import inputFrom from 'components/modal/inputFrom.vue'
  // import html2canvas from 'html2canvas'
  export default {
    name: 'index',
    data () {
      return {
        src: '',
        data: {},
        label: [],
        buttonName: '',
        buttonType: 'examine',
        inputForm: {
          show: false,
          modalDisabled: false,
          modalshow: false,
          option: {
            title: '审核',
            width: '512',
            opintions: [
              [
                {
                  title: '审核结果',
                  id: 'checked',
                  type: 'radio',
                  titlespan: 5,
                  colspan: 19,
                  required: true
                }
              ],
              [
                {
                  title: '首页推广',
                  id: 'importance',
                  type: 'checkbox',
                  titlespan: 5,
                  colspan: 19,
                  required: true
                }
              ],
              [
                {
                  title: '审批意见',
                  id: 'reviewRemark',
                  type: 'textarea',
                  titlespan: 5,
                  colspan: 19,
                  required: false
                }
              ]
            ],
            button: [{
              type: 'primary',
              title: '确定',
              click: 'handle'
            }]
          },
          value: {
            checked: '1',
            importance: [],
            reviewRemark: ''
          }
        }
      }
    },
    components: {
      datailsItem,
      inputFrom
    },
    props: {
      id: '',
      type: ''
    },
    methods: {
      /**
       * 审核
       * @param row
       */
      exmine (row) {
        if (this.buttonType == 'info') {
          this.submitAjax('activitys', {id: row.id, status: 3}, '取消')
          return
        }
        this.inputForm.modalshow = true
        this.inputForm.show = true
        this.inputForm.modalDisabled = false
        this.inputForm.value.id = row.id
      },

      getExmineVal (val, type) {
        this.inputForm.value = val // 表单填写的内容;
        if (type === 'cancel') { // 按钮操作
          this.inputForm.modalshow = false // 隐藏modal
          return
        }
        let newVal = {}
        Object.assign(newVal, val)
        newVal.status = newVal.checked
        newVal.checked = null
        this.inputForm.modalDisabled = true
        this.submitAjax('activitys', newVal, '审核')
      },
      /**
       * 提交表单
       * @param url
       * @param obj
       */
      submitAjax (url, obj, msg) {
        const _type = 'POST'

        if (obj.importance.length == 0) {
          obj.importance = "0"
        } else {
          let importance = ["无", "精选", "推荐"], importanceList = []
          obj.importance.forEach((v, i) => {
            if (importance.indexOf(v) != -1) importanceList.push(importance.indexOf(v))
          })
          obj.importance = importanceList.join(",")
        }
        this.requestAjax(_type, url, obj).then((data) => {
          if (data.success) {
            this.$Message.success(msg + '成功')
            this.buttonName = ''
            this.buttonType = ''
            this.inputForm.modalshow = false
            this.initItem()
          } else {
            this.$Message.success(msg + '失败')
          }
          this.inputForm.modalDisabled = false
        }, (err) => {
          this.$Message.success(msg + '失败')
          this.inputForm.modalDisabled = false
        })
      },
      initItem () {
        const _type = 'GET'
        const _params = {id: this.id}
        const _url = 'activitys'
        this.requestAjax(_type, _url, _params).then((data) => {
          if (data.success) {
            this.data = data.data.rows[0]
            if (this.data.status == 1 && this.type == 'info') {
              this.buttonName = '取消'
              this.buttonType = 'info'
            } else if (this.type == 'examine' && this.data.status == 0) {
              this.buttonName = '审核'
              this.buttonType = 'examine'
            } else {
              this.buttonName = ''
              this.buttonType = ''
            }
            this.label = this.data.label.split(',')
            this.$nextTick(() => {
              console.log(document.querySelectorAll('#content img'))
              this.bindAClick(document.querySelectorAll('#content img'))
            })
          }
        })
      },
      copy () {
        // let range = document.createRange()
        // range.selectNode(document.getElementById('deltail'))
        // let selection = window.getSelection()
        // if (selection.rangeCount > 0) selection.removeAllRanges()
        // selection.addRange(range)
        // document.execCommand('copy')
      },
      bindAClick (damo) {
        if (damo != null && damo.length !== 0) {
            for (let i = 0; i < damo.length; i++) {
              let item = damo[i]
              if (item.src.indexOf('files/xheditor') != -1) {
                item.src = process.env.NODE_ENV === 'production' ? process.env.API + 'files' + item.src.split('files')[1] : 'https://www.juniwota.com/gather/' + 'files' + item.src.split('files')[1]
              }
            }
        }
      }
    },
    beforeCreate () {
      this.$nextTick(() => {
        this.initItem()
      })
    }
  }
</script>

<style scoped>
  .wrapper{margin: 10px}
  .datails-flex-item { display: inline-block; width: 100px; margin-right: 10px}
  .span-title{ font-weight: bold}
  .datails-item{position: relative; border: 1px solid #e3e2e5; padding: 10px; border-radius: 5px; line-height: 26px;}
  pre {
    white-space: pre-wrap; /*css-3*/
    white-space: -moz-pre-wrap; /*Mozilla,since1999*/
    white-space: -pre-wrap; /*Opera4-6*/
    white-space: -o-pre-wrap; /*Opera7*/
    word-wrap: break-word; /*InternetExplorer5.5+*/
  }
  pre img{max-width: 80%;}
</style>
