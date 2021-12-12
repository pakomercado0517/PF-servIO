import React from 'react'

import s from './styles/TestimoniosHome.module.css'

import img from '../img/ivana-cajina-_7LbC5J-jw4-unsplash.jpg'


export default function TestimoniosHome() {
    return (
        <div className={s.feedback}>
            <span className={s.titleFeed}>Lo que dicen nuestros usuarios</span>
            <p className={s.subtitleFeed}>
                feedback de clientes y profesinales que respaldan nuestro servicio
                y garantisamos una buena experiencia, en conjunto con intuitividad 
                de la intefaz 
            </p>
            <div className={s.cardsFeed}>
                <div>
                    <div>
                        <img src={img} alt="" className={s.imgFeed}/>
                        <div>
                            <span>Marcos Ford</span>
                            <span>Cliente</span>
                            <span>Rating</span>
                        </div>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt illo, ducimus magnam natus eum assumenda aliquam sint, dolores quos, placeat quae sit nihil minima molestiae excepturi maiores alias voluptatibus nesciunt. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta placeat fugit veritatis, perferendis velit quasi deserunt, repellat laborum odio, impedit non cum molestiae. Impedit maxime a repellendus, eos nesciunt aliquam!
                    </p>
                </div>
                <div>
                    <div>
                        <img src={img} alt="" className={s.imgFeed}/>
                        <div>
                            <span>Marcos Ford</span>
                            <span>Cliente</span>
                            <span>Rating</span>
                        </div>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt illo, ducimus magnam natus eum assumenda aliquam sint, dolores quos, placeat quae sit nihil minima molestiae excepturi maiores alias voluptatibus nesciunt. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta placeat fugit veritatis, perferendis velit quasi deserunt, repellat laborum odio, impedit non cum molestiae. Impedit maxime a repellendus, eos nesciunt aliquam!
                    </p>
                </div>
            </div>
        </div>
    )
}
