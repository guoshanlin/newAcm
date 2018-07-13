<template>
  <div class="b wrapper-box">
    <h3 class="fz14">订单管理</h3>
    <div class="content-wrapper m-t10 wrapper-border m-t20">
      <Form :model="formData">
        <Row type="flex" :gutter=5>
          <i-col span="12">
            <Row type="flex" justify="start">
              <i-col>
                <Row type="flex" justify="start">
                  <i-col style="line-height: 24px">
                    订单状态：
                    <RadioGroup @on-change="orderStatusChange" v-model="formData.status" type="button">
                      <Radio label="">全部</Radio>
                      <Radio label="0">待支付</Radio>
                      <Radio label="1,3">已支付</Radio>
                      <Radio label="2">已取消</Radio>
                    </RadioGroup>
                  </i-col>
                </Row>
                <!--   <Select v-model="formData.ticket" style="width:100px">
                     <Option value="报名名称">报名名称</Option>
                     <Option value="免费报名">免费报名</Option>
                   </Select>
                   <Select v-model="formData.searchType" style="width:120px">
                     <Option value="订单号">订单号</Option>
                     <Option value="联系人姓名">联系人姓名</Option>
                     <Option value="联系人手机号">联系人手机号</Option>
                   </Select>-->
              </i-col>
            </Row>
          </i-col>
          <i-col span="12">
            <Row type="flex" justify="end">
              <i-col>
                <i-input class="width-letf" placeholder="请输入关键字" v-model="formData.keyWord"></i-input>
              </i-col>
              <i-col>
                <Button type="primary" class="m-l5" icon="ios-search" @click="searchDriver">搜索</Button>
                <Button type="primary" @click="exportTable">导出</Button>
              </i-col>
            </Row>
          </i-col>
        </Row>
      </Form>
    </div>
    <div class="content-wrapper m-t10 wrapper-border">
      <Table id="usetlistTable" :width="tableWidth" border ref="$table" @on-selection-change="onTableSelect"
             :columns="col" :data="tableData"></Table>
      <!--分页-->
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
    name: "index",
    data() {
      return {
        tableWidth: document.documentElement.clientWidth - 399,
        formData: {
          activityId: this.$route.query.id,
          keyWord: '',
          limit: 20,
          offset: 1,
          status: ''
          /*          orderStatus: "全部",
                    ticket: "报名名称",
                    searchType: "订单号",*/
        },
        total: 0,
        selectList: [],
        col: [
          {
            title: "订单编号",
            align: 'left',
            key: "id",
            render: this.tdRender
          },
          {
            title: "下单时间",
            align: 'left',
            width: 140,
            key: "createTime",
            render: (h, params) => {
              return h('div', this.formatterObjTime(params.row.createTime))
            }},
          {
            title: "订单状态",
            align: 'left',
            width: 100,
            key: "status",
            render: (h, params) => {
              return h('div', this.formatterOrders(params.row.status))
            }
          },
          {
            title: "姓名",
            align: 'left',
            width: 120,
            key: "memberNickName",
            render: this.tdRender
          },
          {
            title: "手机",
            align: 'left',
            width: 140,
            key: "memberPhone",
            render: this.tdRender
          },
          {
            title: "数量",
            align: 'left',
            width: 80,
            key: "number",
            render: this.tdRender
          },
          {
            title: "应付",
            width: 80,
            align: 'left',
            key: "priceTotal",
            render: this.tdRender
          },
          {
            title: "折扣价",
            width: 80,
            align: 'left',
            key: "priceDiscount",
            render: this.tdRender
          },
          {
            title: "实际支付",
            align: 'left',
            width: 100,
            key: "priceActual",
            render: this.tdRender
          }
        ],
        tableData: []
      }
    },
    created() {
      setTimeout(() => {
        this.initTable()
      }, 20)
    },
    computed: {
      ...mapGetters([
        'userData'
      ])
    },
    methods: {
      /**
       *跳页
       * @param v
       */
      changePage (v) {
        this.formData.offset = v
        this.initTable()
      },
      /**
       *改变页面展示用户条数
       * @param v
       */
      changeSize (v) {
        this.formData.limit = v
        this.initTable()
      },
      onTableSelect (rows) {
        console.log('===========' + rows)
        this.selectList = rows
      },
      searchDriver () {
        this.$Message.warning('搜索')
      },
      orderStatusChange (v) {
        this.formData.status = v
        this.initTable()
      },
      exportTable: function () {
        this.$refs.$table.exportCsv({filename: 'order.csv'})
      },
      initTable () {
        /*orders*/
        /*     this.loading = '数据加载中...请稍等！'*/
        const _type = 'GET'
        let _params = this.formData
        // _params.memberId = this.userData.id
        const _url = 'orders'
        this.requestAjax(_type, _url, _params).then((data) => {
          if (data.success) {
            this.total = !isNaN(+data.data.total) ? +data.data.total : 0
            /*  this.loading = '暂无数据'*/
            this.tableData = data.data.rows
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
