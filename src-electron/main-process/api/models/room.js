const db = require('./db.js')

exports.getRooms = (request, response) => {
  db.many(`
    SELECT
      room_number,
      description,
      floor_number,
      wing
    FROM room;
  `).then(data => {
    response.json({ data, status: true, message: 'Rooms retrieved!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to retrieve rooms!' })
  })
}

exports.addRoom = (request, response) => {
  const { room, description, floor, wing, admin } = request.body
  db.none(`
    INSERT INTO room (
      room_number,
      description,
      floor_number,
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
      current_timestamp at time zone 'utc' at time zone 'cst',
      '${admin}',
      current_timestamp at time zone 'utc' at time zone 'cst'
    );
  `).then(data => {
    response.json({ data, status: true, message: 'Room added!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to add room!' })
  })
}

exports.updateRoom = (request, response) => {
  const { room, description, floor, wing, admin } = request.body
  db.none(`
    UPDATE room
    SET
      description='${description}',
      floor_number='${floor}',
      wing='${wing}',
      updated_by='${admin}',
      date_time_updated=current_timestamp
    WHERE
      room='${room}';
  `).then(data => {
    response.json({ data, status: true, message: 'Room updated!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to updated room!' })
  })
}

exports.removeRoom = (request, response) => {
  const { room } = request.body
  db.none(`
    DELETE FROM room WHERE room='${room}'
  `).then(data => {
    response.json({ data, status: true, message: 'Room removed!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to remove room!' })
  })
}