const axios = require('axios');

import {
    GET_ITEMS
} from '.types';

export function getItem() {
    return function(dispatch, setState) {
        const { settings } = setState();
        dispatch({
            type: GET_ITEMS,
            payload: {}
        })
    }
}