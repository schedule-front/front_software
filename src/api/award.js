import request from '@/utils/request'

export function addAward(data) {
  return request({
    url: '/award/add',
    method: 'post',
    params: data
  })
}

export function fetchAward(associationId) {
  return request({
    url: '/award/get',
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
    params: data
  })
}
