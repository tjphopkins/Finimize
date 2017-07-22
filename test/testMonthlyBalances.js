const chai = require('chai');
const expect = chai.expect;
const getMonthlyBalances = require('../apis/interest_calc/monthlyBalances');


describe('Interest Calculator', () => {
    it('No deposits at all', () => {
        expect(getMonthlyBalances(0, 12, 0.01, 0, 12)).to.eql([
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00,
            0.00
        ])}
    )
    it('No monthly deposits', () => {
        expect(getMonthlyBalances(100, 12, 0.01, 0, 12)).to.eql([
            100,
            100.08,
            100.17,
            100.25,
            100.33,
            100.42,
            100.5,
            100.58,
            100.67,
            100.75,
            100.84,
            100.92
        ])}
    )
    it('Monthly interest', () => {
        expect(getMonthlyBalances(100, 12, 0.01, 10, 12)).to.eql([
            100.00,
            110.08,
            120.18,
            130.28,
            140.38,
            150.50,
            160.63,
            170.76,
            180.90,
            191.05,
            201.21,
            211.38
        ])}
    )
    it('Quarterly interest', () => {
        expect(getMonthlyBalances(100, 4, 0.01, 10, 12)).to.eql([
            100.00,
            110.00,
            120.27,
            130.27,
            140.27,
            150.63,
            160.63,
            170.63,
            181.05,
            191.05,
            201.05,
            211.55
        ])}
    )
    it('Yearly interest', () => {
        expect(getMonthlyBalances(100, 1, 0.01, 10, 12)).to.eql([
            100.00,
            110.00,
            121.10,
            131.10,
            141.10,
            151.10,
            161.10,
            171.10,
            181.10,
            191.10,
            201.10,
            211.10
        ])}
    )
});
