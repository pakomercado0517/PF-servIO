import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import s from './styles/ServiceHistory.module.css'

import CardServiceHistory from '../components/CardServiceHistory.jsx'
import CardOfferToClientNeed from '../components/CardOfferToClientNeed'

import { getClientNeedsById, getOffersById } from '../redux/actions'
import { useGlobalStorage } from '../hooks/useGlobalStorage'

export default function ServiceHistory() {

    const [shows, setShows] = useState([])

    const dispatch = useDispatch()
    const { id } = useParams()
    const { clientNeedById, offersByUserId } = useSelector(state => state)
    const user = useGlobalStorage("globalUser", "")

    useEffect(()=>{
        dispatch(getClientNeedsById(id))
        dispatch(getOffersById(id))
    },[ dispatch, id ])

    useEffect(()=>{
        setShows(clientNeedById)
    },[ clientNeedById ])

    useEffect(()=>{
        console.log("SHOWS: ",shows)
    },[ shows ])

    function filter(event){
        const option = event.target.value
        if (!option) return setShows(clientNeedById)
        if (option === "in offer") return setShows(clientNeedById.filter(el => el.status === "in offer"))
        if (option === "pending") return setShows(clientNeedById.filter(el => el.status === "pending"))
        if (option === "in process") return setShows(clientNeedById.filter(el => el.status === "in process"))
        if (option === "done") return setShows(clientNeedById.filter(el => el.status === "done"))
    }

    return (
        <div className={ s.container }>
            <div>
                <h2
                    className="text-center mt-3 border-bottom"
                >Historial de Servicios</h2>
            </div>
            <div>
                <select
                    className="border-1 mx-2 btn btn-primary bg-info"
                    onChange={filter}
                    id='profession'
                    key='profession'
                >
                    <option value="principal" value=''>Filtrar por Status</option>
                    <option value="in offer" type="button">En oferta</option>
                    <option value="pending" type="button">Pendiente</option>
                    <option value="in process" type="button">En proceso</option>
                    <option value="done" type="button">Finalizado</option>
                </select>
            </div>
            <div>
                {/* DATOS DE SERVICIOS SOLICITADOS */}
                {
                    shows?.map((el,index) => {
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
                {
                    shows[0] ? <></>:<h3>No se encontraron resultados</h3>
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
                                    UserId= { el.UserId }
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
