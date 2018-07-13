<template>
  <div class="b wrapper-box">
    <h3 class="fz14">活动概况</h3>
    <div class="content-wrapper m-t10 wrapper-border m-t20">
      <div class="clear">
        <span>报名签到统计</span>
        <a class="c1 fr" @click="routePush('/base/joinStatistics',rowId)">详情</a>
      </div>
      <div class="fbox fz14 m-t10 ct c3 statistics-wrapper">
        <div class="flex">
          <span class="fz20 c2">{{report.number}}</span><br>
          <span>报名成功人数</span>
        </div>
        <div class="flex">
          <span class="fz20 c2">{{report.signNumber}}</span><br>
          <span>签到人数</span>
        </div>
        <div class="flex">
          <span class="fz20 c2">{{report.signRete}}%</span><br>
          <span>签到率</span>
        </div>
      </div>
    </div>
    <div class="content-wrapper m-t10 wrapper-border">
      <div class="clear">
        <span>门票订单统计</span>
        <a class="c1 fr" @click="routePush('/base/joinStatistics',rowId)">详情</a>
      </div>
      <div class="fbox fz14 m-t10 ct c3 statistics-wrapper">
        <div class="flex">
          <span class="fz20 c2">{{report.ordersNumber}}</span><br>
          <span>有效订单</span>
        </div>
        <div class="flex">
          <span class="fz20 c2">{{report.ticketNumber}}</span><br>
          <span>售出门票</span>
        </div>
        <div class="flex">
          <span class="fz20 c2">{{report.ticketPriceActual}}</span><br>
          <span>活动金额</span>
        </div>
      </div>
    </div>
    <div class="content-wrapper m-t10 wrapper-border">
      <div class="clear">
        <span>互动统计</span>
        <a class="c1 fr" @click="routePush('/base/interactivityStatistics',rowId)">详情</a>
      </div>
      <div class="posct m-t10 statistics-wrapper" style="padding: 80px 0">
        暂无统计数据
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        data: '',
        report: {
          number: 0,
          signNumber: 0,
          signRete: 0,
          ordersNumber: 0,
          ticketNumber: 0,
          ticketPriceActual: 0
        },
        rowId: this.$route.query.id
      }
    },
    created () {
      setTimeout(() => {
        this.getTicket()
      }, 20)
    },
    methods: {
      getTicket () {
        this.requestAjax('get', 'report', {id: this.$route.query.id}).then(res => {
          if(res.success){
            let ticket = res.data.ticket[0],
                orders = res.data.orders[0]
            for(let k in orders){
              this.report[k] = orders[k]
            }
            for(let k in ticket){
              this.report[k] = ticket[k]
            }
            this.report.ordersNumber = orders.number
          }
        })
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
