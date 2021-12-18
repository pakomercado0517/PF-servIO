import React from 'react'

import s from './styles/CardParticularService.module.css'

import { useGlobalStorage } from '../hooks/useGlobalStorage'

export default function CardParticularService(props) {
    const [cart, setCart] = useGlobalStorage("cart", [])
    function addToCart(){
        setCart([...cart, ...[
            {
                name: props.name,
                description: props.description,
                price: props.price
            }
        ]])
    }
    return (
        <div className={s.container}>
            <div className={s.container_info}>
                <h1>${props.price}</h1>
            </div>
            <div className={ s.container_description }>
                <h5>{ props.name }</h5>
                <p>{ props.description }</p>
            </div>
            <button onClick={ addToCart } className={ s.container_button + " btn btn-success"}>
                Agregar al carrito
            </button>
        </div>
    )
}
