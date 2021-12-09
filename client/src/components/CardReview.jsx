import React from 'react'

import s from './styles/CardReview.module.css'

export default function CardReview() {
    return (
        <div className={ s.container }>
            <div className= { s.container_info }>
                <div className={ s.container_info_photo }>
                </div>
                <span>Pepe aguilar</span>
            </div>
            <div className={ s.photo }>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores assumenda ratione, tenetur modi odit doloremque dolorum iure ut, inventore ad, odio corporis earum repellendus repudiandae laboriosam adipisci est iusto voluptate.</p>
        </div>
    )
}
