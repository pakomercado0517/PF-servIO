import React from 'react'
import { useGlobalStorage } from '../hooks/useGlobalStorage'
import s from './styles/CardParticularService.module.css'


export default function CardParticularService(props) {

    const [cart, setCart] = useGlobalStorage("cart", [])

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

            <div className={s.container_info}>
                <h1>${props.price}</h1>
            </div>
            
            <div className={ s.container_description }>
                <h5>{ props.name }</h5>
                <p>{ props.description }</p>
            </div>
            
            <button onClick={ addToCart } className={ s.container_button + " btn btn-success"}>
                Agregar al carrito
            </button>
        
        </div>
    )
}
