import axios from "axios";

const constants = {
  localhost: "http://localhost:3001",
};

export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_ALL_PROFESSIONALS = "GET_ALL_PROFESSIONALS";
export const GET_ALL_COMMON_USERS = "GET_ALL_COMMON_USERS";
export const GET_BY_USER_ID = "GET_BY_USER_ID";
export const GET_BY_ACCOUNT_ID = "GET_BY_ACCOUNT_ID";
export const GET_PROFESSIONAL_BY_ACTIVITY_NAME =
  "GET_PROFESSIONAL_BY_ACTIVITY_NAME";
export const GET_BY_ACTIVITY_NAME = "GET_BY_ACTIVITY_NAME";
export const GET_ALL_NEEDS = "GET_ALL_NEEDS";
export const GET_ALL_CLIENT_NEEDS = "GET_ALL_CLIENT_NEEDS";
export const SEARCH_PROFESSIONAL_BY_NAME = "SEARCH_PROFESSIONAL_BY_NAME";
export const NEW_CLIENT_NEED = "NEW_CLIENT_NEED";
export const NEW_TECHNICAL_ACTIVITY = "NEW_TECHNICAL_ACTIVITY";
export const NEW_USER = "NEW_USER";
export const NEW_PROFESSIONAL_OFFER = "NEW_PROFESSIONAL_OFFER";
export const FILTER_PROFESSIONS = "FILTER_PROFESSIONS;";
export const SWITCH_RENDER = "SWITCH_RENDER";
export const ORDER_DATA = "ORDER_DATA";
export const SHOW_FORM_CLIENT_NEED = "SHOW_FORM_CLIENT_NEED";
export const SHOW_FORM_PROFESSIONAL_OFFER = "SHOW_FORM_PROFESSIONAL_OFFER";
export const GLOBAL_LOCAL_STORAGE = "GLOBAL_LOCAL_STORAGE";
export const GET_SPECIFIC_ACTIVITIES_BYID = "GET_SPECIFIC_ACTIVITIES_BYID";
export const GET_PROFESSIONAL_ACTIVITY_BY_ID =
  "GET_PROFESSIONAL_ACTIVITY_BY_ID";
export const GET_DETAILS_CLIENT_NEED_BYID = "GET_DETAILS_CLIENT_NEED_BYID";
export const GET_DETAILS_PROFESSIONAL_OFFER_BYID =
  "GET_DETAILS_PROFESSIONAL_OFFER_BYID"; //
export const GET_ALL_PROFESSIONAL_OFFERS = "GET_ALL_PROFESSIONAL_OFFERS";
export const SEARCHBAR = "SEARCHBAR";
export const DATA_FILTERED = "DATA_FILTERED";
export const CLIENTS_FILTERED = "CLIENTS_FILTERED";
export const PROFESSIONAL_FILTERED = "PROFESSIONAL_FILTERED";
export const ORDER_DATA_CLIENT = "ORDER_DATA_CLIENT";
export const USER_LOGIN = "USER_LOGIN";
export const PUT_CLIENT_NEEDS = 'PUT_CLIENT_NEEDS';
export const PUT_USER = 'PUT_USER';
export const GET_OFFERS_OF_CLIENT_NEED = 'GET_OFFERS_OF_CLIENT_NEED'
export const GET_OFFERS_BY_USER_ID = 'GET_OFFERS_BY_USER_ID'
export const OFFER_IN_NEED_BY_ID = 'OFFER_IN_NEED_BY_ID';
export const CREATE_PREFERENCE = 'CREATE_PREFERENCE';
export const CREATE_TECNICAL_ACTIVITY = 'CREATE_TECNICAL_ACTIVITY';
export const EXISTENT_USER = 'EXISTENT_USER'
export const GOOGLE_LOGIN = 'GOOGLE_LOGIN'
export const DELETE_LOGIN = 'DELETE_LOGIN'
export const CITIES = 'CITIES'
export const SWITCH_MODAL_CART = 'SWITCH_MODAL_CART'
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const VALIDAR_TOKEN = 'VALIDAR_TOKEN'
export const NEW_PASSWORD = 'NEW_PASSWORD'
export const ACTIVAR = 'ACTIVAR'
export const VALIDAR_TOKEN_CONFIRM_DONE ='VALIDAR_TOKEN_CONFIRM_DONE'
export const CONFIRMAR = 'CONFIRMAR'
// trae todos los usuarios - clientes y profesionales
export function getAllUsers () {
    
    return async function (dispatch) {
        
        try {
            const response = await axios.get(`${ constants.localhost }/user/all`)
            dispatch({
                type: GET_ALL_USERS,
                payload: response.data
            });
        } catch (error) {
            console.log(error.message)
        };
    };
};

// trae todos los usuarios - clientes y profesionales
export function getDetailsClientNeed(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${constants.localhost}/clientNeeds/need/${id}`
      );
      dispatch({
        type: GET_DETAILS_CLIENT_NEED_BYID,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
// trae las necesidades especificas por id de profesional
export function getSpecificActivitiesById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${constants.localhost}/TecnicalsActivities/${id}`
      );
      dispatch({
        type: GET_SPECIFIC_ACTIVITIES_BYID,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
// trae todos los professionales
export function getAllProfessionals() {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${constants.localhost}/user/professionals`
      );

      dispatch({
        type: GET_ALL_PROFESSIONALS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
// trae todas las ofertas de un profesional en particular
export function getOffersById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${constants.localhost}/professsionalOffer/all/${id}`
      );
      dispatch({
        type: GET_OFFERS_BY_USER_ID,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
// trae los usuarios (clientes) incluyendo necesidades del cliente
// export function getAllCommonUsers () {

//     return async function (dispatch) {

//         try {
//             const response = await axios.get(`${ constants.localhost }/clientNeeds/all`)
//             dispatch({
//                 type: GET_ALL_COMMON_USERS,
//                 payload: response.data
//             });
//         } catch (error) {
//             console.log(error.message)
//         };
//     };
// };

// Trae los detalles del usuario dando un id
export function getByUserId(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${constants.localhost}/user/${id}`);
      dispatch({
        type: GET_BY_USER_ID,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

// trae al tecnico basado en la actividad especifica
// El supuesto es si buscas una actividad te trae a las personas que la ofertan
export function getProfessionalByActivityName(activityName) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${constants.localhost}/getUserByActivityName/`
      );
      dispatch({
        type: GET_PROFESSIONAL_BY_ACTIVITY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

// trae a la actividad específica basada en el nombre de busqueda
export function getByActivityName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${constants.localhost}/getByActivityName/`
      );
      dispatch({
        type: GET_BY_ACTIVITY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
// trae las necesidades de un usuario en particular
export function getClientNeedsById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${constants.localhost}/clientNeeds/${id}`
      );
      dispatch({
        type: GET_ALL_CLIENT_NEEDS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

// trae todas las necesidades de los usuarios
export function getAllNeeds() {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${constants.localhost}/clientNeeds/all`
      );
      dispatch({
        type: GET_ALL_NEEDS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

// crea usuario cliente o professional
export function newUser(data) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${constants.localhost}/user/`, data);
      dispatch({
        type: NEW_USER,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
// crear una necesidad especifica
export function newEspecificalNeed(data) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `${constants.localhost}/clientNeeds`,
        data
      );
      dispatch({
        type: NEW_CLIENT_NEED,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

// crea actividad tecnica // recibe un objeto con el nombre de la actividad y el id del usuario precio y descripcion foto booleano incluye actividad  falta garantia..(booleano)
export function newTechnicalActivity(data) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `${constants.localhost}/NewTechnicalActivity`,
        data
      );
      dispatch({
        type: NEW_TECHNICAL_ACTIVITY,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

// nueva oferta del profesional al necesidad especifica del cliente
export async function newProfessionalOffer(data) {
  const response = await axios.post(
    `${constants.localhost}/professsionalOffer`,
    data
  );
  console.log(response);
  // dispatch({
  //   type: NEW_PROFESSIONAL_OFFER,
  //   payload: response.data,
  // });

  // alert('Please fill the camps')
}

//busqueda de un profesional por su nombre {TEMPORAL PARA LA PRIMER DEMO}
export function searchByName(input) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${constants.localhost}/professionals?name=${input}`
      );
      dispatch({
        type: SEARCH_PROFESSIONAL_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

// Nombres de profesiones
export function filterProfessions() {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${constants.localhost}/professions/name`
      );
      dispatch({
        type: FILTER_PROFESSIONS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// funcion para manejar datos del localStorage globalmente
export function setToGlobalStorage(data) {
  return {
    type: GLOBAL_LOCAL_STORAGE,
    payload: data,
  };
}

// funcion para manejar datos del localStorage globalmente
export function switchModalCart(data) {
  return {
    type: SWITCH_MODAL_CART,
    payload: data,
  };
}

export function filterProfessionals(type, data) {
  let option = [];
  if (type === "Z-A") {
    option = data.sort((a, b) => {
      if (a.first_name) {
        if (a.first_name > b.first_name) return -1;
        if (a.first_name < b.first_name) return 1;
        return 0;
      }
    });
  } else {
    option = data.sort((a, b) => {
      if (a.first_name) {
        if (a.first_name > b.first_name) return 1;
        if (a.first_name < b.first_name) return -1;
        return 0;
      }
    });
  }
  return {
    type: ORDER_DATA,
    payload: option,
  };
}

export function orderClientNeeds(type, data) {
  let option = [];
  if (type === "Z-A") {
    option = data.sort((a, b) => {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
      return 0;
    });
  } else {
    option = data.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
  }
  return {
    type: ORDER_DATA_CLIENT,
    payload: option,
  };
}

export function showFormClientNeed(data) {
  return {
    type: SHOW_FORM_CLIENT_NEED,
    payload: data,
  };
}

export function showFormProfessionalOffer(data) {
  return {
    type: SHOW_FORM_PROFESSIONAL_OFFER,
    payload: data,
  };
}

// repetido ==> comentado y si no rompe nada se borra
// ya esta repetida esta peticion en getByUserId linea 116
// no se puede borrar porque se usa en /pages/profileclient.jsx

export function getByAccountId(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${constants.localhost}/user/${id}`);
      dispatch({
        type: GET_BY_ACCOUNT_ID,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
// getSpecificActivitiesById  linea 66
// repetido ==> comentado y si no rompe nada se borra

// export const getProfessionalActivityById = (id) => {
//   return async (dispatch) => {
//     const response = await axios.get(
//       `${constants.localhost}/TecnicalsActivities/${id}`
//     );
//     dispatch({
//       type: GET_PROFESSIONAL_ACTIVITY_BY_ID,
//       payload: response.data,
//     });
//   };
// };

export const getAllProfessionalOffers = () => {
  return async (dispatch) => {
    const response = await axios.get(
      `${constants.localhost}/professsionalOffer/all`
    );
    dispatch({
      type: GET_ALL_PROFESSIONAL_OFFERS,
      payload: response.data,
    });
  };
};

export function changeSwitch(boolean) {
  return {
    type: SWITCH_RENDER,
    payload: boolean,
  };
}

export const filterClients =
  (name, rate, location, professions, sortByName, filterWithActivity) =>
  async (dispatch) => {
    let url =
      name.length > 0
        ? `${constants.localhost}/professionals?name=${name}`
        : `${constants.localhost}/user/professionals`;
    axios.get(url).then((response) => {
      let order = [];
      const db = response.data;
      // //*******************FILTER BY RATE***************//
      let aux = db.filter((e) => {
        if (rate === undefined || !rate) {
          return e;
        } else if(rate < e.rate) {
          return e
        }
      });
      // //*******************FILTER BY location***************//

      // //*******************FILTER BY professions***************//
      let aux2 = aux.filter((e) => {
        if (professions === undefined || !professions[0]) {
          return e;
        } else {
          for (let i = 0; i < professions.length; i++) {
            for (let j = 0; j < e.Professional.Professions.length; j++) {
              if (professions[i] === e.Professional.Professions[j].name) {
                return e;
              }
            }
          }
        }
      });

      let c = [];
      // //*******************FILTER BY filterWithActivity***************//
      if (filterWithActivity === true) {
        c.push(true);
        order = aux2.filter((e) => {
          if (e.Professional.SpecificTechnicalActivities.length > 0) {
            return e;
          }
        });
      } else {
        order = aux2;
      }
      // //*******************FILTER BY location***************//
      let orderByLocation = order.filter(e => {
        if(!location ){
          return e
        }else if(e.city === location){
            return e
        }
      })
      dispatch({
        type: CLIENTS_FILTERED,
        payload: orderByLocation,
      });
    });
  };

export const orderProfessionals = (name) => async (dispatch) => {
  let url = name  ?  `${ constants.localhost }/clientNeeds/need?name=${name}`:`${ constants.localhost }/clientNeeds/all`
  axios.get(url)
  .then(response => {
    let order = []
    const db = response.data  
    dispatch({
      type:PROFESSIONAL_FILTERED,
      payload: db
    })
  })
};

export const userLogin = user => async dispatch => {  
    const result = await axios.post(`${constants.localhost}/user/login`, user);
    dispatch({
      type: USER_LOGIN,
      payload: result,
    });
};

export const searchBar = (name) => {
  return {
    type: SEARCHBAR,
    payload: name,
  };
};

// editar publicaciones del cliente
export function putClientNeeds(data) {
  return async function (dispatch) {
    try {
      const response = await axios.put(`${constants.localhost}/clientNeeds/${data.userId}`, data);
      console.log("put-clientneed",response.data)
      dispatch({
        type: PUT_CLIENT_NEEDS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    };
  };
}; 

//editar usuario
export function putUser(data) {
  return async function (dispatch) {
    try {
      const response = await axios.put(`${constants.localhost}/user/updateUser/${data.id}`, data);
      console.log("put-user",response.data)
      dispatch({
        type: PUT_USER,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    };
  };
};

// get a las ofertas profesionales de las necesidades de los clientes
export function getOffersToSpecificClientNeed(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${constants.localhost}/professsionalOffer/need/${id}`);
      dispatch({
        type: GET_OFFERS_OF_CLIENT_NEED,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    };
  };
}

export const offerInNeedById =  id => async dispatch =>{
  const data = await axios.get(`${ constants.localhost }/professsionalOffer/need/${id}`)
  if (data.data === "No offers found") {
    dispatch ({
      type: OFFER_IN_NEED_BY_ID,
      payload: [],
    });    
  }else{
    dispatch ({
      type: OFFER_IN_NEED_BY_ID,
      payload: data.data,
  }); 
  }
}

export const createPreference = (data) => async  dispatch => {
  const response = await axios.post(`${ constants.localhost }/create_preference`,data)
  dispatch ({
    type: CREATE_PREFERENCE,
    payload: response,
  });
}

export const createTecnicalActivity = (data) => async  dispatch => {
  const response = await axios.post(`${ constants.localhost }/TecnicalsActivities`,data)
  dispatch ({
    type: CREATE_TECNICAL_ACTIVITY,
    payload: response,
  });
}

export const existentUser = email => async  dispatch => {
  const response = await axios.get(`${ constants.localhost }/user/created/${email}`)
  dispatch ({
    type: EXISTENT_USER,
    payload: response.data,
  });
}


export const googleLogin = () => async  dispatch => {
  const response = await axios.get(`${constants.localhost}/user/getUser`);
  dispatch ({
    type: GOOGLE_LOGIN,
    payload: response.data,
  });
}

export const deleteLogin = () => async  dispatch => {
  dispatch ({
    type: DELETE_LOGIN,
    payload: [],
  });
}

export const cities = () => async dispatch => {
  let city = await axios.get(`${constants.localhost}/user/city`);
  dispatch ({
    type: CITIES,
    payload:city.data
  })
}


export const resetPassword = (email) => async dispatch => {
  if(email) {
    let city = await axios.post(`${constants.localhost}/User/reestablecer/`, email);
  dispatch ({
    type: RESET_PASSWORD,
    payload:city
  })
  }
  
}

export const validarToken = (token) => async dispatch => {

  let validate = await axios.get(`${constants.localhost}/user/reestablecer/${token}`);
  dispatch ({
    type: VALIDAR_TOKEN,
    payload:validate
  })
}

export const validarTokenConfirmDone = (token) => async dispatch => {
  let validate = await axios.get(`${constants.localhost}/clientNeeds/confirm/${token}`);
  dispatch ({
    type: VALIDAR_TOKEN_CONFIRM_DONE,
    payload:validate
  })
}

export const newPassword = (password, token) => async dispatch => {
  let validate = await axios.put(`${constants.localhost}/user/reestablecer/${token}`, password);
  dispatch ({
    type: NEW_PASSWORD,
    payload:validate
  })
}

export const activarCuenta = (token) => async dispatch => {
  let validate = await axios.put(`${constants.localhost}/user/activar/${token}`);
  dispatch ({
    type: ACTIVAR,
    payload:validate
  })
}

export const culminarServicio = (token) => async dispatch => {
  let validate = await axios.put(`${constants.localhost}/clientNeeds/confirm/${token}`);
  dispatch ({
    type: CONFIRMAR,
    payload:validate
  })
}


