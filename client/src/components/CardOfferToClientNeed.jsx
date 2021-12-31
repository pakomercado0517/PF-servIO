import React from 'react'

import s from './styles/CardOfferToClientNeed.module.css'

export default function CardOfferToClientNeed(props) {
    return (
        <div className={ s.container }>
            <div className={s.container_date}>
                <p>fecha de creacion de oferta:{props.date}</p>
            </div>
            <div className={s.container_description}>
                {/* img */}
                <img src={props.photo} alt="img" className={s.avatar_img}/>
                {/* Description */}
                <div>
                    <p>descripcion:{props.description}</p>
                    <p>finalizado en {props.duration} días</p>
                    <p>duracion de la garantia:{props.guarantee_time} días</p>
                    <p>incluye materiales?{props.materials === true ? 'si' : 'no'}</p>
                    <p>precio:${props.price}</p>
                </div>
                {/* buttons */}
                <div className={ s.container_buttons }>
                        <button name="offers" type="button" class="btn btn-outline-danger">
                        Rechazar
                        </button>
                    <button name="details" className='btn btn-outline-success'>Agregar al carrito</button>
                    {/* <button name="details" className='btn btn-outline-success'>Contratar</button> */}
                </div>
            </div>
        </div>
    )
}
