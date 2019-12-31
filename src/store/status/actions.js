import axios from 'axios'

export function getStatuses (context) {
  return new Promise((resolve) => {
    axios.get(`http://127.0.0.1:8081/api/status/get`).then(response => {
      const { data, status } = response.data
      if (status) {
        context.commit('setStatuses', data)
        resolve(data)
      } else {
        context.commit('setStatuses', [])
        resolve([])
      }
    })
  })
}

export function addStatus (context, status) {
  return new Promise((resolve) => {
    axios.post(`http://127.0.0.1:8081/api/status/add`, status).then(response => {
      context.dispatch('getStatuses').then(data => {
        resolve(response.data)
      })
    })
  })
}

export function updateStatus (context, status) {
  return new Promise((resolve) => {
    axios.post(`http://127.0.0.1:8081/api/status/update`, status).then(response => {
      context.dispatch('getStatuses').then(data => {
        resolve(response.data)
      })
    })
  })
}

export function removeStatus (context, status) {
  return new Promise((resolve) => {
    axios.post(`http://127.0.0.1:8081/api/status/remove`, status).then(response => {
      context.dispatch('getStatuses').then(data => {
        resolve(response.data)
      })
    })
  })
}
