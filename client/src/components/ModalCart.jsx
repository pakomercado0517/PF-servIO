import React, { useState, useEffect } from 'react'

import s from './styles/ModalCart.module.css'

import Swal from 'sweetalert2'

import { useDispatch, useSelector } from 'react-redux'
import { switchModalCart } from '../redux/actions'
import { useGlobalStorage } from '../hooks/useGlobalStorage'
import useScript from '../hooks/useScript'


import axios from 'axios'

const { REACT_APP_HOST, REACT_APP_ACCESS_PUBLIC } = process.env

var mp;

export default function ModalCart(props) {

    const [input, setinput] = useState("")
    const [cart, setCart] = useGlobalStorage("cart", "")
    const [user, ] = useGlobalStorage("globalUser", "")

    const dispatch = useDispatch()
    const { modalCart } = useSelector(state => state)

    useEffect(() => {
        dispatch(switchModalCart("notShow"))
    }, [])

    useEffect(() => {
        // SETEO EL CARRITO
        const newData = cart.map( el => {
            return {
                ...el,
                location: input,
                UserId: user.id
            }
        })
        setCart(newData)
    }, [input])

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
                container: '#cho-container', // Class name where the payment button will be displayed
                label: 'Finalizar Compra', // Change the payment button text (optional)
            }
        });
    }

    
    async function axiosMP(idTransaction){
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
        await axios.post("http://localhost:3001/create_preference", {
            items: request,
            // payer: {
            //     name: user.first_name,
            //     surname: user.last_name,
            //     email: user.email,
            //     phone: {
            //         area_code: "54",
            //         number: user.phone
            //     },
            //     identification: {
            //         type: "DNI",
            //         number: "12345678"
            //     },
            //     address: {
            //         street_name: cart[0].location,
            //         street_number: 123,
            //         zip_code: "5700"
            //     }
            // },
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

    async function handleSubmit() {

        try {
            const { data } = await axios.post( REACT_APP_HOST+"/Transactions/", {
                data: cart
            })

            console.log("DATA TRANSACTIONS: ---> ",data)

            if(data.message === "Created successfuly") {
                Swal.fire({
                    icon: 'success',
                    title: 'La pretición se creo con exito!, ahora solo debes finalizar la compra con mercado pago',
                    showConfirmButton: true,
                    timer: 8500
                })

                await axiosMP( data.id )

                dispatch(switchModalCart("notShow"))

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Algo fallo, revisa los datos',
                    showConfirmButton: true,
                    timer: 3500
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Algo fallo, revisa los datos',
                showConfirmButton: true,
                timer: 3500
            })
        }

    }

    useEffect(() => {
        if (modalCart === "show") {
            const fondo = document.getElementById("modal-cart")
            fondo.style.top = "0px"
        } else if(modalCart === "notShow") {
            const fondo = document.getElementById("modal-cart")
            fondo.style.top = "-100vh"
        }
    }, [modalCart])
    
    function back() {
        dispatch(switchModalCart("notShow"))
    }

    function inputChange(e) {
        setinput(e.target.value)
        
    }

    return (
        <div className={ s.container } id='modal-cart'>
            <div className={ s.container_background } onClick={back}></div>
            <div className={ s.container_form }>
                <form>
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" id="staticEmail" defaultValue={ props.email } />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Dirección</label>
                        <div className="col-sm-10">
                            <input value={ input } type="text" className="form-control" id="inputPassword" onChange={ inputChange } />
                        </div>
                    </div>
                </form>
                <div className={ s.container_buttons }>
                    <button onClick={ back } className={ "btn btn-secondary"}>Volver</button>
                    <button onClick={ handleSubmit } className={ "btn btn-success" }>Confirmar</button>
                </div>
                {/* <div id='cho-container'></div> */}
            </div>
            {/* <div className='container_payment'></div> */}
        </div>
    )
}
