import React from 'react';
import s from './styles/Registration.module.css';
import logo from '../img/logo.png';

export default function Registration() {
    return (
        <div className={s.container}>
            <div className={s.container_img}>
                <p>Se parte de nuestra plataforma registrate ya y disfruta!</p>  
            </div>
            <div className={s.container_registro}>
                <div className={s.conteiner_registro_titulo}>
                    <h2>Registro</h2>
                    <img src={logo} alt="Logo" />
                </div>
                <div className={s.from}>
                    <from className={s.from_1}>
                        <div className={s.from_1_inLa}>
                            <input type="text" />
                            <label htmlFor="">Nombre</label>
                        </div>
                        <div  className={s.from_1_inLa}>
                            <input type="text" />
                            <label htmlFor="">E-mail</label>
                        </div>
                        <div  className={s.from_1_inLa}>
                            <input type="text" />
                            <label htmlFor="">Password</label>
                        </div>
                        <div  className={s.from_1_inLa}>
                            <input type="text" />
                            <label htmlFor="">Repeat-Password</label>
                        </div>
                        <div  className={s.from_1_inLa}>
                            <input type="text" />
                            <label htmlFor="">DNI</label>
                        </div>
                        <div>
                            <input type="checkbox" />
                            <label htmlFor="">Profesional</label>
                            <input type="checkbox" />
                            <label htmlFor="">Cliente</label>
                        </div>
                        <div>
                            <select >
                                <option value="value1">Mar del Plata, Bs As, Argentina</option>
                                <option value="value2">Rosario, Bs As, Argentina</option>
                                <option value="value3">Value 3</option>
                            </select>  
                        </div>
                        <div>
                            <input type="text" />
                            <button>+</button>
                        </div>
                        
                        <button className={s.from_1_btn}>Registrarse</button>
                    </from>
                </div>
            </div>
        </div>
    )
}
