

const initialState = {

    data: [],

};

function rootReducer( state = initialState, { type, payload } ) {
    switch ( type ) {
        case 'GET_DATA':
            return {
                ...state,
                data: payload,
            };
        default:
            return state;

    };
};

export default rootReducer;