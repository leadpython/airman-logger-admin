import axios from 'axios'

export function reportSignedIn (context) {
  return new Promise((resolve) => {
    axios.get(`http://127.0.0.1:8081/api/report/signed-in`).then(response => {
      const { data, status } = response.data
      if (status) {
        context.commit('setReportSignedIn', data)
        resolve(data)
      } else {
        context.commit('setReportSignedIn', [])
        resolve([])
      }
    })
  })
}

export function reportSignedOut (context) {
  return new Promise((resolve) => {
    axios.get(`http://127.0.0.1:8081/api/report/signed-out`).then(response => {
      const { data, status } = response.data
      if (status) {
        context.commit('setReportSignedOut', data)
        resolve(data)
      } else {
        context.commit('setReportSignedOut', [])
        resolve([])
      }
    })
  })
}

export function reportIdle (context) {
  return new Promise((resolve) => {
    axios.get(`http://127.0.0.1:8081/api/report/idle`).then(response => {
      const { data, status } = response.data
      if (status) {
        context.commit('setReportIdle', data)
        resolve(data)
      } else {
        context.commit('setReportIdle', [])
        resolve([])
      }
    })
  })
}
