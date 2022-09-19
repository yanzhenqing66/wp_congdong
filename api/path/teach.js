import {
  get,
  post
} from '..'

export const fetchStuList = params => get('teacher/myStudentsList', params)
