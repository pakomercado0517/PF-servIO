import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {NavLink, useParams} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhoneAlt} from '@fortawesome/free-solid-svg-icons'
import {StarRating} from '../components/StarRating'
import s from './styles/DetailsClientNeed.module.css'
import { getByUserId, getDetailsClientNeed } from '../redux/actions'

export default function DetailsClientNeed() {

  const clientNeed = useSelector((state) => state.detailsClientNeed)
  const { detailsClientNeed, user, globalUserGlobalStorage } = useSelector(state => state)
  console.log('global',globalUserGlobalStorage)
  const { id } = useParams()
  const dispatch = useDispatch()
  let ranked= 2.6
  useEffect(()=> {
    dispatch(getDetailsClientNeed(id))
  }, [ dispatch, id ])
  useEffect(()=> {
    dispatch(getByUserId(detailsClientNeed.UserId))
  }, [ dispatch, detailsClientNeed ])
  return (
    <div>
      <div className={s.container_ativity}>

        {/* |---------------------------Banner...----------------------------------------| */}
        <div className={s.activity_banner}>
          {/* |---------------------------Profile Photo...----------------------------------------| */}

          <div className={s.professional_img}>
            <img src={ user[0]?.photo } alt= 'img' className={s.p_image} />
          </div>

          {/* |---------------------------Float card...----------------------------------------| */}

          <div className={s.professional_floatCard}>
              <div className={s.floatCard_title}>
                <h3>{ user[0]?.first_name + " " + user[0]?.last_name}</h3>
              </div>
              <div className={s.floatCard_body}>
                <p className={s.floatCard_p}>{`@${user[0]?.first_name}`}</p>
                <p className={s.floatCard_p}><StarRating stars={ranked}/> <span className={s.floatCard_span}>{`${ranked}`}</span></p>
                <p className={s.floatCard_p}><FontAwesomeIcon icon={faPhoneAlt}/><strong>Teléfono: </strong><span className={s.floatCard_span}>{user[0]?.phone}</span></p>
              </div>
          </div>

        </div>
        {/* |-------------------------------body--------------------------------------| */}

        <div className={s.activity_body}>
            <h2 className={s.body_title}>{ detailsClientNeed?.name }</h2>
            <div className={s.description_card}>
              <h3>Descripción</h3>
              <div className={s.description_text}>
                <p>{detailsClientNeed?.description}</p>
              </div>
            </div>
        </div>

        {/* ----------------------------Carousel------------------------------------ */}

              <div className={ s.carousel }>
                  <div className={ s.carousel_img }></div>
                  <div className={ s.carousel_img2 }></div>
                  <div className={ s.carousel_img3 }></div>
              </div>
        
        {/* |-----------------------------buttons-----------------------| */}

        <div className={s.buttons_list}>
          <div className={s.a_button}>
            <span 
              className={s.link_button} 
              onClick={()=>{window.history.back()}}
            >
              Volver
            </span>
          </div>

 {/* --si es cliente renderiza boton "editar publicacion" y "ver ofertas" ------| */}
 {/* |--------si es profesional renderiza boton "enviar ofertas"--------------- | */}

          {
            globalUserGlobalStorage?.professional === false ?
          <>
            <div className={s.a_button}>
              <NavLink className={s.link_button} to={`/client/${user[0]?.id}/edit/${detailsClientNeed?.id}`}>Editar</NavLink> 
                {/* className={s.link_button} 
                onClick={showModalFormCLient}  */}
              
              
              
            </div>

            <div className={s.a_button}>
            <NavLink 
              className={s.link_button} 
              to={`/client/offerToNeed/${detailsClientNeed?.id}`}
            >
              Ver Ofertas
            </NavLink>
            
            </div>
          </>
          :
          <div className={s.a_button}>
            <NavLink to={`/ProfessionalOfferToClientNeed/${clientNeed.id}`} className={s.link_button}>Ofertar</NavLink>
          </div>

          }
        </div>
        
      </div>
    </div>
  )
}

