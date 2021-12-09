import React from 'react';
import NavBar from '../components/NavBar';
import s from './styles/Nosotros.module.css';
import img1 from '../img/svg.svg';
import img2 from '../img/svg2.svg';

export default function nosotros() {
    return (
        <div>
            <NavBar/>
            <div className={s.conteiner}>
                <div className={s.conteiner_titulo}>
                    <h2>¿Que hacemos en ServIO? </h2>
                    <p>Basado en la necesidad de evolucionar la forma en que se realizan las 
                        operaciones de contratación , a través de la plataforma Servio te 
                        facilitamos la tarea de buscar profesionales en diferentes rubros, 
                        como ser plomeros, electricistas, personal doméstico, etc. Te brindamos 
                        las herramientas para contactarte con el profesional y coordinar el 
                        trabajo. Si eres profesional te brindamos la posibilidad de publicar tus 
                        servicios a través de nuestra plataforma para que posibles clientes puedan 
                        contratarte.</p>
                        <img src={img1} alt="" />
                </div>
                <div>
                    <h2>¿Cómo funciona ServIO  para los usuarios?</h2>
                    <p>Describes tu proyecto o necesidad de reparación. Comparas los perfiles
                        profesionales propuestos. Conversas los perfiles profesionales
                        propuestos. Calificas el trabajo realizado, aportando así a la comunidad.
                        Encontrar fácil y rápidamente al profesional adecuado. Evitar riesgos 
                        asociados con permitir el ingreso de personas desconocidas al hogar.
                        Pagar un precio justo, sin sorpresas ni sobre costos.</p>
                        <img src={img2} alt="" />
                </div>
            </div>
        </div>
    )
}
