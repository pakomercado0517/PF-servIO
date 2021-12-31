import React from 'react'
import s from './styles/CardClientNeed.module.css'
import { filterProfessions, filter } from '../redux/actions';
import { useDispatch, useSelector } from "react-redux";

export default function CardClientNeed(props) {
  const needs = useSelector((state) => state.switch)
  console.log(needs)
    return (
        <div className={ s.container }>
            <div className= { s.container_info }>
                <div className={ s.container_info_photo }>
                </div>
                {/* <span>{ props.user.first_name + " " + props.user.last_name }</span> */}
            </div>
            <h6>{ props.name }</h6>
            <p>{ props.description }</p>
        </div>
    )
}
