const app = require('../server');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');


chai.use(chaiHttp);


describe('Interest Calculator Routes', () => {
    it('/monthly-balances without currency param returns successfully',
            (done) => {
        chai.request(app)
            .get('/api/interest-calc/monthly-balances')
            .query({
                'initialBalance': 100,
                'periodsPerYear': 12,
                'annualInterest': 1,
                'monthlyDeposit': 10
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.currency).to.equal('GBP');
                expect(res.body.monthlyBalances).to.have.lengthOf(600);
              done();
            });
        }
    )
    it('/monthly-balances with invalid param returns with error status code and message',
            (done) => {
        chai.request(app)
            .get('/api/interest-calc/monthly-balances')
            .query({
                'initialBalance': 'oops',
                'periodsPerYear': 12,
                'annualInterest': 1,
                'monthlyDeposit': 10
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.eql({
                    "error": "Invalid value oops for param initialBalance"});
              done();
            });
        }
    )
    it('/monthly-balances with missing param returns with error status code and message',
            (done) => {
        chai.request(app)
            .get('/api/interest-calc/monthly-balances')
            .query({
                'initialBalance': 100,
                'periodsPerYear': 12,
                'annualInterest': 1
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.eql({
                    "error": "Missing Param monthlyDeposit"});
              done();
            });
        }
    )
    it('/monthly-balances with currency param as USD returns successfully',
            (done) => {
        chai.request(app)
            .get('/api/interest-calc/monthly-balances')
            .query({
                'initialBalance': 100,
                'periodsPerYear': 12,
                'annualInterest': 1,
                'monthlyDeposit': 10,
                'currency': 'USD'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.currency).to.equal('USD');
                expect(res.body.monthlyBalances).to.have.lengthOf(600);
              done();
            });
        }
    )
});
