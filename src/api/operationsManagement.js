import request from '@/utils/request'

// 获取商户宣传图片 图片所对应的key PublicityPictures 平台宣传图三张 AlfBrandImage 品牌宣传
export function getPicByKey(data) {
  return request({
    url: '/picture/get_picture_by_key',
    method: 'post',
    data: {
      keyword: data.keyword
    }
  })
}

export function updataImg(data) {
  return request({
    url: '/picture/update_play_picture',
    method: 'post',
    data: {
      url: data.url,
      keyword: data.keyword,
      index: data.index
    }
  })
}

export function getShopList(data) {
  return request({
    url: 'shop/get_shop_list',
    method: 'post',
    data
  })
}
export function getShopInfo(data) {
  return request({
    url: '/shop/get_shop_info',
    method: 'post',
    data
  })
}
export function updateShopInfo(data) {
  return request({
    url: 'shop/update_shop_info',
    method: 'post',
    data
  })
}
// 查询商家
export function getStoreList(data) {
  return request({
    url: 'shop/get_shop_list',
    method: 'post',
    data
  })
}

// 注册新商户
export function registerStore(data) {
  return request({
    url: 'shop/register_shop_info',
    method: 'post',
    data: {
      picture: data.picture, //	string	logo
      description_picture: data.description_picture, //	int	店内照
      main_image: data.main_image, //	string	门头照
      shop_name: data.shop_name, //	string	商户名称
      mobile: data.mobile, //	int	手机号
      shop_phone: data.shop_number, // 店铺电话
      district_sqe: data.district_sqe.join('-'), //	string	店铺地址
      address: data.address, //	string	详细地址
      business_license: data.business_license, //	string	营业执照
      identity_card_front: data.identity_card_front, //	string	身份证正面
      identity_card_backend: data.identity_card_backend, //	string	身份证反面
      bank_card: data.bank_card, // string	银行卡号
      bank_account_name: data.bank_account_name, //	string	开户名
      open_bank: data.open_bank, // 开户行
      shop_status: data.shop_status // 店铺状态
    }
  })
}

// 更新商户信息
export function updateStore(data) {
  return request({
    url: 'shop/update_shop_info',
    method: 'post',
    data: {
      shop_id: data.shop_id,
      picture: data.picture, //	string	logo
      description_picture: data.description_picture, //	int	店内照
      main_image: data.main_image, //	string	门头照
      shop_name: data.shop_name, //	string	商户名称
      mobile: data.mobile, //	int	手机号
      district_sqe: data.district_sqe.join('-'), //	string	店铺地址
      address: data.address, //	string	详细地址
      business_license: data.business_license, //	string	营业执照
      identity_card_front: data.identity_card_front, //	string	身份证正面
      identity_card_backend: data.identity_card_backend, //	string	身份证反面
      bank_card: data.bank_card, // string	银行卡号
      bank_account_name: data.bank_account_name, //	string	开户名
      open_bank: data.open_bank, // 开户行
      shop_status: data.shop_status // 店铺状态
    }
  })
}

// 展示商户信息
export function showUpdateStore(data) {
  return request({
    url: 'shop/show_update_shop',
    method: 'post',
    data
  })
}
