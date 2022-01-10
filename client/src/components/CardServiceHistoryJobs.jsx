import React, { useEffect, useState } from 'react'

import s from './styles/CardServiceHistory.module.css'

import notFoundImg from '../img/not_found_img.svg'
import { useGlobalStorage } from '../hooks/useGlobalStorage';

import Swal from 'sweetalert2'

import { useDispatch } from 'react-redux';

import axios from 'axios'
import { getClientNeedsById, getSpecificActivitiesById } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

const { REACT_APP_HOST } = process.env;


export default function CardServiceHistoryJobs(props) {

    const [ user, ]= useGlobalStorage("globalUser", "")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // useEffect(() => {
    // }, [props.status])

    console.log('props', props)


    async function updateNeed(status) {
        try {
            const { data } = await axios.put(`${REACT_APP_HOST}/clientNeeds/${props.ClientNeed}`, {
                status: "in progress"
            })
            // Swal.fire({
            //     icon: 'success',
            //     title: data,
            //     showConfirmButton: false,
            //     timer: 1500
            // })
            // dispatch(getSpecificActivitiesById(user.id))
        } catch (error) {
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Something wrong',
            //     showConfirmButton: false,
            //     timer: 1500
            // })
        }
    }

    async function deleteNeed() {
        try {
            const data = await axios.delete(`${REACT_APP_HOST}/clientNeeds/${props.ClientNeedId}`)
            if (data.data === "La necesidad especifica ha sido eliminada."){
                Swal.fire({
                    icon: 'success',
                    title: 'La necesidad especifica ha sido eliminada con exito!',
                    showConfirmButton: false,
                    timer: 1500
                })
                dispatch(getSpecificActivitiesById(user.id))
                dispatch(getClientNeedsById(user.id))
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Algo salió mal!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Algo salió mal!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    // no sirve. pasé la funcion que manda mail a cliente para confirmar finalizacion a la funcion NAV 
    // async function updateNeedStatus() {
    //     try {
    //         const { data } = await axios.put(`${REACT_APP_HOST}/clientNeeds/${props.ClientNeed}`, {
    //             // status: "done",
    //         })

    //         // antes de cambiar el status a "done" tiene q mandar un mail al usuario para que confirme que se hizo el trabajo...


    //         // Swal.fire({
    //         //     icon: 'success',
    //         //     title: data,
    //         //     showConfirmButton: false,
    //         //     timer: 1500
    //         // })
    //         dispatch(getSpecificActivitiesById(user.id))
    //     } catch (error) {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Something wrong',
    //             showConfirmButton: false,
    //             timer: 1500
    //         })
    //     }
    // }

    // ACA ENVIA EL MAIL AL CLIENTE CUANDO DA OK EL PROFESIONAL EN TRABAJO TERMINADO
    // CHEQUEAR SI ESTA FUNCIONANDO OK
    async function nav(e){

        if(e.target.name === "details" ) return navigate(`/client/need/${props.ClientNeedId}`)

        if(e.target.name === "done" ) 
        // ruta que manda un mail al cliente para confirmar finalización del ser 
            await axios.put("http://localhost:3001/Transactions/confirm",
                {id: props.ClientNeedId})

            Swal.fire({
                icon: 'success',
                title: 'Le enviamos un correo al cliente para que confirme que finalizaste el trabajo!',
                showConfirmButton: true,
            })
    }

    return (
      
        <div className={ s.container }>
            {/* FECHA DE STATUS */}
            <div className={ s.container_fecha }>
                <h5>{ props.date }</h5>
            </div>
            <div className={ s.container_datos }>
                {/* photo */}
                <div className={ s.container_datos_img }>
                    {
                        props.photo? <img src={props.photo} alt="" />:<img className={ s.container_datos_img_notFound } src={ notFoundImg } alt="" />
                    }
                </div>
                {/* Description, title and status */}
                <div className={ s.container_datos_description }>
                    <div className={ s.container_datos_description_status}>
                        {/* option1:  ["Pending to pay"] - En este caso hay que mostar un mensaje: "Wow, un cliente quiere comprar tu servicio"  */}
                        {
                            props.status &&
                            props.status === "pending to pay" ?
                            <div>
                            <h5>Un cliente quiere comprar tu servicio!</h5>
                            <h5>Solo falta que registre el pago en MercadoPago</h5>
                            <span
                                className='text-warning text-uppercase text-center'
                            >
                                Status:{ props.status }</span>
                            </div>
                            :<></>
                        }
                        
                        {
                            props.status &&
                            props.status === "in progress" ?
                            <div>
                                <h5> El pago fue registrado! </h5>
                                <h5>Realizá el trabajo y confirmá su finalización clieckeando en "Confirmar finalización"</h5>
                                <span
                                    className='text-warning text-uppercase text-center'
                                    >
                                    Status:{ props.status }</span>
                            </div>
                            :<></>
                        }
                        {
                            props.status &&
                            props.status === "done" ?
                            <div>
                            <h5>El cliente confirmó la finalización de tu servicio</h5>
                            <h5>Revisá en tu cuenta el deposito.</h5>
                            <span
                                className='text-warning text-uppercase text-center'
                                >
                                Status:{ props.status }</span>
                            </div>
                            :<></>
                        }

                    </div>
                    <div className={ s.container_datos_description_title }>
                        <h6> { props.name } </h6>
                    </div>
                    <div className={ s.container_datos_description_description }>
                        <p>
                            { props.description }
                        </p>
                    </div>
                </div>
                {/* Buttons */}
                <div className={ s.container_datos_buttons }>
                    {/* Mostar distintos botones segun el estado (props.status) */}
                    
                    {
                        props.status &&
                        props.status === "pending to pay" ?

                        <>
                            <button name="details" type="button" className="btn btn-outline-success" onClick={nav}>
                                Ver detalles
                            </button>

                            <button name="offers" type="button" className="btn btn-outline-danger"  onClick={deleteNeed}>
                                Rechazar trabajo
                            </button>
                        </>
                        :<></>

                    }


                    {/* option2:  ["in progress"] - En este caso hay que mostar distintos botones 
                    //para modificar el estado de la clientNeed (id de clienNeed: props.ClientNeedId)
                        button1: Rechazar trabajo,
                        button2: ver detalles (de client need), // eso incluye ambos casos (presupuesto de necesidad especifica del cliente y actividad especifica de profesional)
                        button3: Confirmar Finalizacion (setear en client need valor "done")-pero antes de que se concrete el update 
                        de la tabla ClientNeed, tiene que mandarle un mail al cliente para que lo confirme (Trabajar con guille)
                      */}

                    {
                        props.status &&
                        props.status === "in progress" ?

                        <>
                            <button name="details" type="button" className="btn btn-outline-success" onClick={nav}>
                                Ver detalles
                            </button>

                            <button name="done" type="button" className="btn btn-outline-success"  onClick={nav}>
                                Confirmar finalización
                            </button>
                            
                            <button name="offers" type="button" className="btn btn-outline-danger"  onClick={deleteNeed}>
                                Cancelar trabajo
                            </button>
                        </>
                        :<></>
                    }

                    {/* RUTA PARA UPDATE DE CLIENT NEED ---> LOCALHOST3000/clientNeeds/:id */}
                    {/* option3:  ["done"] - En este caso hay que mostar distintos botones 
                        //para modificar el estado de la clientNeed (id de clienNeed: props.ClientNeedId)
                        message on card (not swal!): Enhorabuena! Finalizaste tu trabajo con exito. Revisa en tu cuenta el deposito.
                      */}

                    {
                        props.status &&
                        props.status === "done" ?
                        <>
                            <button name="details" type="button" className="btn btn-outline-success" onClick={nav}>
                                Ver detalles
                            </button>
                            <button name="offers" type="button" className="btn btn-outline-danger"  onClick={deleteNeed}>
                                Borrar Tarjeta
                            </button>
                        </>
                        :<></>

                    }

                </div>
            </div>
        </div>
    )
}
