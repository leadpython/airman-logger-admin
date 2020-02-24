const db = require('./db.js')

exports.getRooms = (request, response) => {
  db.many(`
    SELECT
      room_number,
      description
    FROM room;
  `).then(data => {
    response.json({ data, status: true, message: 'Rooms retrieved!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to retrieve rooms!' })
  })
}

exports.addRoom = (request, response) => {
  const { room, description, admin } = request.body
  db.none(`
    INSERT INTO room (
      room_number,
      description,
      created_by,
      date_time_created,
      updated_by,
      date_time_updated
    ) VALUES (
      '${room}',
      '${description}',
      '${admin}',
      now(),
      '${admin}',
      now()
    );
  `).then(data => {
    response.json({ data, status: true, message: 'Room added!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to add room!' })
  })
}

exports.updateRoom = (request, response) => {
  const { room_number, description, admin } = request.body
  db.none(`
    UPDATE room
    SET
      description='${description}',
      updated_by='${admin}',
      date_time_updated=now()
    WHERE
      room_number='${room_number}';
  `).then(data => {
    response.json({ data, status: true, message: 'Room updated!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to updated room!' })
  })
}

exports.removeRoom = (request, response) => {
  const { room_number } = request.body
  db.none(`
    DELETE FROM room WHERE room_number='${room_number}'
  `).then(data => {
    response.json({ data, status: true, message: 'Room removed!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to remove room!' })
  })
}