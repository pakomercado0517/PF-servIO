import React, { useEffect, useState } from 'react'
// import { Form, Button } from 'reactstrap'
import s from './styles/ClientSpecificNeed.module.css'

import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'

import { showFormClientNeed } from '../redux/actions'

import axios from 'axios'
// import img from '../img/brooke-cagle-tLG2hcpITZE-unsplash.jpg';

export const ClientSpecificNeed = () => {
    
    const modal = useSelector(state => state.modal)
    // const user = !localStorage.getItem ? null: JSON.parse(localStorage.getItem("user"))

    const [form, setform] = useState({
        description: "",
        name: "",
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
            // console.log(user)
            // const infoUser = await axios.get('http://localhost:3001/user/' + user.cookies.userId)
            // console.log(infoUser.data[0].first_name + " " + infoUser.data[0].last_name)
            // console.log(infoUser.data[0].city)
            // price, duration, guarantee_time.
            // let obj = {
            //     ...form,
            //     location: "ebgwre", 
            //     price: 65,
            //     duration: 654,
            //     guarantee_time: 51,
            //     materials: "true",
            //     professionalId: 2,
            //     status: "in offer"
            // }
            var obj = {
                name:"barrer",
                description:"asdasdasd",
                location:"sadsadsa",
                price:1200,
                duration:12321,
                guarantee_time:123213,
            }
            console.log(obj)
            const post = await axios.post('http://localhost:3001/clientNeeds', obj)
            console.log('post',post.data)

            // if( post.data.message === 'Logged') {

            //     localStorage.setItem('user', JSON.stringify(post.data))
            //     console.log("userType: ", post.data)

            //     Swal.fire({
            //         icon: 'success',
            //         title: 'Logged in',
            //         showConfirmButton: false,
            //         timer: 1500
            //     })
            //     navigate('/')
            //     // window.location.href = 'http://localhost:3000/'
            // } else if (post.data === 'Wrong passWord') {
            //     Swal.fire({
            //         icon: 'warning',
            //         title: 'Wrong password',
            //         showConfirmButton: false,
            //         timer: 1500
            //     })
            // } else if (post.data === 'Wrong mail') {
            //     Swal.fire({
            //         icon: 'info',
            //         title: 'Wrong mail',
            //         showConfirmButton: false,
            //         timer: 1500
            //     })
            // }
        } catch (error) {
            console.error("message: ", error)
        }
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
                    <form onSubmit={postNeed} action="">
                        <div className="row">
                            <div className={"col-12" && s.container_filter}>
                                <h1>Solicitá tu servicio</h1>
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        name='name'
                                        value={ form.titulo }
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
                                        value={ form.description }
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
