
import {GET_ALL_NEEDS, GET_ALL_PROFESSIONALS, GET_BY_USER_ID, NEW_USER, SEARCH_PROFESSIONAL_BY_NAME,FILTER_PROFESSIONS, ORDER_DATA, GET_BY_COMPTE_ID} from '../actions'


const initialState = {
    professionals: [],
    user: [],
    clientNeeds: [],
    message:[],

    professionsName:[],

    compte: [],

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
        case GET_BY_COMPTE_ID:
            return {
                ...state,
                compte: payload,
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
        case SEARCH_PROFESSIONAL_BY_NAME: 
            return {
                ...state,
                professionals: payload
            }

            case FILTER_PROFESSIONS:
                return {
                    ...state,
                    professionsName: payload,
                }
        

        case ORDER_DATA:
            let option = [];
            switch (payload) {
                case 'A-Z':
                    option = state.professionals.sort((a,b) => {
                        if (a.first_name > b.first_name) return 1;
                        if(a.first_name < b.first_name) return -1;
                        return 0;
                    })
                    break;
                case 'Z-A':
                    option = state.professionals.sort((a,b) => {
                        if (a.first_name > b.first_name) return -1;
                        if(a.first_name < b.first_name)return 1;
                        return 0;
                    })
                    break
                default:
                    break;
            }
            return {
                ...state,
                professionals: option
            }

        default:
            return state;
        

    };
};

export default rootReducer;