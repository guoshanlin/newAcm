<template>
  <div class="b wrapper-box ">
    <h3 class="fz14 flex">提现明细</h3>
    <div class="content-wrapper m-t20">
      <Form :model="formData">
        <Row type="flex" :gutter=5>
          <i-col span="16">
            <!--<Row type="flex" justify="start">-->
              <!--<i-col class="m-r10" style="line-height: 32px">-->
                <!--申请时间-->
              <!--</i-col>-->
              <!--<i-col>-->
                <!--<DatePicker class="m-l10" v-model="formData.time" type="datetimerange" format="yyyy-MM-dd" placeholder="请选择时间段" style="width: 240px"></DatePicker>-->
              <!--</i-col>-->
            <!--</Row>-->
          </i-col>
          <i-col span="8">
            <Row type="flex" justify="end">
              <i-col>
                <i-input class="width-letf" placeholder="请输入业务流水号" v-model="formData.keyWord"></i-input>
              </i-col>
              <i-col>
                <Button type="primary"  class="m-r15 m-l5" icon="ios-search" @click="searchDriver">搜索</Button>
              </i-col>
            </Row>
          </i-col>
        </Row>
        <!--<div class="m-t10">-->
          <!--<Row type="flex" justify="start">-->
            <!--<i-col class="m-r10" style="line-height: 24px">-->
              <!--交易状态-->
            <!--</i-col>-->
            <!--<i-col>-->
              <!--<RadioGroup v-model="formData.trading">-->
                <!--<Radio label="">不限</Radio>-->
                <!--<Radio label="0">处理中</Radio>-->
                <!--<Radio label="1">提现成功</Radio>-->
                <!--<Radio label="2">提现失败</Radio>-->
                <!--<Radio label="3">打款失败</Radio>-->
              <!--</RadioGroup>-->
            <!--</i-col>-->
          <!--</Row>-->
        <!--</div>-->
      </Form>
    </div>
    <div class="content-wrapper m-t10" style="min-height: 240px">
      <i-table :columns="columns" :data="data" border size="small" ref="table"></i-table>
    </div>
    <div class="content-wrapper m-t10">
      <div style="text-align: right; padding-top: 5px;">
        <Page show-total show-sizer show-elevator style="display: inline-block;" placement="top"
              :total="total"
              :page-size="formData.limit"
              :current="formData.offset"
              @on-change="changePage"
              @on-page-size-change="changeSize"></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'index',
    data () {
      return {
        formData: {
          keyWord: '',
          optType: 1,
          // time: '',
          limit: 20,
          offset: 1
        },
        columns: [
          // {title: '业务流水', key: 'name', width: 180, sortable: false},
          {title: '订单编号', key: 'id', sortable: false, width: 180, render: this.tdRender},
          {title: '申请时间',
            key: 'passTime',
            sortable: false,
            render: (h, params) => {
              return h('div', this.formatterObjTime(params.row.createTime))
            }},
          {title: '提现金额(元)',
            key: 'optAmounts',
            sortable: false,
            render: (h, params) => {
              return h('div', this.toDecimal2(params.row.optAmounts))
            }},
          {title: '提现手续费(元)',
            key: 'serviceFee',
            sortable: false,
            render: (h, params) => {
              return h('div', this.toDecimal2(params.row.serviceFee))
            }},
          {title: '提现状态',
            key: 'status',
            sortable: false,
            render: (h, params) => {  //0到账；1待审批；2审批通过；3审批不通过
              return h('div', this.formatterBalancelogStatus(params.row.status))
            }},
          {title: '到账时间',
            key: 'overTime',
            sortable: false,
            render: (h, params) => {
              return h('div', this.formatterObjTime(params.row.overTime))
            }}
        ],
        timer: {},
        data: [],
        total: 0
      }
    },
    created () {
      setTimeout(() => {
        this.loadItem()
        this.timer = setInterval(() => {
          this.loadItem()
        }, 60 * 1000)
      }, 20)
    },
    destroyed () {
      window.onresize = function () {
      }
      clearInterval(this.timer)
    },
    computed: {
      ...mapGetters([
        'userData'
      ])
    },
    methods: {
      loadItem () {
        this.formData.memberId = this.userData.id
        // this.formData.memberId = 'L0V08T7H7MZVU9VS'
        this.requestAjax('get', 'balance', this.formData).then((data) => {
          if (data.success) {
            this.total = !isNaN(+data.data.total) ? +data.data.total : 0
            this.data = data.data.rows
          }
        })
      },
      searchDriver () {
        this.formData.limit = 20
        this.formData.offset = 1
        this.loadItem()
      },
      /**
       *跳页
       * @param v
       */
      changePage (v) {
        this.formData.offset = v
        this.loadItem()
      },
      /**
       *改变页面展示用户条数
       * @param v
       */
      changeSize (v) {
        this.formData.limit = v
        this.loadItem()
      }
    }
  }
</script>

<style scoped>

  .content-wrapper {
    border: 1px solid #e3e2e5;
    border-radius: 5px;
    padding: 10px;
  }

  .select-wrapper{
    padding: 6px 12px;
    border: 1px solid #e3e2e5;
  }

</style>
