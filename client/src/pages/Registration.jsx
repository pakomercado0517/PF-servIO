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
                        <div className={s.from_1_inLa1}>
                            <input type="text" />
                            <label htmlFor="">Nombre</label>
                        </div>
                        <div  className={s.from_1_inLa2}>
                            <input type="text" />
                            <label htmlFor="">E-mail</label>
                        </div>
                        <div  className={s.from_1_inLa3}>
                            <input type="text" />
                            <label htmlFor="">Password</label>
                        </div>
                        <div  className={s.from_1_inLa4}>
                            <input type="text" />
                            <label htmlFor="">Repeat-Password</label>
                        </div>
                        <div  className={s.from_1_inLa5}>
                            <input type="text" />
                            <label htmlFor="">DNI</label>
                        </div>
                        <div className={s.from_1_inLa6}>
                            <input type="checkbox" />
                            <label htmlFor="">Profesional</label>
                        </div>
                        <div className={s.from_1_inLa_6}>                            
                            <input type="checkbox" />
                            <label htmlFor="">Cliente</label>
                        </div>
                        <div className={s.from_1_inLa7}>
                            <select >
                                <option value="value1">Mar del Plata, Bs As, Argentina</option>
                                <option value="value2">Rosario, Bs As, Argentina</option>
                                <option value="value3">Value 3</option>
                            </select>  
                        </div>
                        <div className={s.from_1_inLa_7}>
                            <select >
                                <option value="value1">Mar del Plata, Bs As, Argentina</option>
                                <option value="value2">Rosario, Bs As, Argentina</option>
                                <option value="value3">Value 3</option>
                            </select>  
                        </div>
                        <div className={s.from_1_inLa8}>
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
