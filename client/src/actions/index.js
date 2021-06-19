import axios from 'axios'

const ADD_ACTIVITY = "ADD_ACTIVITY";
const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
const GET_COUNTRIES = "GET_COUNTRIES";
const REMOVE_ACTIVITY_COUNTRY = "REMOVE_ACTIVITY_COUNTRY";



export function addActivity(payload) {
    return { type: ADD_ACTIVITY, payload };
}

export function removeActivityCountry(payload) {
    return {type: REMOVE_ACTIVITY_COUNTRY, payload}
}

export function getCountries({name, page, size}) {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/countries/?name=${name}&page=${page}&size=${size}`)
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



