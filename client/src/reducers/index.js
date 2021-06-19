const initialState = {
    countriesActivity: [],
    countriesLoaded: [],
    countryDetail: {}
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_ACTIVITY":
            return { ...state, countriesActivity: [...state.countriesActivity, action.payload] }
        case "REMOVE_ACTIVITY_COUNTRY":
            return { ...state, countriesActivity: state.countriesActivity.filter(country => country.id !== action.payload) }
        case "GET_COUNTRY_DETAIL":
            return { ...state, countryDetail: action.payload}
        case "GET_COUNTRIES":
            return { ...state, countriesLoaded: action.payload }
        default:
            return state
    }
}

export default rootReducer;

