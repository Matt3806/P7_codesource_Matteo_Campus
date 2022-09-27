//imports internes
import'./Profile.scss'
import React, { useEffect, useState } from 'react'
//imports externes
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useAuthHeader, useAuthUser } from 'react-auth-kit'
//imports mui
import { Avatar, Box, Typography } from '@mui/material'



import UpdateUser from '../../Components/UpdateUser/UpdateUser'

function Profile() {
  //constantes
  const defaultPicture = 'https://cdn.pixabay.com/photo/2015/01/09/11/09/meeting-594091_960_720.jpg'
  const authHeader = useAuthHeader()
  const authUser = useAuthUser()
  const params = useParams()
  const userId = params.id
  const baseUrl = `http://localhost:8080/api/auth/${userId}`
  const config = {
    headers: { 
      authorization: authHeader() ,
      "content-type" : "multipart/form-data",
      Accept: FormData
    }
  }

  //states
  const [user, setUser] = useState('')

  //fonctions
  const fetchUser = () => {
    axios.get(baseUrl,config)
   .then((res)=>{setUser(res.data)})
   .catch((err) => { console.log(err)})
  }

  const allowed = () => {
    if(authUser().admin || authUser().id === userId){
      return(
        <UpdateUser props={user} config ={config} fetch ={()=> fetchUser()}/>
      )
    }
  }

  //effects
  useEffect (()=>{
    fetchUser()     
  },[])

  return (
    <Box component ='div' sx={{ 
      width:'100%',
      height:'100%',
    }}>
      <Box component = 'img'
        src= {defaultPicture}
        alt=''
        sx={{
          position:'absolute',
          width:'100%',
          height:'100%',
          objectFit:'cover',
          zIndex:-1,
        }}
      >
      </Box>
      <Box component ='div' 
        sx={{
          width:{
            xs:'65%',
            md:'55%'
          },
          maxWidth:'600px',
          height:'500px',
          borderRadius:'15px',
          position:'absolute',
          top: '150px',
          right:'50px',
          backgroundColor:'white',
          opacity:0.8,
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          justifyContent:'space-around'
        }}>
        <Avatar alt={user.username} src={user.picture} sx={{ width: 200, height: 200, cursor:'pointer', margin:'25px', }} />
        <Typography variant='h3'>
          {user.username}
        </Typography>
        <Typography variant='h4' fontSize={20} color="text.secondary">
          Bio:
        </Typography>
        <Typography fontSize={25} >
          {user.bio ? user.bio : "j'adore Groupomania"}
        </Typography>
        {allowed()}
      </Box>
    </Box>
  )
}

export default Profile