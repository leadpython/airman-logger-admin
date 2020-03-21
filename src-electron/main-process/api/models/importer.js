const db = require('./db.js')

exports.importData = (request, response) => {
  let formatted = JSON.parse(request.body.raw)
  let airmen = []
  let rooms = []
  let phases = []
  let squadrons = []

  for (let cacid in formatted) {
    const { last_name, first_name, room_number, phase, squadron } = formatted[cacid]

    if (rooms.indexOf(`('${room_number}', now())`) === -1) {
      db.one(`SELECT COUNT(*) FROM room WHERE room_number='${room_number}'`).then(count => {
        console.log(count)
        if (count <= 0) {
          rooms.push(`('${room_number}', now())`)
        }
      })
    }
    if (phases.indexOf(`('${phase}', now())`) === -1) {
      db.one(`SELECT COUNT(*) FROM room WHERE phase='${phase}'`).then(count => {
        if (count <= 0) {
          phases.push(`('${phase}', now())`)
        }
      })
    }
    if (squadrons.indexOf(`('${squadron}', now())`) === -1) {
      db.one(`SELECT COUNT(*) FROM squadron WHERE squadron='${squadron}'`).then(count => {
        if (count <= 0) {
          squadrons.push(`('${squadron}', now())`)
        }
      })
    }
    
    db.one(`SELECT COUNT(*) FROM airman_master WHERE cacid='${cacid}'`).then(count => {
      if (count <= 0) {
        airmen.push(`('${cacid}', '${last_name}', '${first_name}', '${room_number}', '${phase}', '${squadron}', now(), true)`)
      }
    })

  }

  db.none(`
    INSERT INTO room (room_number, date_time_created) VALUES ${rooms.join(',')};
    INSERT INTO phase (phase, date_time_created) VALUES ${phases.join(',')};
    INSERT INTO squadron (squadron, date_time_created) VALUES ${squadrons.join(',')};
    INSERT INTO airman_master (cacid, last_name, first_name, room_number, phase, squadron, date_time_created, is_in) VALUES ${airmen.join(',')};
  `).then(data => {
    response.json({ data, status: true, message: 'Airman retrieved!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to retrieve Airman!' })
  })
}

exports.importRooms = (request, response) => {
  let formatted = JSON.parse(request.body.raw)
  let rooms = []

  for (let i = 0; i < formatted.length; i++) {
    if (rooms.indexOf(`('${formatted[i]}', now())`) === -1) {
      db.one(`SELECT COUNT(*) FROM room WHERE room_number='${formatted[i]}'`).then(count => {
        console.log(count)
        if (count <= 0) {
          rooms.push(`('${formatted[i]}', now())`)
        }
      })
    }
  }

  db.none(`
    INSERT INTO room (room_number, date_time_created) VALUES ${rooms.join(',')};
  `).then(data => {
    response.json({ data, status: true, message: 'Airman retrieved!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to retrieve Airman!' })
  })
}
