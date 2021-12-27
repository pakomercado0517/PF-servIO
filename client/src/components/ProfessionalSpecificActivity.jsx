import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {NavLink, useParams} from 'react-router-dom'
import {getProfessionalActivityById, getByAccountId} from '../redux/actions/index'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhoneAlt} from '@fortawesome/free-solid-svg-icons'
import {StarRating} from './StarRating'
import s from './styles/ProfessionalSpecificActivity.module.css'


function ProfessionalSpecificActivity() {
  
  const {id}= useParams()
  console.log('id', id)
  const dispatch= useDispatch()
  const user = useSelector(state => state.user)
  
  const professionalActivities = useSelector(state => state.professionalActivities)
  console.log('profesional activities',professionalActivities)
  
  const specificActivities = useSelector((state) => state.specificActivitiesById)


  useEffect( ()=> {
  dispatch(getByAccountId(id))
  dispatch(getProfessionalActivityById(id))
  }, [dispatch, id])
  
  console.log('user',user)
  
  
  const activities = useSelector(state => state.professionalActivityById)
  console.log('activities',activities)
    
  
  let ranked= 2.6
  
  console.log('activities......', professionalActivities)
  // console.log('user....', user[0].Professional.Professions[0])
  return (
    <div>
      <div className={s.container_ativity}>

        {/* |---------------------------Banner...----------------------------------------| */}
        <div className={s.activity_banner}>
          {/* |---------------------------Profile Photo...----------------------------------------| */}

          <div className={s.professional_img}>
            <img src={user[0]?.photo} className={s.p_image}/>
          </div>

          {/* |---------------------------Float card...----------------------------------------| */}

          <div className={s.professional_floatCard}>
              <div className={s.floatCard_title}>
                <h3>{`${user[0]?.first_name} ${user[0]?.last_name}`}</h3>
              </div>
              <div className={s.floatCard_body}>
                <p className={s.floatCard_p}>{`@${user[0]?.user_name}`}</p>
                <p className={s.floatCard_p}><StarRating stars={ranked}/> <span className={s.floatCard_span}>{`${ranked}`}</span></p>
                <p className={s.floatCard_p}><FontAwesomeIcon icon={faPhoneAlt}/><strong>Teléfono: </strong><span className={s.floatCard_span}>{user[0]?.phone}</span></p>
              </div>
          </div>

          {/* |---------------------------Show Professions...----------------------------------------| */}

          <div className={s.professional_showProfessions} >
            <div><h3 className={s.professions_title}>Professiones:</h3></div>
            <div className={s.professions_container}>
              {/* {
              user[0]?.Professional.Professions.map(el=> {
                return(
                  <div className='profession'>{el.name.toUpperCase()}</div>
                )
                })
              } */}
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
