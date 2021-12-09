import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa'
import { BsArrowRightCircle } from 'react-icons/bs'
import s from './styles/ProfileClient.module.css'
import star from '../img/star.svg'

import CardReview from '../components/CardReview';
import CardParticularService from '../components/CardParticularService';

export default function ProfileClient(){


    return (
        <div className={ s.div_principal }>
            <div className={ s.div_inicio  }></div>

            
                <div className={ s.div_photo  }></div> 
                <div className={ s.div_info  }>
                <h1>Lana Roadhes</h1>
                <h2>@lali</h2>
                <h1>Buenos Aires, Argentina</h1>
                <h5>Telefono: +54 9 11-2233-4455</h5>
                <h5>Email: LaliRhoades@gmail.com</h5>
                <h2>Ultimas solicitudes:</h2>
                <hr/>
            <div>
                <img src={ star } alt="" />
                <img src={ star } alt="" />
                <img src={ star } alt="" />
                <img src={ star } alt="" />
                <img src={ star } alt="" />
            </div>
            </div>
            <button className={ s.btn }> Editar perfil
            <Link className={ s.btn } to="/editProfileClient"></Link>
            </button>
            
            <Link className={ s.linkEdit } to="/">
                <FaRegEdit size="40px" className={ s.logoEdit }></FaRegEdit>
            </Link>

                <h6>Ultimas Solicitudes</h6>
            <div className={ s.reviews }>
                <CardParticularService/>
                <CardParticularService/>
                <CardParticularService/>
                <Link to ="/history">
                <BsArrowRightCircle size="50px"/>
                <>ver historial</>
                </Link>
            </div>
                <h6>Ultimas Reseñas</h6>
            <div className={ s.reviews }>
                <CardReview/>
                <CardReview/>
                <CardReview/>
                <Link to ="/reviews">
                <BsArrowRightCircle size="50px"/>
                <>ver reviews</>
                </Link>
            </div>
        </div>
    )
}
