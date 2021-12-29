import React from 'react'
import s from './styles/Search.modules.css'

export function StarRating({stars}) {
  const maxStars= 5
  const starPercentage= (stars / maxStars) * 100

  const starPercentageRounded= Math.round(starPercentage)
  const StarStyles= ()=> {
    return {
      width: starPercentageRounded + '%'
    }
  }
  
  return (
    <div className={s.stars_gray}>
      <div className={s.stars_yellow} style={StarStyles()}></div>
    </div>
  )
}

