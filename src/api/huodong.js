import request from '@/utils/request'

//审批使用接口： 同意、拒绝、得到详情

// 活动审批列表请求
export function fetchActivityListt(query) {
  return request({
    url: '/activity/managelist',
    method: 'get',
    params: query
  })
}

// 活动撤回请求
  export function undoActivity(activityId) {
    return request({
      url: '/activity/undo',
      method: 'get',
      params: { activityId }
    })
  }
  
  // 活动同意请求,用于审批
  export function passActivity(activityId) {
    return request({
      url: '/activity/accept',
      method: 'get',
      params: { activityId }
    })
  }
  
  // 活动拒绝请求没用于审批
  export function rejectActivity(activityId) {
    return request({
      url: '/activity/reject',
      method: 'get',
      params: { activityId }
    })
  }
  
  // 特定ID活动详情请求，用于审批
  export function fetchActivityDetail(activityId) {
    return request({
      url: '/activity/detail',
      method: 'get',
      params: { activityId }
    })
  }