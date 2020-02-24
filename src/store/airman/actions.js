import axios from 'axios'

export function getAirmen (context) {
  return new Promise((resolve) => {
    axios.get(`http://127.0.0.1:8081/api/airman/get`).then(response => {
      const { data, status } = response.data
      if (status) {
        context.commit('setAirmen', data)
        console.log(data)
        resolve(data)
      } else {
        context.commit('setAirmen', [])
        resolve([])
      }
    })
  })
}

export function addAirman (context, airman) {
  return new Promise((resolve) => {
    axios.post(`http://127.0.0.1:8081/api/airman/add`, airman).then(response => {
      context.dispatch('getAirmen').then(data => {
        resolve(response.data)
      })
    })
  })
}

export function updateAirman (context, airman) {
  return new Promise((resolve) => {
    axios.post(`http://127.0.0.1:8081/api/airman/update`, airman).then(response => {
      context.dispatch('getAirmen').then(data => {
        resolve(response.data)
      })
    })
  })
}

export function removeAirman (context, airman) {
  return new Promise((resolve) => {
    axios.post(`http://127.0.0.1:8081/api/airman/remove`, airman).then(response => {
      context.dispatch('getAirmen').then(data => {
        resolve(response.data)
      })
    })
  })
}
