import React from 'react';

import { Link } from 'react-router-dom';

import s from './styles/ProfileProfessional.module.css'

import star from '../img/star.svg'
import { FaRegEdit } from 'react-icons/fa'
import { BsArrowRightCircle } from 'react-icons/bs'

import CardReview from '../components/CardReview';
import CardParticularService from '../components/CardParticularService';

export default function ProfileProfessional(){
    return (
        <div className={ s.container }>
            <Link to="/">
                <button className={ s.hardcode }>
                    volviendoo
                </button>
            </Link>
            <div className={ s.details }>
                <div className={ s.photo }>
                </div>
                <div className={ s.text }>
                    <h1>Elon Musk</h1>
                    <h2>Mecánica automotriz.</h2>
                    <h5>Buenos Aires, Argentina.</h5>
                    <div>
                        <img src={ star } alt="" />
                        <img src={ star } alt="" />
                        <img src={ star } alt="" />
                        <img src={ star } alt="" />
                        <img src={ star } alt="" />
                    </div>
                    
                    
                </div>
                <Link className={ s.linkEdit } to="/">
                        <FaRegEdit size="40px" className={ s.logoEdit }>
                        </FaRegEdit>
                </Link>
            </div>
            <h6>Reviews</h6>
            <div className={ s.reviews }>
                <CardReview/>
                <CardReview/>
                <CardReview/>
                <BsArrowRightCircle size="50px"/>
            </div>
            <h6>Servicios particulares</h6>
            <div className={ s.reviews }>
                <CardParticularService/>
                <CardParticularService/>
                <CardParticularService/>
                <BsArrowRightCircle size="50px"/>
            </div>
            <div className={ s.container_containerButton}>
                <button className={ s.container_containerButton_button }>
                    Contactar
                </button>
            </div>
        </div>    
    )
}
