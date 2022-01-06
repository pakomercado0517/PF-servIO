import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import s from './styles/ForgetPassword.module.css'
import { validarToken, activarCuenta } from '../redux/actions';

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
        <div>
          {a.data === true ?
            <>
            <div >
                <h2>Activar Cuenta</h2>
            </div>
            <form onSubmit={() => onSubmit()}>
                <input type='button' value='Verificar Cuenta' onClick={() => onSubmit()}/>
            </form>
            </> 
            : 
            // navigate(`/`)
            <p>INVALID TOKEN</p>
          }
        </div>
    </div>
)
}