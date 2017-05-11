/**
 * Fetches schedule data from HBO API
 */

const fetch = require('isomorphic-fetch');
const API_URL = 'http://www.hbo.com/api/content/schedule?';

function fetchScheduleData(date, zone) {
  const res = fetch(`${API_URL}date=${date}&zone=${zone}`, {
    method: 'GET'
  }).then(res => res.json());

  console.log('res', res)
  return res;
}

function upcomingShows(seriesName) {
  console.log('fetching shows for ', seriesName)

  return fetchScheduleData(new Date(), 'west')
}

module.exports = {
  fetchScheduleData,
  upcomingShows
};
