import React, {useState} from "react";
import {changeSwitch} from '../redux/actions'
import {useDispatch} from 'react-redux'
import { useGlobalStorage } from "../hooks/useGlobalStorage";

import './styles/pagination.css'
// import s from './styles/pa'

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {

  const [ , setstate] = useState("professional")
  const dispatch = useDispatch()
  const [switcheo, setSwitcheo] = useGlobalStorage("switcheo", "professional")
  const [ login ] = useGlobalStorage("globalUser", "")
  const pageNumbers = [];
console.log(login.professional)
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
    console.log(pageNumbers)
  }

  function moodRender(e){
    if(e === 'btnradio2') {
      dispatch(changeSwitch(true))
      setSwitcheo('professional')
      setstate('professional')
    } 
    if (e === 'btnradio1') {
      dispatch(changeSwitch(false))
      setSwitcheo('user')
      setstate('user')
    }
  }

  return (
    <div className='pagination'>

            <div 
              class="btn-group" 
              role="group" 
              aria-label="Basic radio toggle button group"
            >
              <input 
                type="radio" 
                className="btn-check" 
                name="btnradio" 
                id="btnradio2" 
                autoComplete="off" 
                onClick={(e) => moodRender(e.target.id)} 
                defaultChecked={switcheo === 'professional'} 
              />
              
              <label 
                className="btn btn-outline-info" 
                htmlFor="btnradio2"
              >
                Profesionales
              </label>

              <input 
                type="radio" 
                className="btn-check" 
                name="btnradio" 
                id="btnradio1" 
                autoComplete="off" 
                onClick={(e) => moodRender(e.target.id)} 
                defaultChecked={switcheo === 'user'} 
              />
              {/* validar estado */}
              <label 
                className={login.professional ? "btn btn-outline-info" : 'hide' }
                htmlFor="btnradio1"
              >
                Usuarios
              </label>
            
            </div>
      
      <nav>
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li className="page-item" key={number}>
              <a
                onClick={() => paginate(number)}
                className="page-link"
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;