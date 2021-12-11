import s from './styles/CardProfessional.module.css'
import {MdDragIndicator} from 'react-icons/md'
import {NavLink} from 'react-router-dom'

const CardProfessional = (props) => {
    return ( 
        <div className={s.professionalCard}>
            <div>
                <img src={props.avatarTech} alt=""/>
                <span>{props.titleTech}</span>
            </div>
            <div>
                <div>
                    <span>{props.workTech}</span>
                </div>
                <div>
                    <span>{props.locationTech}</span>
                </div>
                <div>
                    <span>{props.calificationTech}</span>
                </div>

                <div>
                    <NavLink to={`/professional/${props.idTech}`}>
                        <MdDragIndicator/>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
 
export default CardProfessional;