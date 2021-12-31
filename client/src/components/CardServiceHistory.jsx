import React, { useEffect, useState } from 'react'

import s from './styles/CardServiceHistory.module.css'

import notFoundImg from '../img/not_found_img.svg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function CardServiceHistory(props) {

    const [offers, setOffers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function getOffers(){
            const data = await axios.get("http://localhost:3001/professsionalOffer/need/" + props.id)
            if (data.data === "No offers found") return setOffers([])
            setOffers(data.data)
        }
        getOffers()
    }, [])

    function nav(e){
        console.log(e.target.name)
        if(e.target.name === "offers" ) return navigate('/client/offerToNeed/'+props.id)
        if(e.target.name === "details" ) return navigate('/client/need/'+props.id)
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
                        <button onClick={ nav } name="offers" type="button" class="btn btn-outline-warning position-relative">
                        Ver ofertas
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            { offers ? offers.length : 0 }
                                <span class="visually-hidden">unread messages</span>
                            </span>
                      </button>:<></>
                    }
                    {
                        (props.status === "finished") ? <button className='btn btn-outline-secondary'>Calificar Técnico</button>:<></>
                    }
                    <button onClick={nav} name="details" className='btn btn-outline-secondary'>Ver Detalles</button>
                </div>
            </div>
        </div>
    )
}
