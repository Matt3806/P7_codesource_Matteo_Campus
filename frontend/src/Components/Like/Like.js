
import React from 'react'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { Checkbox } from '@mui/material'

function Like(props) {
  return (
    <div className='containerHome__card__likeSystem'>
    <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />}/>   
    <p>{props.props.users.length}</p>
  </div>
    
  )
}

export default Like