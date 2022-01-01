import React, { useEffect } from 'react'

import s from './styles/ServiceHistory.module.css'

import CardServiceHistory from '../components/CardServiceHistory.jsx'

import { useSelector, useDispatch } from 'react-redux'

import { useParams } from 'react-router-dom'

import { getClientNeedsById } from '../redux/actions'

import { useGlobalStorage } from '../hooks/useGlobalStorage'

export default function ServiceHistory() {

    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const { id } = useParams()
    const clientNeeds = useSelector(state => state.clientNeedById)
    const user = useGlobalStorage("globalUser", "")


    useEffect(()=>{
        dispatch(getClientNeedsById(id))
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
                    clientNeeds?.map((el,index) => {
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
                            date={ el.updatedAt }
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
                        {/* DATOS DE TRABAJOS REALIZADOS http://localhost:3001/professsionalOffer/all/1 */}
                    </div>

                </> : <></>
            }

            
        </div>
    )
}
