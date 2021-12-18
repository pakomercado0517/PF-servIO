import React from 'react'

import s from './styles/CardCart.module.css'

export default function CardCart(props) {
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
                        <button>add</button>
                        <button>less</button>
                    </div>
            </div>
            <button className={ s.container_buttonRemove }>X</button>
        </div>
    )
}
