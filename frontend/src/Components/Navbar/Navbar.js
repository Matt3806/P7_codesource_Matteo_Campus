//imports internes
import'./Navbar.scss'
import React from 'react'
//imports externes
import { useSignOut } from 'react-auth-kit'
import { useAuthUser } from 'react-auth-kit';
//imports mui
import MuiDrawer from '../Drawer/Drawer';
import { AppBar, Button, IconButton, Toolbar, Typography} from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';



function Navbar() {

  //constantes
  const navigate = useNavigate()
  const signOut = useSignOut()
  const authUser = useAuthUser()
  
  return (
  <AppBar position='sticky' sx= {{backgroundColor:'#FD2D01'}}>
    <Toolbar >
      <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={ e => {navigate('/')}}>
        <LanguageIcon  />
      </IconButton>
      <Typography variant='h6' component='div' sx={{flexGrow:1}} >
        Groupomania
      </Typography>
      <Stack direction='row' spacing={2}sx={{
         transform: {
          xs:'scale(0)',
          md:'scale(1)',
        }}} >
        <Button color='inherit'onClick={ e => {navigate('/')}}>Accueil</Button>
        <Button color='inherit'onClick={ e => {navigate(`/profil/${authUser().id}`)}}>Profil</Button>
        <IconButton color='inherit' size='large' edge='start' aria-label='logo' onClick={e => {signOut()}}>
          <LogoutIcon/>
        </IconButton>
      </Stack>
      <MuiDrawer/>
    </Toolbar>
  </AppBar>
  )
}

export default Navbar