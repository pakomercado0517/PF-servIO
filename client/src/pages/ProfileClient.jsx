import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { BsArrowRightCircle } from 'react-icons/bs'
import { FaRegEdit } from 'react-icons/fa'
import { MdAccountCircle } from 'react-icons/md';
import { GrLocation } from 'react-icons/gr'
import { getByAccountId, getClientNeedsById } from '../redux/actions';
import CardClientNeed from '../components/CardClientNeed';
// import CardReview from '../components/CardReview';

import s from './styles/ProfileClient.module.css'


export default function ProfileClient(){

    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const {idClient} = useParams()
    const clientNeeds = useSelector(state => state.clientNeedById)


    useEffect(()=>{
        dispatch(getByAccountId(idClient))
        dispatch(getClientNeedsById(idClient))
    },[ dispatch, idClient ])


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
                <p>Teléfono: <span>{ state.account[0]?.phone }</span> </p>
                <p>Email: <span>{ state.account[0]?.email }</span></p>

                {/* CARDS DE SOLICITUDES HECHAS */}

                <div className={ s.reviews }>
                    <h4>Últimas Solicitudes</h4>
                    <Link to="/service-history">
                        <button>Ver todas</button>
                    </Link>
                    <div className={ s.reviews_container }>
                        { clientNeeds.map( clientNeed => {
                            return (
                                <Link 
                                    to={`/client/need/${clientNeed.id}`}
                                    key={clientNeed.id}
                                >
                                    <CardClientNeed
                                        name={ clientNeed.name }
                                        description={ clientNeed.description }
                                        photo={ clientNeed.photo }
                                    />
                                </Link>
                            )
                        })}
                    </div>

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
