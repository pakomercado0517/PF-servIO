import {
    NEW_USER, 
    NEW_CLIENT_NEED,
    GET_ALL_NEEDS, 
    GET_ALL_CLIENT_NEEDS,
    GET_ALL_PROFESSIONALS, 
    GET_BY_USER_ID, 
    GET_BY_ACCOUNT_ID,
    GET_SPECIFIC_ACTIVITIES_BYID,
    GET_PROFESSIONAL_ACTIVITY_BY_ID,
    GLOBAL_LOCAL_STORAGE,
    ORDER_DATA, 
    FILTER_PROFESSIONS,
    SHOW_FORM_CLIENT_NEED,
    SHOW_FORM_PROFESSIONAL_OFFER,
    SWITCH_RENDER,
    SEARCH_PROFESSIONAL_BY_NAME,
    GET_DETAILS_CLIENT_NEED_BYID,
    GET_ALL_PROFESSIONAL_OFFERS,
    DATA_FILTERED
} from '../actions'




const initialState = {
    professionals: [],
    user: [],
    clientNeeds: [],
    detailsClientNeed: [],
    clientNeedById: [],
    message:[],
    modal:"",
    modalProfessionalsOffer: "",
    professionsName:[],
    switch: true,
    account: [],
    specificActivitiesById: [],
    professionalActivityById: [],
    allProfessionalsOffers: [],
    filter:[],
};

function rootReducer( state = initialState, { type, payload } ) {
    switch ( type ) {
        case GET_ALL_PROFESSIONALS:
            return {
                ...state,
                professionals: payload,
            };
        case GET_DETAILS_CLIENT_NEED_BYID:
            return {
                ...state,
                detailsClientNeed: payload,
            };
        case GET_SPECIFIC_ACTIVITIES_BYID:
            return {
                ...state,
                specificActivitiesById: payload,
            };
        case GET_PROFESSIONAL_ACTIVITY_BY_ID:
            return {
                ...state,
                professionalActivityById: payload,
            };
        case GLOBAL_LOCAL_STORAGE:
            return {
                ...state,
                ...payload,
            };
        case GET_BY_USER_ID:
            return { // usado para perfil profesional
                ...state,
                user: payload,
            };
        case GET_BY_ACCOUNT_ID:
            return { // usado para perfil cliente
                ...state,
                account: payload,
            };
        case GET_ALL_NEEDS:
            return {
                ...state,
                clientNeeds: payload,
            };
        case GET_ALL_CLIENT_NEEDS:
            return {
                ...state,
                clientNeedById: payload,
            };
        case GET_ALL_PROFESSIONAL_OFFERS:
            return {
                ...state,
                allProfessionalsOffers: payload,
            };
        case NEW_USER:
            return {
                ...state,
                message: payload,
            };
        case NEW_CLIENT_NEED:
            return {
                ...state,
                message: payload,
            };
        case SEARCH_PROFESSIONAL_BY_NAME: 
            return {
                ...state,
                professionals: payload
            };
        case SHOW_FORM_CLIENT_NEED: 
            return {
                ...state,
                modal: payload
            };
        case SHOW_FORM_PROFESSIONAL_OFFER:
            return {
                ...state,
                modalProfessionalsOffer: payload
            };
        case FILTER_PROFESSIONS:
            return {
                ...state,
                professionsName: payload,
            };
        case SWITCH_RENDER:
            return {
                ...state,
                switch: payload
            };
        case DATA_FILTERED:
              return {
                  ...state,
                  filter: payload
              };
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
            };
            return {
                ...state,
                professionals: option
            };
        default:
            return state;
    };
};

export default rootReducer;
