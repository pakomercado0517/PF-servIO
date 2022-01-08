import React, { useEffect, useState } from 'react'

import s from './styles/CardServiceHistory.module.css'

import Swal from 'sweetalert2'

import { useDispatch } from 'react-redux'

import notFoundImg from '../img/not_found_img.svg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useGlobalStorage } from '../hooks/useGlobalStorage';
import { getClientNeedsById } from '../redux/actions'

const { REACT_APP_HOST } = process.env;


export default function CardServiceHistoryJobs(props) {
    const [ user, ]= useGlobalStorage("globalUser", "")


    useEffect(() => {
    }, [])

    async function deleteSpecificService() {

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
                        {
                            props.status ?
                            <span>Status:{ props.status }</span>
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
                    
                </div>
            </div>
        </div>
    )
}
