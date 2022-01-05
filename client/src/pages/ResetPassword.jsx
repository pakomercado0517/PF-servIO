import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import s from './styles/ForgetPassword.module.css'
import { validarToken, newPassword } from '../redux/actions';

export default function ResetPassword() {
  const navigate = useNavigate()
  
  const dispatch = useDispatch()
  const [password, setPassword] = useState({
    password1 : '',
    password2 : '',
  })

  // const token = useSelector(state => state.validarToken)
  const a = useSelector(state => state.validarToken)
  console.log(password)
  // const handleChange = (e) =>{
  //   setEmail(e.target.value)
  // }
  const {token} = useParams()
  console.log(token)

  const onSubmit = () => {
    if(password.password1 === password.password2){
      dispatch(newPassword(password.password1.toString(), token))
    }else{
      alert('Los password no coinciden')
    }
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
                <h2>Reestablece Password</h2>
            </div>
            <form>
                <div >
                    <label>Por favor inserta tu Password</label>
                    <input
                        type='text'
                        // value={email}
                        placeholder='Password Nuevo'
                        onChange={(e) => setPassword({...password, password1: e.target.value})}
                    />
                </div>
                <div >
                    <label>Por favor repite tu Password</label>
                    <input
                        type='text'
                        // value={email}
                        placeholder='Repite Password Nuevo'
                        onChange={(e) => setPassword({...password, password2: e.target.value})}
                    />
                </div>
                <input type='button' value='Recuperar Password' onClick={() => onSubmit()}/>
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