import React, { useState, useEffect } from 'react'
// css
import s from './styles/Cart.module.css'
//Componentes
import CardCart from './CardCart'
// Hooks
import { useGlobalStorage } from '../hooks/useGlobalStorage'

export default function Cart() {

    const [cart, setCart] = useGlobalStorage("cart", null)

    return (
        <div className={s.container}>
            <div className={s.container_list}>
                <div className={ s.container_list_cards }>
                    {
                        cart.map((el, index) =>{
                            return (
                                <CardCart
                                key={ "cart" + index }
                                name= { el.name }
                                description= { el.description }
                                price= { el.price }
                                count= { el.count }
                                />
                            )
                        })
                    }
                </div>
            </div>
            <div className={ s.container_totalDetails }>

            </div>
            <div className={s.container_button}>

            </div>
        </div>
    )
}
