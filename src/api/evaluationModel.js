import request from '@/utils/request'
/* --------评价模型相关----------------*/
// 添加评价模型
export function addEvaluate(data) {
  return request({
    url: '/v1/evaluate/write',
    method: 'post',
    data
  })
}

// 获取评价模型
export function getEvaluate(data) {
  return request({
    url: '/v1/evaluate/read',
    method: 'get',
    params: data
  })
}

// 更新评价模型
export function updateEvaluate(data) {
  return request({
    url: '/v1/evaluate/update',
    method: 'post',
    data
  })
}

// 获取单条评价模型
export function editEvaluate(data) {
  return request({
    url: '/v1/evaluate/edit',
    method: 'get',
    params: data
  })
}

// 删除单条评价模型
export function deleteEvaluate(data) {
  return request({
    url: '/v1/evaluate/delete',
    method: 'get',
    params: data
  })
}

/* --------综合积分模型相关----------------*/
// 添加综合积分模型
export function addGrade(data) {
  return request({
    url: '/v1/grade/write',
    method: 'post',
    data
  })
}

// 获取综合积分模型
export function getGrade(data) {
  return request({
    url: '/v1/grade/read',
    method: 'get',
    params: data
  })
}


// 更新综合积分模型
export function updateGrade(data) {
  return request({
    url: '/v1/grade/update',
    method: 'post',
    data
  })
}

// 获取单条综合积分模型
export function editGrade(data) {
  return request({
    url: '/v1/grade/edit',
    method: 'get',
    params: data
  })
}

// 删除单条综合积分模型
export function deleteGrade(data) {
  return request({
    url: '/v1/grade/delete',
    method: 'get',
    params: data
  })
}

/* --------评分模型相关----------------*/
// 添加评价模型
export function addScore(data) {
  return request({
    url: '/v1/score/write',
    method: 'post',
    data
  })
}

// 获取评价模型
export function getScore(data) {
  return request({
    url: '/v1/score/read',
    method: 'get',
    params: data
  })
}

// 更新评价模型
export function updateScore(data) {
  return request({
    url: '/v1/score/update',
    method: 'post',
    data
  })
}

// 获取单条积分模型
export function editScore(data) {
  return request({
    url: '/v1/score/edit',
    method: 'get',
    params: data
  })
}

// 删除单条评价模型
export function deleteScore(data) {
  return request({
    url: '/v1/score/delete',
    method: 'get',
    params: data
  })
}

/* --------收入模型相关----------------*/
// 添加收入模型
export function addIncome(data) {
  return request({
    url: '/v1/income/write',
    method: 'post',
    data
  })
}

// 获取收入模型
export function getIncome(data) {
  return request({
    url: '/v1/income/read',
    method: 'get',
    params: data
  })
}

// 更新收入模型
export function updateIncome(data) {
  return request({
    url: '/v1/income/update',
    method: 'post',
    data
  })
}

// 获取收入评价模型
export function editIncome(data) {
  return request({
    url: '/v1/income/edit',
    method: 'get',
    params: data
  })
}

// 删除收入评价模型
export function deleteIncome(data) {
  return request({
    url: '/v1/income/delete',
    method: 'get',
    params: data
  })
}

// 获取结算明细
export function getIncomeList(data) {
  return request({
    url: 'http://finance.nrblockchain.com/api/v1/income/list2',
    method: 'get',
    params: data
  })
}

// 导出收入流水

// 获取结算明细
export function exportIncomeList(data) {
  return request({
    url: '/v1/income/download',
    method: 'get',
    params: data
  })
}
