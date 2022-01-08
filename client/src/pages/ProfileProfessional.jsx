import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, 
        getByUserId, 
        getClientNeedsById, 
        getSpecificActivitiesById } from '../redux/actions';
import CardReview from '../components/CardReview';
import CardParticularService from '../components/CardParticularService';
import { ClientSpecificNeed } from '../components/ClientSpecificNeed';
import { StarRating } from '../components/StarRating';
import CardClientNeed from '../components/CardClientNeed';
import { BsArrowRightCircle } from 'react-icons/bs'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { GrLocation } from 'react-icons/gr';

import s from './styles/ProfileProfessional.module.css'
import { useGlobalStorage } from '../hooks/useGlobalStorage';


export default function ProfileProfessional( ){

    const { id } = useParams()
    const dispatch= useDispatch();

    const [filteredSpecificActivities, setfilteredSpecificActivities] = useState([])

    const [ globalUserGlobalStorage, ] = useGlobalStorage("globalUser", "")

    const professional = useSelector((state) => state?.user[0])
    const specificActivities = useSelector((state) => state?.specificActivitiesById)    
    const allUsers = useSelector( (state) => state?.allUsers)
    const clientNeeds = useSelector(state => state.clientNeedById)

    useEffect(() => {
        if (specificActivities  === "There are not specifical Activities") setfilteredSpecificActivities("There are not specifical Activities")
        else setfilteredSpecificActivities(specificActivities.filter(activity => activity.type === 'general'))
    }, [specificActivities])

    // const filteredSpecificActivities = 
    //     specificActivities === 'There are not specifical Activities' ? 
    //     'There are not specifical Activities' : 
    //     specificActivities.filter(activity => activity.type === 'general')

    const [state, setstate] = useState({
        login: false,
        seeAllReview: true,
        seeAllServices: true,
    })

    // console.log('1-professional', professional)

    useEffect(()=>{
        dispatch(getClientNeedsById(id))
        dispatch(getByUserId(id))
        dispatch(getSpecificActivitiesById(id))
        dispatch(getAllUsers())
    },[dispatch,id])

    function newStateReview(){
        setstate({
            ...state,
            seeAllReview: !state.seeAllReview,
        })
    }
    function newStateServices(){
        setstate({
            ...state,
            seeAllServices: !state.seeAllServices,
        })
    }

return (
    <div className={ s.container }>
        <div className={s.container_details}>
            
            <div>
                <img 
                    src={ professional?.photo ? professional.photo : 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'} 
                    className={ s.container_details_photo }
                    alt="foto"
                    />
            </div>
            
            <div className={ s.div_titul }>
            
            {
                professional?.name || professional?.last_name ?
                <h1>
                    {professional?.first_name + ' ' + professional?.last_name}
                </h1>
                : <></>
            }

            {
                professional?.user_name?
                    <p>
                        <span>
                            @{professional?.user_name} 
                        </span>
                    </p>
                : <></>
            }


            {
                professional?.state || professional?.city ?
                <p>
                    <span>
                        <GrLocation/>
                        {professional?.city ? professional.city + ' ': ''}
                        {professional?.state ? professional.state : ''}
                    </span>
                </p>
                : <></>
            }
            {/* {
                professional?.phone ?
                <p>Teléfono: <span>{ professional?.phone }</span> </p>
                : <></>
            } */}
            {
                professional?.email ?
                <p><span>{ professional?.email }</span></p>
                : <></>
            }
                
            {
                professional?.rate !== null ?
                <div>
                    <StarRating stars={ professional?.rate } />
                </div>
                : <></>
            }
        
            </div>
            
            <div className={s.professional_showProfessions} >
        
                <h3 className={s.professions_title}>Profesion(es):</h3>
                
                <div className={s.professions_container}>
                    { 
                        professional?.Professional?.Professions?.length > 0 ?
                        professional?.Professional?.Professions.map( (profession) => {
                            return (
                                <div 
                                    className='text-center'
                                    key={profession.id}
                                >
                                    <h5>
                                        {profession.name?.slice(0,1).toUpperCase() + profession.name.slice(1)}
                                    </h5>
                                </div>
                            )
                        })
                        : <h4>No hay profesiones registradas</h4>
                    }
                </div>
            </div>
{/* revisar opcion solicitar presupuesto => state.login no existe mas(?) -- @fer */}
            {
                state.login ? (
                    <NavLink to='/necesidades'>
                    <button className={s.container_details_button}>
                        <span>
                            Solicitar Presupuesto
                        </span>
                    </button>
                    </NavLink>
                ) : <></>
            }
        </div>
        <h4>Servicios Ofrecidos</h4>

            {/* si su usuario visita su perfil profesional ==> opcion para agregar servicio */}
        {
            globalUserGlobalStorage?.id === professional?.id ?
            <div className="mx-4">
            
                <NavLink
                to="/ProfessionalServiceOffer"
                >
                    <button className="btn btn-outline-info ml-2">
                        <span className="">
                            Agregar Servicio
                        </span>
                    </button>
                </NavLink>
            
            </div>
            : <></>

        }
            <NavLink to={`/service-history/${globalUserGlobalStorage?.id}`}>
                <button className="btn btn-outline-info">Ver todas</button>
            </NavLink>
{/*---------------- servicios particulares ofrecidos por el profesional ---------*/}

        <div className={ s.container_cards }>

            <div className="">
                {   
                    filteredSpecificActivities && 
                    filteredSpecificActivities === 'There are not specifical Activities' ?
                    <>
                    <h5>No hay servicios registrados..</h5>
                    <h5>Ofrecé un servicio!</h5>
                    </>
                    :
                    <>
                        {
                            filteredSpecificActivities.map( (el) => {
                                return (
                                    <CardParticularService
                                    id={el.id}
                                    key={el.id}
                                    name= { el.name }
                                    description= { el.description }
                                    guarantee_time= { el.guarantee_time }
                                    guarantee= { el.guarantee }
                                    duration= { el.job_time }
                                    materials= { el.materials }
                                    photo= { el.photo !== "url_qui" ? el.photo : "" }
                                    price= { el.price }
                                    type= "specific technical activity"
                                    />
                                    )
                                })
                        }
                    </>
                }
            </div>

            <div>

                {
                    globalUserGlobalStorage?.id === professional?.id ?
                    <div className={ s.reviews_container }>
                        { clientNeeds.map( clientNeed => {
                            return (
                                <NavLink 
                                    to={`/client/need/${clientNeed.id}`}
                                    key={clientNeed.id}
                                >
                                    <CardClientNeed
                                        name={ clientNeed.name }
                                        description={ clientNeed.description }
                                        photo={ clientNeed.photo }
                                    />
                                </NavLink>
                            )
                        })}
                    </div>
                    : <></>



                }

            </div>

            <div className={ state.seeAllServices?s.container_cards_second:s.container_cards_second_all }>
                <BsArrowRightCircle onClick={ newStateServices } size="50px"/>
            </div>

            <div className={ state.seeAllServices?s.container_cards_second_all:s.container_cards_second }>
                <BsArrowLeftCircle onClick={ newStateServices } size="50px"/>
            </div>

        </div>

        {/* // ----------------------reseñas--------------------- */}

        <h4>Reviews</h4>
        <div className={ s.container_cards }>

            {
                professional?.Professional?.ClientReviews?.length  ?

                <div>
                {
                    professional?.Professional?.ClientReviews && 
                    professional?.Professional?.ClientReviews?.map((el) =>
                        (
                            <CardReview
                                id={ el.id }
                                key={ el.id }
                                photo={ el.UserId ? allUsers.find(el2 => el2.id === el.UserId)?.photo : '' }
                                name= { el.UserId ? allUsers.find(el2 => el2.id === el.UserId)?.first_name + ' ' + allUsers.find(el2 => el2.id === el.UserId)?.last_name : '' }
                                description= { el.comment }
                                score={ el.score }
                                
                                />
                        )
                    )
                }
                </div>
            :
                <h6>Este profesional no tiene reviews</h6>
            }

            <div className={ state.seeAllReview?s.container_cards_second:s.container_cards_second_all }>
                <BsArrowRightCircle onClick={ newStateReview } size="50px"/>
            </div>
            <div className={ state.seeAllReview?s.container_cards_second_all:s.container_cards_second }>
                <BsArrowLeftCircle onClick={ newStateReview } size="50px"/>
            </div>
        </div>
        <div className={ s.container_containerButton}>
            {
                state.login ? (
                    <button className={s.container_containerButton_button}>
                        <span>
                            Contactar
                        </span>
                    </button>
                ) : <></>
            }
        </div>
    </div>
)
}