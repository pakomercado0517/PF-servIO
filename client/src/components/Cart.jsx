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



export default function Cart({modal}) {
    
    const dispatch = useDispatch()
    
    const [cart, ] = useGlobalStorage("cart", [])
    const [user, ] = useGlobalStorage("globalUser", "")
    const [total, settotal] = useState(0)
    const [modalIsOpen, setModalIsOpen] = useState(modal)

    function showForm(){
        dispatch(switchModalCart("show"))
    }

    
    useEffect(() => {
        if (cart[0]){
            const aux = cart.map(el => el.count * el.price)
            settotal(aux?.reduce((a, b) => a+b))
        }
    }, [cart])

    const handleModal= (e)=> {
        e.preventDefault()
        setModalIsOpen(!modalIsOpen)
    }
    console.log('modal', modal)
    return (
        <>
            <ModalCart email={user.email} />
            <div className={s.container}>
                <div className={`${s.close_button}`} onClick={handleModal} ><span>X</span></div>
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
                    <div className={s.alert} role="alert">
                        <span>Total:  {total}</span>
                    </div>
                    <button className={s.container_buttons_button} onClick={showForm}> Continuar Compra</button>
                </div>
                <div className='shopping-cart'></div>
                {/* <div className='container_payment'></div> */}
            </div>
        </>
    )
}
