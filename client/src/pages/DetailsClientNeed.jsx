import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {NavLink, useParams} from 'react-router-dom'
import {StarRating} from '../components/StarRating'
import { getAllUsers,
          // getByUserId, 
          getDetailsClientNeed } from '../redux/actions'

import s from './styles/DetailsClientNeed.module.css'

export default function DetailsClientNeed() {

  const { id } = useParams()
  const dispatch = useDispatch()
  const clientNeed = useSelector((state) => state?.detailsClientNeed)
  const user = useSelector((state) => state?.allUsers)
  const detailsClientNeed = useSelector((state) => state?.detailsClientNeed)
  const globalUserGlobalStorage = useSelector(state => state.globalUserGlobalStorage)
  const ProfessionalId = detailsClientNeed.UserId
  const professionalFilter = user.filter(user => user.id === ProfessionalId)
  const professional = professionalFilter[0]

  useEffect(()=> {
    dispatch(getDetailsClientNeed(id))
    dispatch(getAllUsers())
    // dispatch(getByUserId(ProfessionalId)) // esta tirando un 404
  }, [ dispatch, id ])
  
  console.log('6- professional',professional)
  
  return (
    <div>
      <div className={s.container_ativity}>

        {/* |---------------------------Banner...----------------------------------------| */}
        <div className={s.activity_banner}>
          {/* |---------------------------Profile Photo...----------------------------------------| */}

          <div className={s.professional_img}>
            <img src={ professional?.photo } alt= 'img' className={s.p_image} />
          </div>

          {/* |------Float card...----------------------------------------| */}

          <div className={s.professional_floatCard}>
              <div className={s.floatCard_title}>
              {
                professional?.name || professional?.last_name ?
                <h4>
                    {professional?.first_name + ' ' + professional?.last_name}
                </h4>
                : <></>
              }              </div>
              <div className={s.floatCard_title}>
              {
                professional?.user_name?
                    <h6>
                        <span>
                            @{professional?.user_name} 
                        </span>
                    </h6>
                : <></>
              }
              
              {
                professional?.rate !== null ?
                <div>
                    <StarRating stars={ professional?.rate } />
                </div>
                : <><StarRating stars={ 0 } /></>
              }

              </div>
          </div>

        </div>
        {/* |-------------------------------body--------------------------------------| */}

        {
          detailsClientNeed && detailsClientNeed?.description ? 

        <div className={s.activity_body}>
            <h2 className={s.body_title}>{ detailsClientNeed?.name }</h2>
            <div className={s.description_card}>
              <h3>Descripción</h3>
              <div className={s.description_text}>
                <p>{detailsClientNeed?.description}</p>
              </div>
            </div>
        </div>
        : <></>

        }

        {/* ----------------------------Carousel------------------------------------ */}

        { detailsClientNeed && detailsClientNeed?.photo ?

              <div className={ s.carousel }>
                <div className={ s.carousel }>
                  <img 
                    src={ detailsClientNeed?.photo } 
                    alt= 'img' 
                    className={ s.carousel_img }
                  />
                  <img 
                    src={ detailsClientNeed?.photo } 
                    alt= 'img' 
                    className={ s.carousel_img2 }
                  />
                  <img 
                    src={ detailsClientNeed?.photo } 
                    alt= 'img' 
                    className={ s.carousel_img3 }
                  />
              </div>
            </div>
          : 
              <div className={ s.carousel }>
                  <div className={ s.carousel_img }></div>
                  <div className={ s.carousel_img2 }></div>
                  <div className={ s.carousel_img3 }></div>
              </div>
        }
        
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
            // globalUserGlobalStorage?.professional === false ?
            globalUserGlobalStorage?.id === professional?.id ?
          <>
            <div className={s.a_button}>
              
              <NavLink 
                className={s.link_button} 
                to={`/client/${professional?.id}/edit/${detailsClientNeed?.id}`}
              >
                Editar
              </NavLink>

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

