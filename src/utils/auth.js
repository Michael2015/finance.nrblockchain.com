import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const roles = 'my-role'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getRole() {

  return Cookies.get(roles)
}

export function setRole(role) {
 
  return Cookies.set(roles, role)
}

export function removeRole() {
  return Cookies.remove(roles)
}