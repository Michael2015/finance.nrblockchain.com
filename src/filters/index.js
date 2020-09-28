// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function coupontype(type) {
  const ty = {
    '0': '通用模型',
    '1': '专属模型'
  }

  return ty[type]
}
/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * 时间格式化
 * @param  {Object} dateObj 时间对象
 * @param  {String} fmt 格式化字符串
 */
export const dateFormat = (dateObj, fmt) => {
  let date
  if (dateObj && isString(dateObj)) {
    date = strToDate(dateObj)
  } else if (dateObj && isDate(dateObj)) {
    date = dateObj
  } else if (dateObj && isNumber(dateObj)) {
    date = new Date(dateObj * 1000)
  } else {
    return ''
  }
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  var week = {
    '0': '日',
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六'
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear().toString() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + week[date.getDay().toString() + ''])
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k].toString()) : (('00' + o[k].toString()).substr(('' + o[k].toString()).length)))
    }
  }
  return fmt
}

/* 是否字符串*/
function isString(obj) {
  return obj === obj + ''
}

function isNumber(val) {
  var regPos = /^\d+(\.\d+)?$/ // 非负浮点数
  var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ // 负浮点数
  if (regPos.test(val) || regNeg.test(val)) {
    return true
  } else {
    return false
  }
}
/* 是否时间对象*/
function isDate(obj) {
  return obj instanceof Date
}

/**
 * 字符串转换为时间
 * @param  {String} dateObj 字符串
 */
function strToDate(dateObj) {
  dateObj = dateObj.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/')
  if (dateObj.indexOf('.') > 0) dateObj = dateObj.slice(0, dateObj.indexOf('.'))
  return new Date(dateObj)
}

export function payStatus(stat) {
  const states = {
    '0': '已下单',
    '1': '已取消',
    '2': '已付款',
    '3': '已退款'
  }

  return states[stat]
}

export function payType(stat) {
  const states = {
    '01': '微信支付',
    '02': '线下付款'
  }
  return states[stat]
}

export function profitType(stat) {
  const states = {
    2: '已开通',
    1: '未开通',
    3: '开通中'
  }
  return states[stat]
}

export function shopType(stat) {
  const states = {
    0: '启用',
    1: '审核中',
    2: '禁用'
  }
  return states[stat]
}
