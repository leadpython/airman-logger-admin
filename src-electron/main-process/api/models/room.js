const db = require('./db.js')
const Result = require('./Result.js')

exports.getRooms = (request, response) => {
  db.many(`
    SELECT * FROM room;
  `).then((data) => {
      response.json(new Result({
        data, status: true, message: 'Room retrieved!'
    })).catch(error => {
      response.json(new Result({
        data: error, status: false, message: 'Failed to retrieve rooms!'
      }))
    })
  })
}

exports.addRoom = (request, response) => {
  const { room, description, floor, wing, admin } = request.body
  db.none(`
    INSERT INTO room (
      room,
      description,
      floor,
      wing,
      created_by,
      date_time_created,
      updated_by,
      date_time_updated
    ) VALUES (
      '${room}',
      '${description}',
      '${floor}',
      '${wing}',
      '${admin}',
      current_timestamp,
      '${admin}',
      current_timestamp
    );
  `).then((data) => {
      response.json(new Result({
        data, status: true, message: 'Room added!'
    })).catch(error => {
      response.json(new Result({
        data: error, status: false, message: 'Failed to add room!'
      }))
    })
  })
}

exports.updateRoom = (request, response) => {
  const { room, description, floor, wing, admin } = request.body
  db.none(`
  UPDATE room
  SET
    description='${description}',
    floor='${floor}',
    wing='${wing}',
    updated_by='${admin}',
    date_time_updated=current_timestamp
  WHERE
    room='${room}';
  `).then((data) => {
      response.json(new Result({
        data, status: true, message: 'Room updated!'
    })).catch(error => {
      response.json(new Result({
        data: error, status: false, message: 'Failed to update room!'
      }))
    })
  })
}

exports.removeRoom = (request, response) => {
  const { room } = request.body
  db.none(`
    DELETE FROM room WHERE room='${room}'
  `).then((data) => {
      response.json(new Result({
        data, status: true, message: 'Room removed!'
    })).catch(error => {
      response.json(new Result({
        data: error, status: false, message: 'Failed to updremoveate room!'
      }))
    })
  })
}