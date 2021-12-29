import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getAllProfessionalOffers, getByUserId, getDetailsClientNeed } from '../redux/actions'

import styles from './styles/OffersToSpecificClientsNeeds.module.css'

export const OffersToSpecificClientsNeeds = () => {
    
    const { detailsClientNeed, user } = useSelector(state => state)
    console.log('details client need',detailsClientNeed);
    console.log('user',user);

    const professional = useSelector(state => state.professionals[0])
    console.log('professional',professional);
    const offers = useSelector(state => state.allProfessionalsOffers[0])
    console.log('offers',offers);
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
        <div className={styles.container}>
            <h1>Ofertas para:</h1>
            <h3> {detailsClientNeed.name} </h3>
            <h4>{ detailsClientNeed.description}</h4>
            {/* <div className={styles.list_item_grouper}>
                {
                    detailsClientNeed.ProfessionalOffers?.map(el=> {
                        return(
                            <div className={styles.offer}>
                                <p>{el.description}</p>
                                <p>{el.price}</p>
                                <p>{el.date}</p>
                            </div>
                        )
                    })
                }
            </div> */}
            
            <div className={styles.list_item_grouper}>
            <div className={styles.list_item_grouper_header}>
                <p>fecha de creacion de oferta:{offers?.createdAt}</p>
            </div>
            <div className={styles.list_item}>
                <img src={professional?.photo} alt="img" className={styles.avatar_img}/>
                <p>descripcion:{offers?.description}</p>
                <p>finalizado en {offers?.duration} días</p>
                <p>duracion de la garantia:{offers?.guarantee_time} días</p>
                <p>incluye materiales?{offers?.materials === true ? 'si' : 'no'}</p>
                <p>precio:${offers?.price}</p>
            </div>
            </div>
            <div className={styles.list_item_grouper}>
            <div className={styles.list_item_grouper_header}>
                <p>fecha de creacion de oferta:{offers?.createdAt}</p>
            </div>
            <div className={styles.list_item}>
                <img src={professional?.photo} alt="img" className={styles.avatar_img}/>
                <p>descripcion:{offers?.description}</p>
                <p>finalizado en {offers?.duration} días</p>
                <p>duracion de la garantia:{offers?.guarantee_time} días</p>
                <p>incluye materiales?{offers?.materials === true ? 'si' : 'no'}</p>
                <p>precio:${offers?.price}</p>
            </div>
            </div>
            <div className={styles.list_item_grouper}>
            <div className={styles.list_item_grouper_header}>
                <p>fecha de creacion de oferta:{offers?.createdAt}</p>
            </div>
            <div className={styles.list_item}>
                <img src={professional?.photo} alt="img" className={styles.avatar_img}/>
                <p>descripcion:{offers?.description}</p>
                <p>finalizado en {offers?.duration} días</p>
                <p>duracion de la garantia:{offers?.guarantee_time} días</p>
                <p>incluye materiales?{offers?.materials === true ? 'si' : 'no'}</p>
                <p>precio:${offers?.price}</p>
            </div>
            </div>

        </div>
    )
}
