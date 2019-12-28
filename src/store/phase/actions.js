import axios from 'axios'

export function getPhases (context) {
  return new Promise((resolve) => {
    axios.get(`http://127.0.0.1:8081/api/phase/get`).then(response => {
      context.commit('setPhases', response.data.data)
      resolve(response.data)
    })
  })
}

export function addPhase (context, phase) {
  return new Promise((resolve) => {
    axios.post(`http://127.0.0.1:8081/api/phase/add`, phase).then(response => {
      context.dispatch('getPhases').then(data => {
        resolve(response.data)
      })
    })
  })
}

export function updatePhase (context, phase) {
  return new Promise((resolve) => {
    axios.post(`http://127.0.0.1:8081/api/phase/update`, phase).then(response => {
      context.dispatch('getPhases').then(data => {
        resolve(response.data)
      })
    })
  })
}

export function removePhase (context, phase) {
  return new Promise((resolve) => {
    axios.post(`http://127.0.0.1:8081/api/phase/remove`, phase).then(response => {
      context.dispatch('getPhases').then(data => {
        resolve(response.data)
      })
    })
  })
}
