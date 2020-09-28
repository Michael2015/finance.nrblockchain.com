/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const informations = {
  path: '/information',
  component: Layout,
  redirect: '/information/contributionValue',
  // name: 'informations',
  meta: {
    title: '信息查询',
    icon: 'search',
    role: ['admin', 'user']
  },
  children: [
    {
      path: 'contributionValue',
      component: () => import('@/views/information/contributionValue'),
      name: 'contributionValue',
      meta: { title: '贡献值查询', icon: 'search',
        role: ['admin'] }
    },
    {
      path: 'rankList',
      component: () => import('@/views/information/rankList'),
      name: 'rankList',
      meta: { title: '排行榜数据查询', icon: 'table',
        role: ['admin'] }
    },
    {
      path: 'incomeList',
      component: () => import('@/views/information/incomeList'),
      name: 'incomeList',
      meta: { title: '收入流水', icon: 'money',
        role: ['admin'] }
    }
  ]
}

export default informations
