import {GET_ALL_NEEDS, GET_ALL_PROFESSIONALS, GET_BY_USER_ID} from '../actions'

const initialState = {
    professionals: [],
    user: [],
    clientNeeds: [],
};

function rootReducer( state = initialState, { type, payload } ) {
    switch ( type ) {
        case GET_ALL_PROFESSIONALS:
            return {
                ...state,
                professionals: payload,
            };
        case GET_BY_USER_ID:
            return {
                ...state,
                user: payload,
            };
        case GET_ALL_NEEDS:
            return {
                ...state,
                clientNeeds: payload,
            };
        default:
            return state;

    };
};

export default rootReducer;