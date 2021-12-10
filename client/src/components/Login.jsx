import React from 'react'
import logo from '../img/ServIO.svg';

import s from './styles/Login.module.css'

export default function Login() {
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit')
    }
    
    return (
        <div className={ s.login_master }>
            <div className={ s.login_form }>
                <form>
                <div className={ s.login_logo}><img src={ logo } alt="logo"/></div>
                

                
                {/* <!-- Email input --> */}
                    <div class="row mb-2">
                        <input 
                            type="email" 
                            id="form2Example1" 
                            class="form-control" 
                            placeholder="Email"
                        />
                        <label 
                            class="form-label" 
                            for="form2Example1"
                        >
                        </label>
                    </div>

                {/* <!-- Password input --> */}
                    <div class="row mb-2">
                        <input 
                            type="password" 
                            id="form2Example2" 
                            class="form-control"
                            placeholder='Password'
                        />
                        <label 
                            class="form-label" 
                            for="form2Example2"
                        >
                        </label>
                    </div>

                {/* <!-- 2 column grid layout for inline styling --> */}
                    <div class="row mb-2">
                        <div class="col d-flex justify-content-center">
                        {/* <!-- Checkbox --> */}
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    // value={false}
                                    id="form2Example34"
                                />
                                <label 
                                    class="form-check-label" 
                                    for="form2Example34"
                                    checked autocomplete="off"
                                >
                                Recordar mi sesión
                                </label>
                            </div>
                        </div>

                    <div class="row mb-3">
                    <div class="col d-flex justify-content-center">
                        <a href="#!">¿Olvidaste tu contraseña?</a>
                    </div>
                            {/* <!-- Simple link --> */}
                    </div>
                </div>

                {/* <!-- Submit button --> */}
                    <div class="row mb-1">

                    <button 
                        type="submit" 
                        
                        // class="btn btn-primary btn mb-4"
                        class = "btn btn-primary mx-auto block mb-4"
                        // class='btn btn-primary btn-block btn-lg mx-auto  mb-4'
                        >
                        Iniciar sesión
                    </button>
                        </div>

                {/* <!-- Register buttons --> */}
                    <div class="text-center row mb-1">
                    <p>¿Aún no te registras? <a href="#!">Registrate!</a></p>
                    <p>ó registrate con:</p>

                    {/* <button 
                        type="button" 
                        class="btn btn-primary btn-floating mx-1">
                        <i class="fab fa-facebook-f"></i>
                    </button> */}

                    


                    <button 
                        // type="button" 
                        class="btn btn-lg btn-google btn-block text-uppercase btn-outline" href="#">
                        <img src="https://img.icons8.com/color/40/000000/google-logo.png" alt="google"/> 
                        {/* class="btn btn-primary btn-floating mx-1">
                        <i class="fab fa-google"></i> */}
                    </button>
{/* 
                    <button 
                        type="button" 
                        class="btn btn-primary btn-floating mx-1">
                        <i class="fab fa-twitter"></i>
                    </button> */}
{/* 
                    <button 
                        type="button" 
                        class="btn btn-primary btn-floating mx-1">
                        <i class="fab fa-github"></i>
                    </button> */}
                    </div>                
                </form>
            
            </div>
                

            <div className={ s.login_image }></div>
        </div>  
    )
}
