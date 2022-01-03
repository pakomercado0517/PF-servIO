import React, { useState, useEffect } from 'react'
// css
import s from './styles/Cart.module.css'
// Componentes
import CardCart from './CardCart'
// Hooks
import { useGlobalStorage } from '../hooks/useGlobalStorage'
import useScript from '../hooks/useScript'
// AXIOS
import axios from 'axios'

const { REACT_APP_ACCESS_PUBLIC } = process.env;


export default function Cart() {
    let mp;
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
        mp.checkout({
            preference: {
                id: preferenceId
            },
            render: {
                container: '#cho-container', // Class name where the payment button will be displayed
                label: 'Comprar Ahora', // Change the payment button text (optional)
            }
        });
    }

    async function axiosMP(){
        let request;
        if(cart[0]){
            request = cart.map(el =>{
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
        await axios.post("http://localhost:3001/create_preference",{
            items: request
        })
        .then(function(response) {
            return response.data;
        })
        .then(function(preference) {
            createCheckoutButton(preference.id);
            document.getElementById("checkout_button").style.display = "none";
            // document.getElementsByClassName("shopping-cart").fadeOut(500);
            // $(".shopping-cart").fadeOut(500);
            // setTimeout(() => {
            //     // document.getElementsByClassName("container_payment").show(500).fadeIn();
            //     // $(".container_payment").show(500).fadeIn();
            // }, 500);
        })
        .catch(function() {
            alert("Unexpected error");
            document.getElementById("cho-container").disabled = true
        });
    }
    const [cart, ] = useGlobalStorage("cart", [])
    const [total, settotal] = useState(0)

    useEffect(() => {
        if (cart[0]){
            const aux = cart.map(el => el.count * el.price)
            settotal(aux?.reduce((a, b) => a+b))
        }
    }, [cart])

    return (
        <div className={s.container}>
            <div className={s.container_list}>
                <div className={ s.container_list_cards }>
                    {
                        cart.map((el, index) =>{
                            return (
                                <CardCart
                                key={ "cart" + index }
                                name= { el.name }
                                description= { el.description }
                                price= { el.price }
                                count= { el.count }
                                />
                            )
                        })
                    }
                </div>
            </div>
            <div className={ s.container_totalDetails }>

            </div>
            <div className={s.container_buttons}>
                <span>Total: { total }</span>
                <button id='checkout_button' className={ 'btn btn-success' } onClick={ axiosMP }> Continuar Compra</button>
                <div id='cho-container'></div>
            </div>
            <div className='shopping-cart'></div>
            <div className='container_payment'></div>
        </div>
    )
}
