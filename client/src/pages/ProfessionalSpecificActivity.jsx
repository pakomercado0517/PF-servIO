import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { /*NavLink,*/ useParams } from 'react-router-dom'
// import { getByUserId, getSpecificActivitiesById } from '../redux/actions/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { StarRating } from '../components/StarRating'
import { useGlobalStorage } from '../hooks/useGlobalStorage'
import { getByUserId, getSpecificActivitiesById } from '../redux/actions'

import s from './styles/ProfessionalSpecificActivity.module.css'
import { GrLocation } from 'react-icons/gr'


function ProfessionalSpecificActivity() {
  
  const { id, idProfessional} = useParams()
  const dispatch = useDispatch()  
  const [cart, setCart] = useGlobalStorage("cart", [])
  const [ globalUserGlobalStorage ] = useGlobalStorage("globalUser", [])
  
  useEffect(() => {
    dispatch(getSpecificActivitiesById(idProfessional))
    dispatch(getByUserId(idProfessional))
  }, [ dispatch, id ])

  const professional = useSelector((state) => state.user[0])
  const activities = useSelector((state) => state.specificActivitiesById)
  // const state = useSelector((state) => state)
  const activityById = activities.indexOf(
    activities.find(activity => activity.id == id))
  const activity = activities[activityById]
  



  console.log('1 - professional',professional)
  // console.log('2 - state',state)
  console.log('3 - id',id)
  console.log('4 - id prof?', idProfessional)
  console.log('4 - activity x id ',activity)

  function addToCart(){
    const exist = cart.filter(el => el.name === activity?.name )
        const notExist = cart.filter(el => el.name !== activity?.name )
        if ( exist[0] ){
            exist[0].count +=1;
            setCart([
                ...notExist,
                ...exist
            ])
        } else {
            setCart([
                ...cart,
                {
                    name: activity?.name,
                    description: activity?.description,
                    price: activity?.price,
                    count: 1
                }
            ])
        }
  }

  return (
    <div>
      <div className={s.container_ativity}>

        {/* |------------Banner...----------------------------------------| */}
        <div className={s.activity_banner}>
        {/* |----Profile Photo...----------------------------------------| */}

        <div className={s.professional_img}>
          <img src={professional?.photo} className={s.p_image}/>
        </div>

          {/* |--------Float card...----------------------------------------| */}

        <div className={s.professional_floatCard}>

            <div className={s.floatCard_title}>
              <h3>{`${professional?.first_name} ${professional?.last_name}`}</h3>
            </div>

            <div className={s.floatCard_body}>

              {
                professional?.user_name ?
                <span>
                  <p className={s.floatCard_p}>
                  {`@${professional?.user_name}`}
                  </p>
                </span>
                :
                null
              }

              {/* <p className={s.floatCard_p}>{`@${professional?.user_name}`}</p> */}

              {
                professional?.state || professional?.city ?
                <>
                    <div>
                        Locacion: <GrLocation/>
                        {professional?.city ? professional.city + ' ': ''}
                        {professional?.state ? professional.state : ''}
                    </div>
                </>
                : <></>
            }
              <p className={s.floatCard_p}>
                <StarRating stars={ professional?.rate }/>
              </p>
              {/* <p className={s.floatCard_p}>
                <FontAwesomeIcon icon={faPhoneAlt}/>
                <strong>Teléfono: </strong>
                <span className={s.floatCard_span}>{professional?.phone}</span>
              </p> */}
            </div>

          </div>

          {/* |---------------------------Show Professions...--------------| */}

          <div className={s.professional_showProfessions} >
            <div><h3 className={s.professions_title}>{`Profesion :`}</h3></div>
            <div className={s.professions_container}>
              {
              professional?.Professional.Professions.map(el=> {
                return(
                  <div
                    key={el.id}
                    className='profession'
                  >
                    {el.name?.slice(0,1).toUpperCase() + el.name.slice(1)}
                  </div>
                )
                })
              }
            </div>
          </div>
        </div>
        {/* |-------------------------------body--------------------------------------| */}

        <div className={s.activity_body}>

            <h2 className='body-title'>{activity?.name}</h2>
            <div className={s.description_card}>
              
              <h3>Descripción</h3>
              <div className={s.description_text}>
                <p>{activity?.description}</p>
              </div>

            </div>

        </div>

        <hr className={s.line}/>

        <div className={s.activity_body}>
          <h3>Detalles</h3>
        </div>
        
        <div className={s.details_components}>
          
          <span className={s.materials}>
            <span>Garantia:</span>
            <span>{activity?.guarantee ? ' SI ' : ' NO '}</span>
          </span>

          <span className={s.price}>
            <span>Duracion de la Garantia:</span>
            <span>{ activity?.guarantee_time } días</span>
          </span>

        </div>

        
        {/* <div className={s.activity_body}>
          <h3>Detalles</h3>
        </div> */}
        
        <div className={s.details_components}>
          
          <span className={s.materials}>
            <span>Materiales incluidos:</span>
            <span>{activity?.materials ? ' SI ' : ' NO '}</span>
          </span>

          <span className={s.price}>
            <span>Precio:</span>
            <span>{activity?.price}</span>
          </span>

        </div>
        {/* |-----------------------------buttons-----------------------| */}

        <div className={s.buttons_list}>
          <div className={s.a_button}>
          <span 
              className={s.link_button} 
              onClick={()=>{window.history.back()}}
              style={{cursor:'pointer'}}
            >
              Volver
            </span>
          </div>
{/*         
        {
          globalUserGlobalStorage?.id === professional?.id ?
          <div className="mx-4">
          
              <a
              href={`/professional/activity/edit/${activity.id}`}
              >
                  <button className={s.a_button}>
                      <span 
                      className={s.link_button}
                      style={{cursor:'pointer'}}
                      >
                          Editar
                      </span>
                  </button>

              </a>
          
          </div>
          : <></>

        } */}

          {/* no pude meter el carrito -------------------- */}

          {
            globalUserGlobalStorage?.id !== professional?.id ?
            <div className={s.a_button}>
              <span
                className={s.link_button}
                onClick={ addToCart } 
              >
                Agregar carrito
              </span>
            </div>
            :<></>
          }

          {/* <div className={s.a_button}>
            <NavLink to='#' className={s.link_button}>Contratar</NavLink>
          </div> */}
        </div>
        
      </div>
    </div>
  )
}

export default ProfessionalSpecificActivity
