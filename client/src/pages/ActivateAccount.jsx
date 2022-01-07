import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import s from './styles/ActivateAccount.module.css'
import { validarToken, activarCuenta } from '../redux/actions';
import albañil from '../img/albañil.svg';
import electricista from '../img/electricista1.png';
import plomero from '../img/plomero.svg';


export default function ResetPassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const token = useSelector(state => state.validarToken)
  const a = useSelector(state => state.validarToken)
  const b = useSelector(state => state.message)
  console.log(a)
  // const handleChange = (e) =>{
  //   setEmail(e.target.value)
  // }
  const {token} = useParams()

  const onSubmit =  () => {
    dispatch(activarCuenta(token))
    navigate('/login')
      Swal.fire({
        icon: 'success',
        title: 'Se ha activado tu cuenta, por favor Inicia Sesion',
        showConfirmButton: true,
        // timer: 1500,
        showCloseButton: true
    });
  }

  useEffect(() => {
    dispatch(validarToken(token))
  },[token])

  // console.log(email)
  return (
    <div>
        <div className={s.page}>
          {a.data === true ?
            <>
            

                <h2 className={s.tittle}>Activar Cuenta</h2>
            <div className={ s.div_principal__second }>
                <div class={s.slider}>
                    <ul>
                        <li>
                            <img src={albañil} alt=''/>
                        </li>
                        <li>
                            <img src={electricista} alt=''/>
                        </li>
                        <li>
                            <img src={plomero} alt=''/>
                        </li>
                    </ul>
                </div>
            </div>

                <input type='button' value='Click para Activar tu Cuenta' className={s.button} onClick={() => onSubmit()}/>
            </> 
            : 
            // navigate(`/`)
            <p>INVALID TOKEN</p>
          }
        </div>
    </div>
)
}