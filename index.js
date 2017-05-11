var express = require('express')
var app = express()

const API_PREFIX = '/ifttt/v1/'

app.get(`${API_PREFIX}status`, function (req, res) {
  console.log('req', req)
  res.send({});
})

app.post('/status', function (req, res) {
  console.log('reaaaq', req)
  res.send({});
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})
