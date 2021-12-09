import React from 'react';
import s from './styles/NavBar.module.css'
import logo from '../img/logo.png';
// import icon from '../../img/iconHamburguesa.png';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <div className={ s.conteiner }>
            <div className={ s.conteiner__img }>
                <img src={ logo } alt="Logo" />
            </div>
            <div className={s.conteiner__input}>
                <input className={s['conteiner__input--text']}
                    type='text'
                    placeholder="Busca Tecnico">
                </input>
                <div className={s.conteiner__btn}>
                    <button type='submit' className={s['conteiner__btn--btn']}></button>
                </div>
            </div>
            <div className={s.conteiner__inicio}>
                <NavLink to='/:idClient' className={s['conteiner__inicio--btn']}>Inicio</NavLink>
                <NavLink to='/:idProfessional' className={s['conteiner__inicio--btn']}>Sobre Nosotros</NavLink>
            </div>
            <div className={s.conteiner__Hamb}>
                <div class={s['conteiner__Hamb--menu']}>
                    <button to='/:idProfessional' className={s['conteiner__Hamb--btn']}>X</button>
                    <div className={s['conteiner__Hamb--down']}>
                        <div className={s['conteiner__Hamb--table']}>
                            <img src={logo} alt="Logo" height='60' />
                            <span>Servicios</span>
                            <span>Trabajos</span>
                            <span>Ajustes</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}