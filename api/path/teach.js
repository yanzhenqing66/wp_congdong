import {
  get,
  post
} from '..'

// 学生列表
export const fetchStuList = params => get('teacher/myStudentsList', params)

// 学生作业详情信息
export const fetchStuDetail = params => get(`user/getStudentInfo?studentId=${params}`)

// 获取左作业模板
export const fetchHwTemp = () => get('teacher/homeworkTemplateList')

// 作业模板详情 /teacher/homeworkDetailTemplateList?homeworkTemplateId=111
export const fetchHwTempDetail = (id) => get(`teacher/homeworkDetailTemplateList?homeworkTemplateId=${id}`)

// 作业模板详情 列表
export const fetchHwTempDetailList = (id) => get(`teacher/homeworkDetailTemplateList`)

// 发布作业
export const fetchPubHw = params => post('teacher/publishHomework', params)
