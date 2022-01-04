import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import CardOfferToClientNeed from '../components/CardOfferToClientNeed';
import {getAllProfessionalOffers, 
        getDetailsClientNeed, 
        getOffersToSpecificClientNeed 
    } from '../redux/actions'

import styles from './styles/OffersToSpecificClientsNeeds.module.css'

export const OffersToSpecificClientsNeeds = () => {

    const [offers, setOffers] = useState([])
    const { id } = useParams();
    const dispatch = useDispatch()
    const detailsClientNeed = useSelector(state => state.detailsClientNeed)
    const getOffers = useSelector(state => state.offersOfClientNeed)    
    
    useEffect(() => {
        dispatch(getDetailsClientNeed(id))
        dispatch(getAllProfessionalOffers())
        dispatch(getOffersToSpecificClientNeed(id))
    
    if (getOffers.data === "No offers found") return setOffers([])
    setOffers(getOffers)
    }, []);

    return (
        <div className={styles.container}>
            <h1>Ofertas para:</h1>
            <h3> {detailsClientNeed.name} </h3>
            <h4>{ detailsClientNeed.description}</h4>

            {
                getOffers.data === "No offers found" ?
                    <h1>No hay ofertas para esta necesidad</h1>

                    :

                    offers?.map((el, index) => {
                        return (
                            <CardOfferToClientNeed
                                key={index + id}
                                name={el.name || "algun servicio"}
                                id={el.id}
                                guarantee_time={el.guarantee_time}
                                materials={el.materials}
                                ProfessionalId={el.ProfessionalId}
                                price={el.price}
                                date={el.updatedAt.split("T")[0]}
                                description={el.description}
                            />
                        )
                    })
            }

        </div>
    )
}
