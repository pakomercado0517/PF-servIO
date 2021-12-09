import {GET_ALL_PROFESSIONALS} from '../actions'

const initialState = {
    professionals: [],
};

function rootReducer( state = initialState, { type, payload } ) {
    switch ( type ) {
        case GET_ALL_PROFESSIONALS:
            return {
                ...state,
                professionals: payload,
            };
        default:
            return state;

    };
};

export default rootReducer;