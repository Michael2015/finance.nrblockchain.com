/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const userInfo = {
  path: '/userInfo',
  component: Layout,
  redirect: '/userInfo/index',
  // name: 'operationsManagement',
  meta: {
    title: '财管管理',
    icon: 'user',
    role: ['admin2', 'user2']
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/information/incomeList'),
      name: 'userInfo',
      meta: { title: '收入流水', icon: 'people',
        role: ['admin'] }
    }
  ]
}

export default userInfo
