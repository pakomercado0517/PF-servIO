import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getProfessionalActivityById, getByAccountId, getByUserId, getSpecificActivitiesById } from '../redux/actions/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { StarRating } from '../components/StarRating'

import s from './styles/ProfessionalSpecificActivity.module.css'


function ProfessionalSpecificActivity() {
  
  const {id}= useParams()
  console.log('id',id) // id de usuario--- necesito id de publicacion
  const dispatch= useDispatch()
  let ranked= 2.6

  const professionalActivities = useSelector(state => state.professionalActivities)
  console.log('professionalActivities',professionalActivities)
  
  const profesional = useSelector((state) => state?.user[0])
  console.log('profesional',profesional)

  // console.log('id', id)
  // console.log('profesional activities',professionalActivities)
  const specificActivities = useSelector((state) => state.specificActivitiesById)
  console.log('specificActivities la posta',specificActivities)


  useEffect(()=>{
    dispatch(getByUserId(id))
    dispatch(getSpecificActivitiesById(id))
    // dispatch(getProfessionalActivityById(id))   ya esta repetida la action en getSpecificActivitiesById
},[dispatch, id])


  console.log('activities......', professionalActivities)

  return (
    <div>
      <div className={s.container_ativity}>

        {/* |------------Banner...----------------------------------------| */}
        <div className={s.activity_banner}>
        {/* |----Profile Photo...----------------------------------------| */}

        <div className={s.professional_img}>
          <img src={profesional?.photo} className={s.p_image}/>
        </div>

          {/* |--------Float card...----------------------------------------| */}

        <div className={s.professional_floatCard}>

            <div className={s.floatCard_title}>
              <h3>{`${profesional?.first_name} ${profesional?.last_name}`}</h3>
            </div>

            <div className={s.floatCard_body}>
              
              <p className={s.floatCard_p}>{`@${profesional?.user_name}`}</p>
              <p className={s.floatCard_p}>
                <StarRating stars={ranked}/>
                <span className={s.floatCard_span}>{`${ranked}`}</span>
              </p>
              <p className={s.floatCard_p}>
                <FontAwesomeIcon icon={faPhoneAlt}/>
                <strong>Teléfono: </strong>
                <span className={s.floatCard_span}>{profesional?.phone}</span>
              </p>
            </div>

          </div>

          {/* |---------------------------Show Professions...--------------| */}

          <div className={s.professional_showProfessions} >
            <div><h3 className={s.professions_title}>Professiones:</h3></div>
            <div className={s.professions_container}>
              {
              profesional?.Professional.Professions.map(el=> {
                return(
                  <div className='profession'>{el.name.toUpperCase()}</div>
                )
                })
              }
            </div>
          </div>
        </div>
        {/* |-------------------------------body--------------------------------------| */}

        <div className={s.activity_body}>
            {/* <h2 className='body-title'>{professionalActivities[0]?.name}</h2> */}
            <div className={s.description_card}>
              <h3>Descripción</h3>
              <div className={s.description_text}>
                {/* <p>{professionalActivities[0]?.description}</p> */}
              </div>
            </div>
        </div>

        {/* <div className='details'>
          <h3>Detalles   <hr className='line'/></h3>
        </div>
        <div className='details-components'>
          <div className='materials'>
            <h4>Materiales:</h4><span>{professionalActivities[0]?.materials ? ' SI' : ' NO'}</span>
          </div>
          <div className='price'>
            <h4>Precio:</h4><span>{professionalActivities[0]?.price}</span>
          </div>
        </div> */}

        {/* |-----------------------------buttons-----------------------| */}

        <div className={s.buttons_list}>
          <div className={s.a_button}>
            <NavLink to='#' className={s.link_button}>Volver</NavLink>
          </div>
          <div className='a-button'>
            <NavLink to='#' className={s.link_button}>Descartar</NavLink>
          </div>
          <div className='a-button'>
            <NavLink to='#' className={s.link_button}>Carrito</NavLink>
          </div>
          <div className='a-button'>
            <NavLink to='#' className={s.link_button}>Contratar</NavLink>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default ProfessionalSpecificActivity
