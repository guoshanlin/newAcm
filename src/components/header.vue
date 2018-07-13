<template>
  <div class="header b">
    <section class="wrapper">
      <nav class="top-nav clear">
        <div class="top-menu fl">
          <ul class="menu c3" v-if="!showAdmin">
            <li class="menu-item menu-item-welcome">您好，欢迎访问本站！</li>
            <li class="menu-item menu-item-login">
              <a class="user-login" href="javascript:void(0)" @click="routePush('/login')">登录</a>
            </li>
            <!--<li class="menu-item menu-item-reg">-->
              <!--<a href="javascript:void(0)" @click="routePush('/register')">注册</a>-->
            <!--</li>-->
          </ul>
          <ul class="menu c3" v-if="showAdmin">
            <li class="menu-item menu-item-welcome">您好，欢迎访问本站！</li>
            <li class="menu-item menu-item-reg">
              <Dropdown  v-if="showAdmin"  class="drop-index-header" @on-click="handleSubmit">
                <a href="javascript:void(0)" class="c3">{{userData.nickName}}<Icon type="arrow-down-b"></Icon></a>
                <DropdownMenu slot="list">
                  <DropdownItem name="activity">我的活动</DropdownItem>
                  <DropdownItem name="my" divided>个人信息</DropdownItem>
                  <!--<DropdownItem name="password" divided>修改密码</DropdownItem>-->
                  <DropdownItem  name="logout" divided>退出</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <!--<a href="javascript:void(0)" @click="passModalShow = true">修改密码</a>-->
            </li>
            <!--<li class="menu-item menu-item-reg">-->
            <!--<a href="javascript:void(0)" @click="logout">退出</a>-->
            <!--</li>-->
          </ul>
        </div>
        <div class="top-menu fr">
          <ul class="menu">
            <!--<li class="menu-item"><a href="javascript:void(0)">公告</a></li>-->
            <!--<li class="menu-item"><a href="javascript:void(0)">地图</a></li>-->
            <!--<li class="menu-item"><a href="javascript:void(0)">标签</a></li>-->
            <!--<li class="menu-item"><a href="javascript:void(0)">链接</a></li>-->
            <li v-if="showAdmin" class="menu-item"><a href="javascript:void(0)" @click="routePush('/meeting')">主办方中心</a></li>
            <li v-if="showAdmin" class="menu-item"><a href="javascript:void(0)" class="c1" @click="initiatingActivity"><Icon class="fz15" type="paper-airplane"></Icon> 发布活动</a></li>
          </ul>
        </div>
      </nav>

      <nav class="header-nav clear fbox">
        <a href="javascript:void(0)" class="logo fl" title="聚热会">
          <img src="../assets/logo_core.gif" alt="聚热会">
        </a>
        <div class="flex posct">
          <div class="search-wrapper fbox">
            <input v-model="searchValue" class="search"/>
            <a class="search-btn" href="javascript:void(0)" @click="searchEvent">搜索</a>
          </div>
        </div>
        <div class="header-menu fr fz14">
          <ul class="menu">
            <li class="menu-item">
              <a href="javascript:void(0)" @click="routePush('/index')">首页</a>
            </li>
            <li class="menu-item" v-for="(item, index) in findTree" :key="index">
              <a href="javascript:void(0)" @click="routePush('/category','','',{category:item.title,pid:item.id})">{{item.title}}</a>
            </li>
          </ul>
        </div>
      </nav>

    </section>
    <i-password :show="passModalShow" @cancel="passModalShow = false"></i-password>
    <input-from v-if="inputForm.show" @changeOptions="getInputVal" :options="inputForm.option" :value="inputForm.value" :modalDisabled="inputForm.modalDisabled"
                :modalshow="inputForm.modalshow"/>
  </div>
</template>

<script>
  import {setIsLogin, setUserInfo} from 'js/cache'
  import {mapMutations, mapGetters} from 'vuex'
  import iPassword from 'components/modal/password'
  import inputFrom from 'components/modal/inputFrom.vue'

  export default {
    data () {
      return {
        searchValue: '',
        showAdmin: false,
        passModalShow: false,
        loginShow: this.$route.query.id == 'password' ? true : false,
        inputForm: {
          show: false,
          modalDisabled: false,
          modalshow: false,
          option: {},
          value: {}
        }, // 表单参数
        findTree: {}
      }
    },
    created () {
      setTimeout(() => {
        if (this.$route.query.keyWord) {
          this.searchValue = this.$route.query.keyWord
        }
        this.activitysConfig()
      }, 20)
    },
    computed: {
      ...mapGetters([
        'userData',
        'isLogin'
      ])
    },
    mounted () {
      this.$nextTick(() => {
        this.showAdmin = this.isLogin
      })
    },
    methods: {
      ...mapMutations({
        setUserDate: 'SET_USERDATA',
        setIsLogin: 'SET_ISLOGIN'
      }),
      searchEvent () {
        if (this.$route.path != '/category') {
          this.routePush('/category', '', '', Object.assign({}, this.$route.query, {keyWord: this.searchValue}))
        } else {
          this.$emit('search', this.searchValue)
        }
      },
      handleSubmit (name) {
        console.log(name)
        switch ('' + name) {
          case 'activity': // 我的活动/展会
            this.routePush('/meeting')
            break
          case 'my': // 个人信息
            this.requestAjax('GET', 'members', {id:this.userData.id}).then((data) => {
              if (data.success) {
                this.setUserDate(data.data.rows[0])
                setUserInfo(data.data.rows[0])
                this.addOrModify(data.data.rows[0])
              } else {
                this.$Message.success('查询用户信息失败')
              }
            })
            // this.routePush('/meeting')
            break
          case 'logout': // 退出登录
            this.logout()
            break
          case 'password': // 修改密码
            this.passModalShow = true
            break
          default:
        }
      },
      logout () {
        this.requestAjax('POST', 'logout', {}).then((res) => {
          this.showAdmin = false
          setIsLogin(false)
          this.setIsLogin(false)
          this.setUserDate(null)
          setUserInfo(null)
          this.routePush('/index')
        }, () => {
          this.showAdmin = false
          setIsLogin(false)
          this.setIsLogin(false)
          this.setUserDate(null)
          setUserInfo(null)
          this.routePush('/index')
        })
      },
      /**
       *新增或修改用户
       */
      addOrModify (row) {
        this.inputForm.modalshow = true
        this.inputForm.show = true
        this.inputForm.modalDisabled = false
        this.inputForm.option = {
          title: '个人信息',
          width: '768',
          opintions: [
            [
              {
                title: '姓名',
                id: 'name',
                type: 'input',
                titlespan: 3,
                colspan: 9,
                required: true
              },
              {
                title: '昵称',
                id: 'nickName',
                type: 'input',
                titlespan: 3,
                colspan: 9,
                required: true
              }
            ],
            [
              {
                title: '手机',
                id: 'phone',
                type: 'input',
                titlespan: 3,
                colspan: 9,
                required: true,
                valueType: 'mobilePhone'
              },
              {
                title: '银行卡号',
                id: 'bankCard',
                type: 'bankCard',
                titlespan: 3,
                colspan: 9,
                required: false,
                relation: 'bank',
                valueType: 'bankCheck'
              }
            ],
            [
              {
                title: '开户名',
                id: 'bankUser',
                type: 'input',
                titlespan: 3,
                colspan: 9,
                required: false
              },
              {
                title: '开户行',
                id: 'bank',
                type: 'input',
                titlespan: 3,
                colspan: 9,
                relation: '',
                required: false
              }
            ],
            [
              {
                title: '邮箱',
                id: 'email',
                type: 'input',
                titlespan: 3,
                colspan: 9,
                required: false,
                valueType: 'email'
              },
              {
                title: '性别',
                id: 'sex',
                type: 'select',
                titlespan: 3,
                colspan: 9,
                required: false,
                relation: ''
              }
            ],
            [
              {
                title: '微信号',
                id: 'wechatNumber',
                type: 'input',
                titlespan: 3,
                colspan: 9,
                required: false
              },
              {
                title: '类型',
                id: 'type',
                type: 'select',
                titlespan: 3,
                colspan: 9,
                relation: '',
                required: false
              }
            ],
            [
              {
                title: '爱好',
                id: 'hobby',
                type: 'input',
                titlespan: 3,
                colspan: 9,
                required: false
              },
              {
                title: '公司',
                id: 'company',
                type: 'input',
                titlespan: 3,
                colspan: 9,
                required: false
              }
            ],
            [
              {
                title: '职位',
                id: 'position',
                type: 'input',
                titlespan: 3,
                colspan: 9,
                required: false
              },
              {
                title: '地址',
                id: 'address',
                type: 'input',
                titlespan: 3,
                colspan: 9,
                required: false
              }
            ]
          ],
          button: [{
            type: 'primary',
            title: '修改',
            click: 'handle'
          }]
        }
        this.inputForm.value = {
          name: row.name,
          nickName: row.nickName,
          email: row.email,
          phone: row.phone,
          sex: row.sex,
          type: row.type,
          hobby: row.hobby,
          company: row.company,
          position: row.position,
          address: row.address,
          bank: row.bank,
          bankCard: row.bankCard,
          wechatNumber: row.wechatNumber,
          bankUser: row.bankUser,
          id: row.id
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
        this.requestAjax('post', 'members', newVal).then((data) => {
          if (data.success) {
            this.$Message.success('修改信息成功')
            let _obj = {}
            Object.assign(_obj, this.userData,newVal )
            this.setUserDate(_obj)
            setUserInfo(_obj)
            this.inputForm.modalshow = false
          } else {
            this.$Message.success('修改信息失败')
          }
          this.inputForm.modalDisabled = false
        }, () => {
          this.$Message.success('修改信息失败')
          this.inputForm.modalDisabled = false
        })
      },
      activitysConfig () {
        this.requestAjax('get', 'findTree', {}).then((data) => {
          // {title: '行业', radio: ['IT互联网', '创业', '科技', '金融','游戏','文娱','电商','教育','营销','设计','地产','医疗','服务业']},
          this.findTree = []
          if (data.success) {
            this.findTree = JSON.parse(data.data.rows).children
          }
        }, () => {

        })
      },
      initiatingActivity () {
        if(this.isLogin && this.userData.phone == '') {
          this.$Message.error({
            content: '请先完善个人信息，再发布活动',
            duration: 10,
            closable: true
          })
          return
        }
        if (this.isLogin) {
          this.routePush('/initiatingActivity')
        } else {
          this.$Message.error('请先登入')
        }
      },
    },
    components: {
      iPassword,
      inputFrom
    }
  }
</script>

<style scoped>

  .header {
    height: 108px;
    border-bottom: 1px #f2f2f2 solid;
    height: 108px;
    padding: 4px 20px 0;
  }
  .wrapper {
    width: 1200px;
    margin: 0 auto;
    clear: both;
  }
  .top-nav {
    height: 36px;
  }
  ul.menu>li {
    display: inline-block;
    position: relative;
    vertical-align: middle;
  }
  ul>li>a {
    padding: 6px 12px;
    display: block;
    color: #999;
  }
  ul>li>a:hover{
    color: #e1244e;
  }
  .top-menu.fl>ul>li>a {
    padding: 6px;
  }

  .header-nav {
    margin-top: 12px;
    height: 56px;
  }
  .logo img {
    max-height: 36px;
  }
  .header-menu>ul>li>a {
    padding: 12px 16px 20px;
    display: block;
  }

  .search-wrapper{
    width: 420px;
    height: 36px;
    display: inline-block;
    margin-top: -18px;
  }

  .search{
    display: inline-block;
    height: 36px;
    width: 340px;
    outline: none;
    border: 1px #f2f2f2 solid;
    padding-left: 10px;
  }
  .search-btn{
    display: inline-block;
    color: #fff;
    background: #e1244e;
    width: 80px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    float: right;
  }
  .logo_core_img {
    width: 120px;
    height: 100px;
    text-align: center;
  }
  .logo_core_img  img{
    height: 80%;
    margin-top: 10%;
  }

</style>
