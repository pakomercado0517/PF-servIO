import React, { useState, useEffect } from 'react'
// css
import s from './styles/Cart.module.css'
//Componentes
import CardCart from './CardCart'
// Hooks
import { useGlobalStorage } from '../hooks/useGlobalStorage'

export default function Cart() {


    const [cart, setCart] = useGlobalStorage("cart", "")
    const [total, settotal] = useState(0)

    useEffect(() => {
        const aux = cart.map(el => el.count * el.price)
        if(aux[0]){
            settotal(aux?.reduce((a, b) => a+b))
        }
    }, [cart])

    function mercadoPago() {

    }

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
            <div className={s.container_buttons}>
                <span>Total: { total }</span>
                <button className={ 'btn btn-success'} onClick={ mercadoPago }>Comprar</button>
            </div>
        </div>
    )
}
