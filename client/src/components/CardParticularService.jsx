import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useGlobalStorage } from '../hooks/useGlobalStorage'
import { getSpecificActivitiesById, getByUserId } from '../redux/actions';

import s from './styles/CardParticularService.module.css'


export default function CardParticularService(props) {

    const [cart, setCart] = useGlobalStorage("cart", "")
    const [user, ] = useGlobalStorage("globalUser", "")
    const { id } = useParams()
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getByUserId(id))
        dispatch(getSpecificActivitiesById(id)) // comentar
    },[dispatch, id])
    
    
    function addToCart(){
        const exist = cart.filter(el => el.name === props.name )
        const notExist = cart.filter(el => el.name !== props.name )
        console.log("exists: ", exist)
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
                    guarantee: props.guarantee,
                    guarantee_time: props.guarantee_time,
                    duration: props.duration,
                    photo: props.photo ? props.photo : "https://www.gravatar.com/avatar/205e460b479e2e5b48aec06610c08d50?s=400&r=pg&d=mm",
                    materials: props.materials,
                    price: props.price,
                    count: 1,
                    type: props.type,
                    specificTechnicalActivityId: props.id,
                    UserId: user.id,
                }
            ])
        }
    }
    return (
        <div className={s.container}>
            
            <Link 
                // to={`/professional/${id}/SpecificActivity/${props.id + "-" + id}`}
                // Puse el id del professional y de la publicacion juntas para que puedas tomar los datos y hacer el dispatch de cada uno
                to={`/professional/${id}/SpecificActivity/${props.id}`}
                style={{ textDecoration: 'none' }}
            >
            
                <div className={s.container_info}>
                    <h1>${props.price}</h1>
                </div>
                
                <div className={ s.container_description }>
                    <h5>{ props.name }</h5>
                    <p>{ props.description }</p>
                </div>

            </Link>

            <button 
                className={ s.container_button + " btn btn-success"}
                onClick={ addToCart } 
            >
                Agregar al carrito
            </button>
        
        </div>
    )
};