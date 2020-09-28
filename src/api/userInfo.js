import request from '@/utils/request'

// 获取用户信息列表
export function getUsers(data) {
  return request({
    url: '/v1/users/read',
    method: 'GET',
    params: data
  })
}

// 添加用户
export function adduser(data) {
  return request({
    url: '/v1/users/write',
    method: 'post',
    data
  })
}

// 编辑用户

export function updateUser(data) {
  return request({
    url: '/v1/users/update',
    method: 'post',
    data
  })
}
// 批量上传用户
export function upUsers(data, id) {
  let form = new FormData()
  form.append('file', data.file)
  form.append('gift_card_type_id', 1)
  return request({
    url: '/v1/users/upload',
    method: 'post',
    data: form
  })
}

//  添加用户组；列表  /v1/groups/read
export function addUserGroup(data) {
  return request({
    url: '/v1/groups/write',
    method: 'post',
    data
  })
}
//  获取用户组；列表  /v1/groups/read
export function userGroupList(data) {
  return request({
    url: '/v1/groups/read',
    method: 'get',
    params: data
  })
}
//  编辑单条用户组；列表  /v1/groups/read
export function updateuserGroup(data) {
  return request({
    url: '/v1/groups/update',
    method: 'post',
    data
  })
}
//  获取单条用户组；列表  /v1/groups/read
export function getuserGroup(data) {
  return request({
    url: '/v1/groups/edit',
    method: 'get',
    params: data
  })
}
//  删除用户组；列表  /v1/groups/read
export function delUserGroup(data) {
  return request({
    url: '/v1/groups/delete',
    method: 'get',
    params: data
  })
}
