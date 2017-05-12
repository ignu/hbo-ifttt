const R = require("ramda");
const fetch = require("isomorphic-fetch");
const API_URL = "http://www.hbo.com/api/content/schedule?";
const API_FOCUS_URL = "http://www.hbo.com/api/schedule/programs?focusIds="
var Promise = require("bluebird");

function fetchScheduleData(date, zone) {
  const res = fetch(`${API_URL}date=${date}&zone=${zone}`, {
    method: "GET"
  }).then(res => res.json());

  return res;
}

let focuseCache = {};

function parseAirings(data, seriesName) {
  return new Promise((res, rej) => {
    const programAirings = R.map(c => c.programAirings)(data.content.channelData);

    const airings = R.filter(a => a.airing.premiere)(
      R.reduce(R.union, [], programAirings)
    );

    const uniqueAirings = R.uniqBy(a => a.program.focusId)(airings)

    const focusIds = R.map(a => a.program.focusId)(airings)

    fetch(API_FOCUS_URL + focusIds.join(',')).then(res => res.json()).then((focusData) => {
      const formatAirings = R.map(c => {
        const program = R.find(f => f.focusId === c.program.focusId)(focusData)
        return {
          id: c.program.focusId,
          meta: {
            id: c.program.focusId,
            timestamp: Date.parse(c.airing.playDate)
          },
          series_name: R.path(['series', 'title'])(program),
          episode_title: c.program.title,
          episode_date: c.airing.playDate,
          episode_description: program.summary
        };
      });

      const formattedAirings = formatAirings(uniqueAirings)
      res({ data: formattedAirings });
    })
  })
}

function upcomingShows(seriesName) {
  return fetchScheduleData(new Date(), "west");
}

module.exports = {
  fetchScheduleData,
  upcomingShows,
  parseAirings
};
