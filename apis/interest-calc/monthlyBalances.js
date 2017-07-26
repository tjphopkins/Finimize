const assert = require('assert');


function oneMonthInvestment(
        balance, periodsPerYear, annualInterest,
        monthlyDeposit, monthsElapsed) {
    assert([12, 4, 1].includes(periodsPerYear));
    const modulo = 12 / periodsPerYear;
    if ((monthsElapsed - 1) % modulo === 0) {
        return (
            balance * (
                (1 + (annualInterest / periodsPerYear))) + monthlyDeposit
        );
    }
    return (balance + monthlyDeposit);
}


function getMonthlyBalances(
        initialBalance, periodsPerYear, annualInterest,
        monthlyDeposit, investedMonths, monthlyBalances = [], monthsElapsed = 0) {
    /*
    :arg initialBalance Number
    :arg periodsPerYear Number - Number of compounding periods per year
    :arg annualInterest Number
    :arg monthlyDeposit Number
    :arg investedMonths Number - Number of months to invest for
    :kwarg monthlyBalances Array, default []
    :kwarg monthsElapsed Number, default 0

    :return monthlyBalances Array - where the ith element is the balance in
                                    month i
    */
    if (monthsElapsed === investedMonths) {
        return monthlyBalances;
    }
    const newBalance = oneMonthInvestment(
        initialBalance, periodsPerYear, annualInterest,
        monthlyDeposit, monthsElapsed
    );
    monthsElapsed += 1;
    monthlyBalances.push(Number(initialBalance).toFixed(2) / 1);
    return getMonthlyBalances(
        newBalance, periodsPerYear, annualInterest,
        monthlyDeposit, investedMonths, monthlyBalances, monthsElapsed);
}


module.exports = getMonthlyBalances;
