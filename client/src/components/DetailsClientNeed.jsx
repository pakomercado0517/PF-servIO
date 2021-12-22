import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {NavLink, useParams} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhoneAlt} from '@fortawesome/free-solid-svg-icons'
import {StarRating} from './StarRating'
import s from './styles/DetailsClientNeed.module.css'
import { getByUserId, getDetailsClientNeed } from '../redux/actions'

export default function DetailsClientNeed() {
  const { detailsClientNeed, user } = useSelector(state => state)
  const { id } = useParams()
  const dispatch = useDispatch()
  let ranked= 2.6
  useEffect(()=> {
    dispatch(getDetailsClientNeed(id))
  }, [])
  useEffect(()=> {
    dispatch(getByUserId(detailsClientNeed.UserId))
  }, [detailsClientNeed])
  useEffect(() => {
      console.log(detailsClientNeed)
  }, [user])
  return (
    <div>
      <div className={s.container_ativity}>

        {/* |---------------------------Banner...----------------------------------------| */}
        <div className={s.activity_banner}>
          {/* |---------------------------Profile Photo...----------------------------------------| */}

          <div className={s.professional_img}>
            <img src={ user[0]?.photo } className={s.p_image} />
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

          {/* |---------------------------Show Professions...----------------------------------------| */}

          <div className={s.professional_showProfessions} >
            <div><h3 className={s.professions_title}>Profesiones:</h3></div>
            <div className={s.professions_container}>
              {
            //   user[0]?.Professional.Professions.map(el=> {
            //     return(
            //       <div className={s.profession}>{"Hola"}</div>
            //     )
            //     })
              }
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
            <NavLink to='/' className={s.link_button}>Volver</NavLink>
          </div>
          <div className={s.a_button}>
            <NavLink to='/ProfessionalServiceOffer' className={s.link_button}>Enviar Oferta</NavLink>
          </div>
        </div>
        
      </div>
    </div>
  )
}

