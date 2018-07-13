<template>
  <div class="b wrapper-box">
    <h3 class="fz14">人员管理</h3>
    <div class="content-wrapper m-t10 wrapper-border m-t20">
      <Form :model="formData">
        <Row type="flex" :gutter=5>
          <i-col span="16">
            <!--<Row type="flex" justify="start">-->
            <!--<i-col>-->
            <!--<Select v-model="formData.userStatus" style="width:auto">-->
            <!--<Option value="参会状态">参会状态</Option>-->
            <!--<Option value="待审核">待审核</Option>-->
            <!--<Option value="审核未通过">审核未通过</Option>-->
            <!--<Option value="待参会">待参会</Option>-->
            <!--<Option value="已签到">已签到</Option>-->
            <!--</Select>-->
            <!--<Select v-model="formData.userStemFrom" style="width:auto">-->
            <!--<Option value="来源">来源</Option>-->
            <!--<Option value="邀请函">邀请函</Option>-->
            <!--<Option value="嘉宾海报">嘉宾海报</Option>-->
            <!--<Option value="炫耀海报">炫耀海报</Option>-->
            <!--<Option value="报名二维码">报名二维码</Option>-->
            <!--<Option value="签到二维码">签到二维码</Option>-->
            <!--<Option value="后台添加">后台添加</Option>-->
            <!--</Select>-->
            <!--<Select v-model="formData.ticketId" style="width:auto">-->
            <!--<Option value="选择票型">选择票型</Option>-->
            <!--<Option value="免费报名">免费报名</Option>-->
            <!--</Select>-->
            <!--<Select v-model="formData.checkinType" style="width:auto">-->
            <!--<Option value="签到方式">签到方式</Option>-->
            <!--<Option value="微信扫码签到">微信扫码签到</Option>-->
            <!--<Option value="位置签到">位置签到</Option>-->
            <!--<Option value="小程序签到">小程序签到</Option>-->
            <!--<Option value="后台标记签到">后台标记签到</Option>-->
            <!--<Option value="人脸识别签到">人脸识别签到</Option>-->
            <!--</Select>-->
            <!--<Select v-model="formData.sendMsgFlag" style="width:auto">-->
            <!--<Option value="是否发送电子票">是否发送电子票</Option>-->
            <!--<Option value="已发送">已发送</Option>-->
            <!--<Option value="未发送">未发送</Option>-->
            <!--</Select>-->
            <!--</i-col>-->
            <!--</Row>-->
          </i-col>
          <i-col span="8">
            <Row type="flex" justify="end">
              <i-col>
                <i-input class="width-letf" placeholder="请输入关键字" v-model="formData.keyWord"></i-input>
              </i-col>
              <i-col>
                <Button type="primary" class="m-l5" icon="ios-search" @click="searchDriver">搜索</Button>
              </i-col>
            </Row>
          </i-col>
        </Row>
        <!--<div class="m-t10">-->
        <!--<Row type="flex" justify="start">-->
        <!--<i-col span="16" style="line-height: 24px">-->
        <!--已选择 <span class="c1">{{selectList.length}}</span> 人-->
        <!--<Button type="primary" :disabled="selectList.length > 0 ? false : true">批量审核</Button>-->
        <!--<Button type="primary" :disabled="selectList.length > 0 ? false : true">标记已签到</Button>-->
        <!--<Button type="primary" :disabled="selectList.length > 0 ? false : true">标记未签到</Button>-->
        <!--<Button type="primary" :disabled="selectList.length > 0 ? false : true">发送电子票</Button>-->
        <!--</i-col>-->
        <!--<i-col span="8">-->
        <!--<Row type="flex" justify="end">-->
        <!--<i-col>-->
        <!--<Button type="primary">单个添加</Button>-->
        <!--<Button type="primary">批量导入</Button>-->
        <!--<Button type="primary" @click="exportTable">导出</Button>-->
        <!--</i-col>-->
        <!--</Row>-->
        <!--</i-col>-->
        <!--</Row>-->
        <!--</div>-->
      </Form>
    </div>
    <div class="content-wrapper m-t10 wrapper-border">
      <Table id="usetlistTable" :width="tableWidth" border ref="$table" @on-selection-change="onTableSelect"
             :columns="col" :data="tableData"></Table>

      <!--分页-->
      <div style="text-align: right; padding-top: 5px;">
        <Page show-total show-sizer show-elevator style="display: inline-block;" placement="top"
              :total="total"
              :page-size="requestParms.limit"
              :current="requestParms.offset"
              @on-change="changePage"
              @on-page-size-change="changeSize"></Page>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        tableWidth: document.documentElement.clientWidth - 399,
        formData: {
          keyWord: '',
          trading: "不限",
          userStatus: '参会状态',
          userStemFrom: "来源",
          ticketId: "选择票型",
          checkinType: "签到方式",
          sendMsgFlag: "是否发送电子票",
        },

        total: 0,
        requestParms: {
          keyWord: '',
          limit: 20,
          offset: 1,
          status: '',
          activityId: this.$route.query.id
        },
        selectList: [],
        col: [
          // {
          //   type: 'selection',
          //   width: 60,
          //   fixed: 'left',
          //   align: 'center'
          // },
          {
            title: '头像昵称',
            width: 200,
            render: (h, params) => {
              return h('div', { 'class': 'td-render',
                domProps: {
                  title: params.row.nickName}}, [
                h('Avatar', {
                  style: {marginRight: '5px'},
                  props: {
                    src: params.row.userPic
                  }
                }),
                h('span', params.row.nickName)
              ])
            }
          },
          {
            title: '名称',
            width: 180,
            key: "memberName",
            render: this.tdRender
          },
          {
            title: '是否会员',
            align: 'center',
            width: 100,
            key: "isVip"
          },
          {
            title: "参会码",
            align: 'center',
            width: 100,
            key: "codeNumber",
            render: this.tdRender
          },
          {
            title: "手机号",
            align: 'center',
            width: 130,
            key: "memberPhone",
            render: this.tdRender
          },
          {
            title: "签到状态",
            align: 'center',
            width: 100,
            key: "status"
          },
          {
            title: "签到方式",
            align: 'center',
            width: 100,
            key: "signType"
          },
          {
            title: "签到时间",
            align: 'center',
            width: 160,
            key: "signTime"
          }
          // {
          //   title: '操作',
          //   width: 170,
          //   fixed: 'right',
          //   align: 'center',
          //   render: (h, params) => {
          //     return h('div', [
          //       h('Button', {
          //         props: {type: 'primary', size: 'small'},
          //         style: {marginRight: '5px'},
          //         on: {
          //           click: () => {
          //             this.$Message.warning('详情')
          //           }
          //         }
          //       }, '详情'),
          //       h('Button', {
          //         props: {type: 'primary', size: 'small'},
          //         style: {marginRight: '5px'},
          //         on: {
          //           click: () => {
          //             this.$Message.warning('编辑')
          //           }
          //         }
          //       }, '编辑'),
          //       h('Button', {
          //         props: {type: 'error', size: 'small'},
          //         on: {
          //           click: () => {
          //             this.$Message.warning('删除')
          //           }
          //         }
          //       }, '删除')
          //     ])
          //   }
          // }
        ],
        tableData: []
      }
    },
    created() {
      setTimeout(() => {
        this.requestData()
      }, 20)
    },
    methods: {
      /**
       *跳页
       * @param v
       */
      changePage (v) {
        this.requestParms.offset = v
        this.requestData()
      },
      /**
       *改变页面展示用户条数
       * @param v
       */
      changeSize (v) {
        this.requestParms.limit = v
        this.requestData()
      },
      onTableSelect(rows) {
        console.log("===========" + rows)
        this.selectList = rows
      },
      searchDriver () {
        this.requestParms.limit = 20
        this.requestParms.offset = 1
        this.requestParms.keyWord = this.formData.keyWord
        this.requestData()
        // this.$Message.warning('搜索')
      },
      exportTable: function () {
        this.$refs.$table.exportCsv({filename: "user.csv"})
      },
      requestData() {
        this.requestAjax('GET', 'ticket', this.requestParms).then((data) => {
          console.log(JSON.stringify(data))
          if (data.success) {
            this.total = !isNaN(+data.data.total) ? +data.data.total : 0
            this._parseData(data.data.rows)
          } else {

          }
        })
      },
      _parseData(data){
        if(data.length == 0) return
        let list = []
        data.forEach((v, i) => {
          list.push({
            memberName: v.memberName,
            nickName: v.memberNickName,
            userPic: v.memberImg,
            memberPhone: v.memberPhone,
            codeNumber: v.codeNumber,
            memberPhone: v.memberPhone,
            status: v.status == 0 ? "未签到": "已签到",
            signType: this._parseSignType(v.signType),
            signTime: v.signTime ? new Date(v.signTime.time).format("yyyy-MM-dd hh:mm:ss"): "-",
            isVip: v.isVip ? v.isVip : ""
          })
        })
        this.tableData = list
      },
      _parseSignType(status){
        switch (status) {
          case 0:
            return "票券二维码"
          case 1:
            return "活动二维码"
          case 2:
            return "票券序列号"
          default:
            return "-"
        }
      }

    }
  }
</script>

<style scoped>

</style>
