import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import { Link } from 'react-router-dom';
import s from './styles/Home.module.css'
import NavBar from '../components/NavBar';
import Landing from '../components/Landing';
import {CgOptions} from 'react-icons/cg'
// import {IoEyeSharp} from 'react-icons/io5'
import { getAllProfessionals} from '../redux/actions';

export default function Home(){

    const dispatch = useDispatch();
    const professionals = useSelector(state => state.professionals);

    useEffect(()=>{

        function getProfesionals(){
            dispatch(getAllProfessionals())
        }
        getProfesionals()
    },[dispatch])

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
                <div className={s.filter}>
                    <CgOptions/>
                    <span>Filtrar</span>
                </div>
            </div>
            <Landing/>
        </div>    
    )
}
