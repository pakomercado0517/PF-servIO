import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa'
import { BsArrowRightCircle } from 'react-icons/bs'
import s from './styles/ProfileClient.module.css'
import CardReview from '../components/CardReview';
import CardParticularService from '../components/CardParticularService';
import imgCliente from '../img/user_profile_photo.jpg'

export default function ProfileClient(){


    return (
        <div className={ s.div_principal }>
            <div className={ s.div_inicio  }></div>

            <div className={ s.div_photo  }><img src={imgCliente } alt="" /></div>
            <div className={ s.div_info  }>
                <div className={ s.div_tiulo}>
                    <h3>Lana Roadhes</h3>
                    <Link className={ s.linkEdit } to="/">
                        <FaRegEdit size="40px" className={ s.logoEdit }>
                        </FaRegEdit>
                    </Link>
                </div>
                <p>@lali</p>
                <p>Buenos Aires, Argentina</p>
                <p>Telefono:<span>+54 9 11-2233-4455</span> </p>
                <p>Email: <span>LaliRhoades@gmail.com</span></p>
                <p>Ultimas solicitudes:</p>
                <div className={ s.reviews }>
                    <h4>Ultimas Solicitudes</h4>
                    <CardParticularService/>
                    <CardParticularService/>
                    <CardParticularService/>
                    <CardParticularService/>
                    <CardParticularService/>
                    <CardParticularService/>
                    <CardParticularService/>
                    <CardParticularService/>
                    <BsArrowRightCircle className={s.reviews_icon} size="50px"/>
                    <span >Ver Historial</span> 
                </div>
                <div className={ s.reviews }>
                    <h4>Ultimas Reseñas</h4>
                    <CardReview/>
                    <CardReview/>
                    <CardReview/>
                    <CardReview/>
                    <BsArrowRightCircle className={s.reviews_icon} size="50px"/>
                    <span >Ver Historial</span> 
                </div>

            </div>
            
            

        </div>
    )
}
