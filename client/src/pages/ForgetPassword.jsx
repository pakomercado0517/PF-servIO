import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import s from './styles/ForgetPassword.module.css'
import { resetPassword, existentUser } from '../redux/actions';
import img from '../img/recuperar.svg'

export default function ForgetPassword() {
  
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [submit2, setsubmit2] = useState(true)
  const a = useSelector(state => state.resetPassword.data)
  // console.log(a)
  // dispatch(existentUser(email))
  const z = useSelector(state => state.z)
  // console.log(z, submit2)
  const navigate = useNavigate()

  const handleChange = (e) =>{
    setEmail(e.target.value)
  }

  const onSubmit = () => {
    setsubmit2(z)
    console.log(z === false)
    if(z === false){
      dispatch(resetPassword({email}))
      Swal.fire({
        icon: 'success',
        title: 'Se ha enviado un correo para reestablecer Password',
        showConfirmButton: true,
        timer: 1500,
        showCloseButton: true
    });
      navigate('/')
      
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Correo no registrado',
        showConfirmButton: true,
        timer: 1500,
        showCloseButton: true
    });
    }
    
  }
  useEffect(() => {
    
    dispatch(existentUser(email))
  },[email,onSubmit])



  return (
    <div className={s.conteiner}>
        <div className={s.img}>
          <img src={img} alt="" />
        </div>
        <div className={s.contenido}>
            <div className={s.titulo}>
                <h2>Recupera tu Password</h2>
            </div>
            <form onSubmit={() => onSubmit()}>
                <div className={s.from}>
                    <label>Por favor inserta tu correo:</label>
                    <input
                        className="form-control"
                        type='text'
                        value={email}
                        placeholder='Email'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <input type='button' className={s.btnPass } value='Recuperar Password' onClick={onSubmit}/>
            </form>
        </div>
    </div>
)
}