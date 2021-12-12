import React, {useEffect, useState} from 'react';
import s from './styles/NavBar.module.css'
import logo from '../img/ServIO.svg';
import { NavLink } from 'react-router-dom';
import {FiSearch} from 'react-icons/fi'
import { useDispatch } from 'react-redux';
import {searchByName, getAllProfessionals} from '../redux/actions'

export default function NavBar() {

    const dispatch = useDispatch()

    const[input, setInput]= useState({
        name:""
    })

    useEffect(()=>{
        if (input.name) {
            dispatch(searchByName(input.name))
        } else {
            dispatch(getAllProfessionals())
        }
    }, [dispatch, input.name])

    function handleName (e) {setInput({...input, name:e.target.value})}
    return (
        <div className={ s.navbar }>
            <div className={ s.container__logo }>
                <img src={ logo } alt="Logo" />
            </div>
            <div className={s.container__elements}>
                <div className={s.container__input}>
                    <FiSearch/>
                    <input 
                        className={s['container__input--text']}
                        type='text'
                        placeholder="Buscar Tecnico"
                        onChange={handleName} 
                        value={input.name}>
                    </input>
                        {/* <div className={s.conteiner__btn}>
                        <button type='submit' className={s['conteiner__btn--btn']}></   button>
                        </div> */}
                </div>

                <div className={s.container__navigate}>
                    <NavLink to='/' className={s['container__inicio--btn'] }   >Inicio</NavLink>
                    <NavLink to='/nosotros' className={s['container__inicio--btn']}>Sobre Nosotros</NavLink>
                </div>
                {/*
                <div className={s.conteiner__Hamb}>
                    <div class={s['conteiner__Hamb--menu']}>
                        <button to='/:idProfessional' className={s['conteiner__Hamb--btn']} >X</button>
                        <div className={s['conteiner__Hamb--down']}>
                            <div className={s['conteiner__Hamb--table']}>
                                <span>Servicios</span>
                                <span>Trabajos</span>
                                <span>Ajustes</span>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}