import React from 'react'
import { useGlobalStorage } from '../hooks/useGlobalStorage'
import { useDispatch } from 'react-redux'
import { getOffersById, getOffersToSpecificClientNeed } from '../redux/actions'

import Swal from 'sweetalert2'
import axios from 'axios'

import s from './styles/CardOfferToClientNeed.module.css'

const { REACT_APP_HOST } = process.env;

export default function CardOfferToClientNeed(props) {

    const [user, ] = useGlobalStorage("globalUser", "")
    const [cart, setCart] = useGlobalStorage("cart", [])

    const dispatch = useDispatch()

    function addToCart(){
        const exist = cart.filter(el => el.name === props.name )
        const notExist = cart.filter(el => el.name !== props.name )
        if ( exist[0] ){
            exist[0].count +=1;
            setCart([
                ...notExist,
                ...exist
            ])
        } else {
            setCart([
                ...cart,
                {
                    name: props.name,
                    description: props.description,
                    guarantee: props.guarantee_time === 0 ? false:true,
                    guarantee_time: props.guarantee_time,
                    duration: props.duration,
                    price: props.price,
                    photo: props.photo ? props.photo : "https://www.gravatar.com/avatar/205e460b479e2e5b48aec06610c08d50?s=400&r=pg&d=mm",
                    materials: props.materials,
                    count: 1,
                    type: "offer",
                    ClientNeedId: props.ClientNeedId,
                    ProfessionalId: props.ProfessionalId,
                    ProfessionalOfferId: props.id
                }
            ])
        }
    }

    async function deleteOffer() {
        try {
            const data = await axios.delete(`${REACT_APP_HOST}/professsionalOffer/${props.id}`)
            if (data.data === "La oferta ha sido eliminada."){
                Swal.fire({
                    icon: 'success',
                    title: 'La oferta ha sido eliminada con exito!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (data === "La oferta ya ha sido eliminada o no existe") {
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
            dispatch(getOffersById(user.id))
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Algo salió mal!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    async function updateOffer() {
        let obj = {
            name: props.name,
            description: props.description,
            price: props.price,
            duration: props.duration,
            materials: props.materials,
            guarantee_time: props.guarantee_time,
            status: "rejected",
        }
        try {
            const data = await axios.put(`${REACT_APP_HOST}/professsionalOffer/${props.id}`, obj)
            if (data.data === "updated"){
                Swal.fire({
                    icon: 'success',
                    title: 'La oferta ha sido rechazada con exito!',
                    showConfirmButton: false,
                    timer: 1500
                })
                dispatch(getOffersToSpecificClientNeed(props.clientNeed))
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Algo salió mal!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
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
                <p>fecha de creacion de oferta: {props.date}</p>
                <span>
                    Estado: { props.status }
                </span>
            </div>
            <div className={s.container_description}>
                {/* img */}
                <img 
                    src={props.photo? props.photo : "https://www.gravatar.com/avatar/205e460b479e2e5b48aec06610c08d50?s=400&r=pg&d=mm"} 
                    // src={ props.photo }
                    alt="img" 
                    className={s.avatar_img}
                />
                {/* Description */}
                <div>
                    <p>Titulo: {props.name}</p>
                    <p>Descripcion: {props.description}</p>
                    <p>Finalizado en {props.duration} días</p>
                    <p>Duración de la garantia: {props.guarantee_time} días</p>
                    <p>Incluye materiales?{props.materials === true ? ' si' : ' no'}</p>
                    <p>Precio: ${props.price}</p>
                </div>
                {/* buttons */}
                {
                    (user.id !== props.UserId) ?
                        <div className={s.container_buttons}>
                            <button onClick={ updateOffer } name="offers" type="button" className="btn btn-outline-danger">
                                Rechazar
                            </button>
                            <button onClick={ addToCart } name="details" className='btn btn-outline-success'>
                                Agregar al carrito
                            </button>
                            {/* <button name="details" className='btn btn-outline-success'>Contratar</button> */}
                        </div> : (props.status !== "rejected") ?
                        <div className={s.container_buttons}>
                            <button name="offers" type="button" className="btn btn-outline-danger" onClick={deleteOffer}>
                                Eliminar
                            </button>
                        </div> : 
                        <div className={ s.container_buttons }>
                            <span>
                                Lo siento! La oferta ha sido rechazada.
                            </span>
                            <button name="offers" type="button" className="btn btn-outline-danger" onClick={deleteOffer}>
                                Aceptar
                            </button>
                        </div>
                }
            </div>
        </div>
    )
}
