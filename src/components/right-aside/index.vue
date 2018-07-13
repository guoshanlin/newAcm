<template>
  <div>
    <div class=" b wrapper-box m-l10">
      <div class="clear rig-title">
        <h3 class="c2">活动</h3>
      </div>
      <ul class="rig-list-wrapper">
        <li>可使用场次<span class="c4 fr">0场</span></li>
        <li>已创建场次<span class="fr">0场</span></li>
      </ul>
      <Button type="error" size="large" class="meeting-go-buy">立即订购</Button>
    </div>
    <div class="b wrapper-box m-l10 m-t10">
      <div class="clear rig-title m-b10">
        <h3 class="c2">活动官方公众号</h3>
      </div>
      <img src="../../assets/jrh_code.png" width="100%"/>
    </div>
    <div class=" b wrapper-box m-l10 m-t10">
      <div class="clear rig-title">
        <h3 class="c2">使用指南</h3>
      </div>
      <ul class="rig-list-wrapper">
        <li><a class="c2">会前设置</a></li>
        <li><a class="c2">会中设置</a></li>
        <li><a class="c2">参会管理</a></li>
        <li><a class="c2">数据统计</a></li>
      </ul>
    </div>
    <div class=" b wrapper-box m-l10 m-t10">
      <div class="clear rig-title">
        <h3 class="c2">使用指南</h3>
      </div>
      <ul class="rig-list-wrapper">
        <li><a class="c2">如何进入活动小程序？</a></li>
        <li><a class="c2">活动邀请函如何修改基本信息？</a></li>
        <li><a class="c2">活动邀请函如何修改活动议程？</a></li>
        <li><a class="c2">如何查看报名的具体人员情况？</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
      }
    }
  }
</script>

<style scoped>
  .rig-list-wrapper {
    padding: 10px 0
  }

  .rig-list-wrapper li {
    line-height: 40px;
  }

  .rig-list-wrapper li:nth-child(n+2) {
    border-top: 1px solid #f4f4f4;
  }

  .meeting-go-buy {
    display: block!important;
    margin: 0 auto;
    width: 80%;
  }

  .rig-list-wrapper li a:hover {
    color: #118fff !important;
  }

  .rig-title h3:before {
    content: '';
    display: block;
    width: 3px;
    height: 14px;
    background: #2589ff;
    display: inline-block;
    margin-right: 5px;
    vertical-align: -2px;
  }
</style>
