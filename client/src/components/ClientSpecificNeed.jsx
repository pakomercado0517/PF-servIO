import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { showFormClientNeed, getClientNeedsById, newEspecificalNeed } from '../redux/actions'
import Swal from 'sweetalert2'
import s from './styles/ClientSpecificNeed.module.css'
import { useNavigate } from "react-router-dom";


export const ClientSpecificNeed = () => {
    
    const modal = useSelector(state => state.modal)
    const user = useSelector(state => state.globalUserGlobalStorage)
    const navigate = useNavigate()

    const [input, setInput] = useState({
        userId: user?.id,
        name: "",
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
        try {
            dispatch(newEspecificalNeed(input))
            // await axios.post('http://localhost:3001/clientNeeds', input)

            Swal.fire({
                icon: 'success',
                title: 'Publicacion creada!',
                showConfirmButton: true,
                // timer: 1500
            })
            dispatch(showFormClientNeed("notshow"))
            dispatch(getClientNeedsById(user.id))
            
            stateReset()

            navigate('/clients/'+ user.id)
            
        } catch ( error ) {
            console.log( error.message )
        }
    }

    function stateReset() {
        setInput({
            ...input,
            name:'',
            description:'',
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
                    <form onSubmit={postNeed}>
                        <div className="row">
                            <div className={"col-12" && s.container_filter}>
                                <h1>Solicitá tu servicio</h1>
                                <div className="input-group mb-3">
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

                                <div className="form-group">
                                    <label
                                        htmlFor="exampleFormControlTextarea1">
                                        Descripción del servicio
                                    </label>
                                    <textarea
                                        type='text'
                                        name='description'
                                        value={ input.description }
                                        onChange={ onChangeForm }
                                        className="form-control z-depth-1"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                    >
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={` "btn btn-primary btn-lg btn-block" s.container_filterButton`}
                        >
                            Enviar Solicitud
                        </button>
                    </form>
                </div>

            </div>

        </>
            
    )
}
