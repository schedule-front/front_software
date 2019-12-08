import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/club/list',
    method: 'get',
    params: query
  })
}

export function fetchClub(associationId) {
  return request({
    url: '/club/find',
    method: 'get',
    params: { associationId }
  })
}
export function fetchMyClub(userId) {
  return request({
    url: '/club/findmyclub',
    method: 'get',
    params: { userId }
  })
}
export function fetchMyClubDetail(associationId) {
  return request({
    url: '/club/memberlist',
    method: 'get',
    params: { associationId }
  })
}
export function createClub(data) {
  return request({
    url: '/club/create',
    method: 'post',
    data
  })
}
export function changePresident(data) {
  return request({
    url: '/club/changepresident',
    method: 'post',
    params:data
  })
}
export function deleteMember(query) {
  return request({
    url: '/club/deletemember',
    method: 'post',
    params:query
  })
}
