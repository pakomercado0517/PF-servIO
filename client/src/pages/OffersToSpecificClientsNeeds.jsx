import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import CardOfferToClientNeed from '../components/CardOfferToClientNeed';
import {getAllProfessionalOffers, 
        getAllProfessionals, 
        getDetailsClientNeed, 
        getOffersToSpecificClientNeed 
    } from '../redux/actions'

import styles from './styles/OffersToSpecificClientsNeeds.module.css'

export const OffersToSpecificClientsNeeds = () => {

    const [offers, setOffers] = useState([])
    const { id } = useParams();
    const dispatch = useDispatch()
    const { professionals, offersOfClientNeed, detailsClientNeed} = useSelector(state => state)

    useEffect(() => {
        dispatch(getDetailsClientNeed(id))
        dispatch(getAllProfessionalOffers())
        dispatch(getOffersToSpecificClientNeed(id))
        dispatch(getAllProfessionals())
    }, []);

    useEffect(() => {
        if (offersOfClientNeed === "No offers found") return setOffers([])
        setOffers(offersOfClientNeed.filter(el => el.status !== "rejected"))
    }, [offersOfClientNeed])

    return (
        <div className={styles.container}>
            <h1>Ofertas para:</h1>
            <h3> {detailsClientNeed.name} </h3>
            <h4>{ detailsClientNeed.description}</h4>

            {
                !offers[0] === "No offers found" ?
                    <h1>No hay ofertas para esta necesidad</h1>

                    :

                    offers?.map((el, index) => {
                        return (
                            <CardOfferToClientNeed
                                key={index + id}
                                name={ el.name }
                                id={el.id}
                                clientNeed={ id }
                                guarantee_time={el.guarantee_time}
                                duration={ el.duration }
                                materials={el.materials}
                                ProfessionalId={el.ProfessionalId}
                                price={el.price}
                                date={el.updatedAt.split("T")[0]}
                                description={el.description}
                                photo={ el.UserId ? professionals.find(el2 => el2.id === el.UserId)?.photo : '' }
                                status= { el.status }
                            />
                        )
                    })
            }

        </div>
    )
}
