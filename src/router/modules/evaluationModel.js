import Layout from '@/layout'

const evaluationModel = {
  path: '/evaluationModel',
  component: Layout,
  redirect: '/evaluationModel/index',
  // name: 'operationsManagement',
  meta: {
    title: '模型配置',
    icon: 'tree',
    role: ['admin', 'user']
  },
  children: [
    {
      path: 'evaModalList',
      component: () => import('@/views/evaluationModel/evaModel'),
      name: 'evaModalList',
      meta: { title: '岗位模型', icon: 'people',
        role: ['admin'] }
    },
    {
      path: 'creatEvaModel',
      component: () => import('@/views/evaluationModel/creatEvaModel'),
      name: 'creatEvaModel',
      hidden: true,
      meta: { title: '岗位模型设置', icon: 'edit',
        role: ['admin'] }
    },
    {
      path: 'evaluation',
      component: () => import('@/views/evaluationModel/evaluation'),
      name: 'evaluation',
      meta: { title: '综合评分模型', icon: 'excel',
        role: ['admin'] }
    },
    {
      path: 'createEvaluation',
      component: () => import('@/views/evaluationModel/createEvaluation'),
      name: 'createEvaluation',
      hidden: true,
      meta: { title: '综合评分设置', icon: 'edit',
        role: ['admin'] }
    },
 /*   {
      path: 'totalScoreList',
      component: () => import('@/views/evaluationModel/totalScore'),
      name: 'totalScoreList',
      meta: { title: '综合评分模型', icon: 'form',
        role: ['admin'] }
    },
    {
      path: 'createTotalScore',
      component: () => import('@/views/evaluationModel/createTotalScore'),
      name: 'creatEvaModel',
      hidden: true,
      meta: { title: '综合评分设置', icon: 'edit',
        role: ['admin'] }
    },*/
    {
      path: 'incomeModelList',
      component: () => import('@/views/evaluationModel/incomeModel'),
      name: 'incomeModelList',
      meta: { title: '收入模型', icon: 'money',
        role: ['admin'] }
    },
    {
      path: 'createIncomeModel',
      component: () => import('@/views/evaluationModel/createIncomeModel'),
      name: 'createIncomeModel',
      hidden: true,
      meta: { title: '收入模型设置', icon: 'edit',
        role: ['admin'] }
    }
  ]
}

export default evaluationModel

