import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getProfessionalActivityById, getByUserId} from '../redux/actions/index'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhoneAlt} from '@fortawesome/free-solid-svg-icons'
import {StarRating} from './StarRating'
import './styles/ProfessionalSpecificActivity.css'

function ProfessionalSpecificActivity() {

  const dispatch= useDispatch()
  const professionalActivities = useSelector(state => state.professionalActivities)
  const user = useSelector(state => state.user)
  let ranked= 2.6

  useEffect(async ()=> {
    await dispatch(getByUserId(1))
    await dispatch(getProfessionalActivityById(1))
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
                <p>{`@${user[0]?.user_name}`}</p>
                <p><StarRating stars={ranked}/> {`  ${ranked}`}</p>
                <p><FontAwesomeIcon icon={faPhoneAlt}/><strong>Teléfono: </strong>  {user[0]?.phone}</p>
              </div>
          </div>

          {/* |---------------------------Show Professions...----------------------------------------| */}

          <div className='professional-showProfessions' >
            <div><h3>Professiones:</h3></div>
            
            {
              user[0]?.Professional.Professions.map(el=> {
                return(
                  <div className='profession'>{el.name}</div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalSpecificActivity
