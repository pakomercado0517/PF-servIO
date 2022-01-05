import React, { useState, useEffect } from 'react'
// css
import s from './styles/Cart.module.css'
// Componentes
import CardCart from './CardCart'
import ModalCart from './ModalCart'
// Hooks and redux
import { useGlobalStorage } from '../hooks/useGlobalStorage'
import useScript from '../hooks/useScript'
import { useDispatch } from 'react-redux'
// AXIOS
import axios from 'axios'
import { switchModalCart } from '../redux/actions'

const { REACT_APP_ACCESS_PUBLIC } = process.env;


export default function Cart() {

    const dispatch = useDispatch()

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

    function showForm(){
        dispatch(switchModalCart("show"))
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
    const [user, ] = useGlobalStorage("globalUser", [])
    const [total, settotal] = useState(0)

    useEffect(() => {
        if (cart[0]){
            const aux = cart.map(el => el.count * el.price)
            settotal(aux?.reduce((a, b) => a+b))
        }
    }, [cart])

    return (
        <>
            <ModalCart email={user.email} />
            <div className={s.container}>
                <div className={s.container_list}>
                    <div className={s.container_list_cards}>
                        {
                            cart.map((el, index) => {
                                return (
                                    <CardCart
                                        key={"cart" + index}
                                        name={el.name}
                                        description={el.description}
                                        guarantee={el.guarantee}
                                        guarantee_time={el.guarantee_time}
                                        materials={el.materials}
                                        duration={el.duration}
                                        photo={el.photo}
                                        price={el.price}
                                        count={el.count}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <div className={s.container_totalDetails}>

                </div>
                <div className={s.container_buttons}>
                    <div class="alert alert-warning" role="alert">
                        <span>Total:  {total}</span>
                    </div>
                    <button id='checkout_button' className={s.container_buttons_button + ' btn btn-success'} onClick={showForm}> Continuar Compra</button>
                    <div id='cho-container'></div>
                </div>
                <div className='shopping-cart'></div>
                <div className='container_payment'></div>
            </div>
        </>
    )
}
