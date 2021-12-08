import React from 'react'

import styles from './styles/Landing.module.css'

import img from '../img/landing-img.png'

export default function Landing() {
    return (
        <div className={ styles.div_principal }>
            <div className={ styles.div_principal__first }>
                <span className={ styles.div_principal__first__span }>Serv</span>
                <span>IO</span>
                <p>busca servicios profesionales desde la plataforma con seguridad y eficacia desde la comodidad de tu hogar... Crea tu necesidad!!</p>
                <div className={ styles.div_principal__first__buttons }>
                    <button className={ styles.div_principal__first__buttons__button }>Iniciar sesión</button>
                    <button className={ styles.div_principal__first__buttons__button }>Registrarse</button>
                </div>
            </div>
            <div className={ styles.div_principal__second }>
                <img src={ img } className={ styles.div_principal__second__img } alt="" />
            </div>
        </div>
    )
}
