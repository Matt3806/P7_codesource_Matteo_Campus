//imports internes
import './Like.scss'
import React, { useState } from 'react'
//imports externes
import axios from 'axios'
//imports mui
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { Checkbox, Typography } from '@mui/material'
import { useAuthUser } from 'react-auth-kit';


function Like(props) {
  //constantes
  const baseUrl = `http://localhost:8080/api/like/${props.props.id}`
  const authUser = useAuthUser()
  const liked = props.props.users.map(i => i.id).includes(authUser().id)

  //states
  const [isliked, setisliked] = useState(liked)

  //fonctions
  const likeDislike = (e) =>{
    if (e.target.checked){
      setisliked(!liked)
      axios.post(baseUrl,{},props.config)
        .then((res) => {props.fetch() })
        .catch((err)=>{console.log(err)})
    } else {
      setisliked(!liked)
      axios.delete(baseUrl,props.config)
        .then((res) => {props.fetch() })
        .catch((err)=>{console.log(err)})
    }
  }

  return (
  <div className='containerHome__card__likeSystem'>
    <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={isliked} onChange={likeDislike}/>   
    <Typography>{props.props.users.length}</Typography>
  </div>    
  )
}

export default Like