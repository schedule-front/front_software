/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/basic',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Basic',
  meta: {
    title: '个人管理',
    icon: 'user'
  },
  children: [
    {
      path: 'teamview',
      component: () => import('@/views/basic/teamview'),
      name: 'TeamView',
      meta: { title: '社团浏览', noCache: true }

    },
    {
      path: 'activityview',
      component: () => import('@/views/basic/activityview'),
      name: 'TeamView',
      meta: { title: '活动浏览', noCache: true }
    },
    {
      path: 'myclub',
      component: () => import('@/views/basic/myclub'),
      name: 'MyClub',
      meta: { title: '我的社团', noCache: true }
    },
    {
      path: 'clubdetails/:id(\\d+)',
      component: () => import('@/views/basic/clubs/clubdetails'),
      name: 'Clubdetails',
      meta: { title: '社团详情', noCache: true, activeMenu: '/basic/teamview' },
      hidden: true
    },
    {
      path: 'clubapplicationform/:id(\\d+)',
      component: () => import('@/views/basic/clubs/clubapplicationform'),
      name: 'ClubApplicationForm',
      meta: { title: '社团加入申请', noCache: true, activeMenu: '/basic/clubs/clubdetails' },
      hidden: true
    },
    {
      path: 'activity/:id(\\d+)',
      component: () => import('@/views/basic/activities/activity'),
      name: 'Activity',
      meta: { title: '活动详情', noCache: true, activeMenu: '/basic/activityview' },
      hidden: true
    },
    {
      path: 'myclubdetails/:id(\\d+)',
      component: () => import('@/views/basic/clubs/myclubdetails'),
      name: 'Myclubdetails',
      meta: { title: '社团详情', noCache: true, activeMenu: '/basic/myclub' },
      hidden: true
    }
  ]
}

export default chartsRouter
