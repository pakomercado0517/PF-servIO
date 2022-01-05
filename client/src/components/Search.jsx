import React, { Fragment, useEffect, useRef  } from 'react'
import { useState } from 'react'
// import { FiSearch } from 'react-icons/fi'
import s from './styles/Search.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { searchBar } from '../redux/actions'
// import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useGlobalStorage } from '../hooks/useGlobalStorage';


const Search = () => {
    const [switcheo2] = useGlobalStorage("switcheo", null)
    const needs = useSelector(state => state.professionalsFilter)
    const professionals = useSelector(state => state.clientsFilter)
    console.log(professionals)
    const dispatch = useDispatch()
    const[name, setName]= useState('')
    const[end, setEnd]= useState(false)
    const[autoNeeds, setAutoNeeds]= useState([])
    const[autoProfessionals, setautoProfessionals]= useState([])
    // const[name, setName]= useState('')
    console.log(name)

    const autocompleteProfessionals = () => {
      let filtered = [];
      for(let i = 0; i < needs.length; i++){
        if(filtered.indexOf(needs[i].name) === -1){
          filtered.push(needs[i].name);
        }
      }
      setAutoNeeds(filtered)
    }

    const autocompleteNeeds = () => {
      let filtered = [];
      for(let i = 0; i < professionals.length; i++){
        if(filtered.indexOf(professionals[i].first_name) === -1){
          filtered.push(professionals[i].first_name + " " + professionals[i].last_name)
        }
      }
      setautoProfessionals(filtered)
      
    }

    const onClick = (e) => {
      setName(e)
      setEnd(true)
      setAutoNeeds([])
      setautoProfessionals([])
    }
    const autocomplete = switcheo2 === 'professional' ? autoProfessionals.slice(0,6) : autoNeeds.slice(0,6)
    console.log(autocomplete)
    // console.log(autocompleteNeeds())
    // console.log(autocompleteProfessionals())
    useEffect(() => {
      dispatch(searchBar(name))
    },[name])

    const reset = () => {
      console.log('a')
    }
    useEffect(() => {
      setName('')
    },[switcheo2, reset()])

    useEffect(() => {
      if(end === false) {
        autocompleteNeeds()
      autocompleteProfessionals()
      }
      
    },[name])
    const onChange = (e) => {
      setName(e.target.value)
      setEnd(false)
    }

    console.log(end)
    return (
        <div className={s.search}>
            <div>
                <input
                    type="text"
                    placeholder={switcheo2 === 'professional' ? "    Busca un tecnico": '    Busca trabajo'}
                    value={name}
                    onChange={e => onChange(e)}
                    className={s.input}
                />
                <input type='button' className={s.btn} onSubmit={ reset } value='x'/>
                <div>

                    {
                        name !== '' ?
                        autocomplete.map((e, index) =>{
                            if(e !== undefined || e !== null) {
                            return (<button className={s.input_btn} onClick={()=> onClick(e)} key={ "auto" + index} >{e}</button>)
                            }
                        }):<p></p>
                        
                    }

                </div>
            </div>
        </div>
    )
}

export default Search;
