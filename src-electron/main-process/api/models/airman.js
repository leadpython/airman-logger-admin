const db = require('./db.js')
const Result = require('./Result.js')

exports.getAirman = (request, response) => {
  const { airman_internal_id } = request.body
  db.one(`
    SELECT * FROM airman WHERE airman_internal_id='${airman_internal_id}'
  `).then((data) => {
    response.json(new Result({
      data, status: true, message: 'Airman retrieved!'
    })).catch(error => {
      response.json(new Result({
        data: error, status: false, message: 'Failed to retrieve airman!'
      }))
    })
  })
}

exports.addAirman = (request, response) => {
  const { cacid, lastName, firstName, middleName, roomNumber, phase, status, squadron, createdBy, updatedBy } = request.body
  db.none(`
    INSERT INTO airman_master (
      cacid,
      last_name,
      first_name,
      middle_name,
      room_number,
      phase,
      status,
      squadron,
      date_time_created,
      created_by,
      date_time_updated,
      updated_by,
      is_in
    ) VALUES (
      '${cacid}',
      '${lastName}',
      '${firstName}',
      '${middleName}',
      '${roomNumber}',
      '${phase}',
      '${status}',
      '${squadron}',
      current_timestamp,
      '${createdBy}',
      current_timestamp,
      '${updatedBy},
      TRUE
    )
  `).then(() => {
    response.json(new Result({
      data: {}, status: true, message: 'Airman added!'
    })).catch(error => {
      response.json(new Result({
        data: error, status: false, message: 'Failed to add airman!'
      }))
    })
  })
}

exports.modifyAirman = (request, response) => {
  const { lastName, firstName, middleName, roomNumber, phase, status, squadron, updatedBy } = request.body
  // authenticate
  db.none(`
    UPDATE airman
    SET
      last_name='${lastName}',
      first_name='${firstName}',
      middle_name='${middleName}',
      room_number='${roomNumber}',
      phase='${phase}',
      squadron='${squadron}',
      date_time_updated=current_timestamp,
      updated_by='${updatedBy}'
    WHERE
      cacid='${cacid}'
  `).then(() => {
    response.json(new Result({
      data: {}, status: true, message: 'Airman information updated!'
    })).catch(error => {
      response.json(new Result({
        data: error, status: false, message: 'Failed to update airman information!'
      }))
    })
  })
}

exports.replaceAirmanCACID = (request, response) => {
  const { airman_internal_id, cacid } = request.body
  db.none(`
    UPDATE airman
    SET
      cacid='${cacid}'
    WHERE
      airman_internal_id='${airman_internal_id}'
  `).then(() => {
    response.json(new Result({
      data: {}, status: true, message: 'Airman CACID replaced!'
    })).catch(error => {
      response.json(new Result({
        data: error, status: false, message: 'Failed to replace CACID!'
      }))
    })
  })
}
