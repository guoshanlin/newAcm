import {getUserInfo, getIsLogin} from 'js/cache'

const state = {
  userData: getUserInfo(),
  isLogin: getIsLogin(),

  draftActivity: null     // 草稿活动数据
}

export default state
