/**
 * Fetches schedule data from HBO API
 */

const fetch = require('isomorphic-fetch');
const API_URL = 'http://www.hbo.com/api/content/schedule?';

function fetchScheduleData(date, zone) {
  const res = fetch(`${API_URL}date=${date}&zone=${zone}`, {
    method: 'GET'
  }).then(res => res.json());

  return res;
}

module.exports = {
  fetchScheduleData
};
