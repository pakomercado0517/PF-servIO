import {
  NEW_USER,
  NEW_CLIENT_NEED,
  GET_ALL_USERS,
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
  ORDER_DATA_CLIENT,
  OFFER_IN_NEED_BY_ID,
  CREATE_PREFERENCE,
  CREATE_TECNICAL_ACTIVITY,
  EXISTENT_USER,
  USER_LOGIN,
  PUT_CLIENT_NEEDS,
  PUT_USER,
  GET_OFFERS_OF_CLIENT_NEED,
  GET_OFFERS_BY_USER_ID,
  GOOGLE_LOGIN,
  DELETE_LOGIN,
  CITIES,
  SWITCH_MODAL_CART,
  RESET_PASSWORD,
  VALIDAR_TOKEN,
  NEW_PASSWORD,
  ACTIVAR,
  VALIDAR_TOKEN_CONFIRM_DONE,
  CONFIRMAR,
  GITHUB_LOGIN,
  GET_ALL_TRANSACTIONS_BY_USER_ID,
  FACEBOOK_LOGIN,
} from "../actions";

const initialState = {
  allUsers: [],
  professionals: [],
  user: [],
  clientNeeds: [],
  detailsClientNeed: [],
  clientNeedById: [],
  message: [],
  modal: "",
  modalProfessionalsOffer: "",
  professionsName: [],
  switch: true,
  account: [],
  specificActivitiesById: [],
  professionalActivityById: [],
  allProfessionalsOffers: [],
  clientsFilter: [],
  professionalsFilter: [],
  searchbar: "",
  loginDetail: [],
  putClientNeed: [],
  putUser: [],
  offersOfClientNeed: [],
  offerInNeedById: [],
  offersByUserId: [],
  z: false,
  googleLogin: [],
  cities: [],
  modalCart: "",
  resetPassword: [],
  validarToken: false,
  validarTokenConfirm: false,
  githubUser: [],
  googleUser: [],
  allTransactionsByUser: [],
  facebookUser: [],
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: payload,
      };
    case GET_ALL_PROFESSIONALS:
      return {
        ...state,
        professionals: payload,
      };
    case GET_OFFERS_BY_USER_ID:
      return {
        ...state,
        offersByUserId: payload,
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
      return {
        // usado para perfil profesional
        ...state,
        user: payload,
      };
    case GET_BY_ACCOUNT_ID:
      return {
        // usado para perfil cliente
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
        a: payload,
      };
    case NEW_CLIENT_NEED:
      return {
        ...state,
        message: payload,
      };
    case SEARCH_PROFESSIONAL_BY_NAME:
      return {
        ...state,
        professionals: payload,
      };
    case SHOW_FORM_CLIENT_NEED:
      return {
        ...state,
        modal: payload,
      };
    case SHOW_FORM_PROFESSIONAL_OFFER:
      return {
        ...state,
        modalProfessionalsOffer: payload,
      };
    case FILTER_PROFESSIONS:
      return {
        ...state,
        professionsName: payload,
      };
    case SWITCH_RENDER:
      return {
        ...state,
        switch: payload,
      };
    case CLIENTS_FILTERED:
      return {
        ...state,
        clientsFilter: payload,
      };
    case PROFESSIONAL_FILTERED:
      return {
        ...state,
        professionalsFilter: payload,
      };
    case SEARCHBAR:
      return {
        ...state,
        searchbar: payload,
      };
    case ORDER_DATA:
      return {
        ...state,
        professionalsFilter: payload,
      };
    case ORDER_DATA_CLIENT:
      return {
        ...state,
        clientsFilter: payload,
      };
    case OFFER_IN_NEED_BY_ID:
      return {
        ...state,
        offerInNeedById: payload,
      };
    case CREATE_PREFERENCE:
      return {
        ...state,
        message: payload,
      };
    case CREATE_TECNICAL_ACTIVITY:
      return {
        ...state,
        message: payload,
      };
    case EXISTENT_USER:
      return {
        ...state,
        z: payload,
      };
    case PUT_CLIENT_NEEDS:
      return {
        ...state,
        putClientNeed: payload,
      };
    case PUT_USER:
      return {
        ...state,
        putUser: payload,
      };
    case GET_OFFERS_OF_CLIENT_NEED:
      return {
        ...state,
        offersOfClientNeed: payload,
      };
    case USER_LOGIN:
      return {
        ...state,
        loginDetail: payload,
      };
    // case GOOGLE_LOGIN:
    //   return {
    //     ...state,
    //     googleLogin: payload,
    //   };
    case DELETE_LOGIN:
      return {
        ...state,
        loginDetail: payload,
        googleLogin: payload,
      };
    case CITIES:
      return {
        ...state,
        cities: payload,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        resetPassword: payload,
      };
    case VALIDAR_TOKEN:
      return {
        ...state,
        validarToken: payload,
      };
    case NEW_PASSWORD:
      return {
        ...state,
        message: payload,
      };
    case SWITCH_MODAL_CART:
      return {
        ...state,
        modalCart: payload,
      };
    case ACTIVAR:
      return {
        ...state,
        message: payload,
      };
    case GITHUB_LOGIN:
      return {
        ...state,
        githubUser: payload,
      };
    case GOOGLE_LOGIN:
      return {
        ...state,
        googleUser: payload,
      };
    case VALIDAR_TOKEN_CONFIRM_DONE:
      return {
        ...state,
        validarTokenConfirm: payload,
      };
    case CONFIRMAR:
      return {
        ...state,
        message: payload,
      };
    case GET_ALL_TRANSACTIONS_BY_USER_ID:
      return {
        ...state,
        allTransactionsByUser: payload,
      };
    case FACEBOOK_LOGIN:
      return {
        ...state,
        facebookUser: payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
