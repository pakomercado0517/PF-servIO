import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {NavLink, useParams} from 'react-router-dom'
import {getProfessionalActivityById, getByUserId} from '../redux/actions/index'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhoneAlt} from '@fortawesome/free-solid-svg-icons'
import {StarRating} from './StarRating'
import './styles/ProfessionalSpecificActivity.css'

function ProfessionalSpecificActivity() {
  const {id}= useParams()
  const dispatch= useDispatch()
  const professionalActivities = useSelector(state => state.professionalActivities)
  const user = useSelector(state => state.user)
  let ranked= 2.6
  useEffect(async ()=> {
    await dispatch(getByUserId(id))
    await dispatch(getProfessionalActivityById(id))
  }, [getProfessionalActivityById, getByUserId])
  console.log('activities......', professionalActivities)
  // console.log('user....', user[0].Professional.Professions[0])
  return (
    <div>
      <div className='container-ativity'>

        {/* |---------------------------Banner...----------------------------------------| */}
        <div className='activity-banner'>
          {/* |---------------------------Profile Photo...----------------------------------------| */}

          <div className='professional-img'>
            <img src={user[0]?.photo} className='p-image' />
          </div>

          {/* |---------------------------Float card...----------------------------------------| */}

          <div className='professional-floatCard'>
              <div className='floatCard-title'>
                <h3>{`${user[0]?.first_name} ${user[0]?.last_name}`}</h3>
              </div>
              <div className='floatCard-body'>
                <p className='floatCard-p'>{`@${user[0]?.user_name}`}</p>
                <p className='floatCard-p'><StarRating stars={ranked}/> <span className='floatCard-span'>{`${ranked}`}</span></p>
                <p className='floatCard-p'><FontAwesomeIcon icon={faPhoneAlt}/><strong>Teléfono: </strong><span className='floatCard-span'>{user[0]?.phone}</span></p>
              </div>
          </div>

          {/* |---------------------------Show Professions...----------------------------------------| */}

          <div className='professional-showProfessions' >
            <div><h3 className='professions-title'>Professiones:</h3></div>
            <div className='professions-container'>
              {
              user[0]?.Professional.Professions.map(el=> {
                return(
                  <div className='profession'>{el.name.toUpperCase()}</div>
                )
                })
              }
            </div>
          </div>
        </div>
        {/* |-------------------------------body--------------------------------------| */}

        <div className='activity-body'>
            <h2 className='body-title'>{professionalActivities[0]?.name}</h2>
            <div className='description-card'>
              <h3>Descripción</h3>
              <div className='description-text'>
                <p>{professionalActivities[0]?.description}</p>
              </div>
            </div>
        </div>

        <div className='details'>
          <h3>Detalles   <hr className='line'/></h3>
        </div>
        <div className='details-components'>
          <div className='materials'>
            <h4>Materiales:</h4><span>{professionalActivities[0]?.materials ? ' SI' : ' NO'}</span>
          </div>
          <div className='price'>
            <h4>Precio:</h4><span>{professionalActivities[0]?.price}</span>
          </div>
        </div>

        {/* |-----------------------------buttons-----------------------| */}

        <div className='buttons-list'>
          <div className='a-button'>
            <NavLink to='#' className='link-button'>Volver</NavLink>
          </div>
          <div className='a-button'>
            <NavLink to='#' className='link-button'>Descartar</NavLink>
          </div>
          <div className='a-button'>
            <NavLink to='#' className='link-button'>Carrito</NavLink>
          </div>
          <div className='a-button'>
            <NavLink to='#' className='link-button'>Contratar</NavLink>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default ProfessionalSpecificActivity
