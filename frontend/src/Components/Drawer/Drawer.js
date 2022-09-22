import React from 'react'
import {Drawer, Box, Typography, IconButton, Button} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LanguageIcon from '@mui/icons-material/Language';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
import { useSignOut } from 'react-auth-kit'


function MuiDrawer() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const navigate = useNavigate()
    const signOut = useSignOut()
  return (
    <>
    <IconButton 
    size ='large'
    edge='start'
    color= 'inherit'
    aria-label= 'logo'
    onClick={()=> setIsDrawerOpen(true)}
    sx={{
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
            <Typography  color='primary' variant ='h6' component= 'div' sx={{display:'flex', justifyContent:'center', alignItems:'center'}} >
                <LanguageIcon size='large' edge='start' color='inherit' aria-label='logo' sx={{margin:'10px'}} />
                GROUPOMANIA
            </Typography>
            <Button color='inherit' sx ={{margin:'25px'}}onClick={ e => {navigate('/') ; setIsDrawerOpen(false)}}>Accueil</Button>
            <Button color='inherit'sx ={{margin:'25px'}}onClick={ e => {navigate('/createpost') ; setIsDrawerOpen(false)}}>Créer un post</Button>
            <Button color='inherit'sx ={{margin:'25px'}}onClick={ e => {navigate('/profil'); setIsDrawerOpen(false)}}>Profil</Button>
            <Button color='error' onClick={e => {signOut()}}>
                <LogoutIcon/>
            </Button>       
        </Box>
    </Drawer>
    </>
  )
}

export default MuiDrawer