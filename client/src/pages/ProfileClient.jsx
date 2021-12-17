import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa'
import { BsArrowRightCircle } from 'react-icons/bs'
import s from './styles/ProfileClient.module.css'
// import CardReview from '../components/CardReview';
// import CardClientNeed from '../components/CardClientNeed';

import { MdAccountCircle } from 'react-icons/md';
import { GrLocation } from 'react-icons/gr'

import { useDispatch, useSelector } from 'react-redux'

import { getByAccountId } from '../redux/actions';

export default function ProfileClient(){

    const state = useSelector(state => state)

    const {idClient} = useParams()

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getByAccountId(idClient))
    },[])


    useEffect(()=>{
    },[state])

    return (
        <div className={ s.div_principal }>
            <div className={ s.div_inicio  }></div>

            <div className={ s.div_photo  }>
            { !(state.account[0]?.photo ==="Hola") ? <img src={ state.account[0]?.photo } alt="" />:
                <MdAccountCircle className={ s.div_photo_perfil }/>
            }
            </div>
            <div className={ s.div_info  }>
                <div className={ s.div_tiulo}>
                    <h3>{ state.account[0]?.first_name + " " + state.account[0]?.last_name }</h3>
                    <Link className={ s.linkEdit } to="/">
                        <FaRegEdit size="40px" className={ s.logoEdit }>
                        </FaRegEdit>
                    </Link>
                </div>
                <p>Username: <span>{state.account[0]?.user_name? state.account[0]?.user_name:  state.account[0]?.first_name}</span></p>
                <p>Localidad: <span>{state.account[0]?.city? state.account[0]?.city: "Buenos Aires, Argentina"}</span> <GrLocation></GrLocation></p>
                <p>Telefono: <span>{ state.account[0]?.phone }</span> </p>
                <p>Email: <span>{ state.account[0]?.email }</span></p>

                {/* CARDS DE SOLICITUDES HECHAS */}

                <div className={ s.reviews }>
                    <h4>Ultimas Solicitudes</h4>
                    {/* <CardClientNeed/>
                    <CardClientNeed/>
                    <CardClientNeed/>
                    <CardClientNeed/>
                    <CardClientNeed/>
                    <CardClientNeed/>
                    <CardClientNeed/>
                    <CardClientNeed/> */}
                    <BsArrowRightCircle className={s.reviews_icon} size="50px"/>
                    <span >Ver Historial</span> 
                </div>

                {/* RESEÑAS */}

                {/* <div className={ s.reviews }>
                    <h4>Ultimas Reseñas</h4>
                    <CardReview/>
                    <CardReview/>
                    <CardReview/>
                    <CardReview/>
                    <BsArrowRightCircle className={s.reviews_icon} size="50px"/>
                    <span >Ver Historial</span> 
                </div> */}

            </div>
            
            

        </div>
    )
}
