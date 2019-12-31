import axios from 'axios'

export function getAdmins (context) {
  return new Promise((resolve) => {
    axios.get(`http://127.0.0.1:8081/api/admin/get`).then(response => {
      const { data, status } = response.data
      if (status) {
        context.commit('setAdmins', data)
        resolve(data)
      } else {
        context.commit('setAdmins', [])
        resolve([])
      }
    })
  })
}

export function registerAdmin (context, admin) {
  return new Promise((resolve) => {
    axios.post(`http://127.0.0.1:8081/api/admin/register`, admin).then(response => {
      context.dispatch('getAdmins')
      resolve(response.body)
    })
  })
}

export function authenticateAdmin (context, cacid) {
  return new Promise((resolve) => {
    axios.post(`http://127.0.0.1:8081/api/admin/authenticate`, { cacid }).then(response => {
      const { data, status } = response.data
      if (status) {
        context.commit('setCurrentAdmin', data)
        resolve(response.data)
      } else {
        context.commit('setCurrentAdmin', {})
        resolve({})
      }
    })
  })
}

export function removeAdmin (context, admin) {
  return new Promise((resolve) => {
    axios.post(`http://127.0.0.1:8081/api/admin/remove`, admin).then(response => {
      context.dispatch('getAdmins')
      resolve(response.body)
    })
  })
}
