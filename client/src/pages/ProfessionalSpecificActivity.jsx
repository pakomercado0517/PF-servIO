import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getByUserId, getSpecificActivitiesById } from '../redux/actions/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { StarRating } from '../components/StarRating'

import s from './styles/ProfessionalSpecificActivity.module.css'
import { useGlobalStorage } from '../hooks/useGlobalStorage'


function ProfessionalSpecificActivity() {
  
  // const [cart, setCart] = useGlobalStorage("cart", [])
  
  const {id}= useParams()
  console.log('id',id) // trae id de publicacion pero pierdo la referencia del usuario
  const dispatch= useDispatch()
  let ranked= 3;

  const idPublicacion = id
  console.log('idPublicacion',idPublicacion)

  const profesional = useSelector((state) => state)
  // console.log('1 - profesional',profesional)  
  // const professionalActivities = useSelector(state => state.professionalActivities)
  // console.log('2 - professionalActivities',professionalActivities)
  
  const specificActivities = useSelector((state) => state.specificActivitiesById)
  console.log('3 - specificActivities la posta',specificActivities)

  const professional = useSelector((state) => state.user[0])
  console.log('4 - professional',professional)

  // hacer un ternario para que si el usuario logeado es el mismo que el prfesional devuelva true asi puedo hacer un boton de editar

  // const user = useSelector(state => state.globalUserGlobalStorage)
  // console.log('user global',user)
  // console.log('id', id)
  // console.log('profesional activities',professionalActivities)

// function addToCart(){
//   const exist = cart.filter(el => el.name === props.name )
//   const notExist = cart.filter(el => el.name !== props.name )
//   console.log("exists: ", exist)
//   if ( exist[0] ){
//       exist[0].count +=1;
//       setCart([
//           ...notExist,
//           ...exist
//       ])
//   } else {
//       setCart([
//           ...cart,
//           {
//               name: props.name,
//               description: props.description,
//               price: props.price,
//               count: 1
//           }
//       ])
//   }
// }


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
              
              <p className={s.floatCard_p}>{`@${professional?.user_name}`}</p>
              <p className={s.floatCard_p}>
                <StarRating stars={ranked}/>
                <span className={s.floatCard_span}>{`${ranked}`}</span>
              </p>
              <p className={s.floatCard_p}>
                <FontAwesomeIcon icon={faPhoneAlt}/>
                <strong>Teléfono: </strong>
                <span className={s.floatCard_span}>{professional?.phone}</span>
              </p>
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
                    {el.name}
                  </div>
                )
                })
              }
            </div>
          </div>
        </div>
        {/* |-------------------------------body--------------------------------------| */}

        <div className={s.activity_body}>

            <h2 className='body-title'>{specificActivities[0]?.name}</h2>
            <div className={s.description_card}>
              
              <h3>Descripción</h3>
              <div className={s.description_text}>
                <p>{specificActivities[0]?.description}</p>
              </div>

            </div>
            
        </div>

        <hr/>

        <div className={s.activity_body}>
          <h3>Detalles</h3>
        </div>
        
        <div className={s.details_components}>
          
          <span className={s.materials}>
            <span>Materiales:</span>
            <span>{specificActivities[0]?.materials ? ' SI ' : ' NO '}</span>
          </span>

          <span className={s.price}>
            <span>Precio:</span>
            <span>{specificActivities[0]?.price}</span>
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
          

          {/* no pude meter el carrito -------------------- */}

          {/* <div className={s.a_button}>
            <span
              className={s.link_button}
              // onClick={ addToCart } 
            >
              Agregar carrito
            </span>
          </div> */}

          {/* <div className={s.a_button}>
            <NavLink to='#' className={s.link_button}>Contratar</NavLink>
          </div> */}
        </div>
        
      </div>
    </div>
  )
}

export default ProfessionalSpecificActivity
