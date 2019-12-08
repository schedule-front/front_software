import request from '@/utils/request'

export function fetchAnnList(query) {
  return request({
    url: '/annoncement/getclubann',
    method: 'get',
    params:query
  })
}

export function addAnnouncement(data) {
  return request({
    url: '/annoncement/add',
    method: 'post',
    data
  })
}


export function createActivity(data) {
  return request({
    url: '/activity/create',
    method: 'post',
    data
  })
}
