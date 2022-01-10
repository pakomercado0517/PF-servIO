import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import s from './styles/ForgetPassword.module.css'
import { validarToken, newPassword } from '../redux/actions';
import img from '../img/recuperar.svg'

export default function ResetPassword() {
  const navigate = useNavigate()
  
  const dispatch = useDispatch()
  const [password, setPassword] = useState({
    password1 : '',
    password2 : '',
  })

  // const token = useSelector(state => state.validarToken)
  const a = useSelector(state => state.validarToken)
  const b = useSelector(state => state.message)
  console.log(b)
  // const handleChange = (e) =>{
  //   setEmail(e.target.value)
  // }
  const {token} = useParams()
  console.log(token)

  const onSubmit =  () => {
    if(password.password1 === password.password2){
      let newPass= password.password1.toString()
      dispatch( newPassword(newPass, token))
      navigate('/login')
      Swal.fire({
        icon: 'success',
        title: 'Se ha modificado la contraseña correctamente, por favor Inicia Sesion',
        showConfirmButton: true,
        // timer: 1500,
        showCloseButton: true
    });
    }else{
      Swal.fire({
        icon: 'error',
        title:'Los password no coinciden',
        showConfirmButton: true,
        // timer: 1500,
        showCloseButton: true
    });
  }
}

  useEffect(() => {
    dispatch(validarToken(token))
  },[token])

  // console.log(email)
  return (
    <div className={s.conteiner}>
      <div className={s.img}>
          <img src={img} alt="" />
        </div>
        <div className={s.contenido}>
          {a.data === true ?
            <>
            <div className={s.titulo} >
                <h2>Reestablece Password</h2>
            </div>
            <form onSubmit={() => onSubmit()} className={s.from}>
                <div >
                    <label>Por favor inserta tu Password</label>
                    <input
                        className="form-control"
                        type='text'
                        // value={email}
                        placeholder='Password Nuevo'
                        onChange={(e) => setPassword({...password, password1: e.target.value})}
                    />
                </div>
                <div >
                    <label>Por favor repite tu Password</label>
                    <input
                        className="form-control"
                        type='text'
                        // value={email}
                        placeholder='Repite Password Nuevo'
                        onChange={(e) => setPassword({...password, password2: e.target.value})}
                    />
                </div>
                <input type='button'  className={s.btnPass } value='Recuperar Password' onClick={() => onSubmit()}/>
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