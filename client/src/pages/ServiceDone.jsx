import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import s from './styles/ActivateAccount.module.css'
import { validarTokenConfirmDone, culminarServicio } from '../redux/actions';


export default function ResetPassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const token = useSelector(state => state.validarToken)
  const a = useSelector(state => state.validarTokenConfirm)
  const b = useSelector(state => state.message)
  console.log(a)
  // const handleChange = (e) =>{
  //   setEmail(e.target.value)
  // }
  const {token} = useParams()

  const onSubmit =  () => {
    dispatch(culminarServicio(token))
    navigate('/')
      Swal.fire({
        icon: 'success',
        title: 'Se ha confirmado su servicio. Gracias por su preferencia', 
        showConfirmButton: true,
        // timer: 1500,
        showCloseButton: true
    });
  }

  useEffect(() => {
    dispatch(validarTokenConfirmDone(token))
  },[token])

  // console.log(email)
  return (
    <div>
        <div className={s.page}>
          {a.data === true ?
            <>
            

                <h2 className={s.tittle}>Confirmar pedido culminado</h2>
            {/* <div className={ s.div_principal__second }>
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
            </div> */}

                <input type='button' value='Confirma Pedido Terminado' className={s.button} onClick={onSubmit}/>
                {/* <input type='button' value='Rechaza Pedido Terminado' className={s.button} onClick={() => onSubmit()}/> */}
            </> 
            : 
            // navigate(`/`)
            <p>INVALID TOKEN</p>
          }
        </div>
    </div>
)
}