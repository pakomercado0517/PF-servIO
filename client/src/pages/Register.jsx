import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate } from "react-router-dom";

import Swal from 'sweetalert2'
import axios from 'axios'
import s from './styles/Register.module.css'
import { CgOptions } from 'react-icons/cg';

import { filterProfessions, newUser, existentUser } from '../redux/actions';
import {storage} from '../firebase/firebase'
import {ref, uploadBytesResumable, getDownloadURL} from '@firebase/storage'
import logo from '../img/ServIO.svg'
import {MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet'
import {OpenStreetMapProvider} from 'leaflet-geosearch'
import L from 'leaflet'
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const LocationMarker = ({position}) => {
  const map= useMap()
  map.flyTo([position.lat, position.lng], 15)
  const markerMove= (e)=> {
    e.preventDefault()
  }
  // draggable={true} autoPan={true}
  return position.lat === 0 && position.lng === 0 ? null : (
    <Marker position={[position.lat, position.lng]} >
      <Popup>You are here</Popup>
    </Marker>
  )
}

export default function Crear() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state)
    console.log(user)
    const { professionsName } = useSelector(state => state)
    const[errors, setErrors] = useState({
        firstName:"",
        lastName: "",
        email: "",
        dni:'',
        password:'',
        repeatPassword:'',
    });
    const [buttonSubmit, setbuttonSubmit] = useState(false)
    const [details, setDetails] = useState({
        firstName:'',
        lastName: '',
        email: '',
        dni:'',
        password:'',
        repeatPassword:'',
        professionalCase:false,
        professional: "false",
        city:'',
        photo: logo,
        profession:[],
    })

    const [progress, setProgress] = useState(0)
    const [geosearch, setGeosearch] = useState("")
    const [cityInfo, setCityInfo] = useState("")
    const [positions, setPositions] = useState({
        lat: 19.3910038,
        lng: -99.2837001,
    })

    useEffect(() => {
        dispatch(filterProfessions())  
    }, [dispatch])

    useEffect(() => {
      dispatch(existentUser(details.email))  
  }, [dispatch, details.email])
  
    
    useEffect(() => {
        if (!buttonSubmit) {
            document.getElementById("buttonSubmit").disabled = true
        } else {
            if(details.professionalCase){
                if (details.profession[0]) {
                    document.getElementById("buttonSubmit").disabled = false
                }else {
                    document.getElementById("buttonSubmit").disabled = true
                }
            } else {
                document.getElementById("buttonSubmit").disabled = false
            }
        }
    }, [buttonSubmit, details])
    
    useEffect(() => {
        let aux = 0;
        for (const key in errors) {
            if ((typeof errors[key]) === "string") {
                ++aux
            }
        }
        if (aux === 0) setbuttonSubmit(true)
        else setbuttonSubmit(false)
    }, [errors])
    
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
    
    function handleChange(e){
        setDetails({
            ...details,
            [e.target.name] : e.target.value
        })
    }
    
    const handleSubmit = async (e) => {
        
        e.preventDefault();
        // const err = validate(details)
        // setErrors(err)
        const obj= 
        {
            // userName: "Alejandrito2",
            ...details,
            profession: details.profession.join(),
            phone: "123456789", 
            verified: "true", 
            certification_name:"N/A",
            certification_img:"noimg.png",
            status: "no sabe no contesta", 
        }
        try{
            dispatch(newUser(obj))            
            console.log(details.email)
            if(user.message.message === 'Usuario existente' || user.z === false){
              Swal.fire({
                  title: 'Error',
                  text: user.message.message,
                  icon: 'error',
                  confirmButtonText: 'OK'
              });
            }else{
              Swal.fire({
                title: 'Registro exitoso',
                text: 'Ahora puedes iniciar sesión',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              
              navigate('/login')
            } 
        }catch(error){
            console.log(error)
        }
        
    }

    function handleCheck(e){
        // console.log(e.target.value)
        if (e.target.id === 'checkboxClient') {
            setDetails({
                ...details,
                professionalCase:false,
                professional:"false",
                profession: []
            })
        } else {
            setDetails({
                ...details,
                professionalCase:true,
                professional:"true",
            })
        }
    } 

    function handleSelect(e){
        if(details.profession.includes(e.target.id)){
            setDetails({
                ...details,
                profession: details.profession.filter(el => el !== e.target.id)
            })
            e.target.style.background = "none"

        } else {
            setDetails({
                ...details,
                profession: [...details.profession, e.target.id]
            })
            e.target.style.background = "#b0b0b0"
        }
    }

    const uploadFile= (file) => {
        if(!file) return 
        const storageRef= ref(storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed', (snapshot) => {
            const prog= Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100)
            setProgress(prog)
        }, (err)=> console.log(err),
        ()=> {
            getDownloadURL(uploadTask.snapshot.ref).then(url=> {
                console.log('url', url);
                setDetails({
                    ...details,
                    photo: url
                });
            })
        }
        )
    }

    const uploadImage= async (e) => {
        const file= e.target.files[0]
        await uploadFile(file)
    }
    const provider= new OpenStreetMapProvider();
    const handleSearch= (e)=> {
        e.preventDefault();
        setGeosearch(e.target.value);
        if(e.target.value.length >= 8) {
        //Use the provider...

        provider.search({ query: geosearch }).then(res=> {
            const $positions= res[0].bounds[0]
            setPositions({lat:$positions[0], lng: $positions[1]})
            const citi= cityInfo.split(',')
            setCityInfo(res[0].label)
            setDetails({
                ...details,
                city: `${citi[2]}, ${citi[citi.length - 1]}`,
            })
        })
        }
    }

    const searchCity= ()=> {
        navigator.geolocation.getCurrentPosition( function(position){
        setPositions({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        })
        setGeosearch(`${positions.lng} ${positions.lat}`)
        }, function(error){
        console.log(error)
        },
        {
            enableHighAccuracy: true
        }
        )
    }

    useEffect(() => {
        provider.search({ query: `${positions.lat} ${positions.lng}` }).then(res => {
        const citi= cityInfo.split(',')
        setCityInfo(res[0].label)
        setDetails({
            ...details,
            city: `${citi[2]}, ${citi[citi.length -1]}`,
        })
    })
}, [positions, cityInfo])

    return (
        <div className={ s.container} >
            <div className={ s.container_img }>
                <p>
                    Sé parte de nuestra plataforma, registrate ya y disfruta!
                </p>
            </div>
            <div className={ s.container_registro }>
                <div className={s.container_registro_titulo}>
                    <h2>Crea tu Usuario</h2>
                </div>
                <form className={ s.container_registro_form } onSubmit={(e) => handleSubmit(e)}>
                    <div className={s.container_registro_form_input}>
                        <label>Nombre:</label>
                        <input
                            className='form-control'
                            type='text'
                            value={details.firstName}
                            name='firstName'
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.firstName && <p className={ s.error }>{ errors.firstName }</p>}

                    </div>
                    <div className={s.container_registro_form_input}>
                        <label>Apellido:</label>
                        <input
                            className='form-control'
                            type='text'
                            value={details.lastName}
                            name='lastName'
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.lastName && (
                            <p className={ s.error }>{errors.lastName}</p>
                        )}

                    </div>
                    <div className={s.container_registro_form_input}>
                        <label>e-mail:</label>
                        <input
                            className='form-control'
                            type='email'
                            value={details.email}
                            name='email'
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.email && (
                            <p className={ s.error }>{errors.email}</p>
                        )}

                    </div>
                    <div className={s.container_registro_form_input}>
                        <label>DNI:</label>
                        <input
                            className='form-control'
                            type='text'
                            value={details.dni}
                            name='dni'
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.dni && (
                            <p className={ s.error }>{errors.dni}</p>
                        )}

                    </div>

                    <div className={s.container_registro_form_input}>
                        <label>Password:</label>
                        <input
                            className='form-control'
                            type='text'
                            value={details.password}
                            name='password'
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.password && (
                            <p className={ s.error }>{errors.password}</p>
                        )}

                    </div>

                    <div className={s.container_registro_form_input}>
                        <label>repeat password:</label>
                        <input
                            className='form-control'
                            type='text'
                            value={details.repeatPassword}
                            name='repeatPassword'
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.repeatPassword && (
                            <p className={ s.error }>{errors.repeatPassword}</p>
                        )}

                    </div>


                    <h4>¿Buscas ofrecer o contratar un servicio?</h4>
                    <h5>Registrate como profesional o cliente!</h5>

                    <div className={s.container_registro_form_check}>
                        <label>Profesional:<input
                            type='checkbox'
                            id="checkboxProfessional"
                            value='professional'
                            checked={details.professionalCase}
                            onChange={(e) => handleCheck(e)}
                        /></label>
                        <br />
                        <label>Cliente:<input
                            type='checkbox'
                            id="checkboxClient"
                            checked={!details.professionalCase}
                            value='cliente'
                            onChange={(e) => handleCheck(e)}
                        /></label>
                        
                    </div>
                    <div className={s.container_registro_form_oficio}>
                        {
                            details.professionalCase ? (
                                <>
                                    <label>Seleccona tu Oficio:</label>
                                    <div className='dropdown'>
                                        <button className="btn btn-secondary dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" type="button" aria-expanded="false" ><CgOptions />Elegir oficio</button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
                                            {
                                                professionsName.map((el, index) => {
                                                    return (
                                                        <li key={"li" + index}><span className="dropdown-item" id={el} onClick={handleSelect}>{el}</span></li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </>
                            ) : (<></>)
                        }
                        
                        <div className={ s.container_registro_form_oficio_span }>
                            {details.profession?.map((el, i) => {
                                return <p key={ "p" + i}> { el } </p>
                            })}
                        </div>
                        <div className={s.container_edilt_form_input_img} >
                            <label htmlFor="imageFile">Selecciona alguna imágen (png):</label><br/>
                            <div className={s.div_file}>
                                <p className={s.text}>Elegir archivo</p>
                                <input className={s.btn_enviar} 
                                    type="file"  
                                    // accept=".png" 
                                    name="photo"
                                    // multiple
                                    onChange={uploadImage}
                                /> 
                            </div>
                            <span>Uploaded {progress} % </span>
                            {
                                progress === 100
                                ? <img src={details.photo} className={s.img_profile}/>
                                : ""
                            }
                        </div>
                    </div>
                    <div className={ s.container_registro_form_button }>
                        <button id='buttonSubmit' type='submit' className={"btn btn-success " + s.buttonSubmit}>Registrarse</button>
                    </div>
                    <div>
                        <p className='btn btn-primary' onClick={searchCity}>Mostrar ubicación actual</p>
                        <p>O </p>
                        <label for="formsearch">Busca tu ciudad</label>
                        <input type='text' class='formsearch' name='city' onChange={handleSearch} placeholder='Ingresa tu ciudad'/>
                        <MapContainer center={[positions.lat, positions.lng]} zoom={15} scrollWheelZoom={false} >
                            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                            <LocationMarker position={positions}/>
                        </MapContainer>
                    </div>
                </form>
            </div>
        </div>
    )
}
