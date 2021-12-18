import React, {useEffect, useState} from 'react';
import s from './styles/EditCliente.module.css';
import {useGlobalStorage} from '../hooks/useGlobalStorage';
import { useDispatch, useSelector } from "react-redux";
import { getByUserId, filterProfessions } from '../redux/actions'

export default function EditCliente() {

    const [globalUser, setGlobalUser] = useGlobalStorage("globalUser", "");
    const login = !localStorage.getItem ? null: JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch();
    const[errors, setErrors] = useState({});

    const [details, setDetails] = useState({
        firstName: globalUser.first_name,
        lastName: globalUser.last_name,
        email: globalUser.email,
    })

    // console.log(globalUser.first_name, globalUser.last_name, globalUser.email  )
    useEffect(() => {
        dispatch(getByUserId(login?.id))        
    },[])
    
    function validate(valores){
        let errores = {};
        
        //validacion nombre
        console.log('error: ',valores)
        if(!valores.firstName) {
            errores.firstName = 'Por favor ingresa tu nombre'
        }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.firstName)){
            errores.firstName= 'El nombre solo puede contener letras y espacios'
        }

        return errores;
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const err = validate(details)

        setErrors(err)
        
        
        console.log('enviar')
    }

    function handleChange(e){
        setDetails({
            ...details,
            [e.target.name] : e.target.value
            
        })
        setErrors(
            validate(errors)
        )
        // console.log('detalle: ',details)
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
                    <label >Nombre: </label>
                    <input 
                        type="text"  
                        name="firstName"
                        value={details.firstName}
                        onChange={(e) => handleChange(e)}
                    />
                    {!errors.name && (
                        <p>{errors.firstName}</p>
                    )}
                </div>
                <div className={s.container_edilt_form_input}>
                    <label >Apellido: </label>
                    <input 
                        type="text"  
                        name="lastName"
                        // value={globalUser.last_name}
                        // onChange={(e) => handleChange(e)}
                    />
                    {/* {!errors.name && (
                        <p >{errors.lastName}</p>
                    )} */}
                </div>
                <div className={s.container_edilt_form_input}>
                    <label >Correo: </label>
                    <input 
                        type='email' 
                        name='email'
                        value={globalUser.email}
                        // onChange={(e) => handleChange(e)}
                    />
                    {/* {errors.email && (
                        <p>{errors.email}</p>
                    )} */}
                </div>
                <div className={s.container_edilt_form_input}>
                    <label>DNI:</label>
                    <input 
                        type='text'
                        name='dni'
                        readonly
                        />
                </div>
                <div className={s.container_edilt_form_input}>
                <label>Password:</label>
                    <input 
                        type='password'
                        name='password'
                        // onChange={(e) => handleChange(e)}
                    />
                    {/* {errors.password && (
                        <p>{errors.password}</p>
                    )} */}
                </div>
                <div className={s.container_edilt_form_input}>
                    <label>Repeat Password:</label>
                    <input 
                        type='password'
                        name='repeatPassword'
                        // onChange={(e) => handleChange(e)}
                    />
                    {/* {errors.repeatPassword && (
                        <p>{errors.repeatPassword}</p>
                    )} */}
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

                <div >
                    <label for="imageFile">Selecciona alguna imágen (png):</label><br/>
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
                    <div >
                        <p>Reguerdas que los campos que no edites nada no se  van a cambian, lo unico que no se 
                        va a poder editar es el DNI.</p>  
                    </div>
                
                <button type='submit' className={"btn btn-success " + s.buttonSubmit} >Cambiar Perfil</button>
            </form>
            </div>
        </div>
    )
}
