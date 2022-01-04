import React from 'react';
import s from './styles/Footer.module.css';
import img from '../img/ServOIOFooter.svg';
import {Link, NavLink} from 'react-router-dom';
import linkedin from '../img/linkedin.svg';
import github from '../img/github.svg'

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
                    <div className={s.contacto_integrante_img}>
                        <a href="https://www.linkedin.com/in/imanolcorimayo" target="_blank">
                            <img src={linkedin} alt='img'></img>
                        </a>
                        <a href="https://github.com/imanolcorimayo"  target="_blank">
                        <img src={github} alt='img'></img>
                    </a>
                    </div>
                    <p>Imanol Corimayo</p>
                </div>
                <div className={s.contacto_integrante}>
                <div className={s.contacto_integrante_img}>
                    <a href="https://www.linkedin.com/in/anabel-amad-/" target="_blank">
                        <img src={linkedin} alt='img'></img>
                    </a>
                    <a href="https://github.com/anamad8" target="_blank">
                        <img src={github} alt='img'></img>
                    </a>
                </div>
                    <p>Anabel Amad</p>
                </div>
                <div className={s.contacto_integrante}>
                <div className={s.contacto_integrante_img}>
                    <a href="https://www.linkedin.com/in/francisco-mercado-escalante/" target="_blank">
                        <img src={linkedin} alt='img'></img>
                    </a>
                    <a href="https://github.com/pakomercado0517"  target="_blank">
                        <img src={github} alt='img'></img>
                    </a>
                </div>
                    <p>Francisco Mercado Escalante</p>
                </div>
                <div className={s.contacto_integrante}>
                <div className={s.contacto_integrante_img}>
                    <a href="https://www.linkedin.com/in/guillermo-de-la-mora/" target="_blank">
                        <img src={linkedin} alt='img'></img>
                    </a>
                    <a href=""  target="_blank">
                        <img src={github} alt='img'></img>
                    </a>
                </div>
                    <p>Guillermo De la Mora</p>
                </div>
                <div className={s.contacto_integrante}>
                    <div className={s.contacto_integrante_img}>
                        <a href="http://www.linkedin.com/in/fernando-miguel-de-olazabal" target="_blank">
                            <img src={linkedin} alt='img'></img>
                        </a>
                        <a href="https://github.com/Ferdeolazabal"  target="_blank">
                            <img src={github} alt='img'></img>
                        </a>
                    </div>
                    <p>Fernando de Olazábal</p>
                </div>
                
            </div>
            <div className={s.fin}>
                <p >Copyright of ServIO 2022</p>
            </div>
            
        </div>
    )
}
