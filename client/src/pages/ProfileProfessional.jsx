import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CardReview from '../components/CardReview';
import CardParticularService from '../components/CardParticularService';
import { ClientSpecificNeed } from '../components/ClientSpecificNeed';
import { StarRating } from '../components/StarRating';
import CardClientNeed from '../components/CardClientNeed';
import { getAllUsers, 
        getByUserId, 
        getClientNeedsById, 
        getSpecificActivitiesById } from '../redux/actions';
import { BsArrowRightCircle } from 'react-icons/bs'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { GrLocation } from 'react-icons/gr';
    import star from '../img/star.svg'
import s from './styles/ProfileProfessional.module.css'


export default function ProfileProfessional( ){

    const { id } = useParams()
    const dispatch= useDispatch();
    const professional = useSelector((state) => state?.user[0])
    const { globalUserGlobalStorage } = useSelector(state => state)
    const specificActivities = useSelector((state) => state?.specificActivitiesById)    
    const allUsers = useSelector( (state) => state?.allUsers)
    const clientNeeds = useSelector(state => state.clientNeedById)

    console.log('1 - allUsers',allUsers)
    console.log('2 - professional',professional)
    console.log('3 - globalUserGlobalStorage',globalUserGlobalStorage)
    console.log('4 - specificActivities',specificActivities)
    console.log('5 - clientNeeds',clientNeeds)

    const [state, setstate] = useState({
        login: false,
        seeAllReview: true,
        seeAllServices: true,
    })

    useEffect(()=>{
        dispatch(getByUserId(id))
        dispatch(getSpecificActivitiesById(id))
        dispatch(getAllUsers())
        dispatch(getClientNeedsById(id))
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
        <ClientSpecificNeed/>
        <div className={s.container_details}>
            
            <div>
                <img 
                    src={ professional?.photo ? professional.photo : 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'} 
                    className={ s.container_details_photo }
                    alt="foto"
                    />
            </div>
            
            <div className={ s.div_titul }>
            
                <h1>
                    {professional?.first_name + ' ' + professional?.last_name}
                </h1>
            <p>
                <span>
                {professional?.user_name? 
                    `Username: @${professional?.user_name}` : <></>}
                </span>
            </p>

            {
                professional?.state && professional?.city ?
                <p>
                    <span>
                        Locacion: <GrLocation/>
                        {professional?.state ? professional.state + ', ' : ''}
                        {professional?.city ? professional.city : ''}
                    </span>
                </p>
                : <></>
            }
            {
                professional?.phone ?
                <p>Teléfono: <span>{ professional?.phone }</span> </p>
                : <></>
            }
            {
                professional?.email ?
                <p>Email: <span>{ professional?.email }</span></p>
                : <></>
            }
                <h2>
                    {professional?.profession}
                </h2>
                <div>
                    <StarRating stars={ 3 } />
                </div>
        
            </div>
            
            <div className={s.professional_showProfessions} >
        
                <div>
                    <h3 className={s.professions_title}>Profesiones:</h3>
                </div>
        
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
                    :
                    <h4>No hay profesiones registradas</h4>
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
        <h4>Servicios particulares</h4>

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

        <div className={ s.container_cards }>

            <div className="">
                {   specificActivities && 
                    specificActivities === 'There are not specifical Activities' ?

                    <h4>No hay servicios registrados</h4>
                    :
                    <>
                        {
                            specificActivities.map( (el) => {
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




            {/* <div className={ state.seeAllServices?s.container_cards_second:s.container_cards_second_all }>
                <BsArrowRightCircle onClick={ newStateServices } size="50px"/>
            </div> */}

            {/* <div className={ state.seeAllServices?s.container_cards_second_all:s.container_cards_second }>
                <BsArrowLeftCircle onClick={ newStateServices } size="50px"/>
            </div> */}

        </div>

        {/* // ----------------------reseñas--------------------- */}

        <h4>Reviews</h4>
        <div className={ s.container_cards }>

            {
                professional?.Professional?.ClientReviews?.length > 0 ?

                <div 
                className={ professional?.Professional.ClientReviews ? 
                            s.container_cards_first :
                            s.container_cards_first_all 
                        }
            >

            {
                professional?.Professional?.ClientReviews && professional?.Professional.ClientReviews?.map((el) =>
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
                <h5>Este profesional no tiene reviews</h5>
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