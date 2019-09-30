const { assert } = require('chai');
const supertest = require('supertest');

// eslint-disable-next-line no-unused-vars
let server;
beforeEach(() => {
  // eslint-disable-next-line global-require
  server = require('../../../server');
});
after(() => {});

process.env.TEST_API = 'http://localhost:3101';
process.env.NODE_ENV = 'integration-test';

const apiClient = supertest.agent(process.env.TEST_API);

describe('PRODUCT API', () => {
  describe('Should return data by GET', () => {
    it('OK /v1/products', (done) => {
      apiClient
        .get('/v1/products')
        .expect(200)
        .end((err, res) => {
          if (err) {
            console.log('NOK /v1/products');
            done(err);
          } else {
            assert.isNotNull(res, 'response should return data');
            done();
          }
        });
    });
  });
});
