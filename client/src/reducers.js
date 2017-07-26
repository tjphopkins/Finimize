import { actionTypes } from './constants';

const initialState = {
    data: [
        {
            month: 1,
            amount:500
        },
        {
            month: 2,
            amount:700
        },
        {
            month: 3,
            amount:1000
        },
        {
            month: 4,
            amount:1500
        }
    ],
    params: {
        initialBalance: 0,
        monthlyDeposit: 0,
        annualInterest: 4,
        periodsPerYear: 12,
        currency: 'GBP'
    }
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PARAMS_CHANGED:
            return {
                ...state,
                params: action.params
            };
        case actionTypes.NEW_DATA_RETRIEVED:
            if (action.params !== state.params) {
                return state;
            }
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    }
};

export default reducer;
