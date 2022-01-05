import React from 'react'
import { StarRating } from './StarRating'

import s from './styles/CardReview.module.css'

export default function CardReview( props ) {

    console.log( "props card review",props)

    return (
        <div className={ s.container }>
            <div className= { s.container_info }>

                <img 
                    className={ s.container_info_photo }
                    src={ props.photo } 
                    alt="" 
                />

                <span
                    className="text-center"
                > { props.name } </span>

            </div>

            <div className="text-center" >
                <StarRating stars={ props.score } />
            </div>
            <p className="text-center">
                {`" `}{ props.description }{` "`}
            </p>

        </div>
    )
};
