import React, { useEffect } from 'react'

import s from './styles/HomeProfessional.module.css'

import { connect } from 'react-redux'
import { getAllNeeds } from '../redux/actions'

import CardClientNeed from './CardClientNeed';
import NavBar from './NavBar'

function HomeProfessional(props) {

    useEffect(() => {
        props.getNeeds()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        console.log(props.needs)
    }, [props])

    function filter() {
        const fondo = document.getElementById("fondo-filter")
        const filter = document.getElementById("container-filter")
        fondo.style.right = "0px"
        filter.style.right = "0px"
    }
    function filter2() {
        const fondo = document.getElementById("fondo-filter")
        const filter = document.getElementById("container-filter")
        fondo.style.right = "-100vw"
        filter.style.right = "-30vw"
    }

    return (
        <div className={ s.container }>
            <NavBar></NavBar>
            <button onClick={ filter } className={s.container_filterButton }>
                Filtros
            </button>
            <div onClick={ filter2 } id="fondo-filter" className={ s.container_fondoFilter }>
            </div>
            <div id="container-filter" className={ s.container_filter }>
                <span>Filtrado por ciudad</span>
                <span>Filtrado por nombre</span>
                <span>Search segun descripcion</span>
            </div>
            {
                !props.needs[0]?<h1>Cargandooo</h1>:(
                    <div className={ s.container_cards }>
                    {
                        props.needs.map((el, index) => {
                            return (
                                <CardClientNeed key={ "CardClientNeed" + index}
                                user={ el.User }
                                name={ el.name }
                                description={ el.description }
                                date={ el.date }
                                userId={ el.userId }
                                location={ el.location }
                                />     
                            )
                        })
                    }
                    </div>
                )
            }
        </div>
    )
}

function mapStateToProps(state){
    return {
        needs: state.clientNeeds
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getNeeds: () => dispatch(getAllNeeds())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeProfessional)
