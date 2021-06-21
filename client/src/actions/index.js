import axios from 'axios'

const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
const GET_COUNTRIES = "GET_COUNTRIES";
const REMOVE_ACTIVITY_COUNTRY = "REMOVE_ACTIVITY_COUNTRY";
const GET_ACTIVITIES = 'GET_ACTIVITIES';
const GET_COUNTRIES_BYACT = 'GET_COUNTRIES_BYACT';


export function getCountriesByAct(payload) {
    return {type: GET_COUNTRIES_BYACT, payload}
}


export function removeActivityCountry(payload) {
    return {type: REMOVE_ACTIVITY_COUNTRY, payload}
}

export function getCountries({name, page, size, continent, activity}) {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/countries/?name=${name}&page=${page}&size=${size}&continent=${continent}&activity=${activity}`)
            .then(response => {
                dispatch({ type: GET_COUNTRIES, payload: response.data.rows });
            })
    };
}

export function getCountryDetail(idPais) {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/countries/${idPais}`)
            .then(response => {
                console.log(response)
                dispatch({ type: GET_COUNTRY_DETAIL, payload: response.data });
            })
    };
}

export function getActivities( ) {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/activity`)
            .then(response => {
                dispatch({ type: GET_ACTIVITIES, payload: response.data });
            })
    };
}



