import React, { useState, useEffect } from 'react'

import s from './styles/ModalCart.module.css'

import { useDispatch, useSelector } from 'react-redux'
import { switchModalCart } from '../redux/actions'
import { useGlobalStorage } from '../hooks/useGlobalStorage'

export default function ModalCart(props) {

    const [input, setinput] = useState("")
    const [cart, setCart] = useGlobalStorage("cart", "")
    const [user, ] = useGlobalStorage("globalUser", "")

    const dispatch = useDispatch()
    const { modalCart } = useSelector(state => state)

    useEffect(() => {
        dispatch(switchModalCart("notShow"))
    }, [])

    function handleSubmit() {
    
        // SETEO EL CARRITO
        const newData = cart.map( el => {
            return {
                ...el,
                location: input,
                UserId: user.id
            }
        })
        setCart(newData)

    }

    useEffect(() => {
        if (modalCart === "show") {
            const fondo = document.getElementById("modal-cart")
            fondo.style.top = "0px"
        } else if(modalCart === "notShow") {
            const fondo = document.getElementById("modal-cart")
            fondo.style.top = "-100vh"
        }
    }, [modalCart])
    
    function back() {
        dispatch(switchModalCart("notShow"))
    }

    return (
        <div className={ s.container } id='modal-cart'>
            <div className={ s.container_background } onClick={back}></div>
            <div className={ s.container_form }>
                <form>
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" id="staticEmail" defaultValue={ props.email } />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Dirección</label>
                        <div className="col-sm-10">
                            <input value={ input } type="text" className="form-control" id="inputPassword" onChange={ (e) => setinput(e.target.value ) } />
                        </div>
                    </div>
                </form>
                <div className={ s.container_buttons }>
                    <button onClick={ back } className={ "btn btn-secondary"}>Volver</button>
                    <button onClick={ handleSubmit } className={ "btn btn-success" }>Confirmar</button>
                </div>
            </div>
        </div>
    )
}
