//  作业状态 10 未提交 20已提及
export function hwStatus(status) {
  return status === 10 ? '未提交' : '已提及'
}

// 
export function commentStatus(status) {
  return status === 10 ? '未点评' : '已点评'
}
