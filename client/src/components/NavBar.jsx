import React from 'react';
import { Search } from './Search';
import { NavLink } from 'react-router-dom';
import logo from '../img/ServIO.svg';
import { useDispatch, useSelector } from 'react-redux';
import {searchByName, getAllProfessionals, getByCompteId, showFormClientNeed} from '../redux/actions'
import s from './styles/NavBar.module.css'
import { CgOptions } from 'react-icons/cg';
import { useEffect } from 'react';
import { MdAccountCircle } from 'react-icons/md';

export default function NavBar() {

    const dispatch = useDispatch()
    const login = !localStorage.getItem ? null: JSON.parse(localStorage.getItem("user"))

    const profile = useSelector(state => state.compte)

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

    function showModalFormCLient(){
        dispatch(showFormClientNeed("show"))
    }

    return (
        <div className={ s.navbar }>
            <div className={ s.container__logo }>
                <img src={ logo } alt="Logo" />
            </div>
            <div className={s.container__elements}>

                <Search/>

                <div className={s.container__navigate}>
                    <NavLink to='/' className={s['container__inicio--btn'] }   >Inicio</NavLink>
                    <NavLink to='/nosotros' className={s['container__inicio--btn']}>Sobre Nosotros</NavLink>
                </div>

                <div onClick={showModalFormCLient} className={s.show__presentation}>
                    <CgOptions/>
                    <span>Crear publicacion</span>
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

                { login && login.message === "Logged"? <div>
                <div className={s.session}>
                    <MdAccountCircle className={s.iconLogin}/>
                    {/* <span>{profile[0]?.first_name.length > 6 ? profile[0]?.first_name.slice(0,6 + '...'):   profile[0]?.first_name}</span> */}

                <span>{ profile[0]?.first_name }</span>
                <div className='dropdown'>
                <button  class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" type="button" aria-expanded="false"></button>
                
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
                <li><span class="dropdown-item" >Notificaciones</span></li>
                <li><span class="dropdown-item" >Carrito</span></li>
                <li><span class="dropdown-item" >Editar Perfil</span></li>
                <li><span class="dropdown-item"  onClick={logout}>Cerrar sesion</span></li>
                </ul>
                </div>

                </div>
                </div>: null}

            </div>
        </div>
    )
}