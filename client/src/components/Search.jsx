import React, { Fragment, useEffect, useRef  } from 'react'
import { useState } from 'react'
// import { FiSearch } from 'react-icons/fi'
import s from './styles/Search.module.css'
import { useDispatch, useSelector } from 'react-redux';
import {searchByName, getAllProfessionals, searchBar } from '../redux/actions'
// import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useGlobalStorage } from '../hooks/useGlobalStorage';

const Search = () => {
  const [switcheo2] = useGlobalStorage("switcheo", null)
    const needs = useSelector(state => state.professionalsFilter)
    const professionals = useSelector(state => state.clientsFilter)
    console.log(professionals)
    const dispatch = useDispatch()
    const[name, setName]= useState('')
    // console.log(name)
    const autocompleteProfessionals = () => {
      let filtered = [];
      for(let i = 0; i < needs.length; i++){
        if(filtered.indexOf(needs[i].name) === -1){
          filtered.push(needs[i].name);
        }
      }
      return filtered
    }

    const autocompleteNeeds = () => {
      let filtered = [];
      for(let i = 0; i < professionals.length; i++){
        if(filtered.indexOf(professionals[i].first_name) === -1){
          filtered.push(professionals[i].first_name)
        }
      }
      return filtered
    }
    const autocomplete = switcheo2 === 'professional' ? autocompleteNeeds().slice(0,6) : autocompleteProfessionals().slice(0,6)
    console.log(autocomplete)
    // console.log(autocompleteNeeds())
    // console.log(autocompleteProfessionals())
    useEffect(() => {
      dispatch(searchBar(name))
      autocompleteNeeds()
      autocompleteProfessionals()
    },[name])



    return (
        <div>
            <div >
              <input
                type="text"
                placeholder={switcheo2 === 'professional' ? "    Busca un tecnico": '    Busca trabajo'}
                value={name}
                onChange={e => {setName(e.target.value)}}
                className={s.input}
              />
              <div>

                {
                name !== '' ?
                autocomplete.map((e, index) =>{
                  if(e !== undefined || e !== null) {
                    return (<button onClick={() => setName(e)} key={ "auto" + index} >{e}</button>)
                  }
                }):<p></p>
                
                }

              </div>
                </div>
                
        </div>
    )
}

export default Search;
