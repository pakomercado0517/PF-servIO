import React, { useEffect, useState } from 'react';
import { CgOptions } from 'react-icons/cg';
import { useDispatch, useSelector } from "react-redux";
import { getByUserId} from '../redux/actions'
import axios from 'axios';


export default function EditPodeddional() {

    
    
    const[errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const oficio = [
        "carpintero",
        "herrero",
        "electricista",
        "albañil"
    ]

    // const [user, setUser] = useState([])
    // const [edit, setEdit] = useState(true)
    const user = useSelector((state) => state.user);
    const state = useSelector((state) => state);
    // const userProfecional =  dispatch(getByUserId)
    
    // console.log('profecionales', userProfecional)
    const login = !localStorage.getItem ? null: JSON.parse(localStorage.getItem("user"))
    
    // const id = window.localStorage.getItem('user').cookies;

    useEffect(() => {
        dispatch(getByUserId(login.cookies.userId))
        
    },[])

    console.log(user)

    // function editUser (id) {
    //     fetch(`http://localhost:3001/user/${id}`),{
    //         method: 'PUT'
    //     }

    // }
        
    // console.log(editUser)
    // console.log(isLoading)

    // const[editeUser, setediteUser] = useState('');

    // const firstName = user[0]?.first_name
    // useEffect(() => {
    //     console.log('mensaje:', user)
    // }, [editeUser])
    
    const [details, setDetails] = useState({

        firstName:user[0]?.first_name,
        lastName: user[0]?.last_name,
        email: user[0]?.email,
        dni:user[0]?.dni,
        password:user[0]?.password,
        repeatPassword:user[0]?.password,
        // professional:user[0]?.professional,
        // cliente:'',
        city:user[0]?.city,
        // profession: user[0]?.professional.professions[1],
        phone:'',
        photo:'', 
    })

    function validate(valores){
        let errores = {};
        // setediteUser('hola')
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
    
        //validacion password
        if(!valores.password) {
            errores.password = 'Por favor ingresa un password'
        }else if(! /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(valores.password)){
            errores.password= 'El password debe tener mínimo ocho caracteres, al menos una letra y un número'
        }
    
        //validacion Repeat-password
        if(!(valores.password === valores.repeatPassword)) {
            errores.repeatPassword = 'Por favor la password tiene que ser igual'
        }

        //validacion télefono /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/
        if (!valores.phone) {
            errores.phone = 'Por favor ingresa un télefono'
        }else if(!/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(valores.phone)){
            errors.phone= 'Es obligatorio: el código de área (11, 2xx, 2xxx, 3xx, 3xxx, 6xx y 8xx), (no toma como válido un número local sin código de área como 4444-0000)'
        }

        return errores;
    }

    function handleSelect(e){
        console.log(e.target.id)
        setDetails({
            ...details,
            profession: details.profession + e.target.id + ","
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const err = validate(details)

        setErrors(err)
        
        const id = {...details}

        await axios.put(`http://localhost:3001/updateUser/${id}`)
    .then(res => {
        console.log("Respuesta de API: ", res);
        console.log("Data por API: ", res.data);
    }).catch(err =>{
        console.log("Error: ", err)
    })


    }

    useEffect(() => {
        setErrors(validate(details))    
    }, [details])

    function handleChange(e){
        setDetails({
            ...details,
            [e.target.name] : e.target.value
        })

        console.log(e.target.value)
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h2>Edita tu perfil</h2>
                <label >Nombre: </label>
                <input 
                    type="text"  
                    name="firstName"
                    value={details.firstName}
                    onChange={(e) => handleChange(e)}
                /><br/>
                {!errors.name && (
                    <p>{errors.firstName}</p>
                )}
                <label >Apellido: </label>
                <input 
                    type="text"  
                    name="lastName"
                    value={details.lastName}
                    onChange={(e) => handleChange(e)}
                /><br/>
                {!errors.name && (
                    <p >{errors.lastName}</p>
                )}
                <label >Correo: </label>
                <input 
                    type='email' 
                    name='email'
                    value={details.email}
                    onChange={(e) => handleChange(e)}
                /><br/>
                {errors.email && (
                    <p>{errors.email}</p>
                )}
                <label>DNI:</label>
                <input 
                    type='text'
                    name='dni'
                    readonly
                    value={details.dni}
                    />
                    <br/>
                <label>Password:</label>
                <input 
                    type='password'
                    name='password'
                    value={details.password}
                    onChange={(e) => handleChange(e)}
                /><br/>
                {errors.password && (
                    <p>{errors.password}</p>
                )}
                <label>Repeat Password:</label>
                <input 
                    type='password'
                    name='repeatPassword'
                    value={details.repeatPassword}
                    onChange={(e) => handleChange(e)}
                /><br/>
                {errors.repeatPassword && (
                    <p>{errors.repeatPassword}</p>
                )}
                <label >Teléfono: </label>
                <input 
                    type="text"  
                    name="phone"
                    value={details.phone}
                    onChange={(e) => handleChange(e)}
                /><br/>
                {!errors.photo && (
                    <p>{errors.photo}</p>
                )}
                {/* <label >Profecion: </label>
                <input 
                    type="text"  
                    name="profession"
                    value={details.profession}
                    onChange={(e) => handleChange(e)}
                /><br/> */}
                <label for="imageFile">Selecciona algunas imágenes:</label><br/>
                <input 
                    type="file"  
                    accept=".png" 
                    multiple
                    value={details.photo}
                    onChange={(e) => handleChange(e)}
                /> 
                <label>Seleccona tu Oficio:</label>
                        <div>
                            <button class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" type="button" aria-expanded="false" ><CgOptions /> Filtrar</button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
                                {
                                    oficio.map((el, index)=>{
                                        return (
                                            <li key={"li"+index}><span class="dropdown-item" onClick={handleSelect} id={el} >{el}</span></li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                <p>Reguerdas que los campos que no edites nada no se  van a cambian, lo unico que no se 
                    va a poder editar es el DNI.
                </p>  
                <button type='submit' >Cambiar Perfil</button>
            </form>
        </div>
    )
}
