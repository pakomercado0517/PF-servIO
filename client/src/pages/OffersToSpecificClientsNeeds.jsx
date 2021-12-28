import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getAllProfessionalOffers, getByUserId, getDetailsClientNeed } from '../redux/actions'

import styles from './styles/OffersToSpecificClientsNeeds.module.css'

export const OffersToSpecificClientsNeeds = () => {
    
    const { detailsClientNeed, user, allProfessionalsOffers } = useSelector(state => state)
    console.log('details client need',detailsClientNeed);
    console.log('user',user);
    console.log('allProfessionalsOffers',allProfessionalsOffers);

    const offers = useSelector(state => state.allProfessionalsOffers[0])

    const dispatch = useDispatch();
    const { id } = useParams();


    useEffect(()=> {
        dispatch(getDetailsClientNeed(id))
        dispatch(getAllProfessionalOffers())
    }, [ dispatch, id ]);
    useEffect(()=> {
        dispatch(getByUserId(detailsClientNeed.UserId))
    }, [ dispatch, detailsClientNeed ]);


    return (
        <div>
            <h1>Ofertas para:</h1>
            <h2> {detailsClientNeed.name} </h2>
            <h3>{ detailsClientNeed.description}</h3>
            <div className={styles.container_offers}>
                {
                    detailsClientNeed.ProfessionalOffers?.map(el=> {
                        return(
                            <div className={styles.offer}>
                                <h3>{el.name}</h3>
                                <p>{el.description}</p>
                                <p>{el.price}</p>
                                <p>{el.date}</p>
                            </div>
                        )
                    })
                }
            </div>

            <div className={styles.offer}>
                                {/* <h3>{detailsClientNeed.name}</h3> */}
                                <p>descripcion:{offers.description}</p>
                                <p>finalizado en {offers.duration} días</p>
                                <p>duracion de la garantia:{offers.guarantee_time} días</p>
                                <p>incluye materiales?{offers.materials === true ? 'si' : 'no'}</p>
                                <p>precio:${offers.price}</p>
                                <p>fecha de creacion de oferta:{offers.createdAt}</p>
                            </div>






        </div>
    )
}
