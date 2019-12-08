import request from '@/utils/request'

export function fetchJoinFormList(query) {
  return request({
    url: '/joinform/get',
    method: 'get',
    params:query
  })
}

export function fetchJoinform(joinFormId) {
  return request({
    url: '/joinform/getdetail',
    method: 'get',
    params: { joinFormId }
  })
}


export function createJoinForm(data) {
  return request({
    url: '/joinform/create',
    method: 'post',
    data
  })
}


export function accept(joinFormId) {
  return request({
    url: '/joinform/accept',
    method: 'post',
    params: { joinFormId }
  })
}
export function reject(joinFormId) {
  return request({
    url: '/joinform/reject',
    method: 'post',
    params: { joinFormId }
  })
}
