import request from '@/utils/request'

export function fetchActivityList() {
  return request({
    url: '/activity/list',
    method: 'get'
  })
}

export function fetchActivity(annid) {
  return request({
    url: '/activity/detail',
    method: 'get',
    params: { annid }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createNotice(data) {
  return request({
    url: '/notice/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
