import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showFormClientNeed, getClientNeedsById, newEspecificalNeed } from '../redux/actions'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import UploadImage from './UploadImage'
import logo from '../img/ServIO.svg'

import s from './styles/ClientSpecificNeed.module.css'


export const ClientSpecificNeed = () => {
    
    const modal = useSelector(state => state.modal)
    const user = useSelector(state => state.globalUserGlobalStorage)
    const navigate = useNavigate()

    const [input, setInput] = useState({
        userId: user?.id,
        name: "",
        photo: "https://images.unsplash.com/photo-1600623050499-84929aad17c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80", // es la url de la imagen por default del detail client need
        // photo: "",
        // photo: logo, // logo serv-io
        description: "",
    })

    function onChangeForm(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const postNeed = async (e) =>{
        e.preventDefault()
        console.log(input)
        if(input.name === "" || input.description === ""){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, llena los campos marcados con asterisco (*)',
            })
        } else {
        try {
            await dispatch(newEspecificalNeed(input))
            // await axios.post('http://localhost:3001/clientNeeds', input) <----COMENTADO POR GUILLE

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
                                className="text-center"
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
                                        details={input.photo}
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
                            className="btn btn-primary btn-lg mt-3"
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
