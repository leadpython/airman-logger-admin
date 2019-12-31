import axios from 'axios'

export function getRooms (context) {
  return new Promise((resolve) => {
    axios.get(`http://127.0.0.1:8081/api/room/get`).then(response => {
      const { data, status } = response.data
      if (status) {
        context.commit('setRooms', data)
        resolve(data)
      } else {
        context.commit('setRooms', [])
        resolve([])
      }
    })
  })
}

export function addRoom (context, room) {
  return new Promise((resolve) => {
    axios.post(`http://127.0.0.1:8081/api/room/add`, room).then(response => {
      context.dispatch('getRooms').then(data => {
        resolve(response.data)
      })
    })
  })
}

export function updateRoom (context, room) {
  return new Promise((resolve) => {
    axios.post(`http://127.0.0.1:8081/api/room/update`, room).then(response => {
      context.dispatch('getRooms').then(data => {
        resolve(response.data)
      })
    })
  })
}

export function removeRoom (context, room) {
  return new Promise((resolve) => {
    axios.post(`http://127.0.0.1:8081/api/room/remove`, room).then(response => {
      context.dispatch('getRooms').then(data => {
        resolve(response.data)
      })
    })
  })
}
