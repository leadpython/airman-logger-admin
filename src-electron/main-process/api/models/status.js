const db = require('./db.js')

exports.getStatuses = (request, response) => {
  db.many(`
    SELECT status, description FROM status;
  `).then(data => {
    response.json({ data, status: true, message: 'Statuses retrieved!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to retrieve statuses!' })
  })
}

exports.addStatus = (request, response) => {
  const { status, description, admin } = request.body
  db.none(`
    INSERT INTO status (
      status,
      description,
      created_by,
      date_time_created,
      updated_by,
      date_time_updated
    ) VALUES (
      '${status}',
      '${description}',
      '${admin}',
      current_timestamp::timestamptz AT TIME ZONE 'CST',
      '${admin}',
      current_timestamp::timestamptz AT TIME ZONE 'CST'
    );
  `).then(data => {
    response.json({ data, status: true, message: 'Status added!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to add status!' })
  })
}

exports.updateStatus = (request, response) => {
  const { status, description, admin } = request.body
  db.none(`
    UPDATE status
    SET
      description='${description}',
      updated_by='${admin}',
      date_time_updated=current_timestamp::timestamptz AT TIME ZONE 'CST'
    WHERE
      status='${status}';
  `).then(data => {
    response.json({ data, status: true, message: 'Status updated!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to update status!' })
  })
}

exports.removeStatus = (request, response) => {
  const { status } = request.body
  db.none(`
    DELETE FROM status WHERE status='${status}'
  `).then(data => {
    response.json({ data, status: true, message: 'Status removed!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to remove status!' })
  })
}