//importrs internes
import React from 'react'
import { useState } from 'react'
import './Drawer.scss'
//imports externes
import { useSignOut } from 'react-auth-kit'
import { useAuthUser } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'
//imports mui
import {Drawer, Box, Typography, IconButton, Button} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LanguageIcon from '@mui/icons-material/Language'
import LogoutIcon from '@mui/icons-material/Logout'



function MuiDrawer() {

    //constantes
    const navigate = useNavigate()
    const signOut = useSignOut()
    const authUser = useAuthUser()

    //states
    const [isDrawerOpen, setIsDrawerOpen] = useState(false) //gère l'ouverture du drawer

  return (
    <>
    <IconButton 
    size ='large'
    edge='start'
    color= 'inherit'
    aria-label= 'logo'
    onClick={()=> setIsDrawerOpen(true)}
    sx={{
        paddingTop:'8px',
        position:'absolute',
        top:'10px',
        right:'15px',
        transform: {
            xs:'scale(1)',
            md:'scale(0)',
        }
    }} >
        <MenuIcon />
    </IconButton>
    <Drawer
        anchor= 'left'
        open={isDrawerOpen}
        onClose={()=> setIsDrawerOpen(false)}>
        <Box p={2} width ='250px' textAlign='center' role= 'presentation' sx={{display:'flex',flexDirection:'column'}} >
            <Typography  color='#FD2D01' variant ='h6' component= 'div' sx={{display:'flex', justifyContent:'center', alignItems:'center'}} >
                <LanguageIcon size='large' edge='start' color='inherit' aria-label='logo' sx={{margin:'10px'}} />
                GROUPOMANIA
            </Typography>
            <Button color='inherit' sx ={{margin:'25px'}}onClick={ e => {navigate('/') ; setIsDrawerOpen(false)}}>Accueil</Button>
            <Button color='inherit'sx ={{margin:'25px'}}onClick={ e => {navigate(`/profil/${authUser().id}`); setIsDrawerOpen(false)}}>Profil</Button>
            <Button color='error' onClick={e => {signOut()}}>
                <LogoutIcon/>
            </Button>       
        </Box>
    </Drawer>
    </>
  )
}

export default MuiDrawer