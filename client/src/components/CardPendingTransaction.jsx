import React from 'react'

import s from './styles/CardPendingTransaction.module.css'

import axios from 'axios';

import useScript from '../hooks/useScript';

export default function CardPendingTransaction(props) {

    // MERCADO PAGO FUNCTIONS

    const { MercadoPago } = useScript(
        "https://sdk.mercadopago.com/js/v2",
        "MercadoPago"
        );
    
    useEffect(() => {
            if(MercadoPago){
            mp = new MercadoPago( REACT_APP_ACCESS_PUBLIC ,{
                locale: 'es-AR'
            });
        }
    }, [MercadoPago])

    
    function createCheckoutButton(preferenceId){
        console.log(preferenceId)
        mp.checkout({
            preference: {
                id: preferenceId
            },
            render: {
                container: '#cho-container-service-history', // Class name where the payment button will be displayed
                label: 'Finalizar Compra', // Change the payment button text (optional)
            }
        });
    }

    
    async function axiosMP(idTransaction){
        let request;
        if(props.data[0]){
            request = props.data.map(el =>{
                return {
                    title: el.name,
                    unit_price: el.price,
                    quantity: el.count
                }
            })
        } else {
            request = [{
                title: "",
                unit_price: 0,
                quantity: 0,
            }]
        }
        await axios.post("http://localhost:3001/create_preference", {
            items: request,
            back_urls: {
                success: "http://localhost:3001/create_preference/succes",
                failure: "http://localhost:3001/create_preference/failure",
                pending: "http://localhost:3001/create_preference/pending"
            },
            statement_descriptor: "ServIO",
            external_reference: ""+ idTransaction,
        })
        .then(function(response) {
            return response.data;
        })
        .then(function(preference) {
            createCheckoutButton(preference.id);
            document.getElementById("checkout_button_service_history").style.display = "none";
            })
            .catch(function() {
            alert("Unexpected error");
            document.getElementById("cho-container-service-history").disabled = true
        });
    }


    return (
        <div className={ s.container }>
            <div className={ s.container_img }>
                <img src="https://image.shutterstock.com/image-illustration/3d-man-dollar-symbol-260nw-100691149.jpg" alt="" />
            </div>
            <div className={ s.container_description }>
                Pague el servicio que tiene pendiente!
            </div>
            <div className={ s.buttons }>
                <button id='checkout_button_service_history' onClick={ axiosMP }>Pagar</button>
                <div id='cho-container-service-history'></div>
            </div>
        </div>
    )
}
