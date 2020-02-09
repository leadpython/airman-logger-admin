const db = require('./db.js')

exports.reportSignedIn = (request, response) => {
  db.many(`
    SELECT * FROM airman_master WHERE is_in=TRUE
  `).then(data => {
    response.json({ data, status: true, message: 'Report generated!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to generate report!' })
  })
}

exports.reportSignedOut = (request, response) => {
  db.many(`
    SELECT * FROM airman_master WHERE is_in=FALSE
  `).then(data => {
    response.json({ data, status: true, message: 'Report generated!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to generate report!' })
  })
}

exports.reportIdle = (request, response) => {
  const today = (new Date())
  const year = today.getFullYear()
  const month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)
  const date = (today.getDate()) < 10 ? '0' + (today.getDate()) : (today.getDate())
  db.many(`
    SELECT * FROM airman_master WHERE last_activity<=TIMESTAMP '${year}-${month}-${date} 04:00:00';
  `).then(data => {
    response.json({ data, status: true, message: 'Report generated!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to generate report!' })
  })
}