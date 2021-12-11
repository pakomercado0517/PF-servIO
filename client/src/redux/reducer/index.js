import {GET_ALL_NEEDS, GET_ALL_PROFESSIONALS, GET_BY_USER_ID, NEW_USER} from '../actions'

const initialState = {
    professionals: [],
    user: [],
    clientNeeds: [],
    message:[],
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
        case NEW_USER:
            return {
                ...state,
                message: payload,
            }
        default:
            return state;

    };
};

export default rootReducer;