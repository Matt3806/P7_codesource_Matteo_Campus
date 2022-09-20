//imports internes
import './Login.scss'
import React, { useEffect, useState } from 'react'
//imports externes
import axios from 'axios'
import { useSignIn } from 'react-auth-kit'
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode"
//imports mui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';



function Login() {
  //constantes
  const baseUrl = 'http://localhost:8080/api/auth/login' // adresse API permettant de se connecter 
  const signIn = useSignIn() //ajoute le token et ses informations dans un cookie d'une validité de 30 min cf app
  const navigate = useNavigate() //permet de rediriger vers une pages

  //states
  const [values, setValues] = useState({email:'', password: '',showPassword: false,}) //values présentes dans le form envoyé au backend
  const [errEmail, setErrEmail] = useState(false) //affiche le form email rouge si err cf useEffect
  const [errPassword, seterrPassword] = useState(false) //affiche le form password rouge si err cf useEffect
  const [errResponse , setErrResponse] = useState('') //recupère la réponse du backend pour l'afficher si err cf err axios

  //Effects
  useEffect (()=>{
      const regexEmail = new RegExp(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm)
      //match si mail de type exemple@exemple.com
      const regexPassword = new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm)
      //match si minimum 8 charactères dont Majuscule, Minuscule, Charactère alphanumérique et Charactère spécial

      if(regexPassword.test(values.password) || values.password === '') {
        seterrPassword(false)
      } else {
        seterrPassword(true)
      }
      if(regexEmail.test(values.email) || values.email === '') {
        setErrEmail(false)
      }  else {
        setErrEmail(true)
      }    
  },[values.password, values.email])

  //fonctions
  const handleChanges = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  };
  
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const toggleSubmit = (e)=>{
    e.preventDefault()
    const body = {
      email : values.email,
      password : values.password
    }  

    axios.post(baseUrl,body)
    .then((res) => {
      const decoded = jwt_decode(res.data.token)
      if(res.status === 200){
        if(signIn({token: res.data.token,
                   expiresIn:3600,
                   tokenType: "Bearer",
                   authState: {
                    email: body.email,
                    id: decoded.userId,
                    admin: decoded.isadmin
                  },
                  })){
                    navigate('/')
                  }else {
                    //Throw error
                  }
      }
    })
    .catch((err) => { setErrResponse(err.response.data.error)})
  }

  return (
    <div className='containerLogin'>
      <img src="https://cdn.pixabay.com/photo/2018/03/10/12/00/teamwork-3213924_960_720.jpg" alt="" className='containerLogin__image'/>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit = {toggleSubmit}
        className = 'containerLogin__box'
      >
        <img src="images/icon-left-font-monochrome-black.png" alt="" className='containerLogin__box--image'/>
        <h1>Connection <LoginIcon className='containerLogin__box--icon'/></h1>
        <TextField
          required
          error={errEmail}
          sx={{ m: 1, width: '100%' , margin:'15px' }}
          id="outlined-multiline-flexible"
          label="Email"
          type='email'
          maxRows={4}
          value={values.email}
          onChange={handleChanges('email')}
          helperText={ errEmail ? 'saisir un email valide de type: example@gmail.com' : ''}
        />
        <FormControl sx={{ m: 1, width: '100%', margin:'15px' }} variant="outlined" required error={errPassword}>
          <InputLabel htmlFor="outlined-adornment-password" >Mdp</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChanges('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"  
          />
        </FormControl>
        <p className='containerLogin__box--errResponse'>{errResponse}</p>
        <Button  sx={{ m: 1, width: '50%', margin:'15px'  }} variant="contained" type="submit" >Se connecter</Button>
        <p>Pas encore de compte ? <Link to="/Signup">Créer un compte</Link></p>
      </Box>
    </div>
  )
}

export default Login