<template>
  <div class="form-div">
    <i-table border :columns="columns" :data="data"></i-table>
    <div class="m-t20 t-center form-div-button">
      <Button type="success" @click="saveFrom">保存信息</Button>
      <Button type="ghost" @click="hideFrom">
        <Icon type="chevron-up"></Icon>收起表单
      </Button>
    </div>
    <!--新增表单承载标签-->
    <input-from v-if="formMoal.formInput" @changeOptions="getNewVal" :options="formMoal.formOptions"
                :value="formMoal.inputVal" :modalDisabled='formMoal.modalDisabled'
                :modalshow="formMoal.formInputModal"/>
  </div>
</template>

<script>
  import inputFrom from 'components/modal/inputFrom.vue'
  export default {
    name: 'index',
    data () {
      return {
        columns: [
          {
            width: 100,
            title: '是否必填',
            render: (h, params) => {
              return h('div', [h('Checkbox', {
                style: {marginLeft: '20px'},
                props: {value: params.row.required},
                on: {
                  'on-change': (value) => {
                    this.data[params.index].required = value
                  }
                }
              })])
            }
          },
          {
            title: '效果预览',
            render: (h, params) => {
              return h('div', [h('Form', {
                  style: {marginLeft: '10px'},
                  props: {labelWidth: 80}
                },
                [
                  h('FormItem',
                    {
                      props: {label: params.row.name, required: params.row.required}
                    },
                    [
                      h('Input',
                        {
                          style: {marginLeft: '10px'},
                          props: {placeholder: params.row.placeholder, disabled: true}
                        })
                    ]
                  )
                ])])
            }
          },
          {
            title: '操作',
            width: 150,
            align: 'left',
            render: (h, params) => {
              if (params.row.type !== 0) {
                return h('div',
                  [
                  h('Button', {
                    style: {marginLeft: '10px'},
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.addFrom(params.row)
                      }
                    }
                  }, '新增'),
                  h('Button', {
                    style: {marginLeft: '10px'},
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.data.splice(params.index, 1)
                      }
                    }
                  }, '删除')
                ])
              } else {
                return h('div', [
                  h('Button', {
                    style: {marginLeft: '10px'},
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.addFrom(params.row)
                      }
                    }
                  }, '新增')
                ])
              }
            }
          }
        ],
        data: [
          {
            name: '姓名',
            required: true,
            placeholder: '请填写姓名',
            type: 0
          },
          {
            name: '手机号码',
            required: true,
            placeholder: '请填写手机号码',
            type: 0
          },
          {
            name: '公司',
            required: true,
            placeholder: '请填写您所在公司',
            type: 0
          },
          {
            name: '部门',
            required: true,
            placeholder: '请填写您所在部门',
            type: 0
          }
        ],
        formMoal: {
          formInput: false,
          formOptions: {
            title: '添加自定义表单',
            width: '568',
            opintions: [
              [
                {
                  title: '表单名',
                  id: 'name',
                  type: 'input',
                  titlespan: 6,
                  colspan: 16,
                  required: true
                }
              ],
              [
                {
                  title: '表单提示内容',
                  id: 'placeholder',
                  type: 'input',
                  titlespan: 6,
                  colspan: 16,
                  required: true
                }
              ]
            ],
            selectAjax: [],
            button: [{
              type: 'primary',
              title: '确定',
              click: 'handle'
            }]
          },
          inputVal: {
            name: '',
            placeholder: ''
          },
          formInputModal: false,
          modalDisabled: false
        }
      }
    },
    components: {
     inputFrom
    },
    methods: {
      addFrom (row) {
        this.formMoal.inputVal.name = row.name
        this.formMoal.inputVal.placeholder = row.placeholder
        this.formMoal.formInput = true
        this.formMoal.formInputModal = true
        this.formMoal.modalDisabled = false
      },
      getNewVal (val, type) {
        if (type === 'cancel') { // 按钮操作
          this.formMoal.formInputModal = false // 隐藏modal
          return
        }
        this.data.push({name: val.name, required: false, placeholder: val.placeholder, type: 1})
        this.formMoal.formInputModal = false // 隐藏modal
      },
      hideFrom () {
        this.$emit('on-hide')
      },
      saveFrom () {
        this.$emit('save-from', this.data)
      }
    }
  }
</script>

<style scoped>
  .ivu-form-item {margin-bottom: inherit}
  .form-div{margin: 20px 0; position: relative}
  .form-div-button{padding-bottom: 2px}
</style>
