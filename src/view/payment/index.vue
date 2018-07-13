<template>
  <div class="wrapper b wrapper-box">
    <div style="position: relative">
      <Row type="flex" justify="end" class="search-wrapper">
        <i-col>
          <i-input class="width-letf" placeholder="请输入活动名称" v-model="keyWord"></i-input>
        </i-col>
        <i-col>
          <Button type="primary" class="m-r15 m-l5" icon="ios-search" @click="searchDriver">搜索</Button>
        </i-col>
      </Row>
      <Menu mode="horizontal" active-name="1" @on-select="menuSelect" class="menu-tab">
        <MenuItem name="1">待审批</MenuItem>
        <MenuItem name="2">已通过</MenuItem>
        <MenuItem name="3">未通过</MenuItem>
      </Menu>
      <div class="list-wrapper">
        <ul class="list">
          <li class="list-item" v-for="item in data" :key="item.id">
            <div class="fbox">
              <div class="flex">
                <h3 class="fz13">订单号：{{item.id}}&nbsp;&nbsp;</h3>
                <div class="fbox">
                  <div class="flex">
                    <div class="">申请人：{{item.memberName}}</div>
                  </div>
                  <div class="flex">
                    <div class="">申请时间：{{formatterObjTime(item.createTime)}}</div>
                  </div>
                  <div class="flex">
                    <div class="">状态：{{formatterStatus(item.status)}}</div>
                  </div>
                </div>
                <div class="fbox">
                  <div class="flex">
                    <div>提现金额：{{toDecimal2(item.optAmounts)}} 元</div>
                  </div>
                  <div class="flex">
                    <div>账户总金额：{{toDecimal2(item.balance)}} 元</div>
                  </div>
                  <div class="flex">
                    <div>耗时：{{formatterObjTime(item.applyBeginTime)}}</div>
                  </div>
                </div>
              </div>
              <div v-if="item.status == 1">
                <i-button type="primary" class="m-t10" @click="exmine(item)">审批</i-button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!--分页-->
      <div style="text-align: right; padding-top: 5px;">
        <Page show-total show-sizer show-elevator style="display: inline-block;" placement="top"
              :total="total"
              :page-size="parms.limit"
              :current="parms.offset"
              @on-change="changePage"
              @on-page-size-change="changeSize"></Page>
      </div>
      <!--新增表单承载标签-->
      <input-from v-if="inputForm.show" @changeOptions="getExmineVal" :options="inputForm.option"
                  :value="inputForm.value" :modalDisabled="inputForm.modalDisabled"
                  :modalshow="inputForm.modalshow"/>
    </div>
  </div>
</template>

<script>
  import inputFrom from 'components/modal/inputFrom.vue'
  import {mapGetters} from 'vuex'

  export default {
    name: 'index',
    data() {
      return {
        keyWord: '',
        data: [],
        total: 0,
        parms: {
          /*  sort: 'createTime',*/
          optType: 1,
          status: 1,
          limit: 20,
          offset: 1
        },
        inputForm: {
          show: false,
          modalDisabled: false,
          modalshow: false,
          option: {
            title: '审批',
            width: '512',
            opintions: [
              [
                {
                  title: '审批结果',
                  id: 'status',
                  type: 'radio',
                  titlespan: 5,
                  colspan: 19,
                  required: true
                }
              ],
              [
                {
                  title: '审批意见',
                  id: 'review',
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
            status: '2',
            review: ''
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'userData'
      ])
    },
    components: {
      inputFrom
    },
    methods: {
      /**
       *跳页
       * @param v
       */
      changePage (v) {
        this.parms.offset = v
        this.initItem()
      },
      /**
       *改变页面展示用户条数
       * @param v
       */
      changeSize(v) {
        this.parms.limit = v
        this.initItem()
      },
      /**
       * 切换tab
       * @param name
       */
      menuSelect(name) {
        if (this.parms.status != name) {
          this.parms.status = name
          this.initItem()
        }
      },
      searchDriver() {
        this.parms.keyWord = this.keyWord
        this.parms.limit = 20
        this.parms.offset = 1
        this.initItem()
      },
      formatterStatus (val) {
        console.log(val)
        switch (val + '') {
          case '1':
            return '待审批'
          case '2':
            return '已通过'
          case '3':
            return '未通过'
          default:
        }
      },
      /**
       * 审核
       * @param row
       */
      exmine (row) {
        this.inputForm.modalshow = true
        this.inputForm.show = true
        this.inputForm.modalDisabled = false
        this.inputForm.value.id = row.id
      },

      getExmineVal(val, type) {
        this.inputForm.value = val // 表单填写的内容;
        if (type === 'cancel') { // 按钮操作
          this.inputForm.modalshow = false // 隐藏modal
          return
        }
        let newVal = {}
        Object.assign(newVal, val)
        this.inputForm.modalDisabled = true
        this.submitAjax('examination', newVal, '审批')
      },
      /**
       * 提交表单
       * @param url
       * @param obj
       */
      submitAjax(url, obj, msg) {
        this.requestAjax('post', url, obj).then((data) => {
          if (data.success) {
            this.$Message.success(msg + '成功')
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

      /**
       * 加载活动
       */
      initItem() {
        const _type = 'GET'
        const _params = this.parms
        const _url = 'balance'
        this.requestAjax(_type, _url, _params).then((data) => {
          if (data.success) {
            this.total = !isNaN(+data.data.total) ? +data.data.total : 0
            this.data = data.data.rows
          } else {
            this.data = []
          }
        })
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.initItem()
        document.querySelector('.ivu-page-options-elevator').title = '输入后回车跳至指定页'
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          this.initItem()
        }, 60 * 1000)
      })
    },
    destroyed () {
      window.onresize = function () {}
      clearInterval(this.timer)
    }
  }
</script>

<style scoped>
  .wrapper {
    margin: 10px
  }

  .search-wrapper {
    position: absolute;
    top: 10px;
    right: 0px;
    z-index: 901;
  }

  .list-wrapper {
    margin: 10px 0;
  }

  .list-item {
    position: relative;
    border: 1px solid #e3e2e5;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
  }
</style>
