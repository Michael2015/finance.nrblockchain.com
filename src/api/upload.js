import request from '@/utils/request'

// 上传平台宣传图片到服务器
export function uploadPlatPic(data) {
  let form = new FormData()
  form.append('file', data.file)
  return request({
    url: 'picture/upload_picture',
    method: 'post',
    data: form
  })
}

// 更新平台宣传图片到服务器
export function updatePlatPic(data) {
  let form = new FormData()
  form.append('file', data.file)
  return request({
    url: 'picture/update_play_picture',
    method: 'post',
    data: form
  })
}

// 上传商户宣传图片到服务器
export function updateShopPic(data) {
  let form = new FormData()
  form.append('file', data.file)
  return request({
    url: 'picture/update_shop_picture',
    method: 'post',
    data: form
  })
}
