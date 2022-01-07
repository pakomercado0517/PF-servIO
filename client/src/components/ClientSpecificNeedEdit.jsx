import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { putClientNeeds } from '../redux/actions'
import Swal from 'sweetalert2'

import s from './styles/ClientSpecificNeedEdit.module.css'


export const ClientSpecificNeedEdit = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const detailsClientNeed = useSelector(state => state.detailsClientNeed)

    const [input, setInput] = useState({
        userId: detailsClientNeed?.id,
        name: detailsClientNeed?.name,
        description: detailsClientNeed?.description,
    })

    function onChangeForm(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const postNeed = async (e) =>{
        e.preventDefault()
        try {
            dispatch(putClientNeeds(input))
            Swal.fire({
                icon: 'success',
                title: 'Publicacion editada!',
                showConfirmButton: true,
                // timer: 1500
            })
            navigate(`/clients/${detailsClientNeed?.UserId}`)
            
        } catch ( error ) {
            console.log( error.message )
        };
    };

    return (
        <>
            <div id='fondo-form-client-need' className={s.container}>
                <div className={s.a}></div>
                <div className={s.container_form}>
                <div className="d-flex flex-row-reverse bd-highlight">
                        <button 
                        className="text-center btn btn-warning" 
                        onClick={()=>{window.history.back()}}
                        >
                            Volver
                        </button>
                    </div>
                    <form onSubmit={postNeed}>
                        <div className="row">
                            <div className={"col-12"}>
                                <h1>Editá tu servicio</h1>
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
                        <div className="row">
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
