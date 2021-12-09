import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa'
import { BsArrowRightCircle } from 'react-icons/bs'
import s from './styles/ProfileClient.module.css'
import CardReview from '../components/CardReview';
import CardParticularService from '../components/CardParticularService';

export default function ProfileClient(){


    return (
        <div className={ s.div_principal }>
            <div className={ s.div_inicio  }></div>
            <div className={ s.div_photo  }> </div> 
            <div className={ s.div_info  }>
                <h1>Lana Roadhes</h1>
                <h2>@lali</h2>
                <h1>Buenos Aires, Argentina</h1>
                <h5>Telefono: +54 9 11-2233-4455</h5>
                <h5>Email: LaliRhoades@gmail.com</h5>
                <h2>Ultimas solicitudes:</h2>
                <hr/>
            </div>
            <Link className={ s.linkEdit } to="/">
                        <FaRegEdit size="40px" className={ s.logoEdit }>
                        </FaRegEdit>
                </Link>

                <h6>Ultimas Solicitudes</h6>
            <div className={ s.reviews }>
                <CardParticularService/>
                <CardParticularService/>
                <CardParticularService/>
                <BsArrowRightCircle size="50px"/>
                <>ver historial</>
            </div>
                <h6>Ultimas Reseñas</h6>
            <div className={ s.reviews }>
                <CardReview/>
                <CardReview/>
                <CardReview/>
                <BsArrowRightCircle size="50px"/>
            </div>
        </div>
    )
}
