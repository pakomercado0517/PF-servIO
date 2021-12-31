import React, { useEffect } from 'react'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import s from './styles/Search.module.css'
import { useDispatch, useSelector } from 'react-redux';
import {searchByName, getAllProfessionals, searchBar } from '../redux/actions'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useGlobalStorage } from '../hooks/useGlobalStorage';

const Search = () => {
  const [switcheo2] = useGlobalStorage("switcheo", null)
    const display = useSelector(state => state.professionals)
    const dispatch = useDispatch()
    const[name, setName]= useState('')
    console.log(name)
    // useEffect(()=>{
    //     if (input.name) {
    //         dispatch(searchByName(input.name))
    //     } else {
    //         dispatch(getAllProfessionals())
    //     }
    // }, [dispatch, input])

    useEffect(() => {
      dispatch(searchBar(name))
    },[name])

    // //* BORRAR EL ESTADO CUANDO EL INPUT ESTA SIENDO BORRANDO
    // function handleName (e) {
    //     setInput({...input, name:e.target.value})
    // }

    // function clearInput () {
    //     setInput("")
    // }
    // function selectedOption(item){
    //     setInput({...input, name: item.first_name})
    // }

    return (
        <div>
            <div style={{width: 280}}>
                    {/* <ReactSearchAutocomplete
                        items={display}
                        // onSearch={handleName}
                        setSearchString={handleName}
                        onClear={clearInput}
                        inputSearchString={input.name}
                        onSelect={selectedOption}
                        fuseOptions={{ keys: ["first_name", "last_name", "city", "state"] }}
                        //* PODER HACER UNA BUSQUEDA DE LOS DEMAS CAMPOS
                        resultStringKeyName="first_name"
                        // resultStringKeyName="last_name"
                        // resultStringKeyName="city"
                        // resultStringKeyName="state"
                        placeholder='Busca un tecnico/servicio'
                        styling={{
                            height: "35px",
                            border: "0px",
                            borderRadius: "5px",
                            //   backgroundColor: "white",
                            //   boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
                            //   hoverBackgroundColor: "#eee",
                            //   color: "#212121",
                            fontSize: "14px",
                            fontFamily: "Poppins",
                            //   iconColor: "grey",
                            //   lineColor: "rgb(232, 234, 237)",
                            //   placeholderColor: "grey",
                        }}
                    /> */}
                    <input
                type="text"
                placeholder={switcheo2 === 'professional' ? "Busca un tecnico": 'Busca trabajo'}
                value={name}
                onChange={e => {setName(e.target.value)}}
                // className={style.input}
            />
                </div>
        </div>
    )
}

export default Search;
