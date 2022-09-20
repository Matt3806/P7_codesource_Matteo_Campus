//imports internes
import './Signup.scss'
import React, { useEffect, useState } from 'react'
//imports externes
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
//imports mui
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';




function Signup() {

  //Constantes
  const baseUrl = 'http://localhost:8080/api/auth/signup' // adresse API permettant de créer un utiisateur
  const navigate = useNavigate() //permet de rediriger vers une pages


  //States
  const [values, setValues] = useState({
    username:'',
    email:'',
    password: '',
    showPassword: false,
    confirmPassword:'',
    showConfirmPassword: false
  })
  const [errUsername, setErrUsername] = useState(false) //affiche le form username rouge si err cf useEffect
  const [errEmail, setErrEmail] = useState(false) //affiche le form email rouge si err cf useEffect
  const [errPassword, seterrPassword] = useState(false) //affiche le form password rouge si err cf useEffect
  const [errConfirmPassword, setErrConfirmPassword] = useState(false) // affiche le form confirmPassword rouge si err cf useEffect
  const[btndisabled, setBtnDisabled] = useState(true) // bouton disabled si err cf useEffect
  const [errResponse , setErrResponse] = useState('') //recupère la réponse du backend pour l'afficher si err cf err axios

  //Effect
  useEffect (()=>{
    const regexUsername = new RegExp(/^(?=.{4,32}$)(?![.-])(?!.*[.]{2})[a-zA-Z0-9.-]+(?<![.])$/)
    //username is 4-32 characters long no _,- or . at the beginning no __ or . or . or .. or .- or _- inside no _,- or . at the end
    const regexEmail = new RegExp(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm)
    //match si mail de type exemple@exemple.com
    const regexPassword = new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm)
    //match si minimum 8 charactères dont Majuscule, Minuscule, Charactère alphanumérique et Charactère spécial
    if(regexUsername.test(values.username) || values.username ===''){
      setErrUsername(false)
    } else {
      setErrUsername(true)
    }
    if(regexPassword.test(values.password) || values.password === '') {
      seterrPassword(false)
    } else {
      seterrPassword(true)
    }
    if(values.password !== values.confirmPassword)  {
      setErrConfirmPassword(true)
    } else {
      setErrConfirmPassword(false)
    }
    if(regexEmail.test(values.email) || values.email === '') {
      setErrEmail(false)
    }  else {
      setErrEmail(true)
    }
    if( errPassword || values.password.length === 0 || errConfirmPassword || errEmail || errUsername){
      setBtnDisabled(true)
    } else {
      setBtnDisabled(false)
    }
},[values,errPassword, errConfirmPassword,errEmail ,errUsername])

  //Fonctions
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

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const toggleSubmit = (e)=> {
    e.preventDefault()
    const body = {
      username: values.username,
      email : values.email,
      password : values.password
    }
    axios.post(baseUrl,body)
    .then((res) =>{     
      alert('votre profile a été créé')
      navigate('/Login')
    })
    .catch((err) =>{ setErrResponse(err.response.data.error)})
  }

  return (
    <div className='containerLogin'>
      <img src="https://cdn.pixabay.com/photo/2019/06/02/17/33/woman-4246954_960_720.jpg" alt="" className='containerLogin__image'/>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={toggleSubmit}
        className = 'containerLogin__box'
      >
        <img src="images/icon-left-font-monochrome-black.png" alt="" className='containerLogin__box--image'/>
        <h1>Créer un compte <LockOpenIcon className='containerLogin__box--icon'/></h1>
        <TextField
          required
          error={errUsername}
          sx={{ m: 1, width: '100%' , margin:'15px' }}
          id="outlined-multiline-flexible-userName"
          label="Nom d'utilisateur"
          type='text'
          maxRows={4}
          value={values.username}
          onChange={handleChanges('username')}
          helperText = {errUsername ? `saisir un nom d'utilisateur valide ` : ''}
        />
        <TextField
          required
          error={errEmail}
          sx={{ m: 1, width: '100%' , margin:'15px' }}
          id="outlined-multiline-flexible-email"
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
      <FormControl sx={{ m: 1, width: '100%', margin:'15px' }} variant="outlined" required error={errConfirmPassword}>
        <InputLabel htmlFor="outlined-adornment-password" >Confirmer Mdp</InputLabel>
        <OutlinedInput
          id="outlined-adornment-confirmPassword"
          type={values.showConfirmPassword ? 'text' : 'password'}
          value={values.confirmPassword}
          onChange={handleChanges('confirmPassword')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownConfirmPassword}
                edge="end"
              >
                {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"  
        />
      </FormControl>
      <p className='containerLogin__box--errResponse'>{errResponse}</p>
      <Button  sx={{ m: 1, width: '50%', margin:'15px'  }} variant="contained" type="submit" disabled={btndisabled} >Je m'enregistre</Button>
        <p>Déjà enregistré ? <Link to="/Login">Connection</Link></p>
      </Box>
    </div>
  )
}

export default Signup