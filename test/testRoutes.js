const app = require('../server');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Interest Calculator Routes', () => {
    it("/hello should return 'Say hello' string", (done) => {
        chai.request(app)
            .get('/api/interest-calc/hello')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.eql('Say hello');
              done();
            });
        }
    )
});
