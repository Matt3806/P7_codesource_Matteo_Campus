//imports internes
import React, { useEffect, useState } from 'react'
import './FromUser.scss'
//imports externes
import axios from 'axios';
//imports mui
import { Avatar, Box, Typography } from '@mui/material'

function FromUser(props)  {
    //constantes
    const baseUrl = `http://localhost:8080/api/auth/${props.props.userId}`

    //states
    const [user, setUser] = useState('')

    //fonctions
    const fetchUser = () => {
        axios.get(baseUrl,props.config)
       .then((res)=>{setUser(res.data)})
       .catch((err) => { console.log(err)})
    }

    //effects
    useEffect (()=>{
            fetchUser()     
    },[])


  return (
    <Box content ='div' sx={{display:'flex', flexGrow:1, justifyContent:'space-around', alignItems:'center', width:'100%'}} >
        <Typography > Créé par : {user.username}</Typography>
        <Avatar alt={user.username} src={user.picture} sx={{ width: 56, height: 56  }} />
    </Box>
  )
}

export default FromUser