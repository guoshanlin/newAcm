<template>
  <div class="b wrapper-box ">
    <div class="fbox">
      <h3 class="fz14 flex">我的账户</h3>
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
      <div class="clear m-t10 m-b10 ">
        <div class="fl">可提现余额&nbsp;&nbsp;&nbsp;&nbsp;<span class="fz24 c1">{{toDecimal2(row.balance)}}元</span></div>
        <Button v-if="row.balance > 0" class="fr" type="primary" @click="applyWithdrawal">申请提现</Button>
        <!--<Button class="fr" type="primary" @click="applyWithdrawal">申请提现</Button>-->
      </div>
      <Row class="withdrawal">
        <i-col span="6">
          <div>未入账：{{toDecimal2(row.unrecorded)}}元</div>
          <div>提现中：{{toDecimal2(row.withdraw)}}元</div>
          <div>已提现：{{toDecimal2(row.withdrawTotal)}}元</div>
        </i-col>
        <i-col span="6">
          <div><a class="c1" @click="routePush('/finance/incomeDetails')">收入明细</a></div>
          <div><a class="c1" @click="routePush('/finance/withdrawalDetails')">提现明细</a></div>
        </i-col>
        <i-col span="12">
          <div>
            提现方式：银行卡&nbsp;&nbsp;&nbsp;&nbsp;<a class="c1" @click="editAccount">设置提现账户</a>
          </div>
          <div>
            银行卡号：{{userData.bankCard == ''? '暂无': userData.bankCard}}
          </div>
          <div>
            开户名：{{userData.bank == '' ? '暂无': userData.bank}}
          </div>
        </i-col>
      </Row>
    </div>
    <!--新增表单承载标签-->
    <input-from v-if="inputForm.show" @changeOptions="getInputVal" :options="inputForm.option" :value="inputForm.value" :modalDisabled="inputForm.modalDisabled"
                :modalshow="inputForm.modalshow"/>
  </div>
</template>
<script>
  import inputFrom from 'components/modal/inputFrom.vue'
  import {setUserInfo, setIsLogin} from 'js/cache'
  import {mapMutations, mapGetters} from 'vuex'

  export default {
    name: 'index',
    data () {
      return {
        row: '',
        type: '',
        inputForm: {
          show: false,
          modalDisabled: false,
          modalshow: false,
          option: {},
          value: {},
          timer: {}
        } // 表单参数
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
    components: {
      inputFrom
    },
    computed: {
      ...mapGetters([
        'userData'
      ])
    },
    methods: {
      ...mapMutations({
        setUserDate: 'SET_USERDATA'
      }),
      loadItem () {
        this.requestAjax('get', 'balanceLog', {}, this.userData.id).then((data) => {
          if (data.success) {
            this.row = data.data
          }
        })
      },
      applyWithdrawal () {
        // /balanceLog/createWithdrawOrder
        this.type = 'applyWithdrawal'
        this.inputForm.modalshow = true
        this.inputForm.show = true
        this.inputForm.modalDisabled = false
        this.inputForm.option = {
          title: '申请提现',
          width: '512',
          opintions: [
            [
              {
                title: '提现金额',
                id: 'amounts',
                type: 'InputNumberMoney',
                relation: 'poundage',
                titlespan: 6,
                colspan: 18,
                min: 0,
                max: this.row.balance
              }
            ],
            [
              {
                title: '手续费',
                id: 'poundage',
                type: 'tip',
                titlespan: 6,
                colspan: 18
              }
            ],
            [
            {
              title: '银行卡号',
              id: 'bankCard',
              type: 'bankCard',
              titlespan: 6,
              colspan: 18,
              required: true,
              disabled: true,
              valueType: 'bankCheck'
            } ],
              [
              {
                title: '银行',
                id: 'bank',
                type: 'input',
                disabled: true,
                titlespan: 6,
                colspan: 18,
                relation: '',
                required: true
              }
              ],
              [
                {
                  title: '开户名',
                  id: 'bankUser',
                  type: 'input',
                  titlespan: 6,
                  colspan: 18,
                  required: true,
                  disabled: true
                }
              ]
          ],
          button: [{
            type: 'primary',
            title: '确定',
            click: 'handle'
          }]
        }
        this.inputForm.value = {
          memberId: this.userData.id,
          amounts: 0,
          poundage: 0,
          bank: this.userData.bank,
          bankCard: this.userData.bankCard,
          memberName: this.userData.name,
          bankUser: this.userData.bankUser
        }
        // this.$Message.warning('申请提现')
      },
      editAccount () {
        this.type = 'editAccount'
        this.inputForm.modalshow = true
        this.inputForm.show = true
        this.inputForm.modalDisabled = false
        this.inputForm.option = {
          title: '设置银行卡',
          width: '512',
          opintions: [
            [
              {
                title: '开户名',
                id: 'bankUser',
                type: 'input',
                titlespan: 6,
                colspan: 18,
                required: true
                // disabled: true
              }
            ],
            [
              {
                title: '卡号',
                id: 'bankCard',
                type: 'bankCard',
                titlespan: 6,
                colspan: 18,
                required: true,
                relation: 'bank',
                valueType: 'bankCheck'
              }
            ],
            [
              {
                title: '银行',
                id: 'bank',
                type: 'input',
                titlespan: 6,
                colspan: 18,
                relation: '',
                required: true
              }
            ]
          ],
          button: [{
            type: 'primary',
            title: '确定',
            click: 'handle'
          }]
        }
        this.inputForm.value = {
          bankUser: this.userData.bankUser,
          bank: this.userData.bank,
          bankCard: this.userData.bankCard
        }
        // this.$Message.warning('设置提现账户')
      },
      /**
       *提交返回处理方法
       * @param val
       * @param type
       */
      getInputVal (val, type) {
        this.inputForm.value = val // 表单填写的内容;
        if (type === 'cancel') { // 按钮操作
          this.inputForm.modalshow = false // 隐藏modal
          return
        }
        let newVal = {}
        Object.assign(newVal, val)
        if (this.type == 'editAccount') {
          newVal.id = this.userData.id
          this.inputForm.modalDisabled = true
          this.submitAjaxAmounts('members', newVal, '设置银行卡')
        } else {
          // poundage: 0,
          //   bank: this.userData.bank,
          //   bankCard: this.userData.bankCard
          this.inputForm.modalDisabled = true
          newVal.poundage = undefined
          newVal.objId = newVal.bankCard
          newVal.objName = newVal.bank
          newVal.bankCard = undefined
          newVal.bank = undefined
          this.submitAjaxAmounts('createWithdrawOrder', newVal, '提现')
        }
      },
      /**
       * 提交表单
       * @param url
       * @param obj
       */
      submitAjaxAmounts (url, obj, msg) {
        const _type = 'POST'
        this.requestAjax(_type, url, obj).then((data) => {
          if (data.success) {
            if (url == 'members') {
              let _obj = {}
              Object.assign(_obj, this.userData)
              _obj.bank = obj.bank
              _obj.bankCard = obj.bankCard
              _obj.bankUser = obj.bankUser
              this.setUserDate(_obj)
              setUserInfo(_obj)
            }
            this.$Message.success(msg + '成功')
            this.inputForm.modalshow = false
            this.loadItem()
          } else {
            this.$Message.success(msg + '失败')
          }
          this.inputForm.modalDisabled = false
        }, (err) => {
          this.$Message.success(msg + '失败')
          this.inputForm.modalDisabled = false
        })
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
