<template>
  <div>
    <Row type="flex">
       <i-col :span="6">
         <div class="m-b15 m-t15">
           <div class="ivu-input-wrapper ivu-input-type">
             <input type="text" id="suggestId" name="address_detail" placeholder="地址" v-model="address_detail" class="ivu-input">
           </div>
         </div>
       </i-col>
       <i-col :span="18">
         <div class="p-10">
           <div id="allmap"></div>
         </div>
       </i-col>
    </Row>
  </div>
</template>
<script>
  import BMap from 'BMap'
  export default {
    data () {
      return {
        address_detail: null, // 详细地址113.973369 22.545597
        userlocation: {lng: 113.973369, lat: 22.545597},
        map: ''
      }
    },
    methods: {

    },
    mounted () {
      this.$nextTick(() => {
        let th = this
        // 创建Map实例
        th.map = new BMap.Map('allmap')
        // 初始化地图,设置中心点坐标，
        let point = new BMap.Point(113.973369, 22.545597) // 创建点坐标，
        th.map.centerAndZoom(point, 15)
        th.map.enableScrollWheelZoom()
        let ac = new BMap.Autocomplete({'input': 'suggestId', 'location': th.map})
        let myValue
        ac.addEventListener('onconfirm', function (e) { // 鼠标点击下拉列表后的事件
          let _value = e.item.value
          myValue = _value.province + _value.city + _value.district + _value.street + _value.business
          this.address_detail = myValue
          setPlace()
        })
        // 测试输出坐标（指的是输入框最后确定地点的经纬度）
        th.map.addEventListener('click', (e) => {
          th.userlocation = e.point
          let _point = new BMap.Point(th.userlocation.lng, th.userlocation.lat)
          let gc = new BMap.Geocoder()
          gc.getLocation(_point, (rs) => {
            let addComp = rs.addressComponents
            let _address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
             //alert(_address)
            this.address_detail = _address
          })
          // 经度
          console.log(th.userlocation.lng)
          // 维度
          console.log(th.userlocation.lat)
        })
        function setPlace () {
          th.map.clearOverlays() // 清除地图上所有覆盖物
          function myFun () {
            th.userlocation = local.getResults().getPoi(0).point // 获取第一个智能搜索的结果
            th.map.centerAndZoom(th.userlocation, 18)
            th.map.addOverlay(new BMap.Marker(th.userlocation)) // 添加标注
          }

          let local = new BMap.LocalSearch(th.map, { // 智能搜索
            onSearchComplete: myFun
          })
          local.search(myValue)
        }
      })
    }
  }
</script>
<style scoped>
  #allmap{
    width:100%;
    height: 400px;
    font-family: "微软雅黑";
    border:1px solid green;
  }
</style>
