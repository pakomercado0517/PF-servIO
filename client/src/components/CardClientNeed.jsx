import React from 'react'
import s from './styles/CardClientNeed.module.css'

export default function CardClientNeed(props) {

    return (
        
        <div className={ s.container }>
            
            <div className= { s.container_info }>
                <div>
                {/* <div className={ s.container_info_photo }> */}
                    <img 
                        className={ s.container_info_photo }
                        src={ props.photo } 
                        alt="" 
                    />
                </div>
            </div>

            <h6>{ props.name }</h6>
            <p>{ props.description }</p>
        </div>
    )
}
