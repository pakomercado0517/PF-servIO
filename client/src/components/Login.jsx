import React, { useState } from 'react'
import logo from '../img/ServIO.svg';

import s from './styles/Login.module.css'

export default function Login() {
    
    const [ input, setInput ] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

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
    console.log(setInput)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(input)
    };

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
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    // value={false}
                                    id="form2Example34"
                                />
                                <label 
                                    className="form-check-label" 
                                    checked autoComplete="off"
                                >
                                Recordar mi sesión
                                </label>
                            </div>
                        </div>

                    <div className="row mb-3">
                        <div className="col d-flex justify-content-center">
                            <a href="#!">¿Olvidaste tu contraseña?</a>
                        </div>
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
                        <p>O regístrate con:</p>

                        <button 
                            type="button" 
                            className="btn btn-lg btn-google btn-block text-uppercase btn-outline" href="#">
                            <img src="https://img.icons8.com/color/40/000000/google-logo.png" alt="google"/> 
                        </button>
                    </div>

                </form>
            </div>

            <div className={ s.login_image }></div>
        </div>  
    )
}