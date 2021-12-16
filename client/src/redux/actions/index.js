import axios from 'axios';

const constants = {
    localhost: 'http://localhost:3001',
}

export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_ALL_PROFESSIONALS = 'GET_ALL_PROFESSIONALS';
export const GET_ALL_COMMON_USERS = 'GET_ALL_COMMON_USERS';
export const GET_BY_USER_ID = 'GET_BY_USER_ID';
export const GET_BY_ACCOUNT_ID = 'GET_BY_ACCOUNT_ID';
export const GET_PROFESSIONAL_BY_ACTIVITY_NAME = 'GET_PROFESSIONAL_BY_ACTIVITY_NAME';
export const GET_BY_ACTIVITY_NAME = 'GET_BY_ACTIVITY_NAME';
export const GET_ALL_NEEDS = 'GET_ALL_NEEDS';
export const SEARCH_PROFESSIONAL_BY_NAME = 'SEARCH_PROFESSIONAL_BY_NAME'
export const NEW_ESPECIFICAL_NEED = 'NEW_ESPECIFICAL_NEED';
export const NEW_TECHNICAL_ACTIVITY = 'NEW_TECHNICAL_ACTIVITY';
export const NEW_USER = 'NEW_USER';
export const NEW_PROFESSIONAL_OFFER = 'NEW_PROFESSIONAL_OFFER';

export const FILTER_PROFESSIONS = 'FILTER_PROFESSIONS;'

export const ORDER_DATA = 'ORDER_DATA';
export const SHOW_FORM_CLIENT_NEED = 'SHOW_FORM_CLIENT_NEED';

export const SHOW_FORM_PROFESSIONAL_OFFER = 'SHOW_FORM_PROFESSIONAL_OFFER';

// trae todos los usuarios - clientes y profesionales
export function getAllUsers () {
    
    return async function (dispatch) {
        
        try {
            const response = await axios.get(`${ constants.localhost }/allUsers`)
            dispatch({
                type: GET_ALL_USERS,
                payload: response.data
            });
        } catch (error) {
            console.log(error.message)
        };
    };
};
// trae todos los professionales
export function getAllProfessionals () {
    
    return async function (dispatch) {

        try {
            const response = await axios.get(`${ constants.localhost }/user/professionals`)
            
            dispatch({
                type: GET_ALL_PROFESSIONALS,
                payload: response.data
            });
        } catch (error) {
            console.log(error.message)
        };
    };
};
// trae los usuarios (clientes) incluyendo necesidades del cliente
export function getAllCommonUsers () {
    
    return async function (dispatch) {

        try {
            const response = await axios.get(`${ constants.localhost }/clientNeeds/all`)
            dispatch({
                type: GET_ALL_COMMON_USERS,
                payload: response.data
            });
        } catch (error) {
            console.log(error.message)
        };
    };
};

// Trae los detalles del usuario dando un id 
export function getByUserId(id) {
    
    return async function (dispatch) {
        
        try {
            const response = await axios.get(`${ constants.localhost }/user/${ id }`)
            dispatch({
                type: GET_BY_USER_ID,
                payload: response.data
            });
        } catch (error) {
            console.log(error.message)
        };
    };
};

// trae al tecnico basado en la actividad especifica
// El supuesto es si buscas una actividad te trae a las personas que la ofertan
export function getProfessionalByActivityName (activityName) {

    return async function (dispatch) {
        
        try {
            const response = await axios.get(`${ constants.localhost }/getUserByActivityName/`)
            dispatch({
                type: GET_PROFESSIONAL_BY_ACTIVITY_NAME,
                payload: response.data
            });
        } catch (error) {
            console.log(error.message)
        };
    };
};

// trae a la actividad específica basada en el nombre de busqueda
export function getByActivityName (name) {
    
    return async function (dispatch) {
        
        try {
            const response = await axios.get(`${ constants.localhost }/getByActivityName/`)
            dispatch({
                type: GET_BY_ACTIVITY_NAME,
                payload: response.data
            });
        } catch (error) {
            console.log(error.message)
        };
    };
};
// trae las necesidades del usuario
export function getAllNeeds () {
    
    return async function (dispatch) {
        
        try {
            const response = await axios.get(`${ constants.localhost }/clientNeeds/all`)
            dispatch({
                type: GET_ALL_NEEDS,
                payload: response.data
            });
        } catch (error) {
            console.log(error.message)
        };
    };
};

// crea usuario cliente o professional
export function newUser(data) {
        
    return async function (dispatch) {
        
        try {
            const response = await axios.post(`${ constants.localhost }/user/`, data)
            dispatch({
                type: NEW_USER,
                payload: response.data
            });
        } catch (error) {
            console.log(error.message)
        };
    };
};
// crear una necesidad especifica
export function newEspecificalNeed (data) {
        
    return async function (dispatch) {
        
        try {
            const response = await axios.post(`${ constants.localhost }/NewSpecificalNeed`, data)
            dispatch({
                type: NEW_ESPECIFICAL_NEED,
                payload: response.data
            });
        } catch (error) {
            console.log(error.message)
        };
    };
};

// crea actividad tecnica // recibe un objeto con el nombre de la actividad y el id del usuario precio y descripcion foto booleano incluye actividad  falta garantia..(booleano) 
export function newTechnicalActivity (data) {
    
    return async function (dispatch) {
        
        try {
            const response = await axios.post(`${ constants.localhost }/NewTechnicalActivity`, data)
            dispatch({
                type: NEW_TECHNICAL_ACTIVITY,
                payload: response.data
            });
        } catch (error) {
            console.log(error.message)
        };
    };
};

// nueva oferta del profesional al necesidad especifica del cliente  
export function newProfessionalOffer (data) {
    
    return async function (dispatch) {
        
        try {
            const response = await axios.post(`${ constants.localhost }/newProfessionalOffer`, data)
            dispatch({
                type: NEW_PROFESSIONAL_OFFER,
                payload: response.data
            });
        } catch (error) {
            console.log(error.message)
        };
    };
};

//busqueda de un profesional por su nombre {TEMPORAL PARA LA PRIMER DEMO}
export function searchByName(input) {
    
    return async function (dispatch) {
        
        try {
            const response = await axios.get(`${ constants.localhost }/professionals?name=${input}`)
            dispatch({
                type: SEARCH_PROFESSIONAL_BY_NAME,
                payload: response.data
            });
        } catch (error) {
            console.log(error.message)
        };
    };
};


// Nombres de profeciones
export function filterProfessions (){

    return async function (dispatch) {
        
        try {
            const response = await axios.get(`${ constants.localhost }/professions/name`)
            dispatch({
                type: FILTER_PROFESSIONS,
                payload: response.data
            })
        }catch (error){
            console.log(error)
        };
    };
};

export function orderProfessionals(data){
    return{
        type: ORDER_DATA,
        payload: data
    }
};

export function showFormClientNeed(data){
    return{
        type: SHOW_FORM_CLIENT_NEED,
        payload: data
    };
};

export function showFormProfessionalOffer(data){
    return{
        type: SHOW_FORM_PROFESSIONAL_OFFER,
        payload: data
    };
};

export function getByAccountId(id) {
    
    return async function (dispatch) {
        
        try {
            const response = await axios.get(`${ constants.localhost }/user/${ id }`)
            dispatch({
                type: GET_BY_ACCOUNT_ID,
                payload: response.data

            });
        } catch (error) {
            console.log(error.message)
        };

        
    };
};
