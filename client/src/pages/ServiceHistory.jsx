import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import s from './styles/ServiceHistory.module.css'

import CardServiceHistory from '../components/CardServiceHistory.jsx'
import CardOfferToClientNeed from '../components/CardOfferToClientNeed'

import { getAllProfessionals, getClientNeedsById, getOffersById, getSpecificActivitiesById } from '../redux/actions'
import { useGlobalStorage } from '../hooks/useGlobalStorage'
import CardServiceHistoryJobs from '../components/CardServiceHistoryJobs'

export default function ServiceHistory() {

    const [shows, setShows] = useState([])

    const user = useGlobalStorage("globalUser", "")
    const dispatch = useDispatch()
    const { id } = useParams()
    const { professionals, clientNeedById, offersByUserId, clientNeeds } = useSelector(state => state)
    const specificActivities = useSelector((state) => state?.specificActivitiesById)
    
    const [filteredSpecificActivities, setfilteredSpecificActivities] = useState([])

    useEffect(() => {
        if (specificActivities === "There are not specifical Activities") setfilteredSpecificActivities("There are not specifical Activities")
        else {
            let array = []
            specificActivities.map(el=>{
                if(el.ClientNeeds[0]){
                    const newArray = el.ClientNeeds.map(el2 => {
                        return {
                            ...el,
                            key: el2.id,
                            status: el2.status,
                            ClientNeedId: el2.id,
                        }
                    })
                    array = [...array, ...newArray]
                }
            })
            console.log("ARRAY", array)
            if(!array[0]) return setfilteredSpecificActivities("There are not specifical Activities")
            setfilteredSpecificActivities(array)
        }
    }, [specificActivities, clientNeeds])


    console.log('filteredSpecificActivities', filteredSpecificActivities)
    console.log('specificActivities',specificActivities)
    // filtrar las actividades especificas que sean de tipo de tipo general
    // const filteredSpecificActivities = specificActivities.filter(activity => activity.type === 'general')
    
    // console.log('1 - professionals',professionals)
    // console.log('2 - clientNeedById',clientNeedById)
    // console.log('3 - offersByUserId',offersByUserId)
    console.log('4 - specificActivities',specificActivities)
    // console.log('5 - filteredSpecificActivities',filteredSpecificActivities)

    useEffect(()=>{
        dispatch(getClientNeedsById(id))
        dispatch(getAllProfessionals())
        dispatch(getOffersById(id))
        dispatch(getSpecificActivitiesById(id))
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
                <div className="mt-3">
                    <h3 className="text-center mt-3 border-bottom">
                        Servicios Solicitados
                    </h3>
                    <div className="row">
                    
                {
                    shows && shows ?
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
                    :<><h4>No hay presupuestos para tus servicios solicitados</h4></>
                }
                    </div>
                </div>
                {
                    shows[0] ? 
                    <></>:
                    <>
                        <h5
                            className="text-center mt-2 mb-5"
                            >
                            No hay servicios solicitados, Publicá el servicio que necesitas!
                        </h5>
                    </>
                }
            </div>

            {/* CONDICIONAL QUE VALIDA SI ES O NO UN PROFESIONAL */}

            {
                user[0]?.professional ? 
                <>
                    <div>
                        <h2
                            className="text-center mt-3 border-bottom"
                        >Historial de Presupuestos</h2>
                    </div>

                    <div>
                        {/* DATOS DE TRABAJOS REALIZADOS http://localhost:3001/professsionalOffer/all/id */}
                        {
                            offersByUserId && offersByUserId === 'No offers found' ?
                            <><h5
                                className="text-center mt-3"
                            >No hay presupuestos realizados</h5></>
                            :
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
                                    photo={ el.UserId ? professionals.find(el2 => el2.id === el.UserId)?.photo : '' }
                                    UserId= { el.UserId }
                                    status={ el.status }
                                    date={ el.updatedAt.split("T")[0] }
                                    />

                                )
                            })
                            
                        }  
                    </div>

                    {/* RENDERIZAR ACTIVIDADES ESPECIFICAS DEL PROFESIONAL @FER */}

                    <div>
                        <h2
                            className="text-center mt-3 border-bottom"
                        >Trabajos Pendientes</h2>
                    </div>

                        <div>
                            {/* DATOS DE TRABAJOS REALIZADOS http://localhost:3001/professsionalOffer/all/id */}
                            {

                                filteredSpecificActivities === "There are not specifical Activities" ?
                                <><h5
                                    className="text-center mt-3"
                                >No hay trabajos pendientes</h5></>
                                : filteredSpecificActivities?.map((el, index) => {
                                    return (
                                        <CardServiceHistoryJobs
                                            key={el.id + index}
                                            id={el.id}
                                            name={el.name}
                                            description={el.description}
                                            // photo={el.photo}
                                            type={el.type}
                                            UserId={el.UserId}
                                            status={el.status}
                                            date={el.updatedAt.split("T")[0]}
                                            ClientNeedId={ el.ClientNeedId }
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
