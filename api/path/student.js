import {
  get,
  post
} from '..'

// 课程列表
export const fetchStuHwList = (params) => get(`student/homeworkStudentDetailList`, params)

// 私教列表
export const fetchTeachCourseList = params => get('student/teacherList', params)

// 私教购买列表
export const fetchCourseDetail = params => get('student/teacherCourseList', params)

// 上传视频
export const uploadVideo = params => post('cos/upload')