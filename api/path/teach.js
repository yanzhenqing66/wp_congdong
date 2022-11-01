import {
  get,
  post
} from '..'

//  作业状态 10 未提交 20已提及

// 学生列表
export const fetchStuList = params => get('teacher/myStudentsList', params)

// 学生作业详情信息
export const fetchStuDetail = params => get(`user/getStudentInfo`, params)

// 获取左作业模板
export const fetchHwTemp = () => get('teacher/homeworkTemplateList')

// 作业模板详情 /teacher/homeworkDetailTemplateList?homeworkTemplateId=111
export const fetchHwTempDetail = (id) => get(`teacher/homeworkDetailTemplateList?homeworkTemplateId=${id}`)

// 作业模板详情 列表
export const fetchHwTempDetailList = (id) => get(`teacher/homeworkDetailTemplateList`)

// 发布作业
export const fetchPubHw = params => post('teacher/publishHomework', params)

// 作业列表
export const fetchHwList = params => get('teacher/homeworkList', params)

// 作业详情里面的学生列表
export const fetchHwDetStuList = params => get(`teacher/homeworkStudent`, params)

// 列表进详情回显
export const fetchHwDetal = params => get('teacher/homework', params)

// 评分接口
export const reviewScore = params => post(`teacher/score`, params)

// 视频回显
export const fetchStuHwVideoList = id => get(`teacher/homeworkVideoRecordList?studentId=${id}`)
