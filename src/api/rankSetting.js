import request from '@/utils/request'

// 获取榜单列表
export function projectsList(data) {
  return request({
    url: '/v1/projects/read',
    method: 'GET',
    params: data
  })
}

// 添加榜单列表
export function addProjects(data) {
  return request({
    url: '/v1/projects/write',
    method: 'post',
    data
  })
}

// 上传图片
export function uploadPlatPic(data) {
  const form = new FormData()
  form.append('file', data.file)
  return request({
    url: '/v1/upload',
    method: 'post',
    data: form
  })
}
//  获取单条榜单
export function editProjects(data) {
  return request({
    url: '/v1/projects/edit',
    method: 'get',
    params: data
  })
}
//  编辑更改单条榜单
export function updateProjects(data) {
  return request({
    url: '/v1/projects/update',
    method: 'post',
    data
  })
}
// 删除接口

export function delProjects(data) {
  return request({
    url: '/v1/projects/delete',
    method: 'GET',
    params: data
  })
}

// 获取奖励配置列表 /v1/attendances/read

export function attendancList(data) {
  return request({
    url: '/v1/attendances/read',
    method: 'GET',
    params: data
  })
}

// 添加奖励配置列表 /v1/attendances/read

export function addAttendancList(data) {
  return request({
    url: '/v1/attendances/write',
    method: 'post',
    data
  })
}

// 更新动态股权配置信息
export function setProjectShare(data) {
  return request({
    url: '/v1/projects/shares',
    method: 'post',
    data
  })
}

// 添加模型榜单(模型排行榜)
export function addModalRank(data) {
  return request({
    url: '/v1/projects/evaluate/write',
    method: 'post',
    data
  })
}

// 编辑模型榜单
export function updateModalRank(data) {
  return request({
    url: '/v1/projects/evaluate/update',
    method: 'post',
    data
  })
}

// 获取单调模型排行榜
export function editModalRank(data) {
  return request({
    url: '/v1/projects/evaluate/edit',
    method: 'get',
    params: data
  })
}

// 获取模型排行榜列表
export function getModalRank(data) {
  return request({
    url: '/v1/projects/evaluate/read',
    method: 'get',
    params: data
  })
}

// 删除模型排行榜列表
export function delModalRank(data) {
  return request({
    url: '/v1/projects/evaluate/delete',
    method: 'get',
    params: data
  })
}

// 导出模型排行榜数据
export function exportEvaluate(data) {
  return request({
    url: '/v1/projects/evaluate/download',
    method: 'get',
    params: data
  })
}
