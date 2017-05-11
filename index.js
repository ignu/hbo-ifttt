var express = require('express')
var app = express()
var config = require('dotenv').config()

const API_PREFIX = '/ifttt/v1/'

const isValid = (req) => {
  const requestKey = req.headers['ifttt-channel-key']

  return requestKey == config.parsed.IFTTT_API_KEY
}

app.get(`${API_PREFIX}status`, function (req, res) {
  if(isValid(req)) {
    res.send({});
  } else {
    res.status(401).send({error: 'invalid key'})
  }
})

app.post('/status', function (req, res) {
  console.log('reaaaq', req)
  res.send({});
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})
