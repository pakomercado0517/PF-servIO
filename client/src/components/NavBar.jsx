import React, { useEffect } from 'react';
// Router-dom
import { NavLink } from 'react-router-dom';
// Imagenes e iconos
import { CgOptions } from 'react-icons/cg';
import { MdAccountCircle } from 'react-icons/md';
import logo from '../img/ServIO.svg';
import { BsCart2 } from 'react-icons/bs'
//Componentes
import { Search } from './Search';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { showFormClientNeed, showFormProfessionalOffer } from '../redux/actions'
// CSS
import s from './styles/NavBar.module.css'
// Hooks
import { useGlobalStorage } from '../hooks/useGlobalStorage';
// import { useLocalStorage } from '../hooks/useLocalStorage';




export default function NavBar() {

    const dispatch = useDispatch()
    const [login] = useGlobalStorage("globalUser", "")
    const [cart] = useGlobalStorage("cart", "")
    const [switcheo, setSwitcheo] = useGlobalStorage("switcheo", null)
    // const login = !localStorage.getItem ? null: JSON.parse(localStorage.getItem("user"))

    const stateTotalRedux = useSelector(state => state)

    useEffect(()=>{
        // if (localStorage.getItem('user')) {
        //     dispatch(getByAccountId(login[0] ? login[0].cookies.userId:""))
        // }
    },[])

    // useEffect(()=>{
    // },[login])


    // function showMyProfile(){

        {/* http://localhost:3000/clients/${id} */}
    // }

    function showModalFormCLient(){
        dispatch(showFormClientNeed("show"))
    }
    
    function logout() {
        setSwitcheo("professional")
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
        <div className={s.navbar}>

            <div className={s.container__logo}>
                <img src={logo} alt="Logo" />
            </div>

            <div className={s.container__elements}>

                <Search />
                <div className={s.container__navigate}>

                    <NavLink to='/' className={s['container__inicio--btn']}   >Inicio</NavLink>
                    <NavLink to='/nosotros' className={s['container__inicio--btn']}>Sobre Nosotros</NavLink>

                    {/* CARRITO */}

                    <NavLink className={ s.container__elements_cart } to='/Cart'>
                        <div className={s.container__elements_cart_logoCart }>
                            <BsCart2 size="30px"></BsCart2>
                        </div>
                        <div className={s.container__elements_cart_notification }>
                            <span>{cart.length}</span>
                        </div>
                    </NavLink>

                    {/* CREAR PUBLICACIÓN */}

                    <div onClick={showModalFormCLient} className={s.show__presentation}>
                        <CgOptions />
                        <span>Crear publicacion</span>
                    </div>
                </div>



                {/* { login? 

                <>

                    <div className={s.session}>
                        <NavLink to={`/clients/${login.cookies.userId}`}>
                            <MdAccountCircle className={s.iconLogin} />
                            <span className={ s.session_name }>{stateTotalRedux.account[0]?.first_name + ' '} </span>
                        </NavLink> */}


                {login ?
                    <>
                        <div className={s.session}>
                            <NavLink to={`/clients/${login?.id}`}>
                                <MdAccountCircle className={s.iconLogin} />
                                <span className={s.session_name}>{login?.first_name + ' '} </span>
                            </NavLink>

                            {login && !login.professional ?

                                // ------------------------------Opciones Perfil cliente-------------------------------




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

                                        <li><span className={s.dropdown_item + " dropdown-item"} >Perfil Cliente</span></li>
                                        <NavLink to={`/clients/${login?.id}`}>
                                            <li><span
                                                className={s.dropdown_item + " dropdown-item"}
                                            >Ver mi Perfil</span></li>
                                        </NavLink>
                                        <li><NavLink to='editUser'><span className={s.dropdown_item + " dropdown-item"} >Editar Perfil</span></NavLink></li>
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
                                // ------------------------------Opciones Perfil Tecnico---------------------------------

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
                                        <li><NavLink to='editUser'><span className={s.dropdown_item + " dropdown-item"} >Editar Perfil</span></NavLink></li>
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