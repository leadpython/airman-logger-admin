import axios from 'axios'

export function getSquadrons (context) {
  return new Promise((resolve) => {
    axios.get(`http://127.0.0.1:8081/api/squadron/get`).then(response => {
      const { data, status } = response.data
      if (status) {
        context.commit('setSquadrons', data)
        resolve(data)
      } else {
        context.commit('setSquadrons', [])
        resolve([])
      }
    })
  })
}

export function addSquadron (context, squadron) {
  return new Promise((resolve) => {
    axios.post(`http://127.0.0.1:8081/api/squadron/add`, squadron).then(response => {
      context.dispatch('getSquadrons').then(data => {
        resolve(response.data)
      })
    })
  })
}

export function updateSquadron (context, squadron) {
  return new Promise((resolve) => {
    axios.post(`http://127.0.0.1:8081/api/squadron/update`, squadron).then(response => {
      context.dispatch('getSquadrons').then(data => {
        resolve(response.data)
      })
    })
  })
}

export function removeSquadron (context, squadron) {
  return new Promise((resolve) => {
    axios.post(`http://127.0.0.1:8081/api/squadron/remove`, squadron).then(response => {
      context.dispatch('getSquadrons').then(data => {
        resolve(response.data)
      })
    })
  })
}
