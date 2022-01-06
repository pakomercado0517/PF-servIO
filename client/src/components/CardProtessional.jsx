import s from './styles/CardProfessional.module.css'
import {MdBusinessCenter, MdLocationOn, MdLoyalty} from 'react-icons/md'
import {NavLink} from 'react-router-dom'

const CardProfessional = (props) => {
    return ( 
        <div className={s.professionalCard} key={ props.idTech + props.subtitleTech}>
            
            <NavLink 
                to={`/professional/${props.idTech}`} 
                style={{textDecoration: 'none', color: 'black'}}
            >
                <div className={s.avatar}>
                
                <img 
                    src={props.avatarTech} 
                    alt="" 
                    className={s.avatar_img}
                />
                <span>{props.titleTech}</span>
                
                </div>
            
            </NavLink>
            
            <div>
            
                <div className={s.subtitleTech}>
                    <div className={s.subtitleTech_1}>
                        {props.workTech?.map((e, index) => 
                        <span key={ e + index }>
                            <MdBusinessCenter/> {e.name}
                        </span>
                        )}
                    </div>
                </div>
                
                <div className={s.subtitleTech}>
                    <span> <MdLocationOn/> {props.locationTech}</span>
                </div>
                
                <div className={s.subtitleTech}>
                    <span> <MdLoyalty/> {props.calificationTech ? props.calificationTech +'/5' : '0/5' }</span>
                </div>
                
            </div>
        </div>
        
    );
}
 
export default CardProfessional;