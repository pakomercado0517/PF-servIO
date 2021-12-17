import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from 'axios'
import logo from '../img/ServIO.svg';

import { useDispatch, useSelector } from 'react-redux';

import s from './styles/Login.module.css'
import { getByUserId } from '../redux/actions';
import { useGlobalStorage } from '../hooks/useGlobalStorage';

export default function Login() {

    const user = useSelector(state => state.user)

    const navigate = useNavigate()
    const [ input, setInput ] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch()

    const [errors, setErrors] = useState({});
    const [globalUser, setGlobalUser] = useGlobalStorage("globalUser", "");

    const validate = (input) => {
        let errors = {};
        if (!input.email) {
            errors.email = 'e-mail is required';
        } else if (!/\S+@\S+\.\S+/.test(input.email)) {
            errors.email = 'e-mail is invalid';
        };

        if (!input.password) {
            errors.password = 'Password is required';
        } else if (!/(?=.*[0-9])/.test(input.password)) {
            errors.password = 'Password is invalid';
        }
        return errors;
    };

    const handleInputChange = function(e) {
        
        let objError = validate({
            ...input,
            [e.target.name]: e.target.value
        });
    
        setErrors(objError);
    
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };
    // console.log(setInput)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const post = await axios.post('http://localhost:3001/user/login', input)
            dispatch(getByUserId(post.data.id))

            console.log('post login',post)
            // console.log('post login data',post.data)
            // console.log('post login data',post.data.id)

            if( post.data === 'Has ingreado correctamente!!!') {
                Swal.fire({
                    icon: 'success',
                    title: 'Logged in',
                    showConfirmButton: false,
                    timer: 2500
                })
                navigate('/')
                try {
                    const user = await axios.get('http://localhost:3001/user/' + post.data.id)
                    // console.log(user.data)
                    setGlobalUser(user.data)
                    // console.log(globalUser)
                } catch (error) {
                    console.error(error)
                }
                
                console.log('post',post.data)
                console.log('post',post)

                // localStorage.setItem('user', JSON.stringify(post.data))
                // localStorage.setItem('prueba', JSON.stringify(post.data))
                console.log("userType: ", post.data)

                dispatch(getByUserId(post.data.id))

            } else if (post.data === 'Wrong passWord') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Wrong password',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (post.data === 'Wrong mail') {
                Swal.fire({
                    icon: 'info',
                    title: 'Wrong mail',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            
        } catch (error) {
            console.log(error.message)
        }
    };


    useEffect(() => {
        return console.log('user!!!', user)
            }, [user])

    return (
        <div className={ s.login_master }>
            <div className={ s.login_form }>
                <form onSubmit={ handleSubmit } >
                <div className={ s.login_logo}><img src={ logo } alt="logo"/></div>

                    <div className="row mb-2">
                        <input 
                            className={`form-control && ${errors.email && 'danger'}`}
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={handleInputChange}
                            autoComplete='off'
                        />
                        {errors.email && (<p className="danger">{errors.email}</p>)}
                        <label 
                            className="form-label" 
                            // for="form<2Example1"
                        >
                        </label>
                    </div>

                    <div clasName="row mb-2">
                        <input
                            className={`form-control && ${errors.password && 'danger'}`}
                            type="password"
                            name="password"
                            placeholder='Password'
                            value={input.password}
                            onChange={handleInputChange} 
                        />
                        <label 
                            className="form-label" 
                        >
                        </label>
                    </div>

                    <div className="row mb-2">
                        <div className="col d-flex justify-content-center">
                            <div className="form-check">
                                {/* <input
                                    className="form-check-input"
                                    type="checkbox"
                                    // value={false}
                                    id="form2Example34"
                                /> */}
                                {/* <label 
                                    className="form-check-label" 
                                    checked autoComplete="off"
                                >
                                Recordar mi sesión
                                </label> */}
                            </div>
                        </div>

                    <div className="row mb-3">
                        {/* <div className="col d-flex justify-content-center">
                            <a href="#!">¿Olvidaste tu contraseña?</a>
                        </div> */}
                    </div>
                    </div>

                    <div className="row mb-1">
                        <button 
                            type="submit" 
                            className = "btn btn-primary mx-auto block mb-4"
                        >
                            Iniciar sesión
                        </button>
                    </div>

                    <div className="text-center row mb-1">
                        <p>¿Aún no te registras? <a href="/register">Registrate!</a></p>
                        {/* <p>O regístrate con:</p> */}

                        {/* <button 
                            type="button" 
                            className="btn btn-lg btn-google btn-block text-uppercase btn-outline" href="#">
                            <img src="https://img.icons8.com/color/40/000000/google-logo.png" alt="google"/> 
                        </button> */}
                    </div>

                </form>
            </div>

            <div className={ s.login_image }></div>
        </div>  
    )
}