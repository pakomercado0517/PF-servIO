import React from 'react';

import { Link } from 'react-router-dom';

import s from './styles/Home.module.css'
// import NavBar from '../components/NavBar';
import Landing from '../components/Landing';

export default function Home(){
    return (
        <div>
            {/* <NavBar/> */}
            <Landing></Landing>
            <Link  to="/profesional">
                <button className={ s.hardcode }>
                    hardcode to profile profesional
                </button>
            </Link>
        </div>    
    )
}
