import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { showFormProfessionalOffer } from '../redux/actions'
import Swal from 'sweetalert2'
import s from './styles/ProfessionalServiceOffer.modules.css'


export const ProfessionalOfferToClientNeed = () => {
    
    const modal = useSelector(state => state.modalProfessionalsOffer)
    console.log('professional modal==>',modal)
    
    const user = !localStorage.getItem ? null: JSON.parse(localStorage.getItem("user"))
    console.log('pro user==>',user)

    const [form, setform] = useState({
        name: "",
        description: "",
        materials:"",
        price: "",
    })

    function onChangeForm(e) {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const postNeed = async (e) =>{
        e.preventDefault()
        try {
            var obj = {
                ...form,
                location:"sadsadsa",
                price:1200,
                duration:12321,
                guarantee_time:123213,
                userId: user.cookies.userId
            }
            // console.log(obj)
            const post = await axios.post('http://localhost:3001/clientNeeds', obj)
            .then(() => {
                const fondo = document.getElementById("fondo-form-Professional-offer")
                fondo.style.top = "-100vh"
                
                Swal.fire({
                    icon: 'success',
                    title: 'Publicacion creada!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            console.log('post',post)

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

    function hideFormProfessionalOfferToClientNeed(){
        dispatch(showFormProfessionalOffer("notshow"))
    };
    
    return (
        <>
            <div id='fondo-form-Professional-offer' className={s.container}>
                <div 
                    className={s.container_background} 
                    onClick={hideFormProfessionalOfferToClientNeed}>
                </div>
                
                <div className={s.container_form}>
                    <form onSubmit={postNeed} action="">
                        <div className="row">
                            <div className={"col-12" && s.container_filter}>
                                <h1>Realizá tu oferta!</h1>
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        name='name'
                                        value={ form.name }
                                        onChange={ onChangeForm }
                                        className="form-control"
                                        aria-label="Default" aria-describedby="inputGroup-sizing-default"
                                        placeholder="Escribe aqui el titulo del trabajo..."
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
                                        value={ form.description }
                                        onChange={ onChangeForm }
                                        className="form-control z-depth-1"
                                        id="exampleFormControlTextarea1"
                                        placeholder="Sé preciso en tu descripción para llegar mejor al cliente..."
                                        rows="3"
                                    >
                                    </textarea>
                                </div>

                                <div>
                                    ¿Incluye material?   
                                    <input 
                                        type="radio" 
                                        value="yes" 
                                        name="materials"
                                        onChange={ onChangeForm }
                                    /> Si
                                    <input 
                                        type="radio" 
                                        value="no" 
                                        name="materials"
                                        onChange={ onChangeForm }
                                    /> No
                                </div>

                                <div className="input-group mb-3">
                                    <input
                                        type="number"
                                        name='price'
                                        value={ form.price }
                                        onChange={ onChangeForm }
                                        className="form-control"
                                        aria-label="Default" aria-describedby="inputGroup-sizing-default"
                                        placeholder="Ingresa un precio"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={` "btn btn-primary btn-lg btn-block" s.container_filterButton`}
                        >
                            Enviar Oferta
                        </button>
                    </form>
                </div>

            </div>

        </>
            
    )
}
