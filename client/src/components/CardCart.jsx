import React from 'react'

import s from './styles/CardCart.module.css'

import { useGlobalStorage } from '../hooks/useGlobalStorage'

export default function CardCart(props) {

    const [cart, setCart] = useGlobalStorage("cart", "")

    function changeCount(e){
        let item = cart.map(el => {
            if ((el.name === props.name) && (e.target.name === "add")) {
                el.count += 1
            } else if ((el.name === props.name) && (el.count > 1)){
                el.count -= 1
            }
            return el
        })
        setCart(item)
    }

    function deleteItem(){
        let item = cart.filter(el => {
            return el.name !== props.name
        })
        setCart(item)
    }


    return (
        <div className={ s.container }>
            <div className={ s.container_img}>
                <span>{props.name}</span>
            </div>
            <div className={s.container_details}>
                <span>{ props.description }</span>
            </div>
            <div className={s.container_buttons}>
                    <span>${props.price}</span>
                    <span>cant: {props.count}</span>
                    <div>
                        <button name="add" onClick={changeCount}>add</button>
                        <button name="less" onClick={changeCount}>less</button>
                    </div>
            </div>
            <button onClick={ deleteItem } className={ s.container_buttonRemove }>X</button>
        </div>
    )
}
