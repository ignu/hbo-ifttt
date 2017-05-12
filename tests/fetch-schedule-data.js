const { expect } = require('chai');
const { fetchScheduleData, parseAirings } = require('../utils/fetch-schedule-data');
const data = require('./fixtures/scheduleData')

describe('Fetch Schedule Data', () => {
  it('should return schedule data from the HBO API for a given date and zone', done => {
    fetchScheduleData('2017-05-13', 'west')
      .then(res => {
        expect(res).to.have.property('content');
        done();
      }, err => {
        console.error(err);
        done();
      });
  });
});

describe('Parse Schedule Data', () => {
  it("returns schedule data", (done) => {
    parseAirings(data).then((airingData) => {
      const airings = airingData.data

      console.log('airings[0]', airings[0])
      expect(airings.length).to.equal(8)
      expect(airings[0].series_name).to.equal("Sesame Street")

      done()
    })
  })

  it("can filter by series", (done) => {
    parseAirings(data, "Sesame Street").then((airingData) => {
      const airings = airingData.data

      expect(airings.length).to.equal(1)
      done()
    })
  })
})
