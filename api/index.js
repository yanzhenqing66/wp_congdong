const baseUrl = 'https://www.huihuishou.vip/congdong/'

function request(url = '', data = {}, type = 'GET', header = {}) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + url,
      method: type,
      data: {
        ...data
      },
      header: {
        openId: uni.getStorageSync('token'),
        ...header
      },
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })

}

export function get(url = '', data = {}, header = {}) {
  return request(url, data, 'GET', header)
}

export function post(url = '', data = {}, header = {}) {
  return request(url, data, 'POST', header)
}

export default request
