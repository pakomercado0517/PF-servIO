import React from 'react';
// @ts-ignore
import s from './styles/ProfileClient.module.css'

export default function ProfileClient(){


    return (
        <div className={ s.div_principal }>
            <div className={ s.div_inicio  }></div>
            <div className={ s.div_photo  }> Lana Roadhes</div>
            <div className={ s.div_info  }>@lali</div>
            <div className={ s.div_info2  }>Buenos Aires, Argentina</div>
            <div className={ s.div_info3  }>Telefono: +54 9 11-2233-4455</div>
            <div className={ s.div_info4  }>Email: LaliRhoades@gmail.com</div>
            <div className={ s.div_info5  }>Ultimas solicitudes:</div>


        </div>    
    )
}
