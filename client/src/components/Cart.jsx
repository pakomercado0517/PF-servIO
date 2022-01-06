import React, { useState, useEffect } from 'react'
// css
import s from './styles/Cart.module.css'
// Componentes
import CardCart from './CardCart'
import ModalCart from './ModalCart'
// Hooks and redux
import { useGlobalStorage } from '../hooks/useGlobalStorage'
import { useDispatch } from 'react-redux'
// AXIOS
import { switchModalCart } from '../redux/actions'



export default function Cart() {
    
    const dispatch = useDispatch()
    
    const [cart, ] = useGlobalStorage("cart", [])
    const [user, ] = useGlobalStorage("globalUser", "")
    const [total, settotal] = useState(0)

    function showForm(){
        dispatch(switchModalCart("show"))
    }
    useEffect(() => {
        if (cart[0]){
            const aux = cart.map(el => el.count * el.price)
            settotal(aux?.reduce((a, b) => a+b))
        }
    }, [cart])

    return (
        <>
            <ModalCart email={user.email} />
            <div className={s.container}>
                <div className={s.container_list}>
                    <div className={s.container_list_cards}>
                        {
                            cart.map((el, index) => {
                                return (
                                    <CardCart
                                        key={"cart" + index}
                                        name={el.name}
                                        description={el.description}
                                        guarantee={el.guarantee}
                                        guarantee_time={el.guarantee_time}
                                        materials={el.materials}
                                        duration={el.duration}
                                        photo={el.photo}
                                        price={el.price}
                                        count={el.count}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <div className={s.container_totalDetails}>

                </div>
                <div className={s.container_buttons}>
                    <div className="alert alert-warning" role="alert">
                        <span>Total:  {total}</span>
                    </div>
                    <button id='checkout_button' className={s.container_buttons_button + ' btn btn-success'} onClick={showForm}> Continuar Compra</button>
                    <div id='cho-container'></div>
                </div>
                <div className='shopping-cart'></div>
                <div className='container_payment'></div>
            </div>
        </>
    )
}
