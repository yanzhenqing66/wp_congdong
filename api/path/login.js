import {
  get,
  post
} from '../index.js'


export const userLogin = params => get(`user/login/${params}`)

export const getUserPhone = params => get('user/getMobile', params)

export const setUserInfo = params => post('user/updateAvatarAndNikeName', params)

// 获取用户信息
export const getUserInfo = params => get('user/getInfo')
