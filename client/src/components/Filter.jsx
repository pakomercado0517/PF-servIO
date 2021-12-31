import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import {useGlobalStorage} from '../hooks/useGlobalStorage';
import { filterProfessions, filter } from '../redux/actions';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
export  function Filter(){

  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  console.log(state)
  const oficio = useSelector((state) => state.professionsName)
  const [globalUser, setGlobalUser] = useGlobalStorage("globalUser", "");
  const [profession, setProfession] = useState([])
  const [details, setDetails] = useState({
    profession: [],
})

// console.log('details',details)
// console.log('profession',profession)
  useEffect(() => {
    dispatch(filterProfessions())
  },[profession])

  useEffect(() => {
    dispatch(filter('',[],[], profession, true ))
  },[profession])

  function handleCheck(e){
    console.log(details.professionalCase)
    if (e.target.id === 'checkboxClient' && details.professionalCase) {
        const obj = {
            ...details,
            professionalCase:false,
            professional:"false",
            profession: []
        }
        setDetails(obj)
    } else {
        const obj = {
            ...details,
            professionalCase:true,
            professional:"true"
        }
        setDetails(obj)
    }
  }

  function changeProfession(event){
    // setDetails({...details, profession: event.target.value})
    setDetails(() =>({...details, profession: event.target.value}));
    if(profession.indexOf(event.target.value) === -1){
      setProfession([...profession, event.target.value])
    }else{
      let index = profession.indexOf(event.target.value)
      setProfession([...profession.slice(0, index).concat(...profession.slice(index+1, profession.length))])
    }
    
  }

    

  return(
      <div>
                  <p >Filtrar por Profesion</p>
                  <form>
                    {oficio.map(e =>
                      <div>
                        <input
                          onClick={changeProfession} 
                          type= "button"
                          value={e}
                          name="profession"
                          style={{cursor:"pointer"}}
                          id={e}
                            // onChange={()=> handleChangeDifficulty(1)}
                        />
                      </div>
                    )}
                  </form>
      </div>
  );
};