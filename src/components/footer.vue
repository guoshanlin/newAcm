<template>
  <div class="footer">
    <section v-if="showSlogan" class="slogan m-t20 c">
      <div style="position:relative; z-index: 2">
        <Row type="flex" align="center">
          <i-col>
            <h3 class="fz16">公众号</h3>
            <img width="150" class="m-l10 m-t10" src="../assets/jrh_code.png"/>
          </i-col>
          <i-col>
            <div class="m-l40 m-r40 m-t30">
              <h3 class="fz32">聚热会</h3>
              <p class="fz15">做最有营养的活动</p>
              <p>邮箱：linwb@coreware.com.cn</p>
            </div>
          </i-col>
          <i-col>
            <h3 class="fz16">合作微信：nevan09</h3>
            <img  width="150" class="m-l10 m-t10" src="../assets/poho.png"/>
          </i-col>
        </Row>
        <!--<a href="javascript:void(0)">联系我们</a>-->
      </div>
      <div class="bg"></div>
    </section>
    <div class="c3 copyright">
      @2018- Coreware Software, Inc. | All Rights Reserved. 广州科微软件有限公司
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      showSlogan: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped>

  .slogan {
    height: 360px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-image: url(../assets/slogan_bg.jpg);
    color: #eee;
    text-align: center;
    padding: 55px 20px;
    position: relative;
  }

  .slogan h3 {
    font-weight: 500;
    line-height: 36px;
  }

  .slogan p {
    font-size: 14px;
    margin: 20px 0;
  }

  .slogan a {
    background-color: rgba(255, 255, 255, .1);
    border: 1px rgba(255, 255, 255, .2) solid;
    padding: 12px 32px;
    color: #fff;
    display: inline-block;
    font-size: 18px;
    border-radius: 4px;
  }

  .slogan a:hover {
    background: rgba(255, 255, 255, .3);
  }

  .bg {
    background-color: rgba(0, 0, 0, .4);
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
  }

  .copyright {
    background-color: #fff;
    border-top: 1px #f2f2f2 solid;
    text-align: center;
    padding: 12px;
    line-height: 28px;
  }
  .icon img{
     width: 100px;
  }

</style>
