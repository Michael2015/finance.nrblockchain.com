/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const tagSetting = {
  path: '/tagSetting',
  component: Layout,
  redirect: '/tagSetting/index',
  name: 'tagSetting',
  meta: {
    title: '数据源配置',
    icon: 'education',
    role: ['admin']
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/tagSetting/index'),
      name: 'tagSettingIndex',
      meta: { title: '排行榜接口', icon: 'star',
        role: ['admin'] }
    },
    {
      path: 'cagTagList',
      component: () => import('@/views/tagSetting/cagTagList'),
      name: 'cagTagList',
      meta: { title: '岗位分类接口', icon: 'star',
        role: ['admin'] }
    },
    {
      path: 'edit',
      component: () => import('@/views/tagSetting/creatTag'),
      name: 'creatTag',
      hidden: true,
      meta: { title: '编辑/新增接口', icon: 'star',

        role: ['admin'] }
    }
  ]
}

export default tagSetting
