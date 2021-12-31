import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux'

import { useParams } from 'react-router-dom';

import { getAllProfessionalOffers, getDetailsClientNeed } from '../redux/actions'

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
            console.log(data.data)
        }
        getOffers()
    }, [])

    const detailsClientNeed = useSelector(state => state.detailsClientNeed)
    const dispatch = useDispatch();


    useEffect(()=> {
        dispatch(getAllProfessionalOffers())
        dispatch(getDetailsClientNeed(id))
    }, []);


    return (
        <div className={styles.container}>
            <h1>Ofertas para:</h1>
            <h3> {detailsClientNeed.name} </h3>
            <h4>{ detailsClientNeed.description}</h4>
            {
                offers?.map((el,index) => {
                    console.log(offers)
                    return (
                        <CardOfferToClientNeed
                        key={ index + id }
                        name={ el.name || "algun servicio" }
                        id={ el.id }
                        guarantee_time={ el.guarantee_time }
                        materials={ el.materials }
                        price={ el.price }
                        date={ el.updatedAt }
                        description={ el.description }
                        />
                    )
                })
            }

        </div>
    )
}
