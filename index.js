const express = require("express");
const app = express();
const config = require("dotenv").config().parsed;
const { upcomingShows, parseAirings } = require("./utils/fetch-schedule-data");
const bodyParser = require("body-parser");
const R = require("ramda");

app.use(bodyParser.json()); // for parsing application/json
const API_PREFIX = "/ifttt/v1/";

const validate = (req, res) => {
  const requestKey = req.headers["ifttt-channel-key"];

  const valid = requestKey == config.IFTTT_API_KEY;

  if (!valid) {
    res.status(401).send({ errors: ["invalid key"] });
  }

  return valid;
};

app.get(`${API_PREFIX}status`, function(req, res) {
  if (!validate(req, res)) {
    return;
  }

  res.send({});
});

app.post(`${API_PREFIX}test/setup`, function(req, res) {
  if (!validate(req, res)) {
    return;
  }

  const scaffold = {
    data: {
      samples: {
        triggers: {
          new_show_scheduled: {
            series: "VEEP"
          }
        }
      }
    }
  };

  res.send(scaffold);
});

app.post(`${API_PREFIX}triggers/new_show_scheduled`, function(req, res) {
  if (!validate(req, res)) {
    return;
  }

  const { series } = req.body.triggerFields;
  const promise = upcomingShows(series);

  //http://www.hbo.com/api/schedule/programs?focusIds=796161,800594
  const sendAirings = data => {
    res.send(parseAirings(data, series));
  };

  promise.then(sendAirings);
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Example app listening on port 3000!");
});
