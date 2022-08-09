const weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")

export function formatDD(date) {
  if (!date) return
  const {
    year,
    month,
    day
  } = formatDate(date)
  return year + '-' + formatStr(month + 1) + '-' + formatStr(day)
}

export function formatDate(date) {
  if (!date) return
  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = newDate.getMonth()
  const day = newDate.getDate()
  const hour = newDate.getHours()
  const minute = newDate.getMinutes()
  const second = newDate.getSeconds()
  const week = newDate.getDay()
  let ma = 'am'
  if (hour < 12) {
    ma = 'am'
  } else {
    ma = 'pm'
  }
  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    ma,
    week,
    weekday: weekArray[week]
  }
}

export function formatStr(str) {
  if (!str) return
  if (str.toString().length < 2) {
    return '0' + str
  }
  return str
}
