/**
 * Created by guosl on 2017-08-7.
 */
let communal = {}

/**
/* * 转义时间成指定格式
 * @param time
 * @returns {*}
 *!/
communal.formatterTime = function (time) {
  if (time === undefined || time === null || time === '') {
    return ''
  }
  return Date.formatByTimes(time.time, 'yyyy-MM-dd')
}*/
/**
 * 转义时间成指定格式
 * @param time
 * @returns {*}
 */
communal.formatterTimeHms = function (time) {
  if (time === undefined || time === null || time === '') {
    return ''
  }
  return Date.formatByTimes(time.time, 'yyyy-MM-dd') + ' 00:00:00'
}
/**
 * 转义时间成指定格式
 * @param time
 * @returns {*}
 */
communal.formatterTimeString = function (time) {
  if (time === undefined || time === null || time === '') {
    return ''
  }
  let _time = new Date(time.replace(/-/g, '/'))
  return Date.formatByTimes(_time.getTime(), 'hh:mm')
}
/**
 * 比较时间大小
 * @param time
 * @returns {*}
 */
communal.formatterTimeCompare = function (time, nowTime) {
  let _time = new Date(time.replace(/-/g, '/'))
  let _nowTime = new Date(nowTime.replace(/-/g, '/'))
  if (_time.getTime() <= _nowTime.getTime()) {
    return true
  } else {
    return false
  }
}
/**
 * 比较时间大小
 * @param time
 * @returns {*}
 */
communal.formatterTimeCompareNew = function (time, nowTime) {
  let _time = new Date(time.replace(/-/g, '/'))
  let _nowTime = new Date(nowTime.replace(/-/g, '/'))
  if (_time.getTime() < _nowTime.getTime()) {
    return '<'
  } else if (_time.getTime() === _nowTime.getTime()) {
    return '='
  } else {
    return '>'
  }
}
/**
 * 转义时间成指定格式
 * @param time
 * @returns {*}
 */
communal.formatterTimeHHmm = function (time) {
  if (time === undefined || time === null || time === '') {
    return ''
  }
  let _time = new Date(time.replace(/-/g, '/'))
  return Date.formatByTimes(_time.getTime(), 'yyyy-MM-dd')
}
/**
 * 转义时间成指定格式HH:mm- Hh:mm格式
 * @param time
 * @returns {*}
 */
communal.formatByTimesDrawOut = function (timeStart, timeStop) {
  let startTime = true
  let stopTime = true
  if (timeStart === undefined || timeStart === null || timeStart === '') {
    startTime = false
  }
  if (timeStop === undefined || timeStop === null || timeStop === '') {
    stopTime = false
  }
  if (!startTime && !stopTime) {
    return ''
  } else if (startTime && !stopTime) {
    return Date.formatByTimes(timeStart.time, 'hh:mm') + '- '
  } else if (!startTime && stopTime) {
    return ' -' + Date.formatByTimes(timeStop.time, 'hh:mm')
  }
  return Date.formatByTimes(timeStart.time, 'hh:mm') + '-' + Date.formatByTimes(timeStop.time, 'hh:mm')
}
/**
 * 转义时间成指定格式hh:mm格式
 * @param time
 * @returns {*}
 */
communal.formatByTimeshhmm = function (time) {
  if (time === undefined || time === null || time === '') {
    return ''
  }
  return Date.formatByTimes(time.time, 'hh:mm') + ':00'
}
/**
 * 对象类型转义
 * @param value
 * @returns {*}
 */
communal.formatterObjectType = function (value) {
  switch ('' + value) {
    case '0':
      return '叶子节点'
    case '1':
      return '业务系统'
    case '2':
      return '应用'
    case '3':
      return '节点'
    case '4':
      return '叶子节点'
    default:
      return ''
  }
}
/**
 * 将字符串转义成数组
 * @param value
 * @returns {Array}
 */
communal.formatterAttr = function (value) {
  if (value === '' || value === undefined || value === null) {
    return []
  }
  // value = JSON.parse(value)
  // if (value === undefined || value.length === 0 || value === null) {
  //   return []
  // }
  // let _val = []
  // value.forEach(function (item) {
  //   _val.push(item.id)
  // })
  return value.split(',')
}
/**
 * 数组转义成指定下拉数组
 * @param value
 * @returns {Array}
 */
communal.formatterAttrLabel = function (value) {
  if (value === '' || value === undefined || value === null) {
    return []
  }
  // value = JSON.parse(value)
  // if (value.length === 0) {
  //   return []
  // }
  return value.split(',')
}
/**
 * 转义主机id为name
 * @param value
 * @returns {*}
 */
communal.formatterHost = function (value) {
  if (value === '' || value === undefined || value === null) {
    return ''
  }
  let _attr = value.split(',')
  let _data = JSON.parse(localStorage.host)
  let _val = []
  if (_data === undefined || _data === null || _data === '' || _data.rows.length === 0) {
    return ''
  } else {
    _data.rows.forEach((v) => {
      if (_attr.indexOf(v.id) !== -1) {
        _val.push(v.hostName)
      }
    })
  }
  return _val.join(',')
}
/**
 * 转义对象id为name
 * @param value
 * @returns {*}
 */
communal.formatterObj = function (value) {
  if (value === '' || value === undefined || value === null) {
    return ''
  }
  let _attr = value.split(',')
  let _data = JSON.parse(localStorage.obj)
  let _val = []
  if (_data === undefined || _data === null || _data === '' || _data.rows.length === 0) {
    return ''
  } else {
    _data.rows.forEach((v) => {
      if (_attr.indexOf(v.id) !== -1) {
        _val.push(v.name)
      }
    })
  }
  return _val.join(',')
}
/**
 * 转义指标id为name
 * @param value
 * @returns {*}
 */
communal.formatterQuery = function (value, type) {
  if (value === '' || value === undefined || value === null) {
    return ''
  }
  let _attr = value.split(',')
  let _data = JSON.parse(localStorage.queryHM)
  let _val = []
  if (_data === undefined || _data === null || _data === '' || _data.rows.length === 0) {
    return ''
  } else {
    _data.rows.forEach((v) => {
      if (_attr.indexOf(v.hostId) !== -1) {
        if (type === 'name') {
          _val.push(v.metricName)
        } else {
          _val.push(v.metricId)
        }
      }
    })
  }
  return _val.join(',')
}
/**
 * 转义指标id为name
 * @param value
 * @returns {*}
 */
communal.formatterValue = function (value, rows, type) {
  let _value
  switch (type) {
    case 'threshold':
      _value = 0
      break
    case 'Checkbox':
      _value = true
      break
    default:
      _value = '0'
  }
  if (value === undefined || value === '' || value === null) {
    return _value
  } else {
    switch (type) {
      case 'threshold':
        _value = 0
        break
      case 'Checkbox':
        _value = false
        break
      default:
        _value = '0'
    }
    let _attr = JSON.parse(value)
    _attr.forEach(function (item) {
      if (rows.hostId === item.hostId && rows.metricId === item.metricId) {
        switch (type) {
          case 'threshold':
            _value = parseInt(item.threshold)
            break
          case 'Checkbox':
            _value = true
            break
          default:
            _value = item.type
        }
      } else {

      }
    })
  }

  return _value
}
export default communal
