import Vue from 'vue'
import Router from 'vue-router'
import config from '../../config'

Vue.use(Router)

export default new Router({
  base: process.env.NODE_ENV === 'production'
    ? config.build.assetsPublicPath
    : config.dev.assetsPublicPath,
  mode: 'history',
  routes: [
    { path: '*', component: (resolve) => require(['../components/404'], resolve) },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: (resolve) => require(['../view/login'], resolve)
    },
    {
      path: '/register',
      component: (resolve) => require(['../view/login'], resolve)
    },
    {
      path: '/meeting',
      component: (resolve) => require(['../view/main-menu'], resolve),
      children: [
        {
          path: '/meeting',
          component: (resolve) => require(['../view/meeting'], resolve)
        },
        {
          path: '/initiatingActivity',
          component: (resolve) => require(['../view/initiating-activity'], resolve),
          children: [
            {
              path: '/initiatingActivity',
              name: '发起活动',
              component: (resolve) => require(['../view/initiating/index'], resolve)
            }
          ]
        },
        {
          path: '/marketing',
          component: (resolve) => require(['../view/marketing'], resolve)
        },
        {
          path: '/promotion',
          component: (resolve) => require(['../view/promotion'], resolve)
        },
        {
          path: '/finance',
          component: (resolve) => require(['../view/finance'], resolve),
          children: [
            {
              path: 'myAccount',
              component: (resolve) => require(['../view/my-account'], resolve)
            },
            {
              path: 'incomeDetails',
              component: (resolve) => require(['../view/income-details'], resolve)
            },
            {
              path: 'withdrawalDetails',
              component: (resolve) => require(['../view/withdrawal-details'], resolve)
            }
          ]
        },
        {
          path: '/allFinance',
          component: (resolve) => require(['../view/all-finance'], resolve),
          children: [
            {
              path: 'allAccount',
              component: (resolve) => require(['../view/all-account'], resolve)
            },
            {
              path: 'allIncome',
              component: (resolve) => require(['../view/all-income'], resolve)
            },
            {
              path: 'allDetails',
              component: (resolve) => require(['../view/all-details'], resolve)
            }
          ]
        },
        {
          path: '/role',
          name: '用户管理',
          component: (resolve) => require(['../view/table/role'], resolve)
        },
        {
          path: '/member',
          name: '会员管理',
          component: (resolve) => require(['../view/table/member'], resolve)
        },
        {
          path: '/examine',
          name: '审批管理',
          component: (resolve) => require(['../view/examine'], resolve)
        },
        {
          path: '/payment',
          name: '提现审批',
          component: (resolve) => require(['../view/payment'], resolve)
        },
        {
          path: '/paymentAudit',
          name: '提现支付',
          component: (resolve) => require(['../view/paymentAudit'], resolve)
        },
        {
          path: '/examineDetails',
          name: '活动详情',
          component: (resolve) => require(['../view/examine-details'], resolve)
        },
        {
          path: '/base',
          component: (resolve) => require(['../view/base'], resolve),
          children: [
            {
              path: 'overview',
              component: (resolve) => require(['../view/overview'], resolve)
            },
            {
              path: 'info',
              component: (resolve) => require(['../view/info'], resolve)
            },
            {
              path: 'entrylist',
              component: (resolve) => require(['../view/entrylist'], resolve)
            },
            {
              path: 'invitelist',
              component: (resolve) => require(['../view/invitelist'], resolve)
            },
            {
              path: 'sign',
              component: (resolve) => require(['../view/sign'], resolve)
            },
            {
              path: 'walllist',
              component: (resolve) => require(['../view/walllist'], resolve)
            },
            {
              path: 'userlist',
              component: (resolve) => require(['../view/userlist'], resolve)
            },
            {
              path: 'orderlist',
              component: (resolve) => require(['../view/orderlist'], resolve)
            },
            {
              path: 'joinStatistics',
              component: (resolve) => require(['../view/join-statistics'], resolve)
            },
            {
              path: 'interactivityStatistics',
              component: (resolve) => require(['../view/interactivity-statistics'], resolve)
            },
            {
              path: 'flowedStatistics',
              component: (resolve) => require(['../view/flowed-statistics'], resolve)
            }
          ]
        }
      ]
    },
    {
      path: '/category',
      name: 'category',
      component: (resolve) => require(['../view/category'], resolve)
    },
    {
      path: '/deltail',
      name: 'deltail',
      component: (resolve) => require(['../view/deltail'], resolve)
    },
    {
      path: '/activities',
      name: 'activities',
      component: (resolve) => require(['../view/activities'], resolve)
    },
    {
      path: '/index',
      name: 'index',
      component: (resolve) => require(['../view/index'], resolve),
        children: [
          {
            path: '/index',
            name: '首页',
            component: (resolve) => require(['../view/home/index'], resolve)
          }
          // {
          //   path: '/index/map',
          //   name: '测试地图',
          //   component: (resolve) => require(['../view/map/index'], resolve)
          // }
        ]
    }
  ]
})
