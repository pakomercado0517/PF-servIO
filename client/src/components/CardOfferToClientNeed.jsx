import React from 'react'

import s from './styles/CardOfferToClientNeed.module.css'

import { useGlobalStorage } from '../hooks/useGlobalStorage'

export default function CardOfferToClientNeed(props) {

    const [user, ] = useGlobalStorage("globalUser", "")
    const [cart, setCart] = useGlobalStorage("cart", [])
    console.log(user)

    function addToCart(){
        const exist = cart.filter(el => el.name === props.name )
        const notExist = cart.filter(el => el.name !== props.name )
        if ( exist[0] ){
            exist[0].count +=1;
            setCart([
                ...notExist,
                ...exist
            ])
        } else {
            setCart([
                ...cart,
                {
                    name: props.name,
                    description: props.description,
                    price: props.price,
                    count: 1
                }
            ])
        }
    }

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
                    <p>Titulo: {props.name}</p>
                    <p>Descripcion: {props.description}</p>
                    <p>Finalizado en {props.duration} días</p>
                    <p>Duración de la garantia: {props.guarantee_time} días</p>
                    <p>Incluye materiales?{props.materials === true ? 'si' : 'no'}</p>
                    <p>Precio: ${props.price}</p>
                </div>
                {/* buttons */}
                {
                    (user.id !== props.ProfessionalId) ?
                        <div className={s.container_buttons}>
                            <button name="offers" type="button" class="btn btn-outline-danger">
                                Rechazar
                            </button>
                            <button onClick={ addToCart } name="details" className='btn btn-outline-success'>
                                Agregar al carrito
                            </button>
                            {/* <button name="details" className='btn btn-outline-success'>Contratar</button> */}
                        </div> :
                        <div className={s.container_buttons}>
                            <button name="offers" type="button" class="btn btn-outline-danger">
                                Eliminar
                            </button>
                        </div>
                }
            </div>
        </div>
    )
}
