import request from '@/utils/request'

// 获取接口列表
export function interfacesList(data) {
  return request({
    url: '/v1/interfaces/read',
    method: 'GET',
    params: data
  })
}

// 添加接口
export function addInterface(data) {
  return request({
    url: '/v1/interfaces/write',
    method: 'post',
    data
  })
}

// 获取单条接口信息
export function getInterface(data) {
  return request({
    url: '/v1/interfaces/edit',
    method: 'get',
    params: data
  })
}

// 编辑接口
export function updateInterface(data) {
  return request({
    url: '/v1/interfaces/update',
    method: 'post',
    data
  })
}

// 删除接口
export function delInterface(data) {
  return request({
    url: '/v1/interfaces/delete',
    method: 'post',
    data
  })
}
// 获取接口分类
export function getInterfaceRankList(data) {
  return request({
    url: '/v1/interfaces/data',
    method: 'get',
    params: data
  })
}

/* -------接口分类列表--------*/
// 获取接口分类
export function getClassify(data) {
  return request({
    url: '/v1/classify/read',
    method: 'get',
    params: data
  })
}

// 添加接口
export function addClassify(data) {
  return request({
    url: '/v1/classify/write',
    method: 'post',
    data
  })
}

// 更新接口
export function updateClassify(data) {
  return request({
    url: '/v1/classify/update',
    method: 'post',
    data
  })
}
// 编辑接口
export function editClassify(data) {
  return request({
    url: '/v1/classify/edit',
    method: 'post',
    data
  })
}

// 删除接口
export function delClassify(data) {
  return request({
    url: '/v1/classify/delete',
    method: 'get',
    params: data
  })
}

// 获取分类基础数据
export function getClassifyData(data) {
  return request({
    url: '/v1/classify/data',
    method: 'get',
    params: data
  })
}

// 上传贡献值excel
export function upLoadClassify(data) {
  let form = new FormData()
  form.append('file', data.file)
  return request({
    url: '/v1/classify/upload',
    method: 'post',
    data: form
  })
}


// 更新动态股权项目ID配置
export function updateProject(data) {
  return request({
    url: '/v1/account/project/update',
    method: 'post',
    data
  })
}

// 获取动态股权项目ID配置
export function getProject(data) {
  return request({
    url: '/v1/account/project/edit',
    method: 'get',
    params: data
  })
}

// 获取模板
export function  getExcelFile(data) {
  return request({
    url: '/v1/classify/download',
    method: 'get',
    params: data
  })
}
