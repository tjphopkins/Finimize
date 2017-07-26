import fetch from 'isomorphic-fetch';
import url from 'url';

import { actionTypes } from './constants'


// Regular action creators
export function newDataRetrieved(params, data) {
    return {
        type: actionTypes.NEW_DATA_RETRIEVED,
        params,
        data
    }

}


export function paramsChanged(params) {
    return {
        type: actionTypes.PARAMS_CHANGED,
        params
    }
}


// Thunk action creators
export const requestNewData = (params) => {
    return dispatch => {
        return fetchData(params, dispatch);
    }
}


function buildUrl(baseUrl, params) {
    let urlObj = url.parse(baseUrl);
    urlObj.query = urlObj.query || {};
    Object.assign(urlObj.query, params);
    return urlObj.format();
};


function parseResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(`Request failed for url: ${response.url} \
            with status: ${response.status}`);
    }
};


function fetchData(params, dispatch) {
    const urlStr = buildUrl('api/interest-calc/monthly-balances', params);
    return fetch(urlStr, {
        method: 'GET',
        credentials: 'same-origin'
    })
    .then(parseResponse)
    .then((data) => {
        dispatch(newDataRetrieved(params, data.monthlyBalances));
    })
    .catch((error) => {
        console.error(error);
    });
};
