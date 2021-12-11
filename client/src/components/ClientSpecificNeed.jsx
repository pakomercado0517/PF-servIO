import React from 'react'
// import { Form, Button } from 'reactstrap'
import s from './styles/ClientSpecificNeed.modules.css'
// import img from '../img/brooke-cagle-tLG2hcpITZE-unsplash.jpg';

export const ClientSpecificNeed = () => {
    
    
    const filter = () =>{
        const fondo = document.getElementById("fondo-filter")
        const filter = document.getElementById("container-filter")
        fondo.style.right = "0px"
        filter.style.right = "0px"
    }
    
    
    return (
        <>
            <div className="container">
            {/* <button 
                onClick={ filter } 
                className={ ` "btn btn-primary btn-lg btn-block" s.container_filterButton` }
            >
            Solicitar Presupuesto
            </button> */}
                <div className="row">
                    <div className={ `col-12 && s.container_filter` }>
                        <h1>Solicitá tu servicio</h1>
                        <div class="input-group mb-3">                            
                            <input 
                                type="text" 
                                class="form-control" 
                                aria-label="Default" aria-describedby="inputGroup-sizing-default"
                                placeholder="Escribe aqui el titulo del servicio requerido"
                            />
                            </div>

                        <div class="form-group">
                        <label 
                            for="exampleFormControlTextarea1">
                                Descripción del servicio
                        </label>
                        <textarea 
                            class="form-control z-depth-1" 
                            id="exampleFormControlTextarea1" 
                            rows="3"
                        >
                        </textarea>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={ filter } 
                    className={ ` "btn btn-primary btn-lg btn-block" s.container_filterButton` }
                >
                Enviar Solicitud
                </button>
            </div>
        </>
    )
}
