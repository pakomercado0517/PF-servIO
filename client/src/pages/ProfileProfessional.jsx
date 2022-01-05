import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BsArrowRightCircle } from 'react-icons/bs'
import { BsArrowLeftCircle } from 'react-icons/bs'
import CardReview from '../components/CardReview';
import CardParticularService from '../components/CardParticularService';
import star from '../img/star.svg'
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, getByUserId, getSpecificActivitiesById } from '../redux/actions';
import { NavLink } from 'react-router-dom';
import s from './styles/ProfileProfessional.module.css'
import { StarRating } from '../components/StarRating';


export default function ProfileProfessional( ){

    const { id } = useParams()
    const dispatch= useDispatch();
    const professional = useSelector((state) => state?.user[0])
    const { globalUserGlobalStorage } = useSelector(state => state)
    const specificActivities = useSelector((state) => state?.specificActivitiesById)
    console.log('professional',professional)

    const allUsers = useSelector( (state) => state?.allUsers)
    // console.log('allUsers',allUsers)

    const [state, setstate] = useState({
        login: false,
        seeAllReview: true,
        seeAllServices: true,
    })

    useEffect(()=>{
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
            
            <div className={ s.container_details_text }>
                <h1>
                    {professional?.first_name + ' ' + professional?.last_name}
                </h1>
                <h2>
                    {professional?.profession}
                </h2>
                <h5>
                    {
                        professional?.state ? professional.state + ', ' : '' 
                    }
                    {
                        professional?.city ? professional.city : ''
                        
                    }
                </h5>
                <div>
                    <div>
                        <img src={ star } alt="" />
                        <img src={ star } alt="" />
                        <img src={ star } alt="" />
                        <img src={ star } alt="" />
                        <img src={ star } alt="" />
                    </div>
                </div>
            </div>
            
            <div className={s.professional_showProfessions} >
        
                <div>
                    <h3 className={s.professions_title}>Profesiones:</h3>
                </div>
        
            <div className={s.professions_container}>
                { professional?.Professional?.Professions?.map(el=> {
                    return(
                        <div 
                            className='profession'
                            key={el.id}
                        >
                            {el.name}
                        </div>
                    )
                })}
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

        <div className={ s.container_cards }>
            <div className={ state.seeAllServices?s.container_cards_first:s.container_cards_first_all }>
                {
                    specificActivities && specificActivities === 'There are not specifical Activities' && (
                        <h5>Este profesional no cargó actividades específicas</h5>
                    )
                }
                {
                    specificActivities && specificActivities !== 'There are not specifical Activities' && specificActivities.map((el) => 
                        (
                            <CardParticularService
                                    id={el.id}
                                    key={el.id}
                                    name= { el.name }
                                    description= { el.description }
                                    price= { el.price }
                                    />
                        )
                    )
                }
            </div>
            <div className={ state.seeAllServices?s.container_cards_second:s.container_cards_second_all }>
                <BsArrowRightCircle onClick={ newStateServices } size="50px"/>
            </div>
            <div className={ state.seeAllServices?s.container_cards_second_all:s.container_cards_second }>
                <BsArrowLeftCircle onClick={ newStateServices } size="50px"/>
            </div>
        </div>
        <h4>Reviews</h4>
        <div className={ s.container_cards }>

            {
                professional?.Professional.ClientReviews.length > 0 ?

                <div 
                className={ professional?.Professional.ClientReviews ? 
                            s.container_cards_first :
                            s.container_cards_first_all 
                        }
            >

            {
                professional?.Professional.ClientReviews && professional?.Professional.ClientReviews.map((el) =>
                    (
                        <CardReview
                            id={ el.id }
                            key={ el.id }
                            photo={ el.UserId ? allUsers.find(el2 => el2.id === el.UserId)?.photo : '' }
                            name= { el.UserId ? allUsers.find(el2 => el2.id === el.UserId)?.first_name + ' ' + allUsers.find(el2 => el2.id === el.UserId)?.last_name : '' }
                            description= { el.comment }
                            // score={<StarRating stars={ el.score } />}
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