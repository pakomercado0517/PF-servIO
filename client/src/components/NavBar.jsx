import React from 'react';
// Router-dom
import { NavLink , useNavigate } from 'react-router-dom';
// Imagenes e iconos
import { CgOptions } from 'react-icons/cg';
import { MdAccountCircle } from 'react-icons/md';
import logo from '../img/ServIO.svg';
import { BsCart2 } from 'react-icons/bs'
//Componentes
import Search from './Search';
import { ClientSpecificNeed } from './ClientSpecificNeed';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { showFormClientNeed } from '../redux/actions'
// CSS
import s from './styles/NavBar.module.css'
// Hooks
import { useGlobalStorage } from '../hooks/useGlobalStorage';
import { useLocalStorage } from '../hooks/useLocalStorage';


export default function NavBar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login, setGlobalUser] = useGlobalStorage("globalUser", "")
    const [cart] = useGlobalStorage("cart", "")
    const [ , setSwitcheo] = useGlobalStorage("switcheo", null)
    const stateTotalRedux = useSelector(state => state)
    const [ , setLocalUser] = useLocalStorage("localUser", "");

    function showModalFormCLient(){
        dispatch(showFormClientNeed("show"));
        
    }
    
    async function logout() {
        setSwitcheo("professional")
        await fetch('http://localhost:3001/user/logout',{
            method: 'POST'
        })      
            // console.log('logout responseee', response)
            
            localStorage.clear()            
            setGlobalUser(null)
            setLocalUser(null)
            navigate('/')
    }

    return (
        <div className={s.navbar}>
            <ClientSpecificNeed/>
            <div className={s.navbar_logo_serch}>
                <div className={s.container__logo}>
                    <img src={logo} alt="Logo" />
                </div>
                <Search />
            </div>

            <div className={s.container__elements}>
                <div className={s.container__navigate}>

                    <NavLink to='/' className={s['container__inicio--btn']}   >Inicio</NavLink>
                    <NavLink to='/nosotros' className={s['container__inicio--btn']}>Sobre Nosotros</NavLink>

                    {/* CREAR PUBLICACIÓN */}
                    <div 
                        className={login === '' ? s.hide:s.show__presentation}
                        onClick={showModalFormCLient}
                        style={{cursor:"pointer"}}
                    >
                        <CgOptions />
                        <span>Crear publicacion</span>
                    </div>
                    {/* CARRITO */}

                    <NavLink className={ s.container__elements_cart } to='/Cart'>
                        <div className={s.container__elements_cart_logoCart }>
                            <BsCart2 size="30px"></BsCart2>
                        </div>
                        <div className={s.container__elements_cart_notification }>
                            <span>{cart.length}</span>
                        </div>
                    </NavLink>

                </div>
            </div>
            <div className={s.session_container}>
                    {login ?


                        <>
                            <div className={s.session}>
                                {/* <NavLink to={`/clients/${stateTotalRedux.globalUserGlobalStorage.id}`}>
                                    <MdAccountCircle className={s.iconLogin} />
                                    <span className={s.session_name}>{login?.first_name + ' '} </span>
                                </NavLink> */}

                                {login && !login.professional ?

        // --------Opciones Perfil cliente------------------------------- //

                                    <>
                                    <NavLink to={`/clients/${stateTotalRedux.globalUserGlobalStorage.id}`}>
                                    <div className={s.container_info}>
                                        {stateTotalRedux.globalUserGlobalStorage.photo ?
                                        <img 
                                            className={ s.container_info_photo }
                                            src={ stateTotalRedux.globalUserGlobalStorage.photo } 
                                            alt= "Foto de perfil" 
                                            />
                                        :
                                            <MdAccountCircle className={s.iconLoginn} />
                                        } 
                                            <span className={s.session_name}>
                                                {`  ${login?.first_name}  `}
                                            </span>
                                        </div>
                                    </NavLink>

                                    <div className='dropdown'>
                                        <button
                                            className="btn btn-secondary dropdown-toggle"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            type="button"
                                            aria-expanded="false">
                                        </button>
                                        
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton1"
                                        >

                                            {/* <li>
                                                <span className={s.dropdown_item + " dropdown-item"} >
                                                    Perfil Cliente
                                                </span>
                                            </li> */}
                                            
                                            <NavLink to={`/clients/${login?.id}`}>
                                                <li>
                                                    <span className={s.dropdown_item + " dropdown-item"}>
                                                            Ver mi Perfil
                                                    </span>
                                                </li>
                                            </NavLink>

                                            <li>
                                                <NavLink to='editUser'>
                                                    <span className={s.dropdown_item + " dropdown-item"} >
                                                        Editar Perfil
                                                    </span>
                                                </NavLink>
                                            </li>
                                            
                                            <li>
                                                <NavLink to={"/service-history/" + login.id}>
                                                    <span className={s.dropdown_item + " dropdown-item"} >
                                                        Servicios Solicitados
                                                    </span>
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/cart">
                                                    <span className={s.dropdown_item + " dropdown-item"} 
                                                        >Carrito
                                                    </span>
                                                </NavLink>
                                            </li>
                                            
                                            <li>
                                                <NavLink to='editUser'>
                                                    <span 
                                                        className={s.dropdown_item + " dropdown-item"} 
                                                        >
                                                        Registrate como profesional
                                                        </span>
                                                </NavLink>
                                            </li>
                                            
                                            <li>
                                                <span
                                                    className={s.dropdown_item + " dropdown-item"}
                                                    onClick={logout}
                                                    >
                                                    Cerrar sesión</span>
                                            </li>
                                        </ul>
                                    </div>
                                    </>
                                    :
    // -----------Opciones Perfil Tecnico---------------------------------
                                    <>
                                    <NavLink to={`/professional/${stateTotalRedux.globalUserGlobalStorage.id}`}>

                                        <div className={s.container_info}>
                                        {stateTotalRedux.globalUserGlobalStorage.photo ?
                                        <img 
                                            className={ s.container_info_photo }
                                            src={ stateTotalRedux.globalUserGlobalStorage.photo } 
                                            alt= "Foto de perfil" 
                                            />
                                        :
                                            <MdAccountCircle className={s.iconLoginn} />
                                        } 
                                            <span className={s.session_name}>
                                                {`  ${login?.first_name}  `}
                                            </span>
                                        </div>
                                    </NavLink>
                                    <div className='dropdown'>
                                        <button
                                            className="btn btn-secondary dropdown-toggle"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            type="button"
                                            aria-expanded="false"
                                        >
                                        </button>

                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
                                            
                                            <li>
                                                <NavLink to={`/professional/${stateTotalRedux.globalUserGlobalStorage.id}`}>
                                                    <span className={s.dropdown_item + " dropdown-item"} >
                                                        Ver Perfil
                                                    </span>
                                                </NavLink>
                                            </li>
                                            
                                            <li>
                                                <NavLink to='editUser'>
                                                    <span 
                                                        className={s.dropdown_item + " dropdown-item"} 
                                                    >
                                                        Editar Perfil
                                                    </span>
                                                </NavLink>
                                            </li>
                                            
                                            <li>
                                                <NavLink to='ProfessionalServiceOffer' >
                                                    <span 
                                                        className={s.dropdown_item + " dropdown-item"} 
                                                    >
                                                        Agregá tu Servicio Profesional
                                                    </span>
                                                </NavLink>
                                            </li>
                                            
                                            <li>
                                                <NavLink to="/cart">
                                                    <span 
                                                        className={s.dropdown_item + " dropdown-item"} 
                                                    >
                                                        Carrito
                                                    </span>
                                                </NavLink>
                                            </li>

                                            <li>
                                                <NavLink to={"/service-history/" + login.id}>
                                                    <span 
                                                        className={s.dropdown_item + " dropdown-item"}
                                                    >
                                                        Historial de Trabajos y Servicios
                                                    </span>
                                                </NavLink>
                                            </li>
                                            
                                            <li>
                                                <span 
                                                    className={s.dropdown_item + " dropdown-item"} 
                                                    onClick={logout}
                                                >
                                                    Cerrar sesion
                                                </span>
                                            </li>

                                        </ul>
                                    </div>
                                    </>
                                }
                            </div>
                        </>
                        : 
                        <></>
                    }
                </div>
            
        </div>
    )
};