import request from '@/utils/request'

export function fetchActivityList() {
  return request({
    url: '/activity/list',
    method: 'get'
  })
}
export function fetchActivityListById(associationId) {
  return request({
    url: '/activity/asslist',
    method: 'get',
    params: {associationId}
  })
}

export function fetchActivity(activityId) {
  return request({
    url: '/activity/detail',
    method: 'get',
    params: { activityId }
  })
}


export function createActivity(data) {
  return request({
    url: '/activity/create',
    method: 'post',
    data
  })
}
export function search(keyword) {
  return request({
    url: '/activity/search',
    method: 'get',
    params: { keyword }
  })
}
