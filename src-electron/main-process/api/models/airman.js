const pgp = require('pg-promise')();
const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'airman_logger',
  user: 'postgres',
  password: 'postgres'
})
const Result = require('./Result.js')

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
  const { cacid, lastName, firstName, middleName, roomNumber, phase, status, squadron, updatedBy } = request.body
  db.none(`
    UPDATE airman
    SET
      last_name='${lastName}',
      first_name='${firstName}',
      middle_name='${middleName}',
      room_number='${roomNumber}',
      phase='${phase}',
      squadron='${squadron}'
  `)

}
