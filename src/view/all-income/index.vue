<template>
  <div class="b wrapper-box ">
    <h3 class="fz14 flex">收入明细</h3>
    <div class="content-wrapper m-t20">
      <Form :model="formData">
        <Row type="flex" :gutter=5>
          <i-col span="16">
            <div class="l-h30">票券服务费说明：每张票券收取1元的服务费</div>
          </i-col>
          <i-col span="8">
            <Row type="flex" justify="end">
              <i-col>
                <i-input class="width-letf" placeholder="请输入支付账号" v-model="formData.keyWord"></i-input>
              </i-col>
              <i-col>
                <Button type="primary"  class="m-r15 m-l5" icon="ios-search" @click="searchDriver">搜索</Button>
              </i-col>
            </Row>
          </i-col>
        </Row>
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
          optType: 0,
          limit: 20,
          offset: 1
        },
        columns: [
          {title: '活动名称', key: 'objectName', sortable: false, render: this.tdRender},
          {title: '订单编号', width: 180, key: 'id', sortable: false, render: this.tdRender},
          {title: '申请人', key: 'memberName', sortable: false, render: this.tdRender},
          {title: '订单金额(元)',
            key: 'optAmounts', // toDecimal2
            sortable: false,
            render: (h, params) => {
              return h('div', this.toDecimal2(params.row.optAmounts))
            }
          },
          {title: '票券数', key: 'ticketCount', width: 140, sortable: false},
          {title: '票券服务费(元)',
             key: 'ticketServiceFee',
             width: 140,
             sortable: false,
             render: (h, params) => {
               return h('div', this.toDecimal2(params.row.ticketServiceFee))
             }},
          {title: '入账金额(元)',
            key: 'optAmounts',
            sortable: false,
            render: (h, params) => {
              return h('div', this.toDecimal2(params.row.optAmounts - params.row.ticketServiceFee))
            }},
           {title: '入账时间',
            key: 'createTime',
            sortable: false,
            render: (h, params) => {
              return h('div', this.formatterObjTime(params.row.createTime))
            }}
        ],
        data: [],
        total: 0,
        timer: {}
      }
    },
    created () {
      setTimeout(() => {
        if (this.$route.query.id) {
          this.formData.memberId = this.$route.query.id
        }
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
