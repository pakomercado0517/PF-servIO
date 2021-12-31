import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getAllProfessionalOffers } from '../redux/actions'
import CardOfferToClientNeed from '../components/CardOfferToClientNeed';

import axios from 'axios';

import styles from './styles/OffersToSpecificClientsNeeds.module.css'

export const OffersToSpecificClientsNeeds = () => {
     

    const [offers, setOffers] = useState([])
    const { id } = useParams();

    useEffect(() => {
        async function getOffers(){
            const data = await axios.get("http://localhost:3001/professsionalOffer/need/" + id)
            if (data.data === "No offers found") return setOffers([])
            setOffers(data.data)
        }
        getOffers()
    }, [])

    const professional = useSelector(state => state.professionals[0])
    // const offers = useSelector(state => state.allProfessionalsOffers[0])
    const dispatch = useDispatch();


    useEffect(()=> {
        dispatch(getAllProfessionalOffers())
    }, []);
    // useEffect(()=> {
    //     // dispatch(getByUserId(detailsClientNeed.UserId))
    // }, [ dispatch, detailsClientNeed ]);


    return (
        <div className={styles.container}>
            <h1>Ofertas para:</h1>
            {/* <h3> {detailsClientNeed.name} </h3> */}
            {/* <h4>{ detailsClientNeed.description}</h4> */}
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
            {
                offers?.map((el,index) => {
                    console.log(offers)
                    return (
                        <CardOfferToClientNeed
                        name={ el.name }
                        id={ el.id }
                        guarantee_time={ el.guarantee_time }
                        materials={ el.materials }
                        price={ el.price }
                        date={ el.updateAt }
                        />
                    )
                })
            }
            
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
