import axios from 'axios'

const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
const GET_COUNTRIES = "GET_COUNTRIES";
const REMOVE_ACTIVITY_COUNTRY = "REMOVE_ACTIVITY_COUNTRY";
const GET_ACTIVITIES = 'GET_ACTIVITIES';
const GET_COUNTRIES_BYACT = 'GET_COUNTRIES_BYACT';
const CONF_ROUTE_COUNTRIES = 'CONF_ROUTE_COUNTRIES';


export function getCountriesByAct(payload) {
    return {type: GET_COUNTRIES_BYACT, payload}
}

export function configRouteCoutries(payload) {
    return {type: CONF_ROUTE_COUNTRIES, payload}
}


export function removeActivityCountry(payload) {
    return {type: REMOVE_ACTIVITY_COUNTRY, payload}
}

export function getCountries({ name: nm = '', page: pg=0, size: sz=10, continent, order: {order, type} }) {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/countries/?name=${nm}&page=${pg}&size=${sz}&continent=${continent}&order=${order}&type=${type}`)
            .then(res => {
                dispatch({ type: GET_COUNTRIES, payload: {rows: res.data.rows, count: res.data.count} });
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



