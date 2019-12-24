var express = require("express")
var bodyParser = require("body-parser")
var routes = require('./routes.js')
var app = express()

export default {
  initialize () {
    return new Promise((resolve, reject) => {
      app.use(bodyParser.json())
      app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*')
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
        next()
      });
      app.use('/api', routes)
      app.listen(process.env.PORT || 8081, function () {
        console.log("App now running!")
        resolve(true)
      })
    })
  }
}