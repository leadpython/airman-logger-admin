const express = require('express');
const router = express.Router();
const airman = require('./models/airman.js')
const room = require('./models/room.js')
const phase = require('./models/phase.js')
const squadron = require('./models/squadron.js')
const status = require('./models/status.js')

router.post('/airman/add', (request, response) => {
  airman.addAirman(request, response)
})

// ROOM
router.get('/room/get', (request, response) => {
  room.getRooms(request, response)
})
router.post('/room/add', (request, response) => {
  room.addRoom(request, response)
})
router.post('/room/update', (request, response) => {
  room.updateRoom(request, response)
})
router.post('/room/remove', (request, response) => {
  room.removeRoom(request, response)
})

// PHASE
router.get('/phase/get', (request, response) => {
  phase.getPhases(request, response)
})
router.post('/phase/add', (request, response) => {
  phase.addPhase(request, response)
})
router.post('/phase/update', (request, response) => {
  phase.updatePhase(request, response)
})
router.post('/phase/remove', (request, response) => {
  phase.removePhase(request, response)
})

// SQUADRON
router.get('/squadron/get', (request, response) => {
  squadron.getSquadrons(request, response)
})
router.post('/squadron/add', (request, response) => {
  squadron.addSquadron(request, response)
})
router.post('/squadron/update', (request, response) => {
  squadron.updateSquadron(request, response)
})
router.post('/squadron/remove', (request, response) => {
  squadron.removeSquadron(request, response)
})

// STATUS
router.get('/status/get', (request, response) => {
  status.getStatuses(request, response)
})
router.post('/status/add', (request, response) => {
  status.addStatus(request, response)
})
router.post('/status/update', (request, response) => {
  status.updateStatus(request, response)
})
router.post('/status/remove', (request, response) => {
  status.removeStatus(request, response)
})


module.exports = router;