import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showFormClientNeed, getClientNeedsById, newEspecificalNeed } from '../redux/actions'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import UploadImage from './UploadImage'
import logo from '../img/ServIO.svg'
import axios from 'axios'
import s from './styles/ClientSpecificNeed.module.css'
import { useGlobalStorage } from '../hooks/useGlobalStorage';

const { REACT_APP_HOST } = process.env

export const ClientSpecificNeed = () => {

    const [user, ] = useGlobalStorage("globalUser", "")
    const { modal, globalUserGlobalStorage} = useSelector(state => state)
    const navigate = useNavigate()

    const [input, setInput] = useState({
        userId: user.id,
        name: "",
        photo: logo,
        description: "",
    })

    useEffect(() => {
        if(user === "" || typeof user === null) stateReset()
    }, [user])

    function onChangeForm(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
            userId: user.id,
        })
    }

    const postNeed =  async(e) =>{

        e.preventDefault()
        if(input.name === "" || input.description === "" || !input.userId){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, llena los campos marcados con asterisco (*)',
            })
        } else {
        try {
            // dispatch(newEspecificalNeed(input))
            await axios.post(`${REACT_APP_HOST}/clientNeeds`, input)

            Swal.fire({
                icon: 'success',
                title: 'Publicacion creada!',
                showConfirmButton: true,
                // timer: 1500
            })
            dispatch(showFormClientNeed("notshow"))
            dispatch(getClientNeedsById(user.id))
            
            stateReset()

            user.professional ? 
                navigate('/professional/'+ user.id) : 
                navigate('/clients/'+ user.id)
        
            } catch ( error ) {
            console.log( error.message )
        }}
    }

    function stateReset() {
        setInput({
            ...input,
            name:'',
            description:'',
            photo: "",
        })
    }


    const dispatch = useDispatch()

    useEffect(() => {
        if (modal === "show") {
            const fondo = document.getElementById("fondo-form-client-need")
            fondo.style.top = "0px"
        } else if("notshow") {
            const fondo = document.getElementById("fondo-form-client-need")
            fondo.style.top = "-100vh"
        }
    }, [modal])

    function hideFormClientNeed(){
        dispatch(showFormClientNeed("notshow"))
    }
    
    return (
        <>
            <div id='fondo-form-client-need' className={s.container}>
                <div className={s.container_background} onClick={hideFormClientNeed}></div>
                <div className={s.container_form}>
                    <form onSubmit={postNeed} className="form-floating">
                        <div className="row">
                            <div className={"col-12" && s.container_filter}>
                                <h1
                                className={`text-center ${s.title}`}
                                >Solicitá tu servicio</h1>
                                <div className="form-group mb-3">
                                <label
                                        htmlFor="exampleFormControlTextarea1"
                                        className="text-muted mb-1"
                                    >
                                        Nombre del servicio(*)
                                    </label>
                                    <input
                                        type="text"
                                        name='name'
                                        value={ input.name }
                                        onChange={ onChangeForm }
                                        className="form-control"
                                        aria-label="Default" aria-describedby="inputGroup-sizing-default"
                                        placeholder="Escribe aqui el titulo del servicio requerido"
                                    />
                                </div>
                                <div className="form-group mb-3">

                                    <label 
                                        htmlFor="imageFile"
                                        className="text-muted mb-1"
                                    >
                                        Cargar Foto
                                    </label>
                                    
                                    <UploadImage 
                                        details={input}
                                        name='photo'
                                        value={input.photo}
                                        onChange={onChangeForm}
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="exampleFormControlTextarea1"
                                        className="text-muted mb-1"
                                    >
                                        Descripción del servicio(*)
                                    </label>
                                    <textarea
                                        type='text'
                                        name='description'
                                        value={ input.description }
                                        onChange={ onChangeForm }
                                        className="form-control z-depth-1"
                                        id="exampleFormControlTextarea1"
                                        placeholder="Sé preciso en tu descripción para obtener una mejor oferta profesional..."
                                        rows="3"
                                    >
                                    </textarea>
                                </div>
                            </div>
                        <button
                            type="submit"
                            className={`btn btn-primary btn-lg mt-3 ${s.submit_btn}`}
                            >
                            Enviar Solicitud
                        </button>

                        </div>
                    </form>
                </div>

            </div>

        </>
            
    )
}
