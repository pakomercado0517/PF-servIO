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
    DATA_FILTERED,
    SEARCHBAR,
    CLIENTS_FILTERED,
    PROFESSIONAL_FILTERED,
    ORDER_DATA_CLIENT
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
    clientsFilter:[],
    professionalsFilter:[],
    searchbar:''
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
        case CLIENTS_FILTERED:
              return {
                  ...state,
                  clientsFilter: payload
              };
        case PROFESSIONAL_FILTERED:
              return {
                  ...state,
                  professionalsFilter: payload
              };
        case SEARCHBAR:
                return {
                    ...state,
                    searchbar: payload
                };
        case ORDER_DATA:
            return {
                ...state,
                professionalsFilter: payload
            };
        case ORDER_DATA_CLIENT:
              return {
                  ...state,
                  clientsFilter: payload
              };
          default:
              return state;
    };
};

export default rootReducer;
