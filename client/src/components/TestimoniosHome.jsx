import React from 'react'
import img from '../img/ivana-cajina-_7LbC5J-jw4-unsplash.jpg'
import img2 from '../img/user_profile_photo.jpg'
import { useSelector } from 'react-redux'
import { StarRating } from './StarRating'

import s from './styles/TestimoniosHome.module.css'


export default function TestimoniosHome() {

    const profesional1 = useSelector(state => state.clientsFilter[7])
    const profesional2 = useSelector(state => state.clientsFilter[5])

    console.log('prof',profesional1)
    console.log('prof2',profesional2)

    return (

        <div className={s.feedback}>
            <span className={s.titleFeed}>Lo que dicen nuestros usuarios</span>
            <p className={s.subtitleFeed}>
                Feedback de clientes y profesionales que respaldan nuestro servicio.
                Garantizamos una buena experiencia, en conjunto con intuitividad 
                de la intefaz 
            </p>
            <div className={s.cardsFeed}>
                <div className={s.card}>
                    <div>
                        <img src={img} alt="" className={s.imgFeed}/>
                        <div>
                            <span>Marcos</span>
                            <h6>Cliente</h6>
                        </div>
                        <StarRating stars={4} />
                    </div>
                    <p>
                    "Superó mis espectativas , excelente trabajo y calidad humana"
                    </p>
                    <div>
                        <p>--</p>
                        <span>
                        <img src={ profesional1?.photo} className={s.imgFeedProf}/>
                        <span>{ profesional1?.first_name + ' ' + profesional1?.last_name}</span>
                        </span>
                        <h6>{ profesional1?.Professional.Professions[0].name }</h6>

                    </div>
                </div>

                <hr/>

                <div className={s.card}>
                    <div>
                        <img src={img2} alt="" className={s.imgFeed}/>
                        <div>
                            <span>Norma</span>
                            <h6>Cliente</h6>
                        </div>
                            <StarRating stars={5} />
                    </div>
                    <p>
                    Hizo un trabajo muy bueno. Fue puntual. Me asesoró. Lo recomiendo.
                    </p>
                    <div>
                        <p>--</p>
                        <span>
                        <img src={ profesional2?.photo} className={s.imgFeedProf}/>
                        <span>{ profesional2?.first_name + ' ' + profesional2?.last_name}</span>
                        </span>
                        <h6>{ profesional2?.Professional.Professions[0].name }</h6>

                    </div>
                </div>
            </div>
        </div>
    )
}
