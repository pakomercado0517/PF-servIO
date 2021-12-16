import React, { useEffect, useState } from 'react';
import { CgOptions } from 'react-icons/cg';
import { useDispatch, useSelector } from "react-redux";
import { getByUserId} from '../redux/actions'
import axios from 'axios';
import s from './styles/EditPodeddional.module.css'


export default function EditPodeddional() {

    
    
    const[errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const oficio = useSelector((state) => state.professionsName)
    console.log(oficio)
    // const [user, setUser] = useState([])
    // const [edit, setEdit] = useState(true)
    const user = useSelector((state) => state.user);
    const state = useSelector((state) => state);
    // const userProfecional =  dispatch(getByUserId)
    
    // console.log('profecionales', userProfecional)
    const login = !localStorage.getItem ? null: JSON.parse(localStorage.getItem("user"))
    
    // const id = window.localStorage.getItem('user').cookies;

    useEffect(() => {
        dispatch(getByUserId(login?.cookies.userId))
        
    },[])

    // console.log(user)

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
    const [profession, setProfession] = useState([])
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
        profession:user[0]?.Professional?.Professions[0]?.name,
        phone:'',
        photo:'', 
    })

    function validate(valores){
        let errores = {};
        // setediteUser('hola')
        //validacion nombre
        console.log('error: ',errores)
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
    function onClose(e){
        let index = profession.indexOf(e.target.value)
        setProfession([...profession.slice(0, index).concat(...profession.slice(index+1, profession.length))])
    }

    function onClick(){
        if(profession.indexOf(details.profession) === -1 && details.profession !== ''){
        setProfession([...profession, details.profession])
        setDetails({...details, profession : 'Select a Country'})
        }
        setDetails({...details, profession : 'Select a Country'})
    }

    function changeCountry(event){
        setDetails({...details, profession: event.target.value})
    }   
    const handleSubmit = async (e) =>{
        e.preventDefault();

        const err = validate(details)

        setErrors(err)
        
        const id = user[0].id

    //     await axios.put(`http://localhost:3001/user/updateUser/${id}`, details)
    // .then(res => {
    //     console.log("Respuesta de API: ", res);
    //     // console.log("Data por API: ", res.data);
    // }).catch(err =>{
    //     console.log("Error: ", err)
    // })
    try{
        await axios.put(`http://localhost:3001/user/updateUser/${id}`, details)
        console.log('combio')
    }catch(e){
        console.log(e)
    }

    console.log('id: ',id)
    }
    // console.log('profecion: ', user[0]?.Professional?.Professions[0]?.name)
    useEffect(() => {
        setDetails({
            ...details,
            firstName: state.user[0]?.first_name,
            lastName: user[0]?.last_name,
            email: user[0]?.email,
            dni:user[0]?.dni,
            password:user[0]?.password,
            repeatPassword:user[0]?.password,
            // professional:user[0]?.professional,
            // cliente:'',
            city:user[0]?.city,
            profession:  user[0]?.Professional?.Professions[0]?.name,
            phone:'',
            photo:'', 

        })
    
    }, [state])

    useEffect(() => {
        setErrors(validate(details))    
    }, [details])

    function handleChange(e){
        setDetails({
            ...details,
            [e.target.name] : e.target.value
        })
        console.log('foto: ',details.photo)
    }

    
    return (
        <div className={s.container}>
            <div className={ s.container_img }>
                <p>
                    Sé parte de nuestra plataforma, registrate ya y disfruta!
                </p>
            </div>
            <div className={ s.container_edilt }>
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
                        value={details.lastName}
                        onChange={(e) => handleChange(e)}
                    />
                    {!errors.name && (
                        <p >{errors.lastName}</p>
                    )}
                </div>
                <div className={s.container_edilt_form_input}>
                    <label >Correo: </label>
                    <input 
                        type='email' 
                        name='email'
                        value={details.email}
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
                        readonly
                        value={details.dni}
                        />
                </div>
                <div className={s.container_edilt_form_input}>
                <label>Password:</label>
                    <input 
                        type='password'
                        name='password'
                        value={details.password}
                        onChange={(e) => handleChange(e)}
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
                        value={details.repeatPassword}
                        onChange={(e) => handleChange(e)}
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
                        value={details.phone}
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.photo && (
                        <p>{errors.photo}</p>
                    )}
                </div>
                <div className={s.container_edilt_form_input}>
                    <label >Profecion: </label>
                    <input
                        type="text"  
                        name="profession"
                        value={details.profession}
                        readonly
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                {/* <label>Seleccona tu Oficio:</label> */}
                <div>
                    <div className={s.subDiv}>
                        <label for="countries">Seleccona tu Oficio:</label>
                        <div>
                            <select 
                            className={s.inputClass3}
                            onChange={changeCountry}
                            value={details.profession}
                            >
                            <option>Select a Country</option>
                            {oficio.map(e => {
                                return (<option>{e}</option>)
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
                                <input type="button" value={e} className={s.countryBtn} onClick={onClose} />
                                )
                                
                                })}
                        </div>
                    </div>
                </div>
                    {/* <div className='dropdown'>
                        <button class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" type="button" aria-expanded="false" ><CgOptions /> Elegir oficio</button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
                            {
                                oficio.map((el, index)=>{
                                    return (
                                        <li key={"li"+index}><span class="dropdown-item" onClick={handleSelect} id={el} >{el}</span></li>
                                    )
                                })
                            }
                        </ul>
                    </div> */}
                <div >
                    <label for="imageFile">Selecciona alguna imágen (png):</label><br/>
                    <div className={s.div_file}>
                        <p className={s.text}>Elegir archivo</p>
                        <input className={s.btn_enviar} 
                            type="file"  
                            accept=".png" 
                            multiple
                            value={details.photo}
                            onChange={(e) => handleChange(e)}
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
