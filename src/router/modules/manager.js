/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/manager',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Manager',
  meta: {
    title: '管理审批',
    roles: 'admin',
    icon: 'form'
  },
  children: [
    {
      path: 'activityans',
      component: () => import('@/views/manager/activityans'),
      name: 'ActivityANS',
      meta: { title: '活动审批', noCache: true }
    },
    {
      path: 'activitycheck/:id(\\d+)',
      component: () => import('@/views/manager/activitycheck'),
      name: 'ActivityCheck',
      meta: { title: '活动详情', noCache: true , activeMenu: '/manager/activityans' },
      hidden: true
    },
    // {
    //   path: 'createclub',
    //   component: () => import('@/views/manager/createclub'),
    //   name: 'CreateClub',
    //   meta: { title: '创建社团', noCache: false }
    // },
    {
      path: 'createclub',
      component: () => import('@/views/manager/createclub'),
      name: 'CreateClub',
      meta: { title: '创建社团', noCache: true, activeMenu: '/manager/clubmanager' },
      hidden: true
    },
    {
      path: 'changepresident/:id(\\d+)',
      component: () => import('@/views/manager/changepresident'),
      name: 'ChangePresident',
      meta: { title: '更换社长', noCache: true, activeMenu: '/manager/clubmanager' },
      hidden: true
    },
    {
      path: 'notice',
      component: () => import('@/views/manager/notice/list'),
      name: 'Notice',
      meta: { title: '通知管理', noCache: true }
    },
    {
      path: 'createnotice',
      component: () => import('@/views/manager/notice/create'),
      name: 'reatenNotice',
      meta: { title: '发布通知', noCache: true }
    }
    // {
    //   path: 'noticeadmincrt',
    //   component: () => import('@/views/manager/noticeadmin/create'),
    //   name: 'NoticeAdminCrt',
    //   meta: { title: '通知发布', noCache: false }
    // },
    // {
    //     path: 'teamans',
    //     component: () => import('@/views/manager/teamans'),
    //     name: 'TeamANS',
    //     meta: { title: '社团审批', noCache: true }
    //   }
  ]
}

export default chartsRouter
