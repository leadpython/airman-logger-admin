const db = require('./db.js')

exports.getPhases = (request, response) => {
  db.many(`
    SELECT phase, description FROM phase;
  `).then(data => {
    response.json({ data, status: true, message: 'Phases retrieved!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to retrieve phases!' })
  })
}

exports.addPhase = (request, response) => {
  const { phase, description, admin } = request.body
  db.none(`
    INSERT INTO phase (
      phase,
      description,
      created_by,
      date_time_created,
      updated_by,
      date_time_updated
    ) VALUES (
      '${phase}',
      '${description}',
      '${admin}',
      current_timestamp,
      '${admin}',
      current_timestamp
    );
  `).then(data => {
      response.json({ data, status: true, message: 'Phase added!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Phase failed to add!' })
  })
}

exports.updatePhase = (request, response) => {
  const { phase, description, admin } = request.body
  db.none(`
    UPDATE phase
    SET
      description='${description}',
      updated_by='${admin}',
      date_time_updated=current_timestamp
    WHERE
      phase='${phase}';
  `).then(data => {
      response.json({ data, status: true, message: 'Phase updated!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Phase failed to update!' })
  })
}

exports.removePhase = (request, response) => {
  const { phase } = request.body
  db.none(`
    DELETE FROM phase WHERE phase='${phase}'
  `).then(data => {
      response.json({ data, status: true, message: 'Phase removed!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Phase failed to remove!' })
  })
}
