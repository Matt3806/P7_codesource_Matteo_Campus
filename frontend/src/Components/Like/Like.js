
import React, { useState } from 'react'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { Checkbox } from '@mui/material'
import { useAuthUser } from 'react-auth-kit';
import axios from 'axios'

function Like(props) {
  const baseUrl = `http://localhost:8080/api/like/${props.props.id}`
  const authUser = useAuthUser()
  const liked = props.props.users.map(i => i.id).includes(authUser().id)

  const [isliked, setisliked] = useState(liked)

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
    <p>{props.props.users.length}</p>
  </div>
    
  )
}

export default Like