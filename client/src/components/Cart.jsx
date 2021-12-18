import React from 'react'
// css
import s from './styles/Cart.module.css'
//Componentes
import CardCart from './CardCart'
// Hooks
import { useGlobalStorage } from '../hooks/useGlobalStorage'

export default function Cart() {
    const [cart, setCart] = useGlobalStorage("cart", null)
    console.log(cart)
    return (
        <div className={s.container}>
            <div className={s.container_list}>
                <div className={ s.container_list_card }>

                    <CardCart
                    key={ "cart" }
                    ></CardCart>
                </div>
            </div>
            <div className={ s.container_totalDetails }>

            </div>
            <div className={s.container_button}>

            </div>
        </div>
    )
}
