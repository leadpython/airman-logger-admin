const express = require('express');
const router = express.Router();
const airman = require('./models/airman.js')

router.post('/airman/add', (request, response) => {
  airman.addAirman(request, response)
})

module.exports = router;