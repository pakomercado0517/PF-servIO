import React from 'react';
import { Search } from './Search';
import { NavLink } from 'react-router-dom';
import logo from '../img/ServIO.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getByAccountId, showFormClientNeed, showFormProfessionalOffer } from '../redux/actions'
import s from './styles/NavBar.module.css'
import { CgOptions } from 'react-icons/cg';
import { useEffect } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useGlobalStorage } from '../hooks/useGlobalStorage';

import { ProfessionalOfferToClientNeed } from './ProfessionalOfferToClientNeed';


export default function NavBar() {

    const dispatch = useDispatch()
                    // useLocalStorage
    const [login] = useGlobalStorage("globalUser", null)
    console.log("MENSAJEE: ", login)

    // const login = !localStorage.getItem ? null: JSON.parse(localStorage.getItem("user"))

    const stateTotalRedux = useSelector(state => state)

    useEffect(()=>{
        // if (localStorage.getItem('user')) {
        //     dispatch(getByAccountId(login[0] ? login[0].cookies.userId:""))
        // }
    },[])

    useEffect(()=>{
    },[login])


    // function showMyProfile(){

        {/* http://localhost:3000/clients/${id} */}
    // }

    function showModalFormCLient(){
        dispatch(showFormClientNeed("show"))
    }
    
    function logout() {
        fetch('http://localhost:3001/user/logout',{
            method: 'POST'
        })
        .then(response => {
            localStorage.clear()
            window.location.replace('/')
        })
    }
    function showFormProfessionalOffer5() {
        dispatch(showFormProfessionalOffer("show"))
    }

    return (
        <div className={ s.navbar }>
            {/* <ProfessionalOfferToClientNeed/> */}
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



                { login ? 

                    <>

                        <div className={s.session}>
                            <NavLink to={`/clients/${login[0]?.id}`}>
                                <MdAccountCircle className={s.iconLogin} />
                                <span className={ s.session_name }>{login[0]?.first_name + ' '} </span>
                            </NavLink>

                            {login[0] && !login[0].professioanl ?
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
                                        {/* http://localhost:3000/clients/${id} */}

                                        <li><span className={s.dropdown_item + " dropdown-item"} >Perfil Cliente</span></li>
                                        {/* <NavLink to={`/clients/${login.cookies.userId}`} className={s.dropdown__item}>Mi perfil</NavLink> */}
                                        <NavLink to={`/clients/${login[0]?.id}`}>
                                            <li><span
                                                className={s.dropdown_item + " dropdown-item"}
                                            >Ver mi Perfil</span></li>
                                        </NavLink>
                                        <li><span className={s.dropdown_item + " dropdown-item"} >Editar Perfil</span></li>
                                        <li><span className={s.dropdown_item + " dropdown-item"} >Servicios Solicitados</span></li>
                                        <li><span
                                            className={s.dropdown_item + " dropdown-item"}
                                            onClick={showFormProfessionalOffer5}
                                        >Crear Publicacion</span></li>
                                        <li><span className={s.dropdown_item + " dropdown-item"} >Notificaciones</span></li>
                                        <li><span className={s.dropdown_item + " dropdown-item"} >Carrito</span></li>
                                        <li><span className={s.dropdown_item} >Registrarse Como Tecnico</span></li>
                                        <li><span
                                            className={s.dropdown_item + " dropdown-item"}
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
                                        <li><span className={s.dropdown_item + " dropdown-item"} >Perfil Profesional</span></li>
                                        <li><NavLink to='editProfessional'><span className={s.dropdown_item + " dropdown-item"} >Editar Perfil</span></NavLink></li>
                                        <li><span className={s.dropdown_item + " dropdown-item"} >Ofrecer Servicios Profesionales</span></li>
                                        <li><span className={s.dropdown_item + " dropdown-item"} >Ver Trabajos Pendientes</span></li>
                                        <li><span className={s.dropdown_item + " dropdown-item"} >Notificaciones</span></li>
                                        <li><span className={s.dropdown_item + " dropdown-item"} >Carrito</span></li>
                                        <li><span className={s.dropdown_item + " dropdown-item"} >------------</span></li>
                                        <li><span className={s.dropdown_item + " dropdown-item"} >Ver perfil Cliente</span></li>
                                        <li><span
                                            className={s.dropdown_item + " dropdown-item"}
                                            onClick={showFormProfessionalOffer5}
                                        >Crear Publicacion</span></li>
                                        {/* <li><span className={s.dropdown_item + " dropdown-item"} >Crear Publicacion</span></li> */}
                                        <li><span className={s.dropdown_item + " dropdown-item"} >Servicios Solicitados</span></li>
                                        <li><span className={s.dropdown_item + " dropdown-item"} onClick={logout}>Cerrar sesion</span></li>
                                    </ul>
                                </div>

                            }
                        </div>
                    </>
                    : <></>
                }
            </div>
        </div>

    )
};