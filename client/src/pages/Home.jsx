import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import s from './styles/Home.module.css'
// import NavBar from '../components/NavBar';
import Landing from '../components/Landing';
import {CgOptions} from 'react-icons/cg'
import {IoEyeSharp} from 'react-icons/io5'
import CardProfessional from '../components/CardProtessional.jsx'
import { getAllProfessionals, orderProfessionals, getAllCommonUsers } from '../redux/actions';
// import img from '../img/ivana-cajina-_7LbC5J-jw4-unsplash.jpg'
import Pagination from "../components/Pagination";
import TestimoniosHome from '../components/TestimoniosHome';
import { ClientSpecificNeed } from '../components/ClientSpecificNeed';

export default function Home(){
    
    const dispatch = useDispatch();
    const professionals = useSelector(state => state.professionals);
    // const usersCommon = useSelector(state => state.userCommon);
    const stateRedux = useSelector(state => state)
    const [state, setstate] = useState("")
    
    const login = !localStorage.getItem ? null: JSON.parse(localStorage.getItem("user"))
    
    let [postsPerPage, setPostsPerPage] = useState(16);
    let [currentPage, setCurrentPage] = useState(1);
    let indexOfLastPost = currentPage * postsPerPage;
    let indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentPosts = professionals?.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const [input, setInput] = useState({
        order: ''
    })

    function handleOrder(e) {setInput({...input, order:e.target.id})}

    function landingView(){
        console.log("si pasa")
        if(!window.localStorage.getItem("landing")) {
            console.log("Pasaa")
            window.localStorage.setItem("landing", "visible")
            setstate("visible")
        } else {
            window.localStorage.removeItem("landing")
            setstate("notVisible")
        }
        console.log(window.localStorage.getItem("landing"))
    }

    useEffect(() => {
    }, [state, professionals])

    console.log(professionals);

    useEffect(()=>{
        function ordercomponent() {
            if (input.order) {
                dispatch(orderProfessionals(input.order))
            }
            else{
                window.addEventListener('storage', ()=>{
                    if (!localStorage.getItem('mood', 'professionals')) {  
                        dispatch(getAllProfessionals())
                    }else if (localStorage.getItem('mood', 'user')){
                        dispatch(getAllCommonUsers())
                    }
                })
            }
        }
        ordercomponent()
        
    },[dispatch, input.order])

    useEffect(() => {
        currentPosts = professionals?.slice(indexOfFirstPost, indexOfLastPost)
    }, [stateRedux])


    return (
        <div>
            <ClientSpecificNeed/>
            {/* <NavBar/> */}
                {/* <div onClick={showModalFormCLient} className={s.show__presentation}>
                    <CgOptions/>
                    <span>Crear publicacion</span>
                </div> */}
            <div className={s.container__filter}>
                { login && login.message === "Logged"?  
                <>
                <div onClick={landingView} className={s.show__presentation}>
                    <IoEyeSharp/>
                    <span>Ocultar</span>
                </div>
                </>: <></>
                
                }
                <div className='dropdown'>
                    <button class="border-0 btn btn-primary dropdown-toggle bg-info" id="dropdownMenuButton1" data-bs-toggle="dropdown" type="button" aria-expanded="false" ><CgOptions/>Ordenado</button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
                        <li><span class="dropdown-item" id='' onClick={handleOrder}>Default</span></li>
                        <li><span class="dropdown-item" id='A-Z' onClick={handleOrder}>A-Z</span></li>
                        <li><span class="dropdown-item" id='Z-A' onClick={handleOrder}>Z-A</span></li>
                    </ul>
                </div>
            </div>

            { !window.localStorage.getItem("landing") ? <Landing/>:<></>}

            {/* DIV RENDERIZA LAS CARDS DEL PROFESIONAL */}
                
                <Pagination
                paginate={paginate}
                postsPerPage={postsPerPage}
                totalPosts={professionals?.length}
                />
            
            {localStorage.mood === 'professionals' ? <div className={s.professionalGrid}>
                {
                    currentPosts?.length > 0 ? currentPosts.map((professional) => (
                        <CardProfessional
                            idTech={professional.id} 
                            avatarTech={professional.photo} 
                            titleTech={professional.first_name + ' ' + professional.last_name}
                            workTech={ professional.Professional?.Professions[0].name }
                            locationTech={professional.state + ', ' + professional.city}
                            //* PENDIENTE DATA DEL CALIFICATION
                            calificationTech={'calification: 5/5'}/>
                    )) : <h1>No hay mas resultados</h1>
                }
            </div> : 
                <div>
                    {
                        currentPosts?.length > 0 ? currentPosts.map((user)=>(
                           <div>
                               <h1></h1>
                           </div> 
                        )): <h1>No hay mas resultados</h1>
                    }
                </div>
            }
            {/* DIV MUESTRA LOS TESTIMONIOS (FEEBACK DE LOS USUARIOS) */}
            { !(login && (login.message === "Logged")) ? <TestimoniosHome></TestimoniosHome>:<></>}
        </div>    
    )
}
