import React from 'react';
import styles from './styles/Landing.module.css';
import img from '../img/brooke-cagle-tLG2hcpITZE-unsplash.jpg';
import { NavLink } from 'react-router-dom';
import { useGlobalStorage } from '../hooks/useGlobalStorage';
import  albañil from '../img/albañil-min.jpg';
import electricista from '../img/electricista-min.jpg';
import plomero from '../img/plomero-min.jpg';

export default function Landing() {
    // const login = !localStorage.getItem ? null: JSON.parse(localStorage.getItem("user"))
    const [ login ] = useGlobalStorage("globalUser", "")


    return (
        <div className={ styles.div_principal }>
            <div className={ styles.div_principal__first }>
                <h1 className={`${styles.landing__title} text-center`}>Serv.IO</h1>
                <p className={`${styles.landing__subtitle} text-justify`}>Busca servicios profesionales desde la plataforma con seguridad y eficacia desde la comodidad de tu hogar... Crea tu necesidad!!
                </p>
                { !(login && !login.proffesional) ? <div className={ styles.div_principal__first__buttons }>
                    <NavLink to="/login" style={{textDecoration: 'none'}}>
                        <button className={ `${styles.button} ${styles.type3}` }>Iniciar sesion</button>
                    </NavLink>
                    <NavLink to='/register' style={{textDecoration: 'none'}}>
                        <button className={ `${styles.button} ${styles.type3}` }>Registrarse</button>
                    </NavLink>

                </div>:<></>}
                
            </div>
            {/* <div className={ styles.div_principal__second }>
                <div class={styles.slider}>
                    <ul>
                        <li>
                            <img src={albañil}/>
                        </li>
                        <li>
                            <img src={electricista}/>
                        </li>
                        <li>
                            <img src={plomero}/>
                        </li>
                    </ul>
                </div>
            </div> */}
        </div>
    )
}
