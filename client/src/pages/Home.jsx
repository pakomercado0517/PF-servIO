import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import s from './styles/Home.module.css'
import NavBar from '../components/NavBar';
import Landing from '../components/Landing';
import {CgOptions} from 'react-icons/cg'
// import {IoEyeSharp} from 'react-icons/io5'
import CardProfessional from '../components/CardProtessional.jsx'
import { getAllProfessionals, orderProfessionals} from '../redux/actions';
import img from '../img/ivana-cajina-_7LbC5J-jw4-unsplash.jpg'
import Pagination from "../components/Pagination";

export default function Home(){

    const dispatch = useDispatch();
    const professionals = useSelector(state => state.professionals);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(16);
    const [loginState, setLoginState] = useState("");

    useEffect(() => {
        const login = localStorage.getItem("user")
        console.log("login: ", JSON.parse(login))
        setLoginState(JSON.parse(login))
    }, [])

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = professionals?.slice(indexOfFirstPost, indexOfLastPost);
  
    const paginate = pageNumber => {
      setCurrentPage(pageNumber);
    };
    
    const [input, setInput] = useState({
        order: ''
    })

    function handleOrder(e) {setInput({...input, order:e.target.id})}

    useEffect(()=>{

        if (input.order) {
            dispatch(orderProfessionals(input.order))
        }else{
            dispatch(getAllProfessionals())
        }
        
    },[dispatch, input.order])

    // console.log(input.order);
    return (
        <div>
            <NavBar/>
            <div className={s.container__filter}>
                {/* <div className={s.show__presentation}>
                    <IoEyeSharp/>
                    <span>Ocultar</span>
                </div>
                <div>
                    <CgOptions/>
                    <span>Crear publicacion</span>
                </div> */}
                <div className='dropdown'>
                    <button class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" type="button" aria-expanded="false" ><CgOptions/> Filtrar</button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
                        <li><span class="dropdown-item" id='' onClick={handleOrder}>Default</span></li>
                        <li><span class="dropdown-item" id='A-Z' onClick={handleOrder}>A-Z</span></li>
                        <li><span class="dropdown-item" id='Z-A' onClick={handleOrder}>Z-A</span></li>
                    </ul>
                </div>
            </div>
            <Landing/>
            {/* DIV RENDERIZA LAS CARDS DEL PROFESIONAL */}
            <Pagination
                paginate={paginate}
                postsPerPage={postsPerPage}
                totalPosts={professionals?.length}
            />
            <div className={s.professionalGrid}>
                {
                    currentPosts?.length > 0 ? currentPosts.map((professional) => (
                        <CardProfessional
                            idTech={professional.id} 
                            avatarTech={professional.photo} 
                            titleTech={professional.first_name + ' ' + professional.last_name}
                            //* PENDIENTE DATA DEL WORKTECH 
                            workTech={'Arquitecto'}
                            locationTech={professional.state + ', ' + professional.city}
                            //* PENDIENTE DATA DEL CALIFICATION
                            calificationTech={'calification: 5/5'}/>
                    )) : <h1>No hay mas resultados</h1>
                }
            </div>
            {/* DIV MUESTRA LOS TESTIMONIOS (FEEBACK DE LOS USUARIOS) */}
            <div className={s.feedback}>
                <span className={s.titleFeed}>Lo que dicen nuestros usuarios</span>
                <p className={s.subtitleFeed}>
                    feedback de clientes y profesinales que respaldan nuestro servicio
                    y garantisamos una buena experiencia, en conjunto con intuitividad 
                    de la intefaz 
                </p>
                <div className={s.cardsFeed}>
                    <div>
                        <div>
                            <img src={img} alt="" className={s.imgFeed}/>
                            <div>
                                <span>Marcos Ford</span>
                                <span>Cliente</span>
                                <span>Rating</span>
                            </div>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt illo, ducimus magnam natus eum assumenda aliquam sint, dolores quos, placeat quae sit nihil minima molestiae excepturi maiores alias voluptatibus nesciunt. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta placeat fugit veritatis, perferendis velit quasi deserunt, repellat laborum odio, impedit non cum molestiae. Impedit maxime a repellendus, eos nesciunt aliquam!
                        </p>
                    </div>
                    <div>
                        <div>
                            <img src={img} alt="" className={s.imgFeed}/>
                            <div>
                                <span>Marcos Ford</span>
                                <span>Cliente</span>
                                <span>Rating</span>
                            </div>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt illo, ducimus magnam natus eum assumenda aliquam sint, dolores quos, placeat quae sit nihil minima molestiae excepturi maiores alias voluptatibus nesciunt. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta placeat fugit veritatis, perferendis velit quasi deserunt, repellat laborum odio, impedit non cum molestiae. Impedit maxime a repellendus, eos nesciunt aliquam!
                        </p>
                    </div>
                </div>
            </div>
        </div>    
    )
}
