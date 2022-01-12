import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, 
        getByUserId, 
        getClientNeedsById, 
        getSpecificActivitiesById, 
        showFormClientNeed} from '../redux/actions';
import CardReview from '../components/CardReview';
import CardParticularService from '../components/CardParticularService';
import { ClientSpecificNeed } from '../components/ClientSpecificNeed';
import { StarRating } from '../components/StarRating';
import CardClientNeed from '../components/CardClientNeed';
import { BsArrowRightCircle } from 'react-icons/bs'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { GrLocation } from 'react-icons/gr';
import { useGlobalStorage } from '../hooks/useGlobalStorage';

import s from './styles/ProfileProfessional.module.css'


export default function ProfileProfessional( ){

    const { id } = useParams()
    const dispatch= useDispatch();
    const professional = useSelector((state) => state?.user[0])
    const [globalUserGlobalStorage, ] = useGlobalStorage("globalUser", "")
    const specificActivities = useSelector((state) => state?.specificActivitiesById)    
    const allUsers = useSelector( (state) => state?.allUsers)
    const clientNeeds = useSelector(state => state.clientNeedById)
    const [showSpecificActivities, setshowSpecificActivities] = useState(initialState)

    useEffect(() => {
        if (specificActivities === "There are not specifical Activities") return setshowSpecificActivities("There are not specifical Activities")
        else return setshowSpecificActivities(specificActivities.filter(el => el.type === "general")) 
    }, [specificActivities])

    const [state, setstate] = useState({
        login: false,
        seeAllReview: true,
        seeAllServices: true,
    })

    console.log('1-professional', professional)

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
    function showModalFormCLient(){
        dispatch(showFormClientNeed("show"));
        
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
        {
            globalUserGlobalStorage?.id === professional?.id ?

        <NavLink to={`/service-history/${professional?.id}`}>
            <button className="btn btn-outline-info">Panel de Servicios</button>
        </NavLink>
        : <></>
        
        }

        <div className={s.titulo}>
            <h4>Servicios Ofrecidos</h4>
        </div>

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
{/*---------------- servicios particulares ofrecidos por el profesional ---------*/}


        <div className={ s.container_cards}>

            <div className={s.container_cards  +"carousel-indicators"}>
                {   showSpecificActivities && 
                    showSpecificActivities === 'There are not specifical Activities' ?

                    <h6>No hay servicios registrados</h6>
                    :
                    <>
                    
                        {
                            showSpecificActivities.map( (el) => {
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
                                    type="specific technical activity"
                                    />
                                    
                                    )
                                    
                                })
                        }
                        
                    </>
                }
                
            </div>



            <div className={ state.seeAllServices?s.container_cards_second:s.container_cards_second_all }>
                <BsArrowRightCircle onClick={ newStateServices } size="50px"/>
            </div>

            <div className={ state.seeAllServices?s.container_cards_second_all:s.container_cards_second }>
                <BsArrowLeftCircle onClick={ newStateServices } size="50px"/>
            </div>

        </div>
{/* // ----------------------servicios solicitados--------------------- */}
        {/* se muestra solo si el ususario visita su propio perfil */}
        {
            globalUserGlobalStorage?.id === professional?.id ?
        <>
        <div  className={s.titulo}> 
            <h4>Servicios Solicitados</h4>            
        </div>
            <button
                    className="btn btn-outline-info ml-2"
                    onClick={showModalFormCLient}
                    style={{cursor:"pointer"}}
                    >
                    <span>Crear publicacion</span>
            </button>
        </>
        : <></>
        }
        
        <div className={ s.container_cards}>

                {
                    globalUserGlobalStorage?.id === professional?.id ?
                    <div className={ s.reviews_container }>
                        {
                        clientNeeds && clientNeeds.length === 0 ?
                        <h6>No hay servicios solicitados, creá una publicación!</h6>
                        :
                        clientNeeds.map( clientNeed => {
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
                        })
                    
                        }
                        {/* <div className='col-md-12'>
                            <nav  aria-label="Page navigation example">
                                <ul className='pagination'>
                                    <li class="page-item">
                                        <a class="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span></a>
                                    </li>
                                    <li class="page-item">
                                        <a class="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span></a>
                                    </li>
                                </ul>
                            </nav>
                        </div> */}
                    </div>
                    : <></>

                }

            </div>

        {/* // ----------------------reseñas--------------------- */}
        <div className={s.titulo}>
            <h4>Reviews</h4>
        </div>
        
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