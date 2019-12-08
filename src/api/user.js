import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    params: data
  })
}


export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
export function getInfobyId(userId) {
  return request({
    url: '/user/find',
    method: 'get',
    params: { userId }
  })
}
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
export function dashboard() {
  return request({
    url: '/user/dashboard',
    method: 'get'
  })
}
export function modifypwd(data) {
  return request({
    url: 'user/modifypwd',
    method: 'post',
    params: data
  })
}
