import React from 'react'

import styles from './Landing.module.css'

import img from '../../img/landing-img.png'

export default function Landing() {
    return (
        <div className={ styles.div_principal }>
            <div className={ styles['div_principal--first'] }>
                <span className={ styles['div_principal--first--span'] }>Serv</span>
                <span>IO</span>
                <p>busca servicios profesionales desde la plataforma con seguridad y eficacia desde la comodidad de tu hogar... Crea tu necesidad!!</p>
                <div className={ styles['div_principal--first--buttons'] }>
                    <button className={ styles['div_principal--first--buttons--button'] }>Iniciar sesión</button>
                    <button className={ styles['div_principal--first--buttons--button'] }>Registrarse</button>
                </div>
            </div>
            <div className={ styles['div_principal--second'] }>
                <img src={ img } className={ styles['div_principal--second--img'] } alt="" />
            </div>
        </div>
    )
}