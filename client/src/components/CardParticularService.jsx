import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useGlobalStorage } from '../hooks/useGlobalStorage'
import { getSpecificActivitiesById, getByUserId } from '../redux/actions';

import s from './styles/CardParticularService.module.css'


export default function CardParticularService(props) {

    const [cart, setCart] = useGlobalStorage("cart", [])
    const { id } = useParams()
    const dispatch = useDispatch()
    // console.log('id', id)
    
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
                    price: props.price,
                    count: 1
                }
            ])
        }
    }
    return (
        <div className={s.container}>
            
            <Link 
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
}
