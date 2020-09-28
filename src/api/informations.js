import request from '@/utils/request'

// 获取商户信息接口
export function getShopInfo(data) {
  return request({
    url: '/shop/get_shop_info',
    method: 'post',
    data: {
      shop_id: data.shop_id
    }
  })
}

// 获取商户列表
export function getShopList(data) {
  return request({
    url: '/shop/get_shop_list',
    method: 'post',
    data
  })
}

// 获取订单列表
export function getOrderList(data) {
  return request({
    url: '/order/get_order_list',
    method: 'post',
    data
  })
}

// 获取订单详情
export function getOrderDetail(data) {
  return request({
    url: '/order/get_order_detail',
    method: 'post',
    data
  })
}

// 对账结果查询
export function getReconciliation(data) {
  return request({
    url: '/transaction/get_reconciliation',
    method: 'post',
    data
    // data: {
    //   begin_date: data.begin_date,
    //   end_date: data.end_date,
    //   result: data.result
    // }
  })
}

// 对账明细查询
export function getReconciliationDetail(data) {
  return request({
    url: '/transaction/get_reconciliation_detail',
    method: 'post',
    data: {
      date: data.date
    }
  })
}

// 获取结算明细
export function getSettle(data) {
  return request({
    url: '/transaction/get_settlement_detail',
    method: 'post',
    data
  })
}

// 获取结算明细
export function getGiftTrad(data) {
  return request({
    url: '/gift/trading_record',
    method: 'post',
    data
  })
}

