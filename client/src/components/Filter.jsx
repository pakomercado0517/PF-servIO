import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import { useGlobalStorage } from '../hooks/useGlobalStorage';
import { filterProfessions, filterProfessionals, filterClients, orderProfessionals } from '../redux/actions';
import { useNavigate } from "react-router-dom";
import {CgOptions} from 'react-icons/cg'

export  function Filter(){
  const [switcheo2] = useGlobalStorage("switcheo", null)
  const dispatch = useDispatch();
  const oficio = useSelector((state) => state.professionsName)
  const switchState = useSelector((state) => state.switch)
  const search = useSelector((state) => state.searchbar)
  const [profession, setProfession] = useState([])
  const [details, setDetails] = useState({
    profession: [],
    filterWithActivity: false,
})

  useEffect(() => {
    dispatch(filterProfessions())
  },[profession])

  useEffect(() => {
    dispatch(filterClients(search,[],[], profession, true, details.filterWithActivity ))
    dispatch(orderProfessionals(search,[],[], profession, true, details.filterWithActivity ))
  },[profession, details, switchState, search,switcheo2])

  function changeProfession(event){

    setDetails(() =>({...details, profession: event.target.value}));
    if(profession.indexOf(event.target.value) === -1){
      setProfession([...profession, event.target.value])
    }else{
      let index = profession.indexOf(event.target.value)
      setProfession([...profession.slice(0, index).concat(...profession.slice(index+1, profession.length))])
    };
  };

  const onlyOffers = () =>{
    setDetails(() => ({...details, filterWithActivity: !details.filterWithActivity}))
  };

  return(
      <span>
            <select 
              className="border-1 mx-2 btn btn-primary bg-info" 
              onChange={changeProfession} 
              id='profession'
              key='profession'
              >
              <option value=''>Filtrar por Profesion</option>
              {oficio?.map(e =>
                <option
                  key={e}
                  type= "button"
                  value={e}
                  name="profession"
                  style={{cursor:"pointer"}}
                  id={e}
                >
                  {e}
                </option>
                
              )}
            </select>
            <input
              className="border-1 mx-2 btn btn-primary bg-info" 
              key="offers"
              type='button' 
              value='Solo tecnicos con ofertas'
              name='soloConOfertas'
              onClick={onlyOffers}
            />

      </span>
  );
};