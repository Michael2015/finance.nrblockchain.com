/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const rankSetting = {
  path: '/rankSetting',
  component: Layout,
  redirect: '/operationsManagement/platform',
  name: 'rankSetting',
  meta: {
    title: '榜单配置',
    icon: 'skill',
    role: ['admin']
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/rankSetting/index'),
      name: 'rankSettingIndex',
      meta: { title: '接口排行榜', icon: 'guide',
        role: ['admin'] }
    },
    {
      path: 'modalList',
      component: () => import('@/views/rankSetting/modalList'),
      name: 'modalList',
      meta: { title: '模型排行榜', icon: 'guide',
        role: ['admin'] }
    },
    {
      path: 'addRank',
      component: () => import('@/views/rankSetting/creatRank'),
      name: 'creatRank',
      hidden: true,
      meta: { title: '编辑/新增榜单', icon: 'edit',
        role: ['admin'] }
    },
    {
      path: 'addModalRank',
      component: () => import('@/views/rankSetting/createModalRank'),
      name: 'addModalRank',
      hidden: true,
      meta: { title: '编辑/新增榜单', icon: 'edit',
        role: ['admin'] }
    },
    {
      path: 'incentivePlan',
      component: () => import('@/views/rankSetting/incentivePlan'),
      name: 'creatEvaModel',
      meta: { title: '榜单奖励配置', icon: 'star',
        role: ['admin'] }
    }
  ]
}

export default rankSetting
