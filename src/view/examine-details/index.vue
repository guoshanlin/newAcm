<template>
  <div class="m-l15 m-r15 m-t15">
    <!--<div>-->
      <!--<i-button @click="copy">复制</i-button>-->
    <!--</div>-->
    <!--<div id="copy">-->
    <div class="box triangle b m-b10" style="padding: 10px;">
      <div class="fbox">
        <div class="flex"><h3 class="fz14 l-h30">活动详情</h3></div>
        <div class="t-left">
          <i-button v-if="status == '0'" @click="exmine" type="primary">审核</i-button>
        </div>
      </div>
    </div>
    <datails-item :id='rowId' ref="datails" @change="statusChange"></datails-item>
    <input-from v-if="inputForm.show" @changeOptions="getExmineVal" :options="inputForm.option" :value="inputForm.value" :modalDisabled="inputForm.modalDisabled" :modalshow="inputForm.modalshow"/>
    <!--</div>-->
  </div>
</template>

<script>
  // import activeDeltail from 'components/active-deltail/index'
  import datailsItem from 'components/active-deltail/active-deltail'
  import inputFrom from 'components/modal/inputFrom.vue'

  export default {
    name: 'index',
    data () {
      return {
        rowId: this.$route.query.id,
        row: '',
        status: '',
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
      // activeDeltail
      datailsItem,
      inputFrom
    },
    methods: {
      copy () {
          let range = document.createRange()
          range.selectNode(document.getElementById('copy'))
          let selection = window.getSelection()
          if (selection.rangeCount > 0) selection.removeAllRanges()
          selection.addRange(range)
          document.execCommand('copy')
          alert('复制成功！')
      },
      initItem () {
        const _type = 'GET'
        const _params = {id: this.$route.query.id}
        const _url = 'activitys'
        this.requestAjax(_type, _url, _params).then((data) => {
          if (data.success) {
            this.row = data.data.rows[0]
          }
        })
      },
      exmine () {
        if (this.buttonType == 'info') {
          this.submitAjax('activitys', {id: this.rowId, status: 3}, '取消')
          return
        }
        this.inputForm.modalshow = true
        this.inputForm.show = true
        this.inputForm.modalDisabled = false
        this.inputForm.value.id = this.rowId
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
            // this.initItem()
            this.$refs.datails.refresh()
          } else {
            this.$Message.success(msg + '失败')
          }
          this.inputForm.modalDisabled = false
        }, (err) => {
          this.$Message.success(msg + '失败')
          this.inputForm.modalDisabled = false
        })
      },
      statusChange (sta) {
        this.status = sta
      }
    },
    mounted () {
      this.$nextTick(() => {
        // this.initItem()
      })
    }
  }
</script>

<style scoped>

</style>
