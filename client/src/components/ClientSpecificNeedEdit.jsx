import React, { useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { showFormClientNeed } from '../redux/actions'
import Swal from 'sweetalert2'

import s from './styles/ClientSpecificNeedEdit.module.css'


export const ClientSpecificNeedEdit = () => {
    
    const navigate = useNavigate()
    // const modal = useSelector(state => state.modal)
    const user = useSelector(state => state.globalUserGlobalStorage)
    // para editar publicacion
    const detailsClientNeed = useSelector(state => state.detailsClientNeed)
    console.log('ClientSpecificNeed -edit',detailsClientNeed)


    const [input, setInput] = useState({
        // userId: detailsClientNeed?.id,
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
            await axios.put(`http://localhost:3001/clientNeeds/${detailsClientNeed?.id}`, input)

            Swal.fire({
                icon: 'success',
                title: 'Publicacion editada!',
                showConfirmButton: true,
                // timer: 1500
            })
            navigate(`/clients/${detailsClientNeed?.UserId}`)
            // navigate(`/`)
            
        } catch ( error ) {
            console.log( error.message )
        }
    }

    // function stateReset() {
    //     setInput({
    //         name:'',
    //         description:'',
    //         status: ''
    //     })
    // }


    const dispatch = useDispatch()

    // useEffect(() => {
    //     if (modal === "show") {
    //         const fondo = document.getElementById("fondo-form-client-need")
    //         fondo.style.top = "0px"
    //     } else if("notshow") {
    //         const fondo = document.getElementById("fondo-form-client-need")
    //         fondo.style.top = "-100vh"
    //     }
    // }, [modal])

    // function hideFormClientNeed(){
    //     dispatch(showFormClientNeed("show"))
    // }
    
    return (
        <>
            <div id='fondo-form-client-need' className={s.container}>
                <div className={s.a}></div>
                <div className={s.container_form}>
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