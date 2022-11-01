import {
  get,
  post
} from '..'

// 课程列表
export const fetchStuHwList = (params) => get(`student/homeworkStudentDetailList`, params)

// 课程列表详情
export const fetchHwDetail = id => get(`student/getHomeworkStudentDetail?id=${id}`)

// 提交课程
export const submitHw = (params) => post('student/uploadHomeworkVideo', params)

// 私教列表
export const fetchTeachCourseList = params => get('student/teacherList', params)

// 私教购买列表
export const fetchCourseDetail = params => get('student/teacherCourseList', params)

// 上传视频
export const uploadVideo = params => post('cos/upload')

// 教师枚举
export const fetchTeacherEnum = (id) => get(`student/teacherList?studentId=${id}`)

// 线上线下枚举
export const fetchOmoEnum = () => get('common/getEnum?name=Omo')

// 课程时长
export const fetchCourseDur = () => get('common/getEnum?name=CourseDuration')

// 提交约课
export const reserveCourse = params => post('student/reserveCourse', params)

// 问卷问题
export const fetchQuestions = () => get('student/getQuestionnaire')

// 提交问卷
export const submitQuestion = params => post('student/submitQuestionnaire', params)

// 生成订单
export const createOrder = params => post('student/contract', params)


// 个人相关

// 成长页基本数据
export const fetchPresonData = id => get(`student/myGrowUp?studentId=${id}`)

// 个人积分
export const fetchPersonScore = id => get(`student/scoreRecord?studentId=${id}`)

// 订单记录
export const fetchOrderList = id => get(`student/orderRecord?studentId=${id}`)
