const db = require('./db.js')

exports.getSquadrons = (request, response) => {
  db.many(`
    SELECT squadron, description FROM squadron;
  `).then(data => {
    response.json({ data, status: true, message: 'Squadrons retrieved!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to retrieve squadrons!' })
  })
}

exports.addSquadron = (request, response) => {
  const { squadron, description, admin } = request.body
  db.none(`
    INSERT INTO squadron (
      squadron,
      description,
      created_by,
      date_time_created,
      updated_by,
      date_time_updated
    ) VALUES (
      '${squadron}',
      '${description}',
      '${admin}',
      current_timestamp,
      '${admin}',
      current_timestamp
    );
  `).then(data => {
    response.json({ data, status: true, message: 'Squadron added!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to retrieve squadrons!' })
  })
}

exports.updateSquadron = (request, response) => {
  const { squadron, description, admin } = request.body
  db.none(`
    UPDATE squadron
    SET
      description='${description}',
      updated_by='${admin}',
      date_time_updated=current_timestamp
    WHERE
      squadron='${squadron}';
  `).then(data => {
    response.json({ data, status: true, message: 'Squadron updated!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to update squadron!' })
  })
}

exports.removeSquadron = (request, response) => {
  const { squadron } = request.body
  db.none(`
    DELETE FROM squadron WHERE squadron='${squadron}'
  `).then(data => {
    response.json({ data, status: true, message: 'Squadron removed!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to remove squadron!' })
  })
}