import React from 'react';
import { Search } from './Search';
import { NavLink } from 'react-router-dom';
import logo from '../img/ServIO.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getByCompteId, showFormClientNeed } from '../redux/actions'
import s from './styles/NavBar.module.css'
import { CgOptions } from 'react-icons/cg';
import { useEffect } from 'react';
import { MdAccountCircle } from 'react-icons/md';

export default function NavBar() {

    const dispatch = useDispatch()
    const login = !localStorage.getItem ? null: JSON.parse(localStorage.getItem("user"))
    console.log('login daaaaleee',login)
    const profile = useSelector(state => state.compte)

    useEffect(()=>{
        if (localStorage.getItem('user')) {
            dispatch(getByCompteId(login.cookies.userId))
        }
    },[dispatch])

    function logout() {
        fetch('http://localhost:3001/user/logout',{
            method: 'POST'
        })
        .then(response => {
            localStorage.clear()
            window.location.replace('/')
        })
    }

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

                <div onClick={showModalFormCLient} className={s.show__presentation}>
                    <CgOptions/>
                    <span>Crear publicacion</span>
                </div>
                </div>



                { login && login.message === "Logged"? 
                
                <>
                
                    <div className={s.session}>
                        <MdAccountCircle className={s.iconLogin}/>
                    <span>{ profile[0]?.first_name + ' ' } </span>

                    { login && login.userType === "Client" ? 
                    <div className='dropdown'>
                        <button
                            className="btn btn-secondary dropdown-toggle" 
                            id="dropdownMenuButton1" 
                            data-bs-toggle="dropdown" 
                            type="button" 
                            
                            aria-expanded="false"
                        ></button>
                            
                        <ul 
                            className="dropdown-menu" 
                            aria-labelledby="dropdownMenuButton1"
                        >
                            <li><span className="dropdown-item" >Perfil Cliente</span></li>
                            <li><span className="dropdown-item" >Editar Perfil</span></li>
                            <li><span className="dropdown-item" >Servicios Solicitados</span></li>
                            <li><span 
                                className="dropdown-item" 
                                onClick={showModalFormCLient}
                            >Crear Publicacion</span></li>  
                            <li><span className="dropdown-item" >Notificaciones</span></li>
                            <li><span className="dropdown-item" >Carrito</span></li>
                            <li><span className="dropdown-item" >Registrarse Como Tecnico</span></li>
                            <li><span 
                                className="dropdown-item" 
                                onClick={logout}
                            >Cerrar sesion</span></li>
                        </ul>
                    </div>
                    : 
                    <div className='dropdown'>
                        <button
                            className="btn btn-secondary dropdown-toggle" 
                            id="dropdownMenuButton1" 
                            data-bs-toggle="dropdown" 
                            type="button" 
                            
                            aria-expanded="false"
                        ></button>
                        
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
                        <li><span className="dropdown-item" >Perfil Profesional</span></li>
                        <li><span className="dropdown-item" >Editar Perfil</span></li>
                        <li><span className="dropdown-item" >Ofrecer Servicios Profesionales</span></li>
                        <li><span className="dropdown-item" >Ver Trabajos Pendientes</span></li>
                        <li><span className="dropdown-item" >Notificaciones</span></li>
                        <li><span className="dropdown-item" >Carrito</span></li>
                        <li><span className="dropdown-item" >------------</span></li>
                        <li><span className="dropdown-item" >Ver perfil Cliente</span></li>
                        <li><span className="dropdown-item" >Crear Publicacion</span></li>  
                        <li><span className="dropdown-item" >Servicios Solicitados</span></li>
                        <li><span className="dropdown-item"  onClick={logout}>Cerrar sesion</span></li>
                        </ul>
                    </div>
                    
                }
                    </div>
                </>
                :<></>
                }
            </div>
        </div>

    )
};