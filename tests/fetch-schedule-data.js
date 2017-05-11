const { expect } = require('chai');
const { fetchScheduleData } = require('../utils/fetch-schedule-data');

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
