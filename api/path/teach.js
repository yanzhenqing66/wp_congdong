import {
  get,
  post
} from '..'

export const fetchStuList = params => get('teacher/myStudentsList', params)

// 获取左作业模板
export const fetchHwTemp = () => get('teacher/homeworkTemplateList')

// 作业模板详情
export const fetchHwTempDetail = (id) => get(`teacher/homeworkDetailTemplateList/${id}`)
