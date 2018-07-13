<template>

  <div class="wrapper-content">
    <div class="app-header b c3">
      <Row type="flex" justify="end">
        <i-col class="header-col"><a class="c3" @click="routePush('/index')">返回首页</a></i-col>
   <!--     <i-col class="header-col">店铺认证</i-col>
        <i-col class="header-col">套餐升级</i-col>-->
        <i-col class="header-col">
        <Dropdown @on-click="handleSubmit">
          <a href="javascript:void(0)" class="c3">{{userData.nickName}}<Icon type="arrow-down-b"></Icon></a>
          <DropdownMenu slot="list">
           <!-- <DropdownItem>商户列表</DropdownItem>-->
            <!--<DropdownItem name="my">我的活动</DropdownItem>-->
            <DropdownItem name="my">个人信息</DropdownItem>
            <!--<DropdownItem name="password" divided>修改密码</DropdownItem>-->
            <DropdownItem  name="logout" divided>退出</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </i-col>
      </Row>
    </div>
    <div class="cloud-left-menu">

      <div class="user-pic-wrapper posct cursor-p" @click="routePush('/index')">
        <img src="../../assets/logo_core.gif">
      </div>

      <Menu theme="dark" ref="refName" :active-name="activeNenu" width="160px"  class="menu-wrapper" @on-select="changeMenu">
        <template v-for="(item,i) in menuList">
          <MenuItem :name="item.path" :key="i"><Icon :type="item.icon"></Icon>{{item.title}}</MenuItem>
        </template>
      </Menu>

    </div>
    <div class="app-content">
      <router-view></router-view>
    </div>
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
        activeNenu: this.$route.path,
        menuList: '',
        passModalShow: false,
        inputForm: {
          show: false,
          modalDisabled: false,
          modalshow: false,
          option: {},
          value: {}
        } // 表单参数
      }
    },
    created () {
      setTimeout(() => {
        if (!this.isLogin) {
          this.$Message.error('请先等登入')
          this.routePush('/index')
        }
      }, 20)
    },
    components: {
      iPassword,
      inputFrom
    },
    computed: {
      ...mapGetters([
        'userData',
        'isLogin'
      ])
    },
    methods: {
      ...mapMutations({
        setUserDate: 'SET_USERDATA',
        setIsLogin: 'SET_ISLOGIN'
      }),
      changeMenu (name) {
        this.routePush(name)
      },
      /**
       *
       * 退出登录
       */
      logout () {
        const _type = 'POST'
        const _params = {}
        const _url = 'logout'
        this.requestAjax(_type, _url, _params).then((res) => {
          setIsLogin(false)
          this.setIsLogin(false)
          this.setUserDate(null)
          setUserInfo(null)
          this.routePush('/index')
        }, () => {
          setIsLogin(false)
          this.setIsLogin(false)
          this.setUserDate(null)
          setUserInfo(null)
          this.routePush('/index')
        })
      },
      handleSubmit (name) {
        switch ('' + name) {
          case 'logout': // 退出登录
            this.logout()
            break
          case 'password': // 修改密码
           this.passModalShow = true
            break
          case 'my': // 修改用户信息
            this.requestAjax('GET', 'members', {id:this.userData.id}).then((data) => {
              if (data.success) {
                this.setUserDate(data.data.rows[0])
                setUserInfo(data.data.rows[0])
                this.addOrModify(data.data.rows[0])
              } else {
                this.$Message.success('查询用户信息失败')
              }
            })
            // this.addOrModify(this.userData)
            break
          default:
        }
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
            Object.assign(_obj, this.userData, newVal)
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
      }
    },
    mounted () {
      if (this.userData.role == 99 || this.userData.role == 98) {
        this.menuList = [
          {icon: 'android-walk', path: '/meeting', title: '活动'},
          {icon: 'person', path: '/role', title: '用户'},
          {icon: 'ios-person-outline', path: '/member', title: '会员'},
          {icon: 'social-yen', path: '/finance/myAccount', title: '财务'},
          {icon: 'android-call', path: '/marketing', title: '营销'},
          {icon: 'ios-world-outline', path: '/promotion', title: '推广'},
          {icon: 'ios-compose', path: '/examine', title: '活动审核'},
          {icon: 'android-checkmark-circle', path: '/payment', title: '提现审批'},
          {icon: 'social-yen-outline', path: '/paymentAudit', title: '提现支付'},
          {icon: 'social-yen', path: '/allFinance/allAccount', title: '财务管理'}
        ]
      } else {
        this.menuList = [
          {icon: 'android-walk', path: '/meeting', title: '活动'},
          {icon: 'ios-person-outline', path: '/member', title: '会员'},
          {icon: 'social-yen', path: '/finance/myAccount', title: '财务'}
        ]
      }
      this.$nextTick(() => {
        this.$refs.refName.updateActiveName()
      })
    }
  }
</script>

<style scoped>
  .wrapper-content{
    min-width: 1060px;
  }

  .app-header{
    width: 100%;
    height: 50px;
    box-shadow: 0 2px 20px 0 rgba(15,12,70,.1);
    line-height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  .header-col{
    margin-right: 24px;
  }
  .app-content{
    padding: 50px 0 0 160px;

  }
  .cloud-left-menu{
    position: fixed;
    overflow: hidden;
    top: 0;
    bottom: 0;
    left: 0;
    width: 160px;
    z-index: 1000;
    background: #626369;
  }
  .user-pic-wrapper{
    height: 140px;
  }
  .user-pic-wrapper img{
    width: 140px;
  }

  .menu-wrapper{
    background: #626369;
  }
</style>
