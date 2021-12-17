import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { showFormProfessionalOffer } from '../redux/actions'
import Swal from 'sweetalert2'
import s from './styles/ProfessionalOfferToClientNeed.module.css'

export const ProfessionalOfferToClientNeed = () => {
    

    const dispatch = useDispatch()
    const { modalProfessionalsOffer } = useSelector(state => state)
    // console.log('professional modal==>',modalProfessionalsOffer)
    
    const user = !localStorage.getItem ? null: JSON.parse(localStorage.getItem("user"))
    console.log('pro user==>',user)

    const [form, setform] = useState({
        name: "",   // campo no seteado en el modelo de DB
        description: "",
        duration: "",
        price: "",
        materials:"",   // BUG ==> input no marca opcion al 1° click sino al 2°
        guarantee_time: "",
        // ProfessionalId: user?.cookies.userId,
        ClientNeedId: "",
    })

    function onChangeForm(e) {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
        console.log('form',form)
        console.log('tarjet name',e.target.name)
        console.log('tarjet value',e.target.name)
    }

    const postNeed = async (e) =>{
        e.preventDefault()
        try {
            
            // const post = await axios.post('http://localhost:3001/clientNeeds', form)
            // .then(() => {
                const fondo = document.getElementById("fondo-form-Professional-offer")
                fondo.style.top = "-100vh"
                
                Swal.fire({
                    icon: 'success',
                    title: 'Oferta enviada!',
                    showConfirmButton: false,
                    timer: 1500
                })
            // })
            // console.log('post',post)

        } catch (error) {
            console.error("message: ", error)
        }
    }


    useEffect(() => {
        if (modalProfessionalsOffer === "show") {
            const fondo = document.getElementById("fondo-form-Professional-offer")
            fondo.style.top = "0vh"
        } else if(modalProfessionalsOffer === "notshow") {
            const fondo = document.getElementById("fondo-form-Professional-offer")
            fondo.style.top = "-100vh"
        }
    }, [modalProfessionalsOffer])

    function hideFormProfessionalOfferToClientNeed(){
        dispatch(showFormProfessionalOffer("notshow"))
    };
    
    return (
        <>
            <div id='fondo-form-Professional-offer' className={ s.container }>
                <div 
                    className={s.container_background} 
                    onClick={hideFormProfessionalOfferToClientNeed}>
                </div>
                
                <div className={s.container_form}>
                    <form onSubmit={postNeed} action="">
                        <div className="row">
                            <div className={"col-12" && s.container_filter}>
                                <h1>Realizá tu oferta!</h1>
                                {/* <div className="input-group mb-1">
                                    <input
                                        type="text"
                                        name='name'
                                        value={ form.name }
                                        onChange={ onChangeForm }
                                        className="form-control"
                                        aria-label="Default" aria-describedby="inputGroup-sizing-default"
                                        placeholder="Escribe aqui el titulo del trabajo..."
                                    />
                                </div> */}

                                <div className="form-group mb-2">
                                    <label
                                        className="mb-2"
                                        forhtml="exampleFormControlTextarea1">
                                        Descripción del servicio
                                    </label>
                                    <textarea
                                        type='text'
                                        name='description'
                                        value={ form.description }
                                        onChange={ onChangeForm }
                                        className="form-control z-depth-1 input-group mb-1"
                                        id="exampleFormControlTextarea1"
                                        placeholder="Sé preciso en tu descripción para llegar mejor al cliente..."
                                        rows="3"
                                    >
                                    </textarea>
                                </div>

                                <div className="">
                                    ¿Incluye material?   
                                    <input
                                        className="input"
                                        type="radio" 
                                        value="yes" 
                                        name="materials"
                                        onChange={ e=> onChangeForm(e) }
                                    /> Si
                                    <input
                                        className="input"
                                        type="radio" 
                                        value="no" 
                                        name="materials"
                                        onChange={ e=> onChangeForm(e) }
                                    /> No
                                </div>
                                <div className="row mt-2">

                                <div className="col input-group mb-2">
                                    <input
                                        type="number"
                                        name='guarantee_time'
                                        value={ form.guarantee_time }
                                        onChange={ onChangeForm }
                                        className="form-control"
                                        aria-label="Default" aria-describedby="inputGroup-sizing-default"
                                        placeholder="Días de garantía"
                                    />
                                    
                                </div>

                                <div className="col input-group mb-2">
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
                                
                            </div>
                        </div>
                        <div className="row">
                        <button
                            type="submit"
                            className={` "btn btn-primary btn-lg btn-block" s.container_filterButton`}
                        >
                            Enviar Oferta
                        </button>
                        </div>
                    </form>
                </div>

            </div>

        </>
            
    )
}
