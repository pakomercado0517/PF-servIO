import React, {useEffect, useState} from 'react';
import s from './styles/EditUser.module.css';
import {useGlobalStorage} from '../hooks/useGlobalStorage';
import { useDispatch, useSelector } from "react-redux";
import { filterProfessions } from '../redux/actions';
import axios from 'axios';
import Swal from 'sweetalert2';
import {useNavigate } from "react-router-dom";

export default function EditCliente() {

    const [globalUser, setGlobalUser] = useGlobalStorage("globalUser", "");

    const[errors, setErrors] = useState({});
    const [profession, setProfession] = useState([])
    const oficio = useSelector((state) => state.professionsName)

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [details, setDetails] = useState({
        firstName: globalUser.first_name,
        lastName: globalUser.last_name,
        email: globalUser.email,
        professional: globalUser.professional,
        professionalCase:false,
        profession:profession.toString(),
    })

    console.log('profesional: ', globalUser.professional)
    useEffect(() => {
        dispatch(filterProfessions())      
    },[])
    
    
    useEffect(() => {
        let errores = {}
        //validacion nombre
        if(!details.firstName) {
            errores.firstName = 'Por favor ingresa tu nombre'
        }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(details.firstName)){
            errores.firstName= 'El nombre solo puede contener letras y espacios'
        } else {
            errores.firstName= false;
        }
        
        //validar apellido
        if(!details.lastName) {
            errores.lastName = 'Por favor ingresa tu apellido'
        }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(details.lastName)){
            errores.lastName= 'El apellido solo puede contener letras y espacios'
        } else {
            errores.lastName = false;
        }
        
        //validacion correo
        if(!details.email) {
            errores.email = 'Por favor ingresa tu correo electronico'
        }else if(! /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(details.email)){
            errores.email= 'El correo solo puede contener letras,numeros, puntos, guiones y guion bajo'
        } else {
            errores.email = false;
        }
        
        //validacion DNI  /^[0-9]+$/  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
        if(!details.dni) {
            errores.dni = 'Por favor ingresa un DNI'
        }else if(!/^[0-9]+$/.test(details.dni)){
            errores.dni = 'El DNI solo puede contener numeros'
        } else {
            errores.dni = false;
        }
        
        //validacion password
        if(!details.password) {
            errores.password = 'Por favor ingresa un password'
        }else if(! /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(details.password)){
            errores.password= 'El password debe tener mínimo ocho caracteres, al menos una letra y un número'
        } else {
            errores.password = false;
        }
        
        //validacion Repeat-password
        if(details.password === details.repeatPassword) {
            errores.repeatPassword = false;
        } else {
            errores.repeatPassword = 'Las passwords no coinciden'
        }
        setErrors({
            ...errors,
            ...errores
        })
    }, [details.dni, details.email, details.firstName, details.lastName, details.password, details.repeatPassword])

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            let prof= profession.toString()
            let newData= {
                firstName:details.firstName,
                lastName: details.lastName,
                email: details.email,
                dni:details.dni,
                password:details.password,
                professional: details.professional,
                profession:prof,

            }
            await axios.put(`http://localhost:3001/user/updateUser/101`, newData)
            const obj = {
                ...globalUser,
                first_name:details.firstName,
                last_name: details.lastName,
                email: details.email,
                dni:details.dni,
                password:details.password,
                professional: details.professional,
            }
            setGlobalUser(obj)
            Swal.fire({
                title: 'Los cambios fueron aceptados',
                text: 'En la brevedad los cambios se ejecutaran',
                icon: 'success',
                confirmButtonText: 'Aceptar'

            });
            navigate('/')
        }catch(e){
            console.log(e)
        }
    }

    function handleChange(e){
        setDetails({
            ...details,
            [e.target.name] : e.target.value
            
        })
        
    }
    useEffect(() => {
        
    }, [details])

    function handleCheck(e){
        console.log(details.professionalCase)
        if (e.target.id === 'checkboxClient' && details.professionalCase) {
            const obj = {
                ...details,
                professionalCase:false,
                professional:"false",
                profession: []
            }
            setDetails(obj)
        } else {
            const obj = {
                ...details,
                professionalCase:true,
                professional:"true"
            }
            setDetails(obj)
        }
    } 

    function onClick(e){
        if(profession.indexOf(details.profession) === -1 && details.profession !== ''){
        setProfession([...profession, details.profession])
        }
    }
    function changeCountry(event){
        setDetails({...details, profession: event.target.value})
    }  
    function onClose(e){
        let index = profession.indexOf(e.target.value)
        setProfession([...profession.slice(0, index).concat(...profession.slice(index+1, profession.length))])
        setDetails({
            ...details,
            profession: details.profession + e.target.id + ","
        })
    }
    
    return (
        <div className={s.container}>
            <div className={ s.container_img}>
                <p>
                    Sé parte de nuestra plataforma, registrate ya y disfruta!
                </p>
            </div>
            <div className={ s.container_edilt}>
                <div className={s.container_edilt_titulo}>
                    <h2>Edita tu perfil</h2>
                </div>
            <form className={s.container_edilt_form} onSubmit={(e) => handleSubmit(e)}>
                <div className={s.container_edilt_form_input}>
                    <label>Nombre: </label>
                    <input
                        type="text"  
                        name="firstName"
                        value={details.firstName}
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.firstName && (
                        <p>{errors.firstName}</p>
                    )}
                </div>
                <div className={s.container_edilt_form_input}>
                    <label >Apellido: </label>
                    <input 
                        type="text"  
                        name="lastName"
                        value={globalUser.last_name}
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.name && (
                        <p >{errors.lastName}</p>
                    )}
                </div>
                <div className={s.container_edilt_form_input}>
                    <label >Correo: </label>
                    <input 
                        type='email' 
                        name='email'
                        value={globalUser.email}
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.email && (
                        <p>{errors.email}</p>
                    )}
                </div>
                <div className={s.container_edilt_form_input}>
                    <label>DNI:</label>
                    <input 
                        type='text'
                        name='dni'
                        readOnly
                        />
                </div>
                <div className={s.container_edilt_form_input}>
                <label>Password:</label>
                    <input 
                        type='password'
                        name='password'
                        // onChange={(e) => handleChange(e)}
                    />
                    {errors.password && (
                        <p>{errors.password}</p>
                    )}
                </div>
                <div className={s.container_edilt_form_input}>
                    <label>Repeat Password:</label>
                    <input 
                        type='password'
                        name='repeatPassword'
                        // onChange={(e) => handleChange(e)}
                    />
                    {errors.repeatPassword && (
                        <p>{errors.repeatPassword}</p>
                    )}
                </div>
                <div className={s.container_edilt_form_input}>
                    <label >Teléfono: </label>
                    <input 
                        type="text"  
                        name="phone"
                        // onChange={(e) => handleChange(e)}
                    />
                    {/* {errors.photo && (
                        <p>{errors.photo}</p>
                    )} */}
                </div>

                <div className={s.container_edilt_form_input_img} >
                    <label htmlFor="imageFile">Selecciona alguna imágen (png):</label><br/>
                    <div className={s.div_file}>
                        <p className={s.text}>Elegir archivo</p>
                        <input className={s.btn_enviar} 
                            type="file"  
                            accept=".png" 
                            multiple
                            // onChange={(e) => handleChange(e)}
                        /> 
                    </div>
                </div>

                {
                    globalUser.professional ?
                    
////////----------------------- edit Profesional -------------------- 

                    <div className={s.subDiv}>
                        <label htmlFor="countries">Seleccona tu Oficio:</label>
                        <div>
                            <select 
                            className={s.inputClass3}
                            onChange={changeCountry}
                            value={details.profession}
                            >
                            <option >{details.profession}</option>
                            {oficio.map((e, index) => {
                                return (<option key={ "options" + index}>{e}</option>)
                            })
                            }
                            </select>
                            <input 
                            onClick={onClick} 
                            className={s.btnAdd} 
                            type="button" 
                            value="+" 
                            />
                        </div>
                        <div className={s.countriesDiv}>

                            {
                            profession.map(e => {
                                return(
                                <input type="button" value={e} className={s.countryBtn}  onClick={onClose} />
                                )
                                
                                })}
                        </div>
                        <div>
                            <label>Dar de baja como profesional:<input
                            type='checkbox'
                            id="checkboxClient"
                            defaultChecked={details.professionalCase}
                            value='cliente'
                            onChange={(e) => handleCheck(e)}
                        /></label>    
                        </div>
                    </div>

                    :

//////--------------------- edit de cliente -------------------------------

                    <div className={s.container_edilt_form_pofesional}>
                        <label>Dar de alta como profesional:<input
                                type='checkbox'
                                value={globalUser.professional}
                                checked={details.professionalCase}
                                onChange={(e) => handleCheck(e)}
                        /></label>
                        <div className={s.subDiv}>
                        {
                            details.professionalCase ? (
                                <>
                                    <label htmlFor="countries">Seleccona tu Oficio:</label>
                                    <div>
                                        <select 
                                        className={s.inputClass3}
                                        onChange={changeCountry}
                                        value={details.profession}
                                        >
                                        <option >Elige tu profesión</option>
                                        {oficio.map(e => {
                                            return (<option >{e}</option>)
                                        })
                                        }
                                        </select>
                                        <input 
                                        onClick={onClick} 
                                        className={s.btnAdd} 
                                        type="button" 
                                        value="+" 
                                        />
                                    </div>
                                    <div className={s.countriesDiv}>

                                        {
                                        profession.map(e => {
                                            return(
                                            <input type="button" value={e} className={s.countryBtn}  onClick={onClose} />
                                            )
                                            
                                            })}
                                    </div>
                                </>
                            ) : (<></>)
                        }
                        </div>
                        
                    
                </div>

                }

                <div >
                    <p>Recuerda que los campos que no edites no cambiarán, lo unico que no podrás editar es el DNI.</p>  
                </div>
                
                <button type='submit'id='buttonSubmit' className={"btn btn-success " + s.buttonSubmit} >Cambiar Perfil</button>
            </form>
            </div>
        </div>
    )
}