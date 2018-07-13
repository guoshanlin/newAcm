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
      <Menu mode="horizontal" active-name="2" @on-select="menuSelect" class="menu-tab">
        <MenuItem name="2">待支付</MenuItem>
        <MenuItem name="0">已支付</MenuItem>
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
                    <div class="">金额：{{toDecimal2(item.optAmounts)}} 元</div>
                  </div>
                  <div class="flex">
                    <div class="">状态：{{item.status == 2 ? '待支付': '已支付'}}</div>
                  </div>
                </div>
                <div class="fbox">
                  <div class="flex">
                    <div>开户名：{{item.bankUser}}</div>
                  </div>
                  <div class="flex">
                    <div>开户行：{{item.objectName}}</div>
                  </div>
                  <div class="flex">
                    <div>银行卡号：{{item.object}}</div>
                  </div>
                  <div class="flex"></div>
                </div>
                </div>
                <div>
                  <i-button class="m-t10" type="primary" v-if="item.status == 2" @click="submitAjax(item)">确认支付</i-button>
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
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'index',
    data () {
      return {
        keyWord: '',
        data: [],
        total: 0,
        parms: {
          status: 2,
          optType: 1,
          limit: 20,
          offset: 1
        }
      }
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
      changePage(v) {
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
      searchDriver () {
        this.parms.keyWord = this.keyWord
        this.parms.limit = 20
        this.parms.offset = 1
        this.initItem()
      },
      /**
       * 提交表单
       * @param url
       * @param obj
       */
      submitAjax (row) {
        this.requestAjax('post', 'examination', {id: row.id, status: 0}).then((data) => {
          if (data.success) {
            this.$Message.success('确认成功')

            this.initItem()
          } else {
            this.$Message.success('确认失败')
          }
        }, (err) => {
          this.$Message.success('确认失败')

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
    mounted() {
      this.$nextTick(() => {
        //this.parms.memberId = this.userData.id
        this.initItem()
        document.querySelector('.ivu-page-options-elevator').title = '输入后回车跳至指定页'
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          this.initItem()
        }, 60 * 1000)
      })
    },
    destroyed() {
      window.onresize = function () {
      }
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
