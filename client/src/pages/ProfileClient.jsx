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
import { ClientSpecificNeed } from '../components/ClientSpecificNeed';
import { useGlobalStorage } from '../hooks/useGlobalStorage';


export default function ProfileClient(){
  const [globalUser,setGlobalUser ] = useGlobalStorage("globalUser", "")
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const {idClient} = useParams()
    const clientNeeds = useSelector(state => state.clientNeedById)
    console.log(globalUser)

    useEffect(()=>{
        dispatch(getByAccountId(idClient))
        dispatch(getClientNeedsById(idClient))
    },[ dispatch, idClient,  ])


    // useEffect(()=>{
    // },[state, clientNeeds])

    return (
        <div className={ s.div_principal }>
            <ClientSpecificNeed/>
            <div className={ s.div_inicio  }></div>

            <div className={ s.div_photo  }>
            { !(state.account[0]?.photo ==="Hola") ? <img src={ globalUser?.photo } alt="" />:
                <MdAccountCircle className={ s.div_photo_perfil }/>
            }
            </div>
            <div className={ s.div_info  }>
                <div className={ s.div_tiulo}>
                    <h3>{ globalUser?.first_name + " " + globalUser?.last_name }</h3>
                    <Link className={ s.linkEdit } to="/">
                        <FaRegEdit size="40px" className={ s.logoEdit }>
                        </FaRegEdit>
                    </Link>
                </div>

                {
                globalUser?.user_name?
                    <p>
                        <span>
                            @{globalUser?.user_name} 
                        </span>
                    </p>
                : <></>
                }                
                {
                globalUser.state || globalUser.city ?
                <p>
                    <span>
                        <GrLocation/>
                        {globalUser.city ? globalUser.city + ' ': ''}
                        {globalUser.state ? globalUser.state : ''}
                    </span>
                </p>
                : 
                <>
                <p>Localidad: <GrLocation/><span>{globalUser?.city? globalUser?.city: "Buenos Aires, Argentina"}</span></p>
                </>
                }
                
                {/* <p>Teléfono: <span>{ globalUser?.phone }</span> </p> */}
                {
                    globalUser?.phone ?
                    <p>Teléfono: <span>{ globalUser?.phone }</span> </p>
                    : <></>
                }
                
                <p>Email: <span>{ globalUser?.email }</span></p>

                {/* CARDS DE SOLICITUDES HECHAS */}

                <div className={ s.reviews }>
                    <h4 className="">Últimas Solicitudes</h4>

                    <Link to={`/service-history/${idClient}`}>
                        <button className="btn btn-outline-info">Ver todas</button>
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
