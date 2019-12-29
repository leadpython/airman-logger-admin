const db = require('./db.js')

exports.addScanTransactions = (request, response) => {
  const { cacid } = request.body
  db.many(`
    SELECT airman_internal_id, is_in, first_name, last_name FROM airman_master WHERE cacid='${cacid}';
  `).then(data => {
    if (data.length <= 0) {
      response.json({ data, status: false, message: 'Airman not found!' })
    } else {
      const { airman_internal_id, is_in, last_name, first_name } = data[0]
      db.none(`
        INSERT INTO scan_transactions (
          airman_internal_id,
          cacid,
          is_in,
          date,
          time
        ) VALUES (
          '${airman_internal_id}',
          '${cacid}',
          ${!is_in},
          current_date,
          current_time
        );
      `).then(() => {
        db.none(`
          UPDATE airman_master
          SET
            is_in=${!is_in}
          WHERE
            cacid='${cacid}'
        `).then(() => {
          response.json({ data: {
            lastName: last_name,
            firstName: first_name,
            isIn: !is_in,
            date: (new Date())
          }, status: true, message: 'Airman found!' })
        }).catch(error => {
          console.log(error)
        })
      }).catch(error => {
        console.log(error)
      })
    }
  }).catch(error => {
    response.json({ data: error, status: false, message: 'Airman not found!' })
  })
}
