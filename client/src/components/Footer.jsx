import React from 'react';
import s from './styles/Footer.module.css';
import img from '../img/ServOIOFooter.svg';
import {Link, NavLink} from 'react-router-dom';

export default function footer() {
    return (
        <div>
            <div className={s.titulo}>
                <img src={img} alt='img'></img>
            </div>
            <div className={s.sutTitulo}>
                <p>CONTACTANOS EN LINKEDIN</p>
            </div>
            <div className={s.contacto}>
                <div className={s.contacto_integrante}>
                    <svg 
                        stroke="currentColor" 
                        fill="currentColor" 
                        strokeWidth="0" 
                        viewBox="0 0 24 24" 
                        className="NavBar_iconLogin__3M-LE" 
                        height="1em" 
                        width="1em" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z"></path>
                    </svg>
                    <a href="https://www.linkedin.com/in/imanolcorimayo">
                    <p>Imanol Corimayo</p>
                    </a>
                </div>
                <div className={s.contacto_integrante}>
                    <svg 
                        stroke="currentColor" 
                        fill="currentColor" 
                        strokeWidth="0" 
                        viewBox="0 0 24 24" 
                        className="NavBar_iconLogin__3M-LE" 
                        height="1em" 
                        width="1em" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z"></path>
                    </svg>
                    <a href="https://www.linkedin.com/in/anabel-amad-/">
                    <p>Anabel Amad</p>
                    </a>
                </div>
                <div className={s.contacto_integrante}>
                    <svg 
                        stroke="currentColor" 
                        fill="currentColor" 
                        strokeWidth="0" 
                        viewBox="0 0 24 24" 
                        className="NavBar_iconLogin__3M-LE" 
                        height="1em" 
                        width="1em" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z"></path>
                    </svg>
                    <a href="https://www.linkedin.com/in/francisco-mercado-escalante/">
                    <p>Francisco Mercado Escalante</p>
                    </a>
                </div>
                <div className={s.contacto_integrante}>
                    <svg 
                        stroke="currentColor" 
                        fill="currentColor" 
                        strokeWidth="0" 
                        viewBox="0 0 24 24" 
                        className="NavBar_iconLogin__3M-LE" 
                        height="1em" 
                        width="1em" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z"></path>
                    </svg>
                    <a href="https://www.linkedin.com/in/guillermo-de-la-mora/">
                    <p>Guillermo De la Mora</p>
                    </a>
                </div>
                <div className={s.contacto_integrante}>
                    <svg 
                        stroke="currentColor" 
                        fill="currentColor" 
                        strokeWidth="0" 
                        viewBox="0 0 24 24" 
                        className="NavBar_iconLogin__3M-LE" 
                        height="1em" 
                        width="1em" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z"></path>
                    </svg>
                    <a href="http://www.linkedin.com/in/fernando-miguel-de-olazabal">
                        <p>Fernando de Olazábal</p>
                    </a>
                </div>
                
            </div>
            <div className={s.fin}>
                <p >Copyright of ServIO 2021</p>
            </div>
            
        </div>
    )
}
