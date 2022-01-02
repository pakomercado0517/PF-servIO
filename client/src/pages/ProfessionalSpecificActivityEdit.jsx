import React /*, { useEffect, useState }*/ from 'react'
// import axios from 'axios'
import { useSelector } from 'react-redux'
import { /*NavLink,*/ useNavigate, useParams } from 'react-router-dom'
// import { getByUserId, getSpecificActivitiesById } from '../redux/actions/index'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
// import { StarRating } from '../components/StarRating'
// import Swal from 'sweetalert2'
import s from './styles/ProfessionalSpecificActivity.module.css'
// import { useGlobalStorage } from '../hooks/useGlobalStorage'
// import { GrConsole } from 'react-icons/gr'


function ProfessionalSpecificActivityEdit() {

    const {id}= useParams()
    console.log('id',id)
    // const ranked= 3;
    // const navigate = useNavigate()

    const professional = useSelector((state) => state.user[0])
    console.log('1 - professional',professional)

    // const [input, setInput] = useState({
    //     name: activity.name,
    //     price: activity.price,
    //     photo: activity.image,
    //     materials: activity.materials,
    //     description: activity.description,
    //     guarantee: activity.guarantee,
    //     guarantee_time: activity.guarantee_time,
    //     // duration: activity.duration,
    //     professional_id: activity.professional_id,
    //     id: activity.id
    // })

    // console.log('input',input)

    // function onChangeForm(e){
    //     setInput({
    //         ...input,
    //         [e.target.name]: e.target.value
    //     })
    // }

    // const serviceEdit = async (e) =>{
    //     e.preventDefault()
    //     console.log('input',input)
    //     try{
    //         const res = await axios.put(`http://localhost:3001/TecnicalsActivities/${input.id}`, input)
    //         console.log('res',res)
            
    //         Swal.fire({
    //             icon: 'success',
    //             title: 'Publicacion editada!',
    //             showConfirmButton: true,
    //             // timer: 1500
    //         })
    //         navigate('/professional/services')

      
    //     }
    //     catch(error){
    //         console.log(error.message)
    //     }
    // }


    return (
    <div>
      <div className={s.container_ativity}>

        {/* |------------Banner...----------------------------------------| */}
        <div className={s.activity_banner}>
        {/* |----Profile Photo...----------------------------------------| */}

        {/* <div className={s.professional_img}>
          <img src={professional?.photo} className={s.p_image}/>
        </div> */}

          {/* |--------Float card...----------------------------------------| */}

        <div className={s.professional_floatCard}>

            {/* <div className={s.floatCard_title}>
              <h3>{`${professional?.first_name} ${professional?.last_name}`}</h3>
            </div> */}

            {/* <div className={s.floatCard_body}>
              
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
            </div> */}

          </div>

          {/* |---------------------------Show Professions...--------------| */}

          {/* <div className={s.professional_showProfessions} >
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
          </div> */}
        </div>
        {/* |-------------------------------body--------------------------------------| */}

        {/* <div className={s.activity_body}>

            <h2 className='body-title'>{activity?.name}</h2>
            <div className={s.description_card}>
              
              <h3>Descripción</h3>
              <div className={s.description_text}>
                <p>{activity?.description}</p>
              </div>

            </div>

        </div> */}

        {/* <hr className={s.line}/> */}

        <div className={s.activity_body}>
          <h3>Detalles</h3>
        </div>
        
        {/* <div className={s.details_components}>
          
          <span className={s.materials}>
            <span>Garantia:</span>
            <span>{activity?.guarantee ? ' SI ' : ' NO '}</span>
          </span>

          <span className={s.price}>
            <span>Duracion de la Garantia:</span>
            <span>{ activity?.guarantee_time } días</span>
          </span>

        </div> */}

        
        {/* <div className={s.activity_body}>
          <h3>Detalles</h3>
        </div> */}
        
        {/* <div className={s.details_components}>
          
          <span className={s.materials}>
            <span>Materiales incluidos:</span>
            <span>{activity?.materials ? ' SI ' : ' NO '}</span>
          </span>

          <span className={s.price}>
            <span>Precio:</span>
            <span>{activity?.price}</span>
          </span>

        </div> */}
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
        
        {/* {
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

export default ProfessionalSpecificActivityEdit
