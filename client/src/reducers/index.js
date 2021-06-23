const initialState = {
    countriesActivity: [],
    countriesLoaded: [],
    countryDetail: {},
    countriesByAct: [],
    numCountriesLoad : [],
    routeCountries: {}
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_COUNTRIES_BYACT":
            return { ...state, countriesByAct: state.countriesActivity.filter(act => act.name === action.payload)}
        case "GET_ACTIVITIES":
            return { ...state, countriesActivity: action.payload}
        case "REMOVE_ACTIVITY_COUNTRY":
            return { ...state, countriesActivity: state.countriesActivity.filter(country => country.id !== action.payload) }
        case "GET_COUNTRY_DETAIL":
            return { ...state, countryDetail: action.payload}
        case "GET_COUNTRIES":
            return { ...state, countriesLoaded: action.payload.rows, numCountriesLoad: action.payload.count }
        case "CONF_ROUTE_COUNTRIES":
            return {...state, routeCountries: action.payload} 
        default:
            return state
    }
}

export default rootReducer;

