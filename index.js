var express = require('express')
var app = express()
var config = require('dotenv').config().parsed

const API_PREFIX = '/ifttt/v1/'

const isValid = (req) => {
  const requestKey = req.headers['ifttt-channel-key']

  return requestKey == config.IFTTT_API_KEY
}

app.get(`${API_PREFIX}status`, function (req, res) {
  if(isValid(req)) {
    res.send({});
  } else {
    res.status(401).send({error: 'invalid key'})
  }
})

app.post(`${API_PREFIX}test/setup`, function (req, res) {
  if(isValid(req)) {
    const scaffold = {
      "data": {
        "samples": {
          "triggers": {
            "new_show_scheduled": {
              "episode": {
                "title": "G'Day Melbourne"
              }
            }
          }
        }
      }
    }

    res.send(scaffold);
  } else {
    res.status(401).send({error: 'invalid key'})
  }
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})
