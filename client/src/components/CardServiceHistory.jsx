import React, { useEffect, useState } from 'react'

import s from './styles/CardServiceHistory.module.css'

import Swal from 'sweetalert2'

import { useDispatch } from 'react-redux'

// import { offerInNeedById } from '../redux/actions' <-----comentado por ima

import notFoundImg from '../img/not_found_img.svg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useGlobalStorage } from '../hooks/useGlobalStorage';
import { getClientNeedsById } from '../redux/actions'

const { REACT_APP_HOST } = process.env;


export default function CardServiceHistory(props) {
    // const offer = useSelector(state => state.offerInNeedById) <-----comentado por ima

    const [ user, ]= useGlobalStorage("globalUser", "")
    const [offer, setOffers] = useState([])  
    const navigate = useNavigate()

    const dispatch = useDispatch();

    const { id } = props

    useEffect(() => {
    //   dispatch(offerInNeedById(id)) <-----comentado por ima
        async function getOffers(){
            const data = await axios.get(`${REACT_APP_HOST}/professsionalOffer/need/${props.id}`)
            if (data.data === "No offers found") return setOffers([])
            setOffers(data.data.filter(el => el.status !== "rejected"))
        }
        getOffers()
    }, [])
    function nav(e){
        console.log(e.target.name)
        if(e.target.name === "offers" ) return navigate(`/client/offerToNeed/${id}`)
        if(e.target.name === "details" ) return navigate(`/client/need/${id}`)
    }

    async function deleteNeed() {
        try {
            const data = await axios.delete(`${REACT_APP_HOST}/clientNeeds/${props.id}`)
            if (data.data === "La necesidad especifica ha sido eliminada."){
                Swal.fire({
                    icon: 'success',
                    title: 'La necesidad especifica ha sido eliminada con exito!',
                    showConfirmButton: false,
                    timer: 1500
                })
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
                        <span>{ props.status }</span>
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
                    {
                        (props.status === "in offer") ? 
                        <button 
                            onClick={ nav } 
                            name="offers" 
                            type="button" 
                            className="btn btn-outline-warning position-relative"
                        >
                            Ver ofertas
                            
                            <span 
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                            >
                            { offer ? offer.length : 0 }
                                
                                <span 
                                    className="visually-hidden"
                                >
                                    unread messages
                                </span>

                            </span>

                        </button>:<></>
                    }
                    {
                        (props.status === "finished") ? <button className='btn btn-outline-secondary'>Calificar Técnico</button>:<></>
                    }
                    <button onClick={nav} name="details" className='btn btn-outline-secondary'>Ver Detalles</button>
                    {
                        (props.UserId === user.id) ? 
                        <button name="offers" type="button" className="btn btn-outline-danger" onClick={deleteNeed}>
                            Eliminar
                        </button>
                        :<></>
                    }
                </div>
            </div>
        </div>
    )
}
