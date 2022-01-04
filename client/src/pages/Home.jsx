import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import s from './styles/Home.module.css'
import {Filter} from '../components/Filter'
import Landing from '../components/Landing';
import {CgOptions} from 'react-icons/cg'
import {IoEyeSharp} from 'react-icons/io5'
import CardProfessional from '../components/CardProtessional.jsx'
import { orderProfessionals, filterProfessionals,orderClientNeeds } from '../redux/actions';
import Pagination from "../components/Pagination";
import TestimoniosHome from '../components/TestimoniosHome';
import { ClientSpecificNeed } from '../components/ClientSpecificNeed';
import CardClientNeed from '../components/CardClientNeed';
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useGlobalStorage } from '../hooks/useGlobalStorage';
import { NavLink } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Home(){
    const dispatch = useDispatch();
    const clientNeeds = useSelector(state => state.professionalsFilter);
    const professionals = useSelector(state => state.clientsFilter);

    const switcheo = useSelector(state => state.switch)
    const [switcheo2] = useGlobalStorage("switcheo", null)
    const [login] = useLocalStorage("user", null)
    let [postsPerPage,] = useState(16);
    let [currentPage, setCurrentPage] = useState(1);
    let indexOfLastPost = currentPage * postsPerPage;
    let indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentPosts = switcheo2 === "professional" ? professionals?.slice(indexOfFirstPost, indexOfLastPost) : clientNeeds.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const [input, setInput] = useState({
        order: ''
    })
    function handleOrder(e) {setInput({...input, order:e.target.id})}

    // VISIBILIDAD DEL LANDING DE PRESENTACIÓN //
    const [landing, setLanding] = useLocalStorage("landing", "visible")
    useEffect(() => {
      dispatch(orderProfessionals(''))
    },[])

    function landingView(){
        if (landing==="visible") setLanding("NoVisible")
        if(landing==="NoVisible") setLanding("visible")
    }
    // console.log(input.order )
    // console.log(input.order && switcheo2 === "user")
    useEffect(()=>{
        if (input.order && switcheo2 === 'professional') {
            dispatch(filterProfessionals(input.order, professionals))
        }
        else if(input.order && switcheo2 === "user"){
          console.log(2)
          dispatch(orderClientNeeds(input.order, clientNeeds))
        }
        // else{
        //     if(switcheo2 === "professional") {  
        //         dispatch(filterClients(input.order))
        //     }else if (switcheo2 === "user"){
        //         dispatch(filterClients(input.order))
        //     }
        // }

    },[dispatch, input.order, switcheo2])


    return (
        <div>
            <ClientSpecificNeed/>

            <div className={s.container__filter}>
                { login && login.message === "Logged"?  
                <>
                <div onClick={landingView} className={s.show__presentation}>
                    <IoEyeSharp/>
                    <span>Ocultar</span>
                </div>
                </>: <></>
                
                }
                
            </div>

        {/* {WELCOME CARD} */}
            {
                // globalUser.professional === false ? 
                // <div className={s.card_gat}>
                //     <div className={s.card_gat_text}>
                //         {/* <p>Aprobecha y volvete un prodecionañ en nuestra seccion "Volvese profecional"
                //             en la barra desplegable de un perdil
            //         </p> */}
            //         <p>
                //             Aprovechá y registrate como profesional en 
                //             nuestra seccion "Registrate como profesional"
                //             en la barra desplegable de tu perfil
                //         </p>
                //     </div>
                //     <div className={s.card_gat_img}>
                //         <img src={img}/>
                //     </div>
                
                // </div> : 
                // <></>
            }
            
            {/* COMPONENTE LANDING DE PRESENTACIÓN */}

            { landing==="visible" ? <Landing/>:<></>}

            {/* DIV RENDERIZA LAS CARDS DEL PROFESIONAL */}
                
                <Pagination
                    paginate={paginate}
                    postsPerPage={postsPerPage}
                    totalPosts={switcheo === true ? professionals?.length: clientNeeds?.length}
                />
            
            {/* FILTROS / ORDENADOS */}

            <div
                className="row justify-content-center align-items-center mt-2"
            >
            <div className='col-auto bg-info-center mx-auto'>
                <button 
                    className="border-1 mx-2 btn btn-primary dropdown-toggle bg-info" 
                    id="dropdownMenuButton1" 
                    data-bs-toggle="dropdown" 
                    type="button" 
                    aria-expanded="false" 
                >
                    <CgOptions/>Ordenado
                </button>
                
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
                    <li><span className="dropdown-item" id='' onClick={handleOrder}>Default</span></li>
                    <li><span className="dropdown-item" id='A-Z' onClick={handleOrder}>A-Z</span></li>
                    <li><span className="dropdown-item" id='Z-A' onClick={handleOrder}>Z-A</span></li>
                </ul>
            <Filter />
            </div>
            </div>

            { switcheo2 === "professional" ? 
            <div className={s.professionalGrid}>
                {
                    currentPosts?.length > 0 ? currentPosts.map((professional) => (
                        <CardProfessional
                            key={professional.id}
                            idTech={professional.id} 
                            avatarTech={professional.photo} 
                            titleTech={professional.first_name + ' ' + professional.last_name}
                            workTech={ professional.Professional?.Professions}
                            locationTech={professional.state + ', ' + professional.city}
                            //* PENDIENTE DATA DEL CALIFICATION
                            calificationTech={'calification: 5/5'}/>
                    )) : <h1>No hay mas resultados</h1>
                }

                  {/* CARDS DE SOLICITUDES DE CLIENTES */}

                </div> : 
                <div className={s.professionalGrid}>
                {
                    currentPosts?.length > 0 ? currentPosts?.map((user, index)=>(
                        <NavLink 
                            className={s.card_client_need} 
                            to={"/client/need/"+user.id}
                            key={index}
                        >
                            <CardClientNeed 
                            key={user.id + index}
                            name={ user.name }
                            description={ user.description }
                            date={ user.date }
                            userId={ user.userId }
                            location={ user.location }
                            />
                        </NavLink>
                        
                    )): <h1>No hay mas resultados</h1>
                }
            </div>
            }

            {/* DIV MUESTRA LOS TESTIMONIOS (FEEBACK DE LOS USUARIOS) */}
            { !(login && (login.message === "Logged")) ? <TestimoniosHome></TestimoniosHome>:<></>}
            
            <Footer/>
        </div>    
    )
}