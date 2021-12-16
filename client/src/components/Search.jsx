import React, { useEffect } from 'react'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import s from './styles/Search.modules.css'
import {useDispatch, useSelector} from 'react-redux';
import {searchByName, getAllProfessionals, } from '../redux/actions'


export const Search = () => {

    const dispatch = useDispatch()
    const[input, setInput]= useState({
        name:""
    })


    useEffect(()=>{
        if (input.name) {
            dispatch(searchByName(input.name))
        } else {
            dispatch(getAllProfessionals())
        }
    }, [dispatch, input.name])

    function handleName (e) {setInput({...input, name:e.target.value})}

    return (
        <div>
            <div className={s.container__input}>
                <FiSearch/>
                    <input 
                        className={s['container__input--text']}
                        type='text'
                        placeholder="Buscar Tecnico"
                        onChange={handleName} 
                        value={input.name}>
                    </input>
                </div>
        </div>
    )
}
