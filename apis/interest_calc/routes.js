const express = require('express');
const router = express.Router();
let request = require('request');

const getMonthlyBalances = require('./monthlyBalances');


let getAndValidateParamOrError = function(
        req, param, required=true, type='number', allowedValues=null) {
    const value = req.query[param];
    if ([undefined, ''].includes(value)) {
        if (!required) {
            return value;
        }
        // TODO: Create custom MissingParam error class
        throw new Error(`Missing Param ${param}`);
    }
    if (
            (type === 'number' && isNaN(value)) |
            (type != 'number' && typeof(value) != type) |
            (allowedValues != null && !allowedValues.includes(value))
    ) {
        // TODO: Create custom Invalid Param error class
        throw new Error(`Invalid value ${value} for param ${param}`);
    }
    return value;
}


let getGbpUsdExchangeRate = function() {
    request(
        'http://api.fixer.io/latest?base=GBP',
        function(error, response, body) {
            if (response.statusCode != 200) {
                throw new Error('Could not retrieve exchange rate');
            }
            return JSON.parse(response.body).rates.USD;
    })
}


router.get('/monthly-balances', function(req, res) {
    let initialBalance = Number(
        getAndValidateParamOrError(req, 'initialBalance'));
    const periodsPerYear = Number(
        getAndValidateParamOrError(req, 'periodsPerYear'));
    let monthlyDeposit = Number(
        getAndValidateParamOrError(req, 'monthlyDeposit'));
    const currency = getAndValidateParamOrError(
        req, 'currency', required=false, type='string',
        allowedValues=['USD', 'GBP']);

    let annualInterest = getAndValidateParamOrError(req, 'annualInterest');
    annualInterest = annualInterest / 100;

    if (currency && currency != 'GBP') {
        const exchangeRate = getGbpUsdExchangeRate();
        initialBalance = initialBalance * exchangeRate;
        monthlyDeposit = monthlyDeposit * exchangeRate;
    }

    const monthlyBalances = getMonthlyBalances(
        initialBalance, periodsPerYear, annualInterest,
        monthlyDeposit, 12 * 50);

    res.json({
        'currency': currency ? currency : 'GBP',
        'monthlyBalances': monthlyBalances
    });
})


module.exports = router;
