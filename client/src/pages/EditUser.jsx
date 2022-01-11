import React, {useEffect, useState} from 'react';
import s from './styles/EditUser.module.css';
import {useGlobalStorage} from '../hooks/useGlobalStorage';
import { useDispatch, useSelector } from "react-redux";
import { filterProfessions, putUser, existentUser } from '../redux/actions';
import Swal from 'sweetalert2';
import {storage} from '../firebase/firebase'
import {ref, uploadBytesResumable, getDownloadURL} from '@firebase/storage'
import { useNavigate } from "react-router-dom";
import MapView from '../components/MapView';


export default function EditCliente() {

    const [progress, setProgress] = useState(0)
    const [globalUser, setGlobalUser] = useGlobalStorage("globalUser", "");
    
    const[errors, setErrors] = useState({
      firstName:"",
      lastName: "",
      email: "",
      dni:'',
      password:'',
      repeatPassword:'',
  });
  console.log(errors)
    const [profession, setProfession] = useState([])
    const oficio = useSelector((state) => state.professionsName)
    const existent = useSelector((state) => state.z)
    const [buttonSubmit, setbuttonSubmit] = useState(false)
    console.log(existent)

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [details, setDetails] = useState({
        firstName: globalUser.first_name,
        lastName: globalUser.last_name,
        email: globalUser.email,
        professional: globalUser.professional,
        professionalCase:false,
        profession:profession.toString(),
        photo: globalUser.photo,
        password:'',
        repeatPassword:'',
        phone:globalUser.phone,
        dni:globalUser.dni,
        city:globalUser.city,
    })

    console.log('profesional: ',details)
    
    useEffect(() => {
        dispatch(filterProfessions())      
    },[ dispatch ])
    
    useEffect(() => {
      dispatch(existentUser(details.email))  
  }, [dispatch, details.email])
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

    useEffect(() => {
    //   if (!buttonSubmit) {
    //       document.getElementById("buttonSubmit").disabled = true
    //   } else {
    //       if(details.professionalCase){
    //           if (details.profession[0]) {
    //               document.getElementById("buttonSubmit").disabled = false
    //           }else {
    //               document.getElementById("buttonSubmit").disabled = true
    //           }
    //       } else {
    //           document.getElementById("buttonSubmit").disabled = false
    //       }
    //   }
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

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
        if(existent === true || globalUser.email === details.email){
            let prof= profession.toString()
            let newData= {
                id: globalUser.id,
                firstName: details.firstName,
                lastName: details.lastName,
                email: details.email,
                dni:details.dni,
                phone: details.phone,
                password:details.password,
                professional:details.professional,
                profession:prof,
                photo: details.photo,
                city: details.city,
                
            }

            dispatch(putUser(newData))

            const obj = {
                ...globalUser,
                first_name:details.firstName,
                last_name: details.lastName,
                email: details.email,
                dni:details.dni,
                password:details.password,
                professional: details.professional,
                profession:prof,
                photo: details.photo,
                phone: details.phone,
                city: details.city,
              
            };

            setGlobalUser(obj)

            Swal.fire({
                title: 'Los cambios fueron aceptados',
                text: 'En la brevedad los cambios se ejecutaran',
                icon: 'success',
                confirmButtonText: 'Aceptar'

            });
            navigate('/')
        }else{
          Swal.fire({
            title: 'Email en uso',
            text: 'Este email esta en uso, favor de modificarlo',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
        
        }
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
        console.log(globalUser.professional)
        // como estaba antes
        // if (e.target.id === 'checkboxClient' && details.professionalCase)
        if (e.target.id === 'checkboxClient' && globalUser.professional) {
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
                professional:"true",
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
        // setDetails({...details, profession: event.target.value})

        setDetails(() =>({...details, profession:event.target.value}));

    }  
    function onClose(e){
        let index = profession.indexOf(e.target.value)
        setProfession([...profession.slice(0, index).concat(...profession.slice(index+1, profession.length))])
        setDetails({
            ...details,
            profession: details.profession + e.target.id + ","
        })
    }
    // console.log('detailssss', details)
    return (
        <div className={s.container}>
            <div className={ s.container_img}>
                <p>
                    Aquí podes mejorar la visulaización de tu perfil
                </p>
            </div>
            <div className={ s.container_edilt}>
                <div className={s.container_edilt_titulo}>
                    <h2>Edita tu perfil</h2>
                </div>
            <form className={s.container_edilt_form} onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className={s.container_edilt_form_input}>
                    <div className="form-floating mb-3">
                        <input
                        className={errors.firstName  ? s.red_container_edilt_form_pofesional : 'form-control' }
                            type="text"  
                            name="firstName"
                            value={details.firstName}
                            onChange={(e) => handleChange(e)}
                        />
                        <label>Nombre: </label>
                        {errors.firstName && (
                            <p className={s.error}>{errors.firstName}</p>
                        )}
                    </div>
                </div>
                <div className={s.container_edilt_form_input}>
                    <div className="form-floating mb-3">
                        <input 
                            className={errors.lastName  ? s.red_container_edilt_form_pofesional : 'form-control' }
                            type="text"  
                            name="lastName"
                            value={globalUser.last_name}
                            onChange={(e) => handleChange(e)}
                        />
                        <label >Apellido: </label>
                        {errors.name && (
                            <p className={s.error}>{errors.lastName}</p>
                        )}
                    </div>
                </div>
                <div className={s.container_edilt_form_input}>
                    <div className="form-floating mb-3">
                        <input 
                            className={errors.email  ? s.red_container_edilt_form_pofesional : 'form-control' }
                            type='email' 
                            name='email'
                            // value={globalUser.email}
                            onChange={(e) => handleChange(e)}
                        />
                        <label >Correo: </label>
                        {errors.email && (
                            <p className={s.error}>{errors.email}</p>
                        )}
                    </div>
                </div>
                <div className={s.container_edilt_form_input}>
                    <div className="form-floating mb-3">
                        <input 
                            className='form-control'
                            type='text'
                            name='dni'
                            value={globalUser.dni}
                            readOnly
                        />
                        <label>DNI:</label>
                    </div>
                </div>
                <div className={s.container_edilt_form_input}>
                    <div className="form-floating mb-3">
                        <input 
                            className={errors.password  ? s.red_container_edilt_form_pofesional : 'form-control' }
                            type='password'
                            name='password'
                            onChange={(e) => handleChange(e)}
                        />
                        <label>Password:</label>
                        {errors.password && (
                            <p className={s.error}>{errors.password}</p>
                        )}
                    </div>
                </div>
                <div className={s.container_edilt_form_input}>
                    <div className="form-floating mb-3"> 
                        <input 
                            className={errors.repeatPassword  ? s.red_container_edilt_form_pofesional : 'form-control'  }
                            type='password'
                            name='repeatPassword'
                            onChange={(e) => handleChange(e)}
                        />
                        <label>Repeat Password:</label>
                        {errors.repeatPassword && (
                            <p className={s.error}>{errors.repeatPassword}</p>
                        )}
                    </div>
                </div>
                <div className={s.container_edilt_form_input}>
                    <div className="form-floating mb-3">
                        <input  
                            value={details.phone}
                            className='form-control' 
                            type="text"  
                            name="phone"
                            onChange={(e) => handleChange(e)}
                        />
                        <label >Teléfono: </label>
                        {/* {errors.photo && (
                            <p>{errors.photo}</p>
                        )} */}
                    </div>
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
                                    <label htmlFor="profession">Seleccona tu Oficio:</label>
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
                        <div className={s.mapUbication}>
                            <MapView details={details} onChange={handleChange} />
                        </div>
                        
                </div>

                }

                <div className={s.textoFinal}>
                    <p>Recuerda que los campos que no edites no cambiarán, lo unico que no podrás editar es el DNI.</p>  
                </div>
                
                <button type='submit'id='buttonSubmit' className={s.buttonSubmit} >Cambiar Perfil</button>
            </form>
            </div>
        </div>
    )
}