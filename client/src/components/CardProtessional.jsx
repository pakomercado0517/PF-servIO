import s from './styles/CardProfessional.module.css'
import {MdBusinessCenter, MdLocationOn, MdLoyalty} from 'react-icons/md'
import {NavLink} from 'react-router-dom'

const CardProfessional = (props) => {
    return ( 
        <div className={s.professionalCard}>
            <NavLink to={`/professional/${props.idTech}`} style={{textDecoration: 'none', color: 'black'}}><div className={s.avatar}>
                <img src={props.avatarTech} alt="" className={s.avatar_img}/>
                <span>{props.titleTech}</span>
            </div>
            </NavLink>
            <div>
                <div className={s.subtitleTech}>
                    <MdBusinessCenter/>
                    <span>{props.workTech}</span>
                </div>
                <div className={s.subtitleTech}>
                    <MdLocationOn/>
                    <span>{props.locationTech}</span>
                </div>
                <div className={s.subtitleTech}>
                    <MdLoyalty/>
                    <span>{props.calificationTech}</span>
                </div>
            </div>
        </div>
        
    );
}
 
export default CardProfessional;