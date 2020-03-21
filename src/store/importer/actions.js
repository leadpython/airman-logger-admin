import axios from 'axios'

export function importData (context, raw) {
  return new Promise((resolve) => {
    axios.post(`http://127.0.0.1:8081/api/importer/import-data`, { raw: JSON.stringify(raw) }).then(response => {
      const { data } = response.data
      resolve(data)
    })
  })
}

export function importRooms (context, raw) {
  return new Promise((resolve) => {
    axios.post(`http://127.0.0.1:8081/api/importer/import-rooms`, { raw: JSON.stringify(raw) }).then(response => {
      const { data } = response.data
      console.log(response.data)
      resolve(data)
    })
  })
}
