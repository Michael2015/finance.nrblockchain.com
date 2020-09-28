import request from '@/utils/request'

// 普通优惠券的文档
export function createCoupon(data) {
  return request({
    url: '/activity/create_coupon_model',
    method: 'post',
    data
  })
}

export function getCouponModel(data) {
  return request({
    url: '/activity/get_coupon_model',
    method: 'post',
    data
  })
}

export function getCouponByName(data) {
  return request({
    url: '/activity/get_model_by_name',
    method: 'post',
    data
  })
}

export function delCouponModel(data) {
  return request({
    url: '/activity/delete_coupon_model',
    method: 'post',
    data
  })
}

// 编辑优惠券模板展示页
export function showUpdateModel(data) {
  return request({
    url: '/activity/show_update_model',
    method: 'post',
    data
  })
}

// 更新优惠券模板
export function updateCouponModel(data) {
  return request({
    url: '/activity/update_coupon_model',
    method: 'post',
    data
  })
}

// 查询优惠券的领取详情
export function getActiveCoupons(data) {
  return request({
    url: '/activity/get_collection_detail',
    method: 'post',
    data
  })
}
// 礼品卡的文档
export function getGiftCard(data) {
  return request({
    url: '/gift/get_gift_card_type',
    method: 'post',
    data
  })
}

// 获取礼品卡充值详情的列表
export function getGiftCollection(data) {
  console.log(data)
  return request({
    url: '/gift/get_gift_collection',
    method: 'post',
    data
  })
}

export function getGiftCardColl(data) {
  return request({
    url: '/gift/get_gift_collection',
    method: 'post',
    data
  })
}

// 创建礼品卡
export function createGiftCard(data) {
  return request({
    url: '/gift/create_gift_card',
    method: 'post',
    data
  })
}

// 编辑礼品卡
export function updateGiftCard(data) {
  return request({
    url: '/gift/update_gift_card',
    method: 'post',
    data
  })
}
// 显示编辑礼品卡展示页
export function showUpdateCard(data) {
  return request({
    url: '/gift/show_update_card_type',
    method: 'post',
    data
  })
}

// 礼品卡门店
export function getGiftShoplist(data) {
  return request({
    url: '/gift/get_shop_range',
    method: 'post',
    data
  })
}

// 发放礼品卡,上传excel
export function excelAddGift(data, id) {
  let form = new FormData()
  form.append('files', data.file)
  form.append('gift_card_type_id', id)
  return request({
    url: '/gift/excel_add_gift',
    method: 'post',
    data: form
  })
}

// 充值礼品卡, 上传excel
export function excelRechargeGift(data, id) {
  let form = new FormData()
  form.append('files', data.file)
  form.append('gift_card_type_id', id)
  return request({
    url: '/gift/upload_recharge_excel',
    method: 'post',
    data: form
  })
}

// 充值礼品卡
export function rechargeGiftcard(data) {
  return request({
    url: '/gift/excel_recharge_gift',
    method: 'post',
    data
  })
}

// 礼品卡扣款 gift/refund_giftCard
export function refundGiftCard(data) {
  return request({
    url: '/gift/refund_giftCard',
    method: 'post',
    data
  })
}

// 礼品卡充值详情

// export function getGiftCollection(data) {
//   console.log(data)
//   request({
//     url: '/gift/get_gift_collection',
//     method: 'post',
//     data
//   })
// }

// 用户信息查询
export function getUserInfo(data) {
  return request({
    url: '/user/get_user_info',
    method: 'post',
    data
  })
}

// 用户活动查询
export function getActivity(data) {
  return request({
    url: '/activity/get_activity',
    method: 'post',
    data
  })
}

// 创建活动
export function createActivity(data) {
  return request({
    url: '/activity/create_activity',
    method: 'post',
    data
  })
}

// 券适用的店铺 shopVisible

export function getCouponShop(data) {
  return request({
    url: '/activity/get_coupon_range',
    method: 'post',
    data
  })
}
