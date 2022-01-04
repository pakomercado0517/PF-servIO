import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showFormProfessionalOffer, createTecnicalActivity } from '../redux/actions'
import {useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import s from './styles/ProfessionalServiceOffer.module.css'


export const ProfessionalServiceOffer = () => {
    
    const navigate = useNavigate()
    const modal = useSelector(state => state.modalProfessionalsOffer)
    const user = useSelector(state => state.globalUserGlobalStorage)
    const a = useSelector(state => state)
    console.log(a)

    const [form, setForm] = useState({
        name: "", //ok en db
        description: "", // ok en db
        photo: "photo", //ok en db
        materials: "", // boolean ok en db
        price: "", // ok en db
        guarantee: "",  // ok en db
        guarantee_time: "", // ok en db
        job_time: "",  // ok en db
        // professionalId: "",
        userId: user?.id,
    })
    const boolean = form.name !== '' && form.description !== '' && form.photo !== '' && form.materials && form.price !== '' && form.guarantee && form.guarantee_time !== '' && form.job_time !== ''
    console.log(boolean, form)
    function onChangeForm(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function stateReset() {
        setForm({
            name: "",
            description: "",
            photo: "foyo",
            materials: "",
            price: "",
            guarantee: "",
            guarantee_time: "",
            job_time: "",
        })
    }

    const postNeed = async (e) =>{
        e.preventDefault()
        try {
          if(boolean === true){
            dispatch(createTecnicalActivity(form))

            const fondo = document.getElementById("fondo-form-Professional-offer")
            fondo.style.top = "-100vh"
            
            Swal.fire({
                icon: 'success',
                title: 'Publicacion creada!',
                showConfirmButton: false,
                // timer: 1500,
                showCloseButton: true
            });
            stateReset();
            navigate(`/professional/${user.id}`);

          }else{
            Swal.fire({
              icon: 'error',
              title: 'Por favor rellene todos los campos',
              showConfirmButton: true,
              // timer: 500,
              showCloseButton: true
          });
          }
            
        } catch (error) {
            console.error("message: ", error)
        }
    }

    const dispatch = useDispatch()

    useEffect(() => {
        if (modal === "show") {
            const fondo = document.getElementById("fondo-form-Professional-offer")
            fondo.style.top = "0px"
        } else if("notshow") {
            const fondo = document.getElementById("fondo-form-Professional-offer")
            fondo.style.top = "-100vh"
        }
    }, [modal])

    function hideFormProfessionalOffer(){
        dispatch(showFormProfessionalOffer("notshow"))
    };
    
    // name: "",
    // description: "", // no esta en la base de datos
    // photo: "",
    // materials: "", // boolean
    // price: "",
    // guarantee: "",  // no esta en la base de datos
    // guarantee_time: "", // no esta en la base de datos
    // job_time: "",  // días
    // professionalId: "",

return (
    <>
    <div id='fondo-form-Professional-offer' className={s.container}>
        <div className={s.container_background} onClick={hideFormProfessionalOffer}></div>
        <div className={s.container_form}>

            <div className="d-flex flex-row-reverse bd-highlight">
                <button 
                className="text-center btn btn-warning" 
                onClick={()=>{window.history.back()}}
                >
                    Volver
                </button>
            </div>
            
            <form onSubmit={postNeed} action="">
                <div className="row mb-4">
                <div>
                    <div className={"col" && s.container_filter}>
                        <h1 className="d-flex justify-content-center">Ofrecé tu servicio</h1>
                        <div className="input-group mb-1">
                            <input
                                type="text"
                                name='name'
                                value={ form.name }
                                onChange={ onChangeForm }
                                className="form-control mb-4"
                                aria-label="Default" aria-describedby="inputGroup-sizing-default"
                                placeholder="Escribe aquí el título del servicio"
                            />
                        </div>

                        <div className="input-group mb-1">
                            <label className="me-2 mb-4">
                                Elige una foto
                            </label>
                            <input
                                type="file"
                                name='photo'
                                accept="image/png, image/jpeg"
                                onChange={ e=> onChangeForm(e) }
                            />
                        </div>

                        <div className="form-group mt-2 mb-2">
                            <label
                                for="exampleFormControlTextarea1">
                                Descripción del servicio
                            </label>
                            <textarea
                                type='text'
                                name='description'
                                value={ form.description }
                                onChange={ onChangeForm }
                                className="form-control z-depth-1"
                                id="exampleFormControlTextarea1"
                                rows="3"
                            >
                            </textarea>
                        </div>

                        <div className="col input-group mb-2 pt-3 pb-3">
                            <div className="me-5"
                                value={ form.guarantee } 
                            >
                                ¿Incluye Garantia?   {`    `}
                                <input
                                    className="input"
                                    type="radio" 
                                    name="guarantee"
                                    value='true'
                                    onChange={ e=> onChangeForm(e) }
                                /> Si {`    `}
                                <input
                                    className="input"
                                    type="radio" 
                                    name="guarantee"
                                    value='false' 
                                    onChange={ e=> onChangeForm(e) }
                                /> No {`    `}
                            </div>
                            <div className="me-2"
                                value={ form.materials }
                            >
                                ¿Incluye material? {`    `}   
                                <input
                                    className=""
                                    type="radio" 
                                    name="materials"
                                    value='true' 
                                    onChange={ e=> onChangeForm(e) }
                                    /> Si {`    `}
                                <input
                                    className=""
                                    type="radio" 
                                    name="materials"
                                    value='false'
                                    onChange={ onChangeForm }
                                    /> No {`    `}
                            </div>
                        </div>

                        <div className="row mb-4">
                        
                            <div className="col">
                                <div className="form-outline">
                                
                                    <label
                                        className="form-label d-flex justify-content-center"
                                    >
                                        Dias de garantia
                                    </label>
                                    <input
                                        type="number"
                                        name='guarantee_time'
                                        value={ form.guarantee_time }
                                        onChange={ onChangeForm }
                                        className="form-control me-2"
                                        aria-label="Default" aria-describedby="inputGroup-sizing-default"
                                        placeholder="Días de garantía"
                                        />
                                </div>
                            </div>

                            <div className="col">
                                <div className="form-outline">
                                <label
                                        className="form-label d-flex justify-content-center"
                                    >
                                        Días de trabajo
                                    </label>
                                    <input
                                        type="number"
                                        name='job_time'
                                        value={ form.job_time }
                                        onChange={ onChangeForm }
                                        className="form-control me-2"
                                        aria-label="Default" aria-describedby="inputGroup-sizing-default"
                                        placeholder="Días estimados de trabajo"
                                        />
                                </div>
                            </div>
                        </div>
                        {/* </div> */}

                        <div className="col input-group mt-2 mb-2">
                            <span class="input-group-text">$</span>
                            <input
                                type="number"
                                name='price'
                                value={ form.price }
                                onChange={ onChangeForm }
                                className="form-control"
                                aria-label="Dollar amount (with dot and two decimal places)" aria-describedby="inputGroup-sizing-default"
                                placeholder="Ingresa un precio"
                                />
                        </div>

                        </div>
                        <div className='row'>

                    <button
                        type="submit"
                        className={ boolean === true ? "btn btn-primary btn-lg btn-block mt-4" : s.hide}
                        
                        >
                        Crear Actividad
                    </button>
                            </div>
                </div>
                </div>
            </form>
        </div>

    </div>

    </>
        
)
}
