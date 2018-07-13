<template>
  <div class="b wrapper-box ">
    <div class="fbox">
      <h3 class="fz14 flex">所有账户</h3>
      <Poptip trigger="hover" placement="bottom-end" width="500">
        <div class="cursor-p">数据说明
          <Icon type="help"></Icon>
        </div>
        <div class="poptip-slot" slot="content">
          可提现余额：账户中可申请提现的金额，不包含提现中、已提现、未入账的金额，由未入账金额在清算后入账。
          <br>
          未入账：账户中等待入账的金额，订单支付成功时计入，在活动结束后下一个工作日时扣除相关费用后计入可提现金额。
          <br>
          提现中：已从可提现余额中申请提现，等待打款至提现收款账号中的总金额。
          <br>
          已提现：已从可提现余额中申请提现，且已打款至提现收款账号中的总金额。
          <br>
        </div>
      </Poptip>
    </div>
    <div class="content-wrapper m-t20">
      <Form :model="formData">
        <Row type="flex" :gutter=5>
          <i-col span="16">
          </i-col>
          <i-col span="8">
            <Row type="flex" justify="end">
              <i-col>
                <i-input class="width-letf" placeholder="请输入用户名" v-model="formData.keyWord"></i-input>
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
    <div v-for="(row,index) in rows" class="content-wrapper m-t20 m-b10" :key="index">
      <div>可提现余额&nbsp;&nbsp;&nbsp;&nbsp;<span class="fz20 c1">{{toDecimal2(row.balance)}}元</span></div>
      <Row class="withdrawal l-h30">
        <i-col span="6">
          <div>未入账：{{toDecimal2(row.unrecorded)}}元 &nbsp;&nbsp;&nbsp;<a class="c1" @click="routePush('/allFinance/allIncome',row.memberId)">收入明细</a></div>
          <div>银行卡：{{row.bankCard}}</div>
        </i-col>
        <i-col span="6">
          <div>提现中：{{toDecimal2(row.withdraw)}}元&nbsp;&nbsp;&nbsp;<a class="c1" @click="routePush('/allFinance/allDetails',row.memberId)">提现明细</a></div>
          <div>开户行：{{row.bank.split('-')[0]}}</div>
        </i-col>
        <i-col span="6">
          <div>已提现：{{toDecimal2(row.withdrawTotal)}}元</div>
          <div>用户名：{{row.name}}</div>
        </i-col>
        <i-col span="6">
          <div>电话：{{row.phone}}</div>
          <div>用户名：{{row.nickName}}</div>
        </i-col>
      </Row>
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
  export default {
    name: 'index',
    data () {
      return {
        rows: [],
        type: '',
        formData: {
          keyWord: '',
          limit: 20,
          offset: 1
        },
        total: 3
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
    methods: {
      loadItem () {
        this.requestAjax('get', 'queryMemberBalance', this.formData).then((data) => {
          if (data.success) {
            this.rows = data.data.rows
            this.total = !isNaN(+data.data.total) ? +data.data.total : 0
          } else {
            this.total = 0
            this.rows = []
          }
        })
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
      },
      searchDriver () {
        this.formData.limit = 20
        this.formData.offset = 1
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

  .withdrawal{
    padding: 10px 0;
    line-height: 36px;
    border-top: 1px solid #e3e2e5;
  }
  .poptip-slot{
    white-space: normal;
  }
</style>
