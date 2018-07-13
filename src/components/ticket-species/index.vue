<template>
  <div class="ticket-div">
    <i-table ref="myTable" border :columns="columns" :data="data"></i-table>
<!--    <div class="t-left ticket-button">
      <i-button type="primary" @click="addTicket">添加票种</i-button>
    </div>-->
  </div>
</template>

<script>
  import expandRow from 'components/table-expand/index.vue'
  export default {
    name: 'index',
    data () {
      return {
        columns: [
          {title: '',
            type: 'expand',
            width: 1,
            render: (h, params) => {
              return h(expandRow, {
                props: {
                  row: params.row
                },
                on: {
                  onExpand: (data, type) => {
                    if (type !== 'hide') {
                      this.data[params.index].explain = data.explain
                      this.data[params.index].toExamine = data.toExamine
                      this.data[params.index].orderDate = data.orderDate
                      this.data[params.index].orderTime = data.orderTime
                      this.data[params.index].effectiveDate = data.effectiveDate
                      this.data[params.index].effectiveTime = data.effectiveTime
                    }
                    this.data[params.index].open = false
                    this.$refs.myTable.toggleExpand(params.index)
                  }
                }
              })
            }},
          {
            title: '票种',
            render: (h, params) => {
              return h('Select', {
                style: {},
                props: {value: params.row.type, disabled: false},
                on: {
                  'on-change': (value) => {
                    if (value === 'free') {
                      this.data[params.index].price = ''
                      this.data[params.index].placeholder = '免费'
                    } else {
                      this.data[params.index].price = 0
                      this.data[params.index].placeholder = ''
                    }
                    this.data[params.index].member = 'ordinary'
                    this.onChange(value, 'type', params.index)
                  }
                }
              },
              [
                  h('Option', {
                    props: {value: 'free', key: 'free'}
                  }, '免费'),
                  h('Option', {
                    props: {value: 'charge', key: 'charge'}
                  }, '收费')
              ])
            }
          },
        /*  {
            title: '票名',
            render: (h, params) => {
              return h('div', [
                h('Input',
                  {
                    style: {width: '100%'},
                    props: {value: params.row.name, placeholder: '请输入票名'},
                    on: {
                      'on-blur': (event) => {
                        this.onChange(event.target.value, 'name', params.index)
                      }
                    }
                  })])
            }
          },*/
        /*  {
           /!* width: 150,*!/
            title: '类别',
            render: (h, params) => {
              return h('Select', {
                  style: {},
                  props: {value: params.row.member, disabled: params.row.type === 'free' ? true : false},
                  on: {
                    'on-change': (value) => {
                      this.onChange(value, 'member', params.index)
                    }
                  }
                },
                [
                  h('Option', {
                    props: {value: 'member', key: 'member'}
                  }, '会员'),
                  h('Option', {
                    props: {value: 'ordinary', key: 'ordinary'}
                  }, '普通')
                ])
            }
          },*/
          {
            title: '普通票价',
            render: (h, params) => {
              return h('div', [
                h('InputNumber',
                {
                  style: {width: '100%'},
                  props: {value: +params.row.price, placeholder: params.row.placeholder, disabled: params.row.type === 'free' ? true : false},
                  on: {
                    'on-change': (value) => {
                      console.log(value)
                      this.remData[params.index].price = value
                    },
                    'on-blur': () => {
                      this.data[params.index].price = this.remData[params.index].price
                      this.data[params.index].price = ('' + this.remData[params.index].price).replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
                      //this.onChange(this.remData[params.index].price, 'price', params.index)
                    }
                  }
                })])
            }
          },
          {
            title: '会员票价',
            render: (h, params) => {
              return h('div', [
                h('InputNumber',
                {
                  style: {width: '100%'},
                  props: {value: +params.row.vPrice, placeholder: params.row.placeholder, disabled: params.row.type === 'free' ? true : false},
                  on: {
                    'on-change': (value) => {
                      this.remData[params.index].vPrice = value
                    },
                    'on-blur': () => {
                      this.data[params.index].vPrice = this.remData[params.index].vPrice
                      this.data[params.index].vPrice = ('' + this.remData[params.index].vPrice).replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
                     // this.onChange(this.remData[params.index].vPrice, 'vPrice', params.index)
                    }
                  }
                })])
            }
          }
 /*         {
            width: 220,
            title: '限额',
            render: (h, params) => {
              return h('div', [
                h('InputNumber',
                {
                  style: {width: '100%'},
                  props: {value: +params.row.quota},
                  on: {
                    'on-change': (value) => {
                      this.remData[params.index].quota = value
                    },
                    'on-blur': (event) => {
                      this.data[params.index].quota = this.remData[params.index].quota
                  /!*    this.onChange(this.remData[params.index].quota, 'quota', params.index)*!/
                    }
                  }
                })])
            }
          }*/
        /*  {
            title: '操作',
            width: 150,
            align: 'left',
            render: (h, params) => {
              if (this.data.length > 1) {
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
                          this.data[params.index].open = !this.data[params.index].open
                          this.$nextTick(() => {
                            this.openEpand()
                          })
                        }
                      }
                    }, '更多'),
                    h('Button', {
                      style: {marginLeft: '10px'},
                      props: {
                        type: 'error',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                          this.data.splice(params.index, 1)
                          this.$nextTick(() => {
                            this.openEpand()
                          })
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
                       this.data[params.index].open = !this.data[params.index].open
                        this.$nextTick(() => {
                          this.openEpand()
                        })
                      }
                    }
                  }, '设置')
                ])
              }
            }
          }*/
        ],
        data: [
          {
            name: '免费票',
            type: 'free',
            price: '',
            vPrice: '',
            quota: 0,
            open: true,
            state: 0,
            member: 'ordinary',
            placeholder: '免费',
            explain: '',
            toExamine: false,
            orderDate: true,
            orderTime: [],
            effectiveDate: true,
            effectiveTime: []
          }
        ],
        remData: [
          {
            price: 0,
            quota: 0,
            vPrice: 0
          }
        ],
        timer: null
      }
    },
    components: {
      expandRow
    },
    methods: {
      hideFrom () {
        this.$emit('on-hide')
      },
      saveFrom () {
        this.$emit('save-ticket', this.data)
      },
      addTicket () {
        const _obj = {
          name: '',
          type: 'free',
          price: '',
          vPrice: '',
          quota: 0,
          open: true,
          state: 0,
          member: 'ordinary',
          placeholder: '免费',
          explain: '',
          toExamine: false,
          orderDate: true,
          orderTime: [],
          effectiveDate: true,
          effectiveTime: []
        }
        this.data.push(Object.assign({}, _obj))
        this.remData.push({price: '', quota: 0, vPrice: ''})
        this.setTimer(() => {
          this.openEpand()
        }, 200)
      },
      openEpand () {
         this.data.forEach((item, index) => {
           if (item.open) {
             /* this.$refs.myTable.toggleExpand(index)*/
           }
         })
      },
      onChange (val, type, index) {
        let _type = ['type', 'member']
        if (_type.indexOf(type) !== -1) {
          this.data[index][type] = val
          this.$nextTick(() => {
            this.openEpand()
          })
        } else {
          this.setTimer(() => {
            this.data[index][type] = val
            this.$nextTick(() => {
              this.openEpand()
            })
          }, 50)
        }
      },
      setTimer (fn, time) {
          if (this.timer) {
            clearTimeout(this.timer)
          }
          this.timer = setTimeout(() => {
            fn()
          }, time)
      },
      getTicketData () {
        return this.data
      }
    },
    beforeCreate () {
      this.$nextTick(() => {
        this.openEpand()
      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {margin-bottom: inherit}
  .ticket{margin: 20px 0; position: relative}
  .ticket-button{padding: 5px;}
</style>
