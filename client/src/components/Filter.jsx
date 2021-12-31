import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import { useGlobalStorage } from '../hooks/useGlobalStorage';
import { filterProfessions, filterProfessionals, filterClients } from '../redux/actions';
import { useNavigate } from "react-router-dom";

export  function Filter(){
  const [switcheo2] = useGlobalStorage("switcheo", null)
  console.log(switcheo2)
  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  console.log(state)
  const oficio = useSelector((state) => state.professionsName)
  const switchState = useSelector((state) => state.switch)
  const search = useSelector((state) => state.searchbar)
  const [profession, setProfession] = useState([])
  const [details, setDetails] = useState({
    profession: [],
    filterWithActivity: false,
})

// console.log('details',details)
// console.log('profession',profession)
  useEffect(() => {
    dispatch(filterProfessions())
  },[profession])

  useEffect(() => {
    dispatch(filterClients(search,[],[], profession, true, details.filterWithActivity ))
    dispatch(filterProfessionals(search,[],[], profession, true, details.filterWithActivity ))
  },[profession, details, switchState, search,switcheo2])

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

  const onlyOffers = () =>{
    let boolean = !details.filterWithActivity
    setDetails(() => ({...details, filterWithActivity: !details.filterWithActivity}))
  } 
    

  return(
      <div style={{backgroundColor:"blue", display:'flex'}}>
         
            <form  style={{backgroundColor:"red", marginBottom:'5%'}}>
              <p >Filtrar por Profesion</p>
              {oficio.map(e =>
                <div>
                  <input
                    onClick={changeProfession} 
                    type= "button"
                    value={e}
                    name="profession"
                    style={{cursor:"pointer"}}
                    id={e}
                  />
                </div>
              )}
            </form>
            <input 
              type='button' 
              value='Solo tecnicos con ofertas'
              name='soloConOfertas'
              style={{cursor:"pointer", width:'300px', height:'25px'}}
              onClick={onlyOffers}
            />
      </div>
  );
};