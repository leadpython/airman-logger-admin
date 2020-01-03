const db = require('./db.js')

exports.getAirmen = (request, response) => {
  const { airman_internal_id } = request.body
  db.many(`
    SELECT * FROM airman_master
  `).then(data => {
    response.json({ data, status: true, message: 'Airman retrieved!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to retrieve Airman!' })
  })
}

exports.addAirman = (request, response) => {
  const { cacid, last_name, first_name, middle_name, room_number, phase, status, squadron, admin } = request.body
  console.log(request.body)
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
      '${last_name}',
      '${first_name}',
      '${middle_name}',
      '${room_number}',
      '${phase}',
      '${status}',
      '${squadron}',
      current_timestamp at time zone 'utc' at time zone 'cst',
      '${admin}',
      current_timestamp at time zone 'utc' at time zone 'cst',
      '${admin}',
      TRUE
    )
  `).then(data => {
    console.log(data)
    response.json({ data, status: true, message: 'Airman added!' })
  }).catch(error => {
    console.log(error)
    response.json({ data: error, status: false, message: 'Failed to add Airman!' })
  })
}

exports.updateAirman = (request, response) => {
  const { cacid, last_name, first_name, middle_name, room_number, phase, status, squadron, admin } = request.body
  db.none(`
    UPDATE airman_master
    SET
      last_name='${last_name}',
      first_name='${first_name}',
      middle_name='${middle_name}',
      room_number='${room_number}',
      status='${status}',
      phase='${phase}',
      squadron='${squadron}',
      date_time_updated=current_timestamp at time zone 'utc' at time zone 'cst',
      updated_by='${admin}'
    WHERE
      cacid='${cacid}'
  `).then(data => {
    response.json({ data, status: true, message: 'Airman updated!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to update Airman!' })
  })
}

exports.replaceAirmanCACID = (request, response) => {
  const { airman_internal_id, cacid } = request.body
  db.none(`
    UPDATE airman_master
    SET
      cacid='${cacid}'
    WHERE
      airman_internal_id='${airman_internal_id}'
  `).then(data => {
    response.json({ data, status: true, message: 'CACID replaced!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to replace CACID!' })
  })
}

exports.removeAirman = (request, response) => {
  const { airman_internal_id } = request.body
  db.none(`
    DELETE FROM scan_transactions WHERE airman_internal_id=${airman_internal_id};
    DELETE FROM airman_master WHERE airman_internal_id='${airman_internal_id}';
  `).then(data => {
      response.json({ data, status: true, message: 'Airman removed!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Airman failed to remove!' })
  })
}
