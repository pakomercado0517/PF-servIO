import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import s from './styles/ServiceHistory.module.css'

import CardServiceHistory from '../components/CardServiceHistory.jsx'
import CardOfferToClientNeed from '../components/CardOfferToClientNeed'

import { getClientNeedsById, getOffersById } from '../redux/actions'
import { useGlobalStorage } from '../hooks/useGlobalStorage'

export default function ServiceHistory() {

    const dispatch = useDispatch()
    const { id } = useParams()
    const { clientNeedById, offersByUserId } = useSelector(state => state)
    const user = useGlobalStorage("globalUser", "")
    console.log(offersByUserId)

    useEffect(()=>{
        dispatch(getClientNeedsById(id))
        dispatch(getOffersById(id))
    },[ dispatch, id ])

    return (
        <div className={ s.container }>
            <div>
                <h2
                    className="text-center mt-3 border-bottom"
                >Historial de Servicios</h2>
            </div>
            <div>
                {/* DATOS DE SERVICIOS SOLICITADOS */}
                {
                    clientNeedById?.map((el,index) => {
                        return (
                            <CardServiceHistory
                            key={ el.id + index }
                            id= { el.id }
                            name={ el.name }
                            description={ el.description }
                            status={ el.status }
                            location={ el.location }
                            photo={ el.photo }
                            UserId={ el.UserId }
                            date={ el.updatedAt.split("T")[0] }
                            />

                        )
                    })
                }   
            </div>

            {/* CONDICIONAL QUE VALIDA SI ES O NO UN PROFESIONAL */}

            {
                user[0]?.professional ? 
                <>
                    <div>
                        <h2>Historial de Trabajos</h2>
                    </div>

                    <div>
                        {/* DATOS DE TRABAJOS REALIZADOS http://localhost:3001/professsionalOffer/all/id */}
                        {
                            offersByUserId?.map((el,index) => {
                                return (
                                    <CardOfferToClientNeed
                                    key={ el.id + index }
                                    id= { el.id }
                                    name={ el.name }
                                    guarantee_time={ el.guarantee_time }
                                    duration={ el.duration }
                                    description={ el.description }
                                    price={ el.price }
                                    // photo={ el.photo }
                                    ProfessionalId= { el.ProfessionalId }
                                    date={ el.updatedAt.split("T")[0] }
                                    />

                                )
                            })
                        }  
                    </div>

                </> : <></>
            }

            
        </div>
    )
}
