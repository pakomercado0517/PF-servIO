import './styles/CardProfessional.css'
import {MdBusinessCenter, MdLocationOn, MdLoyalty} from 'react-icons/md'
import {NavLink} from 'react-router-dom'

const CardProfessional = (props) => {
    return ( 
        <div className='professionalCard' key={ props.idTech + props.subtitleTech}>
            
            {/* <NavLink 
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
                
            </div> */}

            <div className="col-md-4">
                <div className='profile-card-4 text-center'><NavLink to={`/professional/${props.idTech}`} ><img src={props.avatarTech} className="img img-responsive"/></NavLink>
                    <div className="profile-content">
                        <div className="profile-name card-name">{props.titleTech}
                        </div>
                        <div className="profile-description">
                            <MdBusinessCenter className="card-profession"/> 
                            {props.workTech?.map((e, index)=> {
                            return (
                                <span className='card-profession' key={e + index}>
                                {` ${ e.name} `}
                                </span>
                            )
                            })}
                        </div>
                        <div className="row">
                            <div className="col-xs-4">
                                <div className="profile-overview">
                                    <p>RATING</p>
                                    <h4>{`${props.calificationTech ? props.calificationTech +'/5' : '0/5'}`}</h4></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CardProfessional;