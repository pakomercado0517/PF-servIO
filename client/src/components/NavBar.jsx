import React, {useEffect, useState} from 'react';
import s from './styles/NavBar.module.css'
import logo from '../img/ServIO.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import {FiSearch} from 'react-icons/fi'
import {MdAccountCircle, MdExpandMore} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import {searchByName, getAllProfessionals, getByCompteId} from '../redux/actions'
import { CgLogOut } from 'react-icons/cg';

export default function NavBar() {

    const dispatch = useDispatch()
    const login = !localStorage.getItem ? null: JSON.parse(localStorage.getItem("user"))

    const profile = useSelector(state => state.compte)

    const[input, setInput]= useState({
        name:""
    })
    console.log(profile);

    function logout() {
        fetch('http://localhost:3001/user/logout',{
            method: 'POST'
        })
        .then(response => {
            localStorage.clear()
            window.location.replace('/')
        })
    }

    useEffect(()=>{
        if (localStorage.getItem('user')) {
            dispatch(getByCompteId(login.cookies.userId))
        }
    },[])

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
                </div>

                <div className={s.container__navigate}>
                    <NavLink to='/' className={s['container__inicio--btn'] }   >Inicio</NavLink>
                    <NavLink to='/nosotros' className={s['container__inicio--btn']}>Sobre Nosotros</NavLink>
                </div>
                
                { login && login.message === "Logged"? <div>
                    <div className={s.session}>
                        <MdAccountCircle className={s.iconLogin}/>
                        <span>{profile[0]?.first_name.length > 6 ? profile[0]?.first_name.slice(0,6 + '...'): profile[0]?.first_name}</span>
                        <div className='dropdown'>
                            <button  class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" type="button" aria-expanded="false"></button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
                                {/* <li><span class="dropdown-item" id='' onClick={handleOrder}>Servicios</span></li>
                                <li><span class="dropdown-item" id='A-Z' onClick={handleOrder}>Trabajos</span></li>
                                <li><span class="dropdown-item" id='Z-A' onClick={handleOrder}>Ajustes</span></li> */}
                                <li><span class="dropdown-item" id='Z-A'onClick={logout}>Cerrar sesion</span></li>
                    </ul>
                        </div>
                        
                    </div>
                </div>: null}
            </div>
        </div>
    )
}