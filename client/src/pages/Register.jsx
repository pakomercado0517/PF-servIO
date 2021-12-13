import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { newUser, filterProfessions } from '../redux/actions/index'
import {useNavigate } from "react-router-dom";
import s from './styles/Register.module.css'

export default function Crear() {

    const dispatch = useDispatch()
    const [validaChek, setvalidaChek] = useState(false)

    const history = useNavigate() //redirige a '/....'

    const oficio = useSelector((state) => state.professionsName)

    const [details, setDetails] = useState({
        firstName:'',
        lastName: '',
        email: '',
        dni:'',
        password:'',
        repeatPassword:'',
        // professional:'',
        cliente:'',
        city:'',
        // profession:''
        
    })

    const[errors, setErrors] = useState({});

    function validate(valores){
        let errores = {};
    
        //validacion nombre
        if(!valores.firstName) {
            errores.firstName = 'Por favor ingresa tu nombre'
        }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.firstName)){
            errores.firstName= 'El nombre solo puede contener letras y espacios'
        }
    
        //validar apellido 
        if(!valores.lastName) {
            errores.lastName = 'Por favor ingresa tu apellido'
        }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.lastName)){
            errores.lastName= 'El apellido solo puede contener letras y espacios'
        }
    
        //validacion correo
        if(!valores.email) {
            errores.email = 'Por favor ingresa tu correo electronico'
        }else if(! /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)){
            errores.email= 'El correo solo puede contener letras,numeros, puntos, guiones y guion bajo'
        }
    
        //validacion DNI  /^[0-9]+$/  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
        if(!valores.dni) {
            errores.dni = 'Por favor ingresa un DNI'
        }else if(!/^[0-9]+$/.test(valores.dni)){
            errores.dni= 'El DNI solo puede contener numeros'
        }
    
        //validacion password
        if(!valores.password) {
            errores.password = 'Por favor ingresa un password'
        }else if(! /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(valores.password)){
            errores.password= 'El password debe tener mínimo ocho caracteres, al menos una letra y un número'
        }
    
        //validacion Repeat-password
        if(!(valores.password === valores.repeatPassword)) {
            errores.repeatPassword = 'Por favor ingresa nuevamente el password'
        }else if(! /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(valores.repeatPassword)){
            errores.repeatPassword= 'El password debe tener mínimo ocho caracteres, al menos una letra y un número'
        }
    
        //profesional
        if (!valores.professional) {
            setvalidaChek(false)
            // console.log(validaChek)
            // console.log(valores.profecional)
    
        }else{
            setvalidaChek(true)
            // console.log(valores.profecional)
        }
    
        return errores;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const err = validate(details)

        setErrors(err)
        const post = await axios.post(`http://localhost:3001/user`, details)
        console.log('post',post)
        console.log('post',post.data)
    
            console.log(Object.keys(err).length === 0)
            if(Object.keys(err).length === 0){
                
                // dispatch(newUser(details))

                Swal.fire({
                    icon: 'success',
                    title: 'User Created!',
                    showConfirmButton: false,
                    timer: 2500
                })
                
                setDetails({
                    firstName:'',
                    lastName: '',
                    email: '',
                    dni:'',
                    password:'',
                    repeatPassword:'',
                    professional:'',
                    cliente:'',
                    city:'',
                    profession:[],
                })
                history('/')
            }
        
    }

    function handleChange(e){
        setDetails({
            ...details,
            [e.target.name] : e.target.value
        })
        setErrors( validate (details))
    }

    // function handleCheck(e){
    //     if(e.target.checked){
    //         setDetails({
    //             ...details,
    //             temporada: [...details.temporada, e.target.value]
    //         })
    //     }else{
    //         setDetails({
    //             ...details,
    //             temporada: details.temporada.filter(t => t !== e.target.value )
    //         })
    //     }
    // }    

    function handleSelect(e){
        
        if(e.target.checked){
            setDetails({
                ...details,
                countries:[...details.countries, e.target.value] 
            })
        }else{
            setDetails({
                ...details,
                countries: details.countries.filter(t => t !== e.target.value )
            })
        }
    }

    return (
        <div >
            
            <div className={s.titulo}>
                <h2>Crea tu Usuario</h2>
            </div>
            <div  className={s.form}>
                <form onSubmit= {(e) => handleSubmit(e)}>
                        <div className={s.names}>
                            <label>Nombre:</label>
                            <input 
                                type= 'text'
                                value= {details.firstName}
                                name= 'firstName'
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.name && (
                                <p className='error'>{errors.firstName}</p>
                            )}
                            
                        </div>
                        <div className={s.names}>
                            <label>Apellido:</label>
                            <input 
                                type= 'text'
                                value= {details.lastName}
                                name= 'lastName'
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.name && (
                                <p className='error'>{errors.lastName}</p>
                            )}
                            
                        </div>
                        <div className={s.names}>
                            <label>e-mail:</label>
                            <input 
                                type= 'email'
                                value= {details.email}
                                name= 'email'
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.name && (
                                <p className='error'>{errors.email}</p>
                            )}
                            
                        </div>
                        <div className={s.names}>
                            <label>DNI:</label>
                            <input 
                                type= 'text'
                                value= {details.dni}
                                name= 'dni'
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.name && (
                                <p className='error'>{errors.dni}</p>
                            )}
                            
                        </div>
                      
                        <div className={s.names}>
                            <label>Password:</label>
                            <input 
                                type= 'password'
                                value= {details.password}
                                name= 'password'
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.name && (
                                <p className='error'>{errors.repeatPassword}</p>
                            )}
                            
                        </div>
                       
                        <div className={s.names}>
                            <label>repeat password:</label>
                            <input 
                                type= 'password'
                                value= {details.repeatPassword}
                                name= 'repeatPassword'
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.repeatPassword && (
                                <p className='error'>{errors.repeatPassword}</p>
                            )}
                            
                        </div>

                        
                            <p>¿Buscas ofrecer o contratar un servicio?</p>
                            <p>Registrate como profesional o cliente !</p>
                        
                        <div className={s.names}>
                            <label>Profesional:</label>
                            <input
                                type='checkbox'
                                name='professional'
                                value='professional'
                                // // onChange={(e) => handleCheck(e)}
                                />

                            <label>Cliente:</label>
                                <input
                                    type='checkbox'
                                    name='cliente'
                                    value='cliente'
                                    // // onChange={(e) => handleCheck(e)}
                                    />

                                {/* {errors.cliente && (
                                    <p>{errors.temporada}</p>
                                )}  */}
                        </div>
                        <div className={s.names}>
                            {/* <label>Seleccona tu Oficio:</label>
                            
                            <opcion className={s.check} >
                                {oficio.map((c,key) => (
                                    <opcion className={s.check__pais} key={key} onChange= {(e) => {handleSelect(e); console.log(e.target.value)}} >
                                        <input type="checkbox" value={c.id} name='oficio' />
                                            {c.name} 
                                    </opcion>
                                ))}
                            </opcion> */}
                            {errors.countries && (
                                <p className='error'>{errors.countries}</p>
                            )}
                        </div>

                        <button type='submit' className={s.btnActivity}>Agregar actividad</button>
                    </form>
                </div>
        </div>
    )
}
