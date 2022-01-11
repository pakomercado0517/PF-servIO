import React, { useEffect } from 'react'

import s from './styles/CardPendingTransaction.module.css'

import axios from 'axios';

import Swal from 'sweetalert2';

import useScript from '../hooks/useScript';
import { useDispatch } from 'react-redux';
import { getAllTransactionsByUserId } from '../redux/actions';
import { useGlobalStorage } from '../hooks/useGlobalStorage';

const { REACT_APP_ACCESS_PUBLIC, REACT_APP_HOST } = process.env

var mp;

export default function CardPendingTransaction(props) {

    const dispatch = useDispatch()

    const [user, ] = useGlobalStorage("globalUser", "")

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

    
    async function axiosMP(){
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
        await axios.post(`${REACT_APP_HOST}/create_preference`, {
            items: request,
            back_urls: {
                success: `${REACT_APP_HOST}/create_preference/succes`,
                failure: `${REACT_APP_HOST}/create_preference/failure`,
                pending: `${REACT_APP_HOST}/create_preference/pending`
            },
            statement_descriptor: "ServIO",
            external_reference: ""+ props.id,
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

    async function deletePendingTransaction() {
        try {
            const { data } = await axios.delete(`${REACT_APP_HOST}/Transactions/${props.id}`)
            if (data === "La transaccion ha sido eliminada."){
                Swal.fire({
                    icon: 'success',
                    title: 'La oferta ha sido eliminada con exito!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (data === "La transaccion ya ha sido eliminada o no existe") {
                Swal.fire({
                    icon: 'error',
                    title: data,
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Algo salió mal!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            dispatch(getAllTransactionsByUserId(user.id))
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Algo salió mal!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }


    return (
        <div className={ s.container }>
            <div className={s.container_date}>
                <p>fecha de creacion de compra: {props.date}</p>
                <span>
                    Estado: { props.status }
                </span>
            </div>
            <div className={ s.container_description}>
                <div className={ s.container_description_img }>
                    <img className={s.container_description_img_img} src="https://image.shutterstock.com/image-illustration/3d-man-dollar-symbol-260nw-100691149.jpg" alt="" />
                </div>
                <div className={ s.container_description_description }>
                    Pague el servicio que tiene pendiente!
                </div>
                <div className={ s.container_description_buttons }>
                    <button id='checkout_button_service_history' className='btn btn-outline-success' onClick={ axiosMP }>Pagar</button>
                    <button id='checkout_button_service_history' className='btn btn-outline-danger' onClick={ deletePendingTransaction }>Eliminar</button>
                    <div id='cho-container-service-history'></div>
                </div>
            </div>
        </div>
    )
}
