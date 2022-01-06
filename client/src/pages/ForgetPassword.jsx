import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import s from './styles/ForgetPassword.module.css'
import { resetPassword } from '../redux/actions';
export default function ForgetPassword() {
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [submit2, setsubmit2] = useState(true)
  const a = useSelector(state => state.resetPassword.data)
  console.log(a)
  const navigate = useNavigate()

  const handleChange = (e) =>{
    setEmail(e.target.value)
  }

  const onSubmit = () => {
    setsubmit2(!submit2)
    if(a.message === 'Se envio un mensaje a tu correo'){
      navigate('/')
      Swal.fire({
        icon: 'success',
        title: a.message,
        showConfirmButton: true,
        // timer: 1500,
        showCloseButton: true
    });
    }else{
      Swal.fire({
        icon: 'error',
        title: a.message,
        showConfirmButton: true,
        // timer: 1500,
        showCloseButton: true
    });
    }
    
  }

  useEffect(() => {
    dispatch(resetPassword({email}))
  },[email])

  console.log(email)
  return (
    <div>
        <div >
            <div >
                <h2>Recupera tu Password</h2>
            </div>
            <form onSubmit={() => onSubmit()}>
                <div >
                    <label>Por favor inserta tu correo:</label>
                    <input
                        type='text'
                        value={email}
                        placeholder='Email'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <input type='button' value='Recuperar Password' onClick={() => onSubmit()}/>
            </form>
        </div>
    </div>
)
}