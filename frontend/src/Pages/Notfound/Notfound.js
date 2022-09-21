//import interne
import './Notfound.scss'
import React from 'react'
//import mui
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import HomeIcon from '@mui/icons-material/Home';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Notfound() {
  const navigate = useNavigate()
  const toHome = ()=> {
    navigate('/')
  }
  return (
    <div className='containerNotfound'>
      <ReportProblemIcon  fontSize='large' className='containerNotfound__icon'/>
      <div className='containerNotfound__title'>
      <h1>Erreur <span className='containerNotfound__404--1'>4</span><span className='containerNotfound__404--2'>0</span><span className='containerNotfound__404--3'>4</span> </h1>
      </div>
      <p>la page que vous essayez d'atteindre est introuvable</p>
      <Button variant="contained" startIcon={<HomeIcon/>} onClick={toHome}>
        Accueil
      </Button>
    </div>
  )
}

export default Notfound