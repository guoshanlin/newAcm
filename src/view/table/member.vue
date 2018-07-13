<template>
  <div class="wrapper b wrapper-box">
   <!-- <Affix :offset-top="10" style="padding:5px 0px;">-->
      <Row type="flex" :gutter=5>
        <!--<列表导栏>-->
        <i-col span="12">
          <Row type="flex" justify="start">
            <i-col>
              <Button type="primary" @click="addOrModify">新增</Button>
<!--              <Button type="warning" " @click="deleteAll">删除</Button>-->
            </i-col>
            <i-col>
              <Upload class="m-l10" :action="getWbkUrl('upload')" :before-upload="handleUpload">
                <Button type="primary">导入</Button>
              </Upload>
            </i-col>
            <i-col>
              <Button class="m-l10" type="primary" @click="loadXlx">下载导入模板</Button>
            </i-col>
          </Row>

        </i-col>
        <i-col span="12">
          <Row type="flex" justify="end">
            <i-col>
              <i-input class="width-letf" placeholder="关键字" v-model="keyWord"></i-input>
            </i-col>
            <i-col>
              <Button type="primary"  class="m-r15 m-l5" icon="ios-search" @click="searchDriver">搜索</Button>
            </i-col>
          </Row>
        </i-col>
      </Row>
  <!--  </Affix>-->
    <!--table列表-->
    <i-table :columns="columns" :data="data" border size="small" ref="table" @on-sort-change="sortChange" @on-selection-change="selectTable" :no-data-text="loading" @on-row-dblclick="rowDbClick"></i-table>
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
    <input-from v-if="inputForm.show" @changeOptions="getInputVal" :options="inputForm.option" :value="inputForm.value" :modalDisabled="inputForm.modalDisabled"
                :modalshow="inputForm.modalshow"/>
    <!--详情列表承载标签-->
    <table-details v-if="tableDetails.show" :modalshow=tableDetails.modalshow :newValue=tableDetails.option  @getValue="tableDetailsMethods"></table-details>
  </div>
</template>
<script>
 import inputFrom from 'components/modal/inputFrom.vue'
 import tableDetails from 'components/modal/tableDetails.vue'
 import iSpecies from 'components/ticket-species/index.vue'
 import {mapGetters} from 'vuex'
  export default {
    destroyed () {
      window.onresize = function () {
      }
      clearInterval(this.timer)
    },
    data () {
      return {
      /*  height: '' + (document.body.offsetHeight - 325),*/
        columns: [
          {title: '姓名', key: 'name', width: 120, sortable: false, render: this.tdRender},
       /*   {title: '昵称', key: 'nickName', width: 100, sortable: false},*/
          {title: '性别',
            key: 'sex',
            width: 80,
            sortable: false
          },
          {title: '手机', width: 120, key: 'phone', sortable: false, render: this.tdRender},
          {title: '邮箱', key: 'email', sortable: false, render: this.tdRender},
          {title: '地址',
            key: 'address',
            sortable: false,
            render: this.tdRender},
          {title: '公司', width: 170, key: 'company', sortable: false, render: this.tdRender},
          {title: '职位', width: 120, key: 'position', sortable: false, render: this.tdRender},
          {title: '级别',
            key: 'level',
            width: 80,
            sortable: false,
            render: (h, params) => {
              return h('div', {
                'class': 'td-render',
                domProps: {
                  title: params.row[params.column.key] === 1 ? '会员' : '非会员'
                },
                style: {
                  cursor: 'pointer'
                }
              }, params.row[params.column.key] === 1 ? '会员' : '非会员')
            }},
          {title: '会员有效期',
            key: 'validTime',
            width: 140,
            sortable: false,
            render: (h, params) => {
              return h('div', this.formatterObjTime(params.row.validTime))
            }},
          {title: '操作',
            align: 'center',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  style: {marginRight: '5px'},
                  props: {type: 'primary', size: 'small'},
                  nativeOn: {
                    click: () => {
                      this.addOrModify(params.row, '修改')
                    }
                  }
                }, '修改')
              ])
            }
          }
        ],
        data: [],
        total: 0,
        keyWord: '',
        parms: {
          keyWord: '',
          limit: 20,
          offset: 1
        },
        selectRows: '',
        loading: '',
        clickType: '',
        inputForm: {
          show: false,
          modalDisabled: false,
          modalshow: false,
          option: {},
          value: {}
        }, // 表单参数
        tableDetails: {
          show: false,
          modalshow: false,
          option: {}
        }, // 详情参数
        timer: {}
      }
    },
    computed: {
      ...mapGetters([
        'userData'
      ])
    },
    components: {
       inputFrom,
      tableDetails
    },
    methods: {
      /**
       *双击表格列时触发
      */
      rowDbClick (row) {
        this.rowDetails(row)
      },
      /**
       *加载table数据
       */
      loadTable () {
        this.loading = '数据加载中...请稍等！'
        const _type = 'GET'
        const _params = this.parms
        const _url = 'vips'
        this.requestAjax(_type, _url, _params).then((data) => {
          if (data.success) {
            this.total = !isNaN(+data.data.total) ? +data.data.total : 0
            this.loading = '暂无数据'
            this.data = data.data.rows
          } else {
            this.loading = '暂无数据'
            this.data = []
          }
        })
      },
      /**
       *跳页
       * @param v
       */
      changePage (v) {
        this.parms.offset = v
        this.loadTable()
      },
      /**
       *改变页面展示用户条数
       * @param v
       */
      changeSize (v) {
        this.parms.limit = v
        this.loadTable()
      },
      /**
       *排序
       * @param obj
       */
      sortChange (obj) {
        this.parms.sort = obj.key
        this.parms.order = obj.order
        this.loadTable()
      },
      /**
       * 模糊查询
       *
       */
      searchDriver () {
        this.parms.keyWord = this.keyWord
        this.parms.limit = 20
        this.parms.offset = 1
        this.loadTable()
      },
      /**
       * 监听事件table选中事件
       */
      selectTable (val) {
        this.selectRows = val
      },

      /**
       *查看详情
       */
      rowDetails (row) {
        this.tableDetails.show = true
        this.tableDetails.modalshow = true
        this.tableDetails.option = {
          title: '会员详情',
          width: '768',
          tabPane: false,
          uEditor: false,
          rowId: '',
          // name nickName phone wechat email sex
          // cardNumber type hobby company position channel level address type validTime
          opintions: [
            [
              {title: '姓名', value: row.name, show: true, type: ''},
              {title: '手机', value: row.phone, show: true, type: ''}
            ],
            [
              {title: '邮箱', value: row.email, show: true, type: ''},
              {title: '性别', value: row.sex, show: true, type: ''}
            ],
            [
              {title: '身份证', value: row.cardNumber, show: true, type: ''},
              {title: '类型', value: row.type === 1 ? '企业' : '个人', show: true, type: ''}
            ],
            [
              {title: '公司', value: row.company, show: true, type: ''},
              {title: '部门', value: row.position, show: true, type: ''}
            ],
            [
              {title: '爱好', value: row.hobby, show: true, type: ''},
              {title: '渠道', value: this.getUserChannel(row.channel), show: true, type: ''}
            ],
            [
              {title: '级别', value: row.level === 1 ? '会员' : '非会员', show: true, type: ''},
              {title: '会员有效期', value: this.formatterObjTime(row.validTime), show: true, type: ''}
            ],
              [
              {title: '地址', value: row.address, colspan: 3, show: true, type: ''}
            ]
          ],
          button: [
//                        {type: 'primary', title: '提交', click: 'handle'}
          ]
        }
      },
      /**
       *隐藏详情
       */
      tableDetailsMethods (val) {
        this.tableDetails.modalshow = false
      },
      /**
       *新增或修改用户
       */
      addOrModify (row, type) {
        let _b = false
        if (type === '修改') {
          this.clickType = '修改'
          _b = true
        } else {
          this.clickType = '新增'
        }
        this.inputForm.modalshow = true
        this.inputForm.show = true
        this.inputForm.modalDisabled = false
        this.inputForm.option = {
          title: _b ? '修改会员' : '新增会员',
          width: '1040',
          opintions: [
            [{title: '基本信息', theme: true}],
            [
              {title: '姓名',id: 'name',type: 'input',titlespan: 2,colspan: 6,required: true },
              { title: '性别',id: 'sex',type: 'select',titlespan: 2,colspan: 6,required: false,relation: ''},
              {title: '出生日期',id: 'birth',type: 'time',format: 'yyyy-MM-dd',titlespan: 2,colspan: 6,required: true}
            ],
            [
              {title: '手机',id: 'phone',type: 'input',titlespan: 2,colspan: 6,required: true,valueType: 'mobilePhone'},
              {title: '微信号',id: 'wechat',type: 'input',titlespan: 2,colspan: 6, relation: '',required: false},
              {title: '邮箱',id: 'email',type: 'input',titlespan: 2,colspan: 6,required: true,valueType: 'email'}
            ],
            [
              {title: '级别',id: 'level',type: 'select',titlespan: 2,colspan: 6, relation: '',required: false},
              {title: '会员卡号',id: 'vipNo',type: 'input',titlespan: 2,colspan: 6, relation: '',required: false},
              {title: '会员期限',id: 'validTime',type: 'time',titlespan: 2,colspan: 6,required: false}
            ],
            [
              {title: '公司',id: 'company',type: 'input',titlespan: 2,colspan: 6,required: false},
              {title: '职位',id: 'position',type: 'input',titlespan: 2,colspan: 6,required: false},
              {title: '地址',id: 'address',type: 'input',titlespan: 2,colspan: 6,required: false}
            ],
            [{title: '扩展信息', theme: true}],
            [
              {title: '身份证号',id: 'cardNumber',type: 'input',titlespan: 2,colspan: 6,required: false,valueType: 'idCard'},
              {title: '籍贯',id: 'hometown',type: 'input',titlespan: 2,colspan: 6,required: false},
              {title: '爱好',id: 'hobby',type: 'input',titlespan: 2,colspan: 6,required: false}
            ],
            [
              {title: '毕业院校',id: 'institutions',type: 'input',titlespan: 2,colspan: 6,required: false},
              {title: '学历',id: 'education',type: 'input',titlespan: 2,colspan: 6, relation: '',required: false},
              {title: '所属行业',id: 'profession',type: 'input',titlespan: 2,colspan: 6, relation: '',required: false}
            ],

            [
              {title: '类型',id: 'type',type: 'select',titlespan: 2,colspan: 6,relation: '',required: false},
              {title: '渠道',id: 'channel',type: 'select',titlespan: 2,colspan: 6,relation: '',required: false},
              {title: '工作年限',id: 'experienceYears',type: 'input',titlespan: 2,colspan: 6,required: false}
            ],
            [
              {title: '拥有资源',id: 'resources',type: 'input',titlespan: 2,colspan: 22, relation: '',required: false},
            ],
            [
              {title: '拥有技能',id: 'skills',type: 'input',titlespan: 2,colspan: 22,required: false}
            ],
            [
              {title: '擅长技能',id: 'goodSkills',type: 'input',titlespan: 2,colspan: 22,required: false}
            ],
            [
              {title: '想学技能',id: 'wannaSkills',type: 'input',titlespan: 2,colspan: 22, relation: '',required: false}
            ],
            [
              {title: '想收获',id: 'gains',type: 'input',titlespan: 2,colspan: 22,required: false}
            ],
            [
              {title: '分享知识',id: 'shareInfo',type: 'input',titlespan: 2,colspan: 22,required: false},
              {title: '分享日期',id: 'shareDate',type: 'time',format: 'yyyy-MM-dd',titlespan: 2,colspan: 6, relation: '',required: true}
            ]

          ],
          button: [{type: 'primary',title: _b ? '修改' : '提交',click: 'handle'}]

        }

        this.inputForm.value = {
          name: _b ? row.name : '',
          email: _b ? row.email : '',
          phone: _b ? row.phone : '',
          sex: _b ? '' + row.sex : '男',
          type: _b ? '' + row.type : '0',
          cardNumber: _b ? row.cardNumber : '',
          hobby: _b ? row.hobby : '',
          company: _b ? row.company : '',
          position: _b ? row.position : '',
          channel: _b ? '' + row.channel : '0',
          level: _b ? '' + row.level : '0',
          address: _b ? row.address : '',
          validTime: _b ? '' + this.formatterObjTime(row.validTime, 'yyyy-MM-dd hh:mm:ss') : '',

          wechat: _b ? row.wechat : '',
          birth: _b ? row.birth : '',
          profession: _b ? row.profession : '',
          experienceYears: _b ? row.experienceYears : '',
          resources: _b ? row.resources : '',
          hometown: _b ? row.hometown : '',
          education: _b ? row.education : '',
          institutions: _b ? row.institutions : '',
          wannaSkills: _b ? row.wannaSkills : '',
          goodSkills: _b ? row.goodSkills : '',
          shareDate: _b ? row.shareDate : '',
          vipNo: _b ? row.vipNo : '',
          skills: _b ? row.skills : '',
          gains: _b ? row.gains : '',
          shareInfo: _b ? row.shareInfo : ''
        }
        if (_b) {
          this.inputForm.value.id = row.id
        }
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
        this.inputForm.modalDisabled = true
        switch (this.clickType) {
          case '新增':
          case '修改':
            this.submitAjax('vips', newVal)
            break
          default:
        }
      },
      /**
       * 提交表单
       * @param url
       * @param obj
       */
      submitAjax (url, obj) {
        const _type = 'POST'
        this.requestAjax(_type, url, obj).then((data) => {
          if (data.success) {
            this.$Message.success(this.clickType + '会员成功')
            this.inputForm.modalshow = false
            this.loadTable()
          } else {
            if (this.clickType == '新增') {
              this.$Message.success(data.desc)
            } else {
              this.$Message.success(this.clickType + '会员失败')
            }
          }
          this.inputForm.modalDisabled = false
        }, (err) => {
          this.$Message.success(this.clickType + '会员失败')
          this.inputForm.modalDisabled = false
        })
      },
      /**
       * 批量删除
       */
      deleteAll () {
        if (this.selectRows === '' || this.selectRows.length === 0) {
          this.$Message.error('请选择要删除的会员')
          return
        }
        let id = []
        this.selectRows.forEach((item) => {
          id.push(item.id)
        })
        id = id.join(',')
        this.confirmDelete(id)
      },
      /**
       * 删除前提示
       * @param row
       */
      confirmDelete (id) {
        this.$Modal.confirm({
          title: '提示信息',
          content: '是否确认删除操作？',
          onOk: () => {
            this.deleteUserInfo(id)
          },
          onCancel: () => {

          }
        })
      },
      /**
       * 删除功能
       * @param row
       */
      deleteUserInfo (id) {
        const _type = 'DELETE'
        const _url = 'vipsId'
        const _params = {}
        this.requestAjax(_type, _url, _params, id).then((data) => {
            if (data.success) {
              this.$Message.success('删除成功')
              this.loadTable()
            } else {
              this.$Message.error('删除失败')
            }
        })
      },
      /**
       * 上传文件
       * @param file
       * @returns {boolean}
       */
      handleUpload (file) {
        let arr = file.name.split('.')
        if (['xls', 'xlsx', 'xlsm', 'xlt', 'xltx', 'xltm'].indexOf(arr[arr.length - 1]) === -1) {
          this.$Message.error(file.name + '非excel文件，不能导入')
          return false
        }
        let formData = new FormData()
        formData.append('file', file)
        formData.append('type', 'account')
        this.requestFile('POST', 'vipsUpload', formData).then((data) => {
          if (data.success) {
            this.$Message.success('导入成功')
            this.loadTable()
          } else {
            this.$Message.error('导入失败')
          }
        },(err) => {
          this.$Message.error('导入失败')
        })
        return false
      },
      loadXlx () {
        window.location.href = process.env.API + this.getWbkUrl('filesDown') + '?path=/xheditor/soft/template/template_member.xls'
      }
    },
    mounted () {
      this.parms.memberId = this.userData.id
      this.$nextTick(() => {
        window.onresize = () => {
         /* this.height = '' + (document.body.offsetHeight - 325)*/
        //  this.initAllTableScroll()
        }
        this.loadTable()
      //  this.initAllTableScroll()
        document.querySelector('.ivu-page-options-elevator').title = '输入后回车跳至指定页'
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          this.loadTable()
        }, 60 * 1000)
      })
    }
  }
</script>

<style scoped>
  .wrapper{
    margin: 10px;
  }
</style>
