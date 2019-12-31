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