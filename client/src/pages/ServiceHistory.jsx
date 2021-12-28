import React from 'react'

import s from './styles/ServiceHistory.module.css'

import CardServiceHistory from '../components/CardServiceHistory.jsx'

export default function ServiceHistory() {
    return (
        <div className={ s.container }>

            {/* AQUI AGREGAR UN MAP AL ARRAY DE DATOS TOMADOS DE DB */}
            <CardServiceHistory>
                {/* TENER EN CUENTA LOS PARAMETROS QUE SE LES PASA A LAS CARD PARA DISTINGUIR LOS 2 TIPOS */}
            </CardServiceHistory>
            
        </div>
    )
}
