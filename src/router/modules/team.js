/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const teamRouter = {
  path: '/team',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Team',
  meta: {
    title: '社团管理',
    roles: 'president',
    icon: 'tree'
  },
  children: [
    {
      path: 'joinformlist',
      component: () => import('@/views/team/member/joinformlist'),
      name: 'Joinformlist',
      meta: { title: '成员审批', noCache: false }
    },
    {
      path: 'joinformdetail/:id(\\d+)',
      component: () => import('@/views/team/member/joinformdetail'),
      name: 'Activity',
      meta: { title: '成员审批详情', noCache: true, activeMenu: '/team/joinformlist' },
      hidden: true
    },
    {
      path: 'member',
      component: () => import('@/views/team/member/list'),
      name: 'Member',
      meta: { title: '成员管理', noCache: false }
    },
    {
      path: 'actcre',
      component: () => import('@/views/team/activity/create'),
      name: 'ActCre',
      meta: { title: '活动申请', noCache: false }
    },
    // {
    //   path: 'finance',
    //   component: () => import('@/views/team/finance'),
    //   name: 'Finance',
    //   meta: { title: '财务管理', noCache: true }
    // },
    // {
    //   path: 'activitycheck',
    //   component: () => import('@/views/team/activitycheck'),
    //   name: 'Member',
    //   meta: { title: '活动管理', noCache: true }
    // },
    {
      path: 'notice',
      component: () => import('@/views/team/notice/list'),
      name: 'Notice',
      meta: { title: '通知管理', noCache: false }
    },

    {
      path: 'noticecrt',
      component: () => import('@/views/team/notice/create'),
      name: 'NoticeCrt',
      meta: { title: '通知发布', noCache: false }
    },
    {
      path: 'teaminf',
      component: () => import('@/views/team/teaminf'),
      name: 'TeamInf',
      meta: { title: '社团信息修改', noCache: true }
    },
    {
      path: 'formdetail',
      component: () => import('@/views/team/formdetail'),
      name: 'Formdetail',
      meta: { title: '申请表详情', noCache: true, activeMenu: '/team/activity/list' },
      hidden: true
    },
    {
      path: 'activityedit',
      component: () => import('@/views/team/activityedit'),
      name: 'activityedit',
      meta: { title: '通知详情', noCache: true, activeMenu: '/team/notice/list' },
      hidden: true
    },
    {
      path: 'addaward/:id(\\d+)',
      component: () => import('@/views/team/addaward'),
      name: 'AddAward',
      meta: { title: '添加奖项', noCache: true, activeMenu: '/team/teaminf' },
      hidden: true
    },
  ]
}

export default teamRouter
