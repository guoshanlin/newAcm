<template>
  <div class="b wrapper-box">
    <h3 class="fz14">参会统计</h3>
    <Menu mode="horizontal" active-name="0" @on-select="menuSelect">
      <MenuItem name="0">报名统计</MenuItem>
      <MenuItem name="1">签到统计</MenuItem>
    </Menu>
    <div v-show="statistics == 0">
      <div class="content-wrapper m-t10 wrapper-border m-t20">
        <div class="clear">
          <span>报名率统计</span>
        </div>
        <div class="fbox fz14 m-t10 ct c3 statistics-wrapper">
          <div class="flex">
            <span class="fz20 c2">{{reportEntered.activity ? reportEntered.activity.number : 0}}</span><br>
            <span>报名总人数</span>
          </div>
          <div class="flex">
            <span class="fz20 c2">{{reportEntered.activity ? reportEntered.activity.numberActual : 0}}</span><br>
            <span>报名成功人数</span>
          </div>
          <div class="flex">
            <span class="fz20 c2">{{reportEntered.activity ? reportEntered.activity.numberRete : 0}}%</span><br>
            <span>报名成功率</span>
          </div>
        </div>
        <div>
          <div class="clear m-b10">
            <Button class="fr" type="primary"  @click="exportTableData('orderInfo')">导出</Button>
          </div>
          <Table border ref="$orderInfo" :columns="registerRateCol" :data="registerRateData"></Table>
        </div>
        <div class="m-t30">
          <Row type="flex" :gutter=5>
            <!--<列表导栏>-->
            <i-col span="16">
              <Row type="flex" justify="start">
                <i-col>
                  <RadioGroup @on-change="orderStatusChange" v-model="timePicker.day" type="button">
                    <Radio label="-1">昨天</Radio>
                    <Radio label="-7">最近7天</Radio>
                    <Radio label="-30">最近30天</Radio>
                  </RadioGroup>
                </i-col>
                <i-col>
                  <div class="m-l5" style="min-width: 350px;">
                    <i-time ref="timePicker" :ids='timePicker.timeArr' :placeholder="timePicker.placeholderArr" :span="timePicker.spanArr" :day="timePicker.day" @on-change="timeChange"></i-time>
                  </div>
                </i-col>
              </Row>

            </i-col>
            <i-col span="8">
              <Row type="flex" justify="end">
                <i-col>
                  <Button type="primary">导出</Button>
                </i-col>
              </Row>
            </i-col>
          </Row>
          <!--<div class="clear">-->
            <!--<RadioGroup  @on-change="rateDateChange" v-model="rate" type="button">-->
              <!--<Radio label="昨天"></Radio>-->
              <!--<Radio label="最近7天"></Radio>-->
              <!--<Radio label="最近30天"></Radio>-->
            <!--</RadioGroup>-->
            <!--<DatePicker class="m-l5" type="datetimerange" v-model="rateDate" @on-ok="datePickerEvent(0)" format="yyyy-MM-dd" placeholder="请选择时间段" style="width: 240px"></DatePicker>-->
            <!--<Button class="fr" type="primary">导出</Button>-->
          <!--</div>-->
          <div class="wrapper-border m-t10">
             <div id="joinChart1" style="height: 260px; width: 100%"></div>
          </div>
        </div>
      </div>
      <div class="content-wrapper m-t20 wrapper-border" style="display: none;">
        <div class="clear">
          <span>报名渠道统计</span>
          <Button class="fr" type="primary">导出</Button>
        </div>
        <Table class="m-t10" border ref="$table" :columns="channelRateCol" :data="channelRateData"></Table>
      </div>
      <div class="content-wrapper wrapper-border m-t20">
        <div class="clear">
          <span>报名订单统计</span>
        </div>
        <div class="fbox fz14 m-t10 ct c3 statistics-wrapper">
          <div class="flex">
            <span class="fz20 c2">{{reportEntered.orders ? reportEntered.orders[0].number : 0}}</span><br>
            <span>订单总数</span>
          </div>
          <div class="flex">
            <span class="fz20 c2">{{reportEntered.orders ? reportEntered.orders[0].validNumber : 0}}</span><br>
            <span>有效订单</span>
          </div>
          <div class="flex">
            <span class="fz20 c2">{{reportEntered.orders ? reportEntered.orders[0].ticketNumber : 0}}</span><br>
            <span>售出票数</span>
          </div>
        </div>
        <div class="m-t30">
          <Row type="flex" :gutter=5>
            <!--<列表导栏>-->
            <i-col span="16">
              <Row type="flex" justify="start">
                <i-col>
                  <RadioGroup @on-change="orderStatusChange" v-model="timePickerTwo.day" type="button">
                    <Radio label="-1">昨天</Radio>
                    <Radio label="-7">最近7天</Radio>
                    <Radio label="-30">最近30天</Radio>
                  </RadioGroup>
                </i-col>
                <i-col>
                  <div class="m-l5" style="min-width: 350px;">
                    <i-time ref="timePickerTwo" :ids='timePickerTwo.timeArr' :placeholder="timePickerTwo.placeholderArr"
                            :span="timePickerTwo.spanArr" :day="timePickerTwo.day" @on-change="timeChangeTwo"></i-time>
                  </div>
                </i-col>
              </Row>

            </i-col>
            <i-col span="8">
              <Row type="flex" justify="end">
                <i-col>
                  <!--<Button type="primary">导出</Button>-->
                </i-col>
              </Row>
            </i-col>
          </Row>
          <!--<div class="clear">-->
            <!--<RadioGroup @on-change="orderStatusChange" v-model="orderStatus" type="button">-->
              <!--<Radio label="昨天"></Radio>-->
              <!--<Radio label="最近7天"></Radio>-->
              <!--<Radio label="最近30天"></Radio>-->
            <!--</RadioGroup>-->
            <!--<DatePicker class="m-l5" type="datetimerange" v-model="orderDate" @on-ok="datePickerEvent(0)" format="yyyy-MM-dd" placeholder="请选择时间段" style="width: 240px"></DatePicker>-->
            <!--<Button class="fr" type="primary">导出</Button>-->
          <!--</div>-->
          <div class="wrapper-border m-t10">
            <div id="joinChart2" style="height: 260px; width: 100%"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="statistics == 1">
      <div class="content-wrapper wrapper-border m-t20">
        <div class="clear">
          <span>签到率统计</span>
        </div>
        <div class="fbox fz14 m-t10 ct c3 statistics-wrapper">
          <div class="flex">
            <span class="fz20 c2">{{reportSign.number}}</span><br>
            <span>报名人数</span>
          </div>
          <div class="flex">
            <span class="fz20 c2">{{reportSign.signNumber}}</span><br>
            <span>签到人数</span>
          </div>
          <div class="flex">
            <span class="fz20 c2">{{reportSign.signRete}}%</span><br>
            <span>签到率</span>
          </div>
        </div>
        <div class="content-wrapper m-t20 wrapper-border">
          <div class="clear">
            <span>签到方式统计</span>
            <Button class="fr" type="primary" @click="exportTableData('reportSign')">导出</Button>
          </div>
          <Table class="m-t10" border ref="$reportSign" :columns="signInCol" :data="signInData"></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import iTime from 'components/date-picker/time-slot.vue'
  export default {
    name: "index",
    data() {
      return {
        statistics: 0,

        registerRateCol: [
          {
            title: "票券类型",
            align: 'center',
            key: "name"
          },
          {
            title: "报名总人数",
            align: 'center',
            key: "total"
          },
          {
            title: "报名成功人数",
            align: 'center',
            key: "actual"
          },
          {
            title: "报名成功率",
            align: 'center',
            key: "rate"
          }
        ],
        registerRateData: [
          {
            name: '免费',
            total: 0,
            actual: '0',
            rate: '0%'
          },
          {
            name: '付费',
            total: 0,
            actual: '0',
            rate: '0%'
          }
        ],

        channelRateCol: [
          {
            title: "渠道表",
            align: 'center',
            key: "name"
          },
          {
            title: "报名人数",
            align: 'center',
            key: "total"
          },
          {
            title: "占比",
            align: 'center',
            key: "rate"
          }
        ],
        channelRateData: [
          {
            name: '邀请函',
            total: 18,
            rate: '50%'
          },
          {
            name: '嘉宾海报',
            total: 32,
            rate: '50%'
          },
          {
            name: '炫耀海报',
            total: 2,
            rate: '50%'
          },
          {
            name: '报名二维码',
            total: 31,
            rate: '50%'
          },
          {
            name: '签到二维码',
            total: 23,
            rate: '50%'
          },
          {
            name: '后台添加',
            total: 212,
            rate: '50%'
          }
        ],

        signInCol: [
          {
            title: "签到方式",
            align: 'center',
            key: "name"
          },
          {
            title: "签到人数",
            align: 'center',
            key: "total"
          },
          {
            title: "占比",
            align: 'center',
            key: "rate"
          }
        ],
        signInData: [
          {
            name: '票券二维码',
            total: 0,
            rate: '0%'
          },
          {
            name: '活动二维码',
            total: 0,
            rate: '0%'
          },
          {
            name: '票券序列号',
            total: 0,
            rate: '0%'
          }
        ],
        orderStatus: "",
        rate: "",

        id: this.$route.query.id,
        reportSign: {number: 0,signNumber: 0,signRete: 0},    // 签到统计数据
        reportEntered: {},     // 报名统计数据
        charts: {},
        chartsOps: {},
        rateDate: '',   // 报名统计时间选择器
        orderDate: '',   // 报名订单统计时间选择器
        charts1Parms: {id: this.$route.query.id, bt: '', et: ''},
        charts2Parms: {id: this.$route.query.id, bt: '', et: ''},
        timePicker: {
          timeArr: ['bTime', 'eTime'],
          placeholderArr: ['开始时间', '结束时间'],
          spanArr: [12, 12],
          day: '-1'
        },
        timePickerTwo: {
          timeArr: ['bT', 'eT'],
          placeholderArr: ['开始时间', '结束时间'],
          spanArr: [12, 12],
          day: '-1'
        },
        timer: {}
      }
    },
    components: {
      iTime
    },
    destroyed () {
      window.onresize = function () {
      }
      clearInterval(this.timer)
    },
    created () {
      setTimeout(() => {
        // 报名统计
        this.requesrReportEntered()
        // 签到统计
        this.requestReportSign()
        // 查询活动报名报表
        // this.requesrReportEnteredDateInfo()
        // // 活动报名订单统计
        // this.requesrReportOrderInfo()
        this.initChart()
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          this.requestReportSign()
          this.requesrReportEnteredDateInfo()
          this.requesrReportEntered()
          this.requesrReportOrderInfo()
        }, 60 * 1000)
      }, 20)
    },
    methods: {
      menuSelect(v){
        this.statistics = v
        /*setTimeout(() => {
          this._resize()
          if (v == 0) {
            //this.initChart()
          }else{

          }
        }, 20)*/
      },
      datePickerEvent(v){
        let bt = '', et = ''
        if(v == 0){
          if(this.rateDate[0] && this.rateDate[1] ){
            bt = new Date(this.rateDate[0]).format("yyyy-MM-dd")
            et = new Date(this.rateDate[1]).format("yyyy-MM-dd")
          }
          this.rate = ''
          this.charts1Parms.day = ''
          this.charts1Parms.bt = bt
          this.charts1Parms.et = et
          this.requesrReportEnteredDateInfo()
        }else{
          if(this.orderDate[0] && this.orderDate[1] ){
            bt = new Date(this.orderDate[0]).format("yyyy-MM-dd")
            et = new Date(this.orderDate[1]).format("yyyy-MM-dd")
          }
          this.orderStatus = ''
          this.charts2Parms.day = ''
          this.charts2Parms.bt = bt
          this.charts2Parms.et = et
          this.requesrReportOrderInfo()
        }
      },
      rateDateChange(v) {
        // this.rateDate = ''
        // this.rate = v
        this.charts1Parms.bt = ''
        this.charts1Parms.et = ''
        this.charts1Parms.day = this._parseDate(v)
        this.requesrReportEnteredDateInfo()
      },
      orderStatusChange(v) {
        return
        this.orderDate = ''
        this.orderStatus = v
        this.charts2Parms.bt = ''
        this.charts2Parms.et = ''
        this.charts2Parms.day = this._parseDate(v)
        this.requesrReportOrderInfo()
      },
      // 签到统计
      requestReportSign () {
        this.requestAjax('get', 'reportSign', {id: this.id}).then(res => {
          if(res.success){
            let data = res.data.data[0], reportSign = this.reportSign
            for(let k in reportSign){
              this.reportSign[k] = data[k] == null || data[k] == '' ?  '0' : data[k]
            }
            for(let i =0, ilen = this.signInData.length; i < ilen; i++){
              this.signInData[i].total = data["signType" + i] == null ? '0' : data["signType" + i]
              this.signInData[i].rate = data["signTypeRete" + i] == null ? '0%' : data['signTypeRete' + i] + '%'
            }
          }
        })
      },
      // 报名统计
      requesrReportEntered () {
        this.requestAjax('get', 'reportEntered', {id: this.id}).then(res => {
          if(res.success){
            this.reportEntered = res.data
            if(this.reportEntered.orderInfo){
              this.registerRateData = [{
                name: '免费报名',
                actual: this.reportEntered.orderInfo[0].freeNumber == null ?  '0': this.reportEntered.orderInfo[0].freeNumber,
                total: this.reportEntered.orderInfo[0].freeActualNumber == null ?  '0': this.reportEntered.orderInfo[0].freeActualNumber,
                rate: this.reportEntered.orderInfo[0].freeRete + '%'
              }, {
                  name: '付费报名',
                actual: this.reportEntered.orderInfo[0].chargeActualNumber == null ?  '0': this.reportEntered.orderInfo[0].chargeActualNumber,
                total: this.reportEntered.orderInfo[0].chargeNumber == null ?  '0': this.reportEntered.orderInfo[0].chargeNumber,
                  rate: this.reportEntered.orderInfo[0].chargeRete + '%'
                }]
            }
          }
        })
      },
      // 查询活动报名报表
      requesrReportEnteredDateInfo() {
        this.requestAjax('get', 'reportEnteredDateInfo', this.charts1Parms).then(res => {
          if (res.success){
            let rows = res.data.rows,
                timerArray = [], freeActualArray = [], chargeActualArray = []
            rows.forEach((v, i) => {
              timerArray.push(v.cTime)
              freeActualArray.push(v.freeActualNumber)
              chargeActualArray.push(v.chargeActualNumber)
            })
            this.chartsOps.chart1.series[0].data = freeActualArray
            this.chartsOps.chart1.series[1].data = chargeActualArray
            this.chartsOps.chart1.xAxis.data = timerArray
            this.charts.joinChart1Chart.setOption(this.chartsOps.chart1)
          }
        })
      },
      // 活动报名订单统计
      requesrReportOrderInfo() {
        this.requestAjax('get', 'reportOrderInfo', this.charts2Parms).then(res => {
          if (res.success){
            let rows = res.data.rows,
              timerArray = [], countArray = [], numberArray = []
            rows.forEach((v, i) => {
              timerArray.push(v.cTime)
              countArray.push(v.count)
              numberArray.push(v.number)
            })
            this.chartsOps.chart2.series[0].data = countArray
            this.chartsOps.chart2.series[1].data = numberArray
            this.chartsOps.chart2.xAxis.data = timerArray
            this.charts.joinChart2Chart.setOption(this.chartsOps.chart2)
          }
        })
      },
      exportTableData(name){
        this.$refs["$"+name].exportCsv({filename:name})
      },
      initChart () {
        this.charts.joinChart1Chart = this.echarts.init(document.getElementById('joinChart1'), 'shine')
        this.charts.joinChart2Chart = this.echarts.init(document.getElementById('joinChart2'), 'shine')

        for(let i = 1; i < 3; i++){
          let option = {
            color: ["#00ADFF","#5fff21"],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#283b56'
                }
              }
            },
            grid: {
              top: '10%',
              left: '5%',
              right: '10%',
              bottom: '10%',
              width: '85%',
              height: '80%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              axisLabel: {
                color: "#ccc"
              },
              data: []
            },
            yAxis: {
              type: 'value',
              scale: true,
              axisLabel: {
                color: "#ccc"
              },
              splitLine: {
                lineStyle: {
                  type: 'dotted',
                  color: '#515151'
                }
              },
              min:0,
              boundaryGap: [0.2, 0.2]
            },
            series: [
              {
                type: 'line',
                // showSymbol: false,
                name: i == 1 ? '免费数' : "订单数",
                data: []
              },
              {
                type: 'line',
                // showSymbol: false,
                name: i == 1 ? '收费数' : "售出票数",
                data: []
              }
            ]
          }
          this.chartsOps["chart" + i] = option
        }

        this.charts.joinChart1Chart.setOption(this.chartsOps.chart1)
        this.charts.joinChart2Chart.setOption(this.chartsOps.chart2)
      },
      _resize () {
        for (let char in this.charts) {
          this.charts[char].resize()
        }
      },
      _parseDate(v){
        switch (v) {
          case "昨天":
            return 1
          case "最近7天":
            return 7
          case "最近30天":
            return 30
        }
      },
      timeChange (id) {
        let _time = this.$refs.timePicker.getValue()
        if (id) {
          this.timePicker.day = this.getTimeDay(_time, this.timePicker.timeArr)
        }
        this.charts1Parms.bt = _time.bTime
        this.charts1Parms.et = _time.eTime
        this.requesrReportEnteredDateInfo()
      },
      timeChangeTwo (id) {
        let _time = this.$refs.timePickerTwo.getValue()
        if (id) {
          this.timePickerTwo.day = this.getTimeDay(_time, this.timePickerTwo.timeArr)
        }
        this.charts2Parms.bt = _time.bT
        this.charts2Parms.et = _time.eT
        this.requesrReportOrderInfo()
      },
      getTimeDay (timeObj, arr) {
        if (timeObj[arr[0]] == new Date().addTimes('-1d').format('yyyy-MM-dd') && timeObj[arr[1]] == new Date().addTimes('-1d').format('yyyy-MM-dd')) {
          return '-1'
        } else if (timeObj[arr[0]] == new Date().addTimes('-1d').format('yyyy-MM-dd') && timeObj[arr[1]] == new Date().addTimes('-7d').format('yyyy-MM-dd')) {
          return '-7'
        } else if (timeObj[arr[0]] == new Date().addTimes('-1d').format('yyyy-MM-dd') && timeObj[arr[1]] == new Date().addTimes('-30d').format('yyyy-MM-dd')) {
          return '-30'
        } else {
          return ''
        }
      }
    }
  }
</script>

<style scoped>

  .statistics-wrapper {
    padding: 36px 0;
    border-top: 1px solid #e3e2e5;
  }

</style>
