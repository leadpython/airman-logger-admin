const db = require('./db.js')

exports.getAdmins = (request, response) => {
  db.many(`
    SELECT admin_name, permission_level FROM admins;
  `).then(data => {
    response.json({ data, status: true, message: 'Admins retrieved!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to retrieve admins!' })
  })
}

exports.registerAdmin = (request, response) => {
  const { cacid, admin_name, permission_level } = request.body
  db.many(`
    INSERT INTO admins (
      admin_name,
      cacid,
      permission_level
    ) VALUES (
      '${admin_name}',
      '${cacid.toUpperCase()}',
      ${permission_level}
    )
  `).then(data => {
    response.json({ data, status: true, message: 'Admin registered!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to register admin!' })
  })
}

exports.authenticateAdmin = (request, response) => {
  const { cacid } = request.body
  db.many(`
    SELECT * FROM admins
  `).then(data => {
    for (let i = 0; i < data.length; i++) {
      let admin = data[i]
      if (cacid.toUpperCase() === admin.cacid.toUpperCase()) {
        response.json({ data: {
          admin_name: admin.admin_name,
          permission_level: admin.permission_level
        }, status: true, message: 'Admin authenticated!' })
        return
      }
    }
    response.json({ data: {}, status: false, message: 'Failed to authenticate!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to authenticate!' })
  })
}

exports.removeAdmin = (request, response) => {
  const { admin_name } = request.body
  db.many(`
    DELETE FROM admins WHERE admin_name='${admin_name}'
  `).then(data => {
    response.json({ data, status: true, message: 'Admin removed!' })
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Failed to remove admin!' })
  })
}