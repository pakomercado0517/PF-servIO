import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { showFormClientNeed } from '../redux/actions'
import Swal from 'sweetalert2'

import s from './styles/ClientSpecificNeed.module.css'


export const ClientSpecificNeed = () => {
    
    const modal = useSelector(state => state.modal)
    // console.log('client modal==>',modal)
    const user = !localStorage.getItem ? null: JSON.parse(localStorage.getItem("user"))
    // console.log('client user==>',user.cookies.userId)
    const [input, setInput] = useState({
        userId: user? user.cookies.userId:"",
        name: "",
        description: "",
        status: "in offer"
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
            const post = await axios.post('http://localhost:3001/clientNeeds', input)
            .then(() => {
                const fondo = document.getElementById("fondo-form-client-need")
                fondo.style.top = "-100vh"
                
                Swal.fire({
                    icon: 'success',
                    title: 'Publicacion creada!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            stateReset()
            console.log( 'post',post )
            
        } catch ( error ) {
            console.log( error.message )
        }
    }

    function stateReset() {
        setInput({
            name:'',
            description:'',
            status: ''
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
                                        for="exampleFormControlTextarea1">
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
