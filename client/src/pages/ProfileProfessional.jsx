import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsArrowRightCircle } from 'react-icons/bs'
import { BsArrowLeftCircle } from 'react-icons/bs'
// import { FaRegEdit } from 'react-icons/fa'
import CardReview from '../components/CardReview';
import CardParticularService from '../components/CardParticularService';
import star from '../img/star.svg'
import s from './styles/ProfileProfessional.module.css'
import logo from '../img/ServIO.svg'
import { useSelector, useDispatch } from 'react-redux';
import { getByUserId } from '../redux/actions';
import {NavLink} from 'react-router-dom'

export default function ProfileProfessional(){

    const dispatch= useDispatch();
    const [state, setstate] = useState({
        login: true,
        seeAllReview: true,
        seeAllServices: true,
    })
    
    const professionals = useSelector((state) => state.user)
    const {id} = useParams()

    useEffect(()=>{
        dispatch(getByUserId(id))
    },[dispatch, id])

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
            <div className={ s.container_nav }>
                <img src={ logo } alt="" />
            </div>
            <div className={s.container_details}>
                <div className={ s.container_details_photo }>
                </div>
                <div className={ s.container_details_text }>
                    <h1>
                        {professionals[0]?.first_name + ' ' + professionals[0]?.last_name}
                    </h1>
                    <h2>Mecánica automotriz.</h2>
                    <h5>
                        {professionals[0]?.state + ' ' + professionals[0]?.city}
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
                {/* <Link className={s.container_details_linkEdit} to="/">
                    <FaRegEdit size="40px" className={s.logoEdit}>
                    </FaRegEdit>
                </Link> */}
                {
                    state.login ? (
                        <NavLink to='/necesidades'>
                        <button className={s.container_details_button}>
                            <span>
                                Solicitar Presupuesto
                            </span>
                        </button>
                        </NavLink>
                    ) : null
                }
            </div>
            <h4>Servicios particulares</h4>
            <div className={ s.container_services }>
                <div className={ state.seeAllServices?s.container_services_first:s.container_services_first_all }>
                    <CardParticularService/>
                    <CardParticularService/>
                    <CardParticularService/>
                    <CardParticularService/>
                    <CardParticularService/>
                    <CardParticularService/>
                    <CardParticularService/>
                    <CardParticularService/>
                    <CardParticularService/>
                </div>
                <div className={ state.seeAllServices?s.container_services_second:s.container_services_second_all }>
                    <BsArrowRightCircle onClick={ newStateServices } size="50px"/>
                </div>
                <div className={ state.seeAllServices?s.container_services_second_all:s.container_services_second }>
                    <BsArrowLeftCircle onClick={ newStateServices } size="50px"/>
                </div>
            </div>
            <h4>Reviews</h4>
            <div className={ s.container_reviews }>
                <div className={ state.seeAllReview? s.container_reviews_first:s.container_reviews_first_all }>
                    <CardReview/>
                    <CardReview/>
                    <CardReview/>
                    <CardReview/>
                    <CardReview/>
                    <CardReview/>
                    <CardReview/>
                    <CardReview/>
                    <CardReview/>
                </div>
                <div className={ state.seeAllReview?s.container_reviews_second:s.container_reviews_second_all }>
                    <BsArrowRightCircle onClick={ newStateReview } size="50px"/>
                </div>
                <div className={ state.seeAllReview?s.container_reviews_second_all:s.container_reviews_second }>
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