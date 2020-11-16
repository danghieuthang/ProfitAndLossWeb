
import { UserLayout, BasicLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'
const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/Analysis',
        component: RouteView,
        meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse },
        children: [
          {
            path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: 'menu.dashboard.analysis', keepAlive: false }
          }
        ]
      },
      {
        path: '/profit-and-loss',
        name: 'ProfitAndLoss',
        component: () => import('@/views/profitandloss/ProfitAndLoss'),
        meta: { title: 'Profit And Loss', icon: 'table' }
      },
      {
        path: '/store',
        name: 'store',
        hideChildrenInMenu: true,
        component: RouteView,
        redirect: '/stores',
        meta: { title: 'Stores', icon: 'table' },
        children: [
          {
            path: '/stores',
            name: 'Store',
            hidden: true,
            component: () => import('@/views/store/Store'),
            meta: { title: 'List all Store', keepAlive: false }
            // children: stores
          },
          {
            path: '/stores/:store',
            name: 'Transaction In Store',
            hidden: true,
            component: () => import('@/views/transaction/TransactionInStore'),
            meta: { title: 'Transaction in Store', keepAlive: false },
            props: {

            }
            // children: stores
          },
          {
            path: '/stores/:store/transactions/:id/split',
            name: 'Split Transaction',
            hidden: true,
            component: () => import('@/views/transaction/SplitTransaction'),
            meta: { title: 'Transaction Split', keepAlive: false }
          },
          {
            path: '/stores/:store/transactions/:id',
            name: 'Detail Transaction',
            hidden: true,
            component: () => import('@/views/transaction/TransactionDetail'),
            meta: { title: 'Transaction Details', keepAlive: true }
          }
        ]
      },
      // // transaction
      // {
      //   path: '/transactions',
      //   name: 'transaction',
      //   redirect: '/transactions/all',
      //   component: RouteView,
      //   hideChildrenInMenu: true,
      //   meta: { title: 'Transactions', icon: 'table' },
      //   children: [
      //     {
      //       path: '/transactions/all',
      //       name: 'Transaction',
      //       hidden: true,
      //       component: () => import('@/views/transaction/Transaction'),
      //       meta: { title: 'All Transaction', keepAlive: false }
      //       // children:
      //     },
      //     {
      //       path: '/transactions/:brand/:store',
      //       name: 'Transaction In Store',
      //       hidden: true,
      //       component: () => import('@/views/transaction/TransactionInStore'),
      //       meta: { title: 'Transaction in Store', keepAlive: false }
      //       // children: stores
      //     },
      //     {
      //       path: '/transactions/:brand/:store/split/:id',
      //       name: 'Split Transaction',
      //       hidden: true,
      //       component: () => import('@/views/transaction/SplitTransaction'),
      //       meta: { title: 'Split Transaction', keepAlive: false }
      //     },
      //     {
      //       path: '/transactions/:brand/:store/:id',
      //       name: 'Detail Transaction',
      //       hidden: true,
      //       component: () => import('@/views/transaction/TransactionDetail'),
      //       meta: { title: 'Detail Transaction', keepAlive: true }
      //     }
      //   ]
      // },
      {
        path: '/accounting-period',
        name: 'accounting-period',
        component: () => import('@/views/accountingperiod/AccountingPeriod'),
        meta: { title: 'Accoungting Period', icon: 'table' }
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },

      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
