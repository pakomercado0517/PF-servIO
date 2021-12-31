import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import s from './styles/Home.module.css'
import {Filter} from '../components/Filter'
// import NavBar from '../components/NavBar';
import Landing from '../components/Landing';
import {CgOptions} from 'react-icons/cg'
import {IoEyeSharp} from 'react-icons/io5'
import CardProfessional from '../components/CardProtessional.jsx'
import { getAllProfessionals, orderProfessionals, getAllNeeds } from '../redux/actions';
// import img from '../img/ivana-cajina-_7LbC5J-jw4-unsplash.jpg'
import Pagination from "../components/Pagination";
import TestimoniosHome from '../components/TestimoniosHome';
import { ClientSpecificNeed } from '../components/ClientSpecificNeed';
import CardClientNeed from '../components/CardClientNeed';
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useGlobalStorage } from '../hooks/useGlobalStorage';
import { NavLink, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import img from '../img/undraw_welcome_cats_thqn.svg';

export default function Home(){
    
    const dispatch = useDispatch();
    const professionals = useSelector(state => state.filter);
    const {params} = useParams()
    console.log("PARAMS: --->",params)
    const clientNeeds = useSelector(state => state.clientNeeds);
    const switcheo = useSelector(state => state.switch)
    const stateRedux = useSelector(state => state)
    const [switcheo2] = useGlobalStorage("switcheo", null)
//     const [state, setstate] = useState("")
    // const login = !localStorage.getItem ? null: JSON.parse(localStorage.getItem("user"))

    const [login] = useLocalStorage("user", null)
    // const [usuario, setLogin] = useLocalStorage("usuario", "Imanol")
    
    let [postsPerPage, setPostsPerPage] = useState(16);
    let [currentPage, setCurrentPage] = useState(1);
    let indexOfLastPost = currentPage * postsPerPage;
    let indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentPosts = switcheo2 === "professional" ? professionals?.slice(indexOfFirstPost, indexOfLastPost) : clientNeeds?.slice(indexOfFirstPost, indexOfLastPost)
    const [currentPosts2, setCurrentPosts2] = useLocalStorage("currentPosts", currentPosts)
    const [globalUser, setGlobalUser] = useGlobalStorage("globalUser", "");
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const [input, setInput] = useState({
        order: ''
    })

    function handleOrder(e) {setInput({...input, order:e.target.id})}

    // VISIBILIDAD DEL LANDING DE PRESENTACIÓN //
    const [landing, setLanding] = useLocalStorage("landing", "visible")

    //dependiendo si son cliente o profecional (welcome)
    const [details, setDetails] = useState({
        professional: globalUser.professional,
        
    })

    function landingView(){
        if (landing==="visible") setLanding("NoVisible")
        if(landing==="NoVisible") setLanding("visible")
    }

    useEffect(()=>{
        if (input.order) {
            dispatch(orderProfessionals(input.order))
        }
        else{
            if(switcheo2 === "professional") {  
                dispatch(getAllProfessionals())
            }else if (switcheo2 === "user"){
                dispatch(getAllNeeds())
            }
        }

    },[dispatch, input.order, switcheo2])

    useEffect(() => {
        setCurrentPosts2((switcheo2 === "professional") ? professionals?.slice(indexOfFirstPost, indexOfLastPost) : clientNeeds?.slice(indexOfFirstPost, indexOfLastPost))
    }, [stateRedux])

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
                <Filter />
                {/* FILTROS */}
                <div className='dropdown'>
                    <button class="border-0 btn btn-primary dropdown-toggle bg-info" id="dropdownMenuButton1" data-bs-toggle="dropdown" type="button" aria-expanded="false" ><CgOptions/>Ordenado</button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
                        <li><span class="dropdown-item" id='' onClick={handleOrder}>Default</span></li>
                        <li><span class="dropdown-item" id='A-Z' onClick={handleOrder}>A-Z</span></li>
                        <li><span class="dropdown-item" id='Z-A' onClick={handleOrder}>Z-A</span></li>
                    </ul>
                </div>
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

            { switcheo2 === "professional" ? 
              <div className={s.professionalGrid}>
                  {
                      currentPosts2?.length > 0 ? currentPosts.map((professional) => (
                          <CardProfessional
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
              <div>
                    {
                        currentPosts2?.length > 0 ? currentPosts?.map((user)=>(
                            <NavLink className={s.card_client_need} to={"/client/need/"+user.id}>
                                <CardClientNeed key={user.id}
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
