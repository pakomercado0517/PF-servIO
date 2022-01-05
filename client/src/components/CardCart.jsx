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
            <div className={ s.container_img }>
                <img src={ props.photo ? props.photo : "" } alt="" />
                <span>{props.name}</span>
            </div>
            <div className={s.container_details}>
                <span>Descripción: { props.description }</span>
                <span>Garantía: { props.guarantee ? "SI":"NO" }</span>
                <span>Tiempo de Garantía: { props.guarantee_time === 0 ? "No tiene": props.guarantee_time }</span>
                <span>Materiales: { props.materials ? "SI":"NO" }</span>
            </div>
            <div className={s.container_buttons}>
                    <span>${props.price}</span>
                    <span>cant: {props.count}</span>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button name="add" type="button" class="btn btn-outline-success" onClick={changeCount}>add</button>
                        <button name="less" type="button" class="btn btn-outline-danger" onClick={changeCount}>less</button>
                    </div>
            </div>
            <button onClick={ deleteItem } className={ s.container_buttonRemove + " btn-close" } aria-label="Close"></button>
        </div>
    )
}
