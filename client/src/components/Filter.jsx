import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useGlobalStorage } from '../hooks/useGlobalStorage';
import { filterProfessions, filterClients, orderProfessionals, cities } from '../redux/actions';
import s from './styles/Filter.module.css'
import starRating from './StarRating.jsx'
import starFilled from '../img/starFilled.PNG'
import starEmpty from '../img/starEmpty.PNG'
export  function Filter(){
  const [switcheo2] = useGlobalStorage("switcheo", null)
  const dispatch = useDispatch();
  const oficio = useSelector((state) => state.professionsName)
  const ciudades = useSelector(state => state.cities)
  const switchState = useSelector((state) => state.switch)
  const search = useSelector((state) => state.searchbar)
  const [profession, setProfession] = useState([])
  const [details, setDetails] = useState({
    profession: [],
    filterWithActivity: false,
    calificacionMinima:'',
    ciudad : ''
})
console.log(ciudades)
  useEffect(() => {
    dispatch(filterProfessions())
  },[profession])
console.log(switchState)
  useEffect(() => {
    dispatch(cities())
    dispatch(filterClients(search,details.calificacionMinima,details.ciudad, profession, true, details.filterWithActivity ))
    dispatch(orderProfessionals(search,[],[], profession, true, details.filterWithActivity ))
    
  },[profession, details, switchState, search,switcheo2])

  function changeProfession(event){
    setDetails(() =>({...details, profession: event.target.value}));
    if(profession.indexOf(event.target.value) === -1){
      setProfession([event.target.value])
    }else{
      let index = profession.indexOf(event.target.value)
      setProfession([...profession.slice(0, index).concat(...profession.slice(index+1, profession.length))])
    };
  };
  function changeRate(event){
    setDetails(() =>({...details, calificacionMinima: event.target.value}));
  }
  function changeCity(event){
    setDetails(() =>({...details, ciudad: event.target.value}));
  }
  const onlyOffers = () =>{
    setDetails(() => ({...details, filterWithActivity: !details.filterWithActivity}))
  };

  return(
      <span>
        <starRating/>
        {/* <img src={starFilled}/> */}
            <select 
                className= {switcheo2 === 'professional' ? "border-1 mx-2 btn btn-primary bg-info" :s.hide}
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
            <select 
                className= {switcheo2 === 'professional' ? "border-1 mx-2 btn btn-primary bg-info" : s.hide}
                onChange={changeCity} 
                id='profession'
                key='profession'
              >
              <option value=''>Filtrar por Ciudad</option>
              {ciudades?.map(e =>
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
            <select 
              className= {switcheo2 === 'professional' ? "border-1 mx-2 btn btn-primary bg-info" :s.hide}
              onChange={changeRate} 
              id='profession'
              key='profession'
            >
            <option value=''>Filtrar por calificacion</option>
            <option value='4'>⭐⭐⭐⭐ o más</option>
            <option value='3'>⭐⭐⭐ o más</option>
            <option value='2'>⭐⭐ o más</option>
            <option value='1'>⭐ o más</option>

            </select>
            <input
              className={switcheo2 === 'professional' ? "border-1 mx-2 btn btn-primary bg-info" :s.hide}
              key="offers"
              type='button' 
              value='Solo tecnicos con ofertas'
              name='soloConOfertas'
              onClick={onlyOffers}
            />

      </span>
  );
};