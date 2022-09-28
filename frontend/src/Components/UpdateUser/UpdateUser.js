//imports internes
import './UpdateUser.scss'
import React, { useState } from 'react'
//imports externes
import axios from 'axios';
//imports mui
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Input, Modal, TextField, Typography } from '@mui/material'



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius:'5px',
    boxShadow: 24,
    p: 4,
    display:'flex',
    flexDirection:'column', 
  };
function UpdateUser(props) {

    //constantes
    const baseUrl = `http://localhost:8080/api/auth/${props.props.id}`

    //states
    const [open, setOpen] = useState(false)
    const [picture, setpicture] = useState(false)
    const [username, setusername] = useState(props.props.username)
    const [bio, setbio] = useState(props.props.bio)

    //fonctions
    const handleOpen = () => setOpen(true); //ouvre la modal
    const handleClose = () => setOpen(false); //ferme la modal

    //modification du profil
    const updateUser = (e) => {
        e.preventDefault()
        if (window.confirm('Modifier votre post ?') === true){
          const obj = picture ? {
            username : username,
            bio : bio,
            image: picture  
          } : {username:username, bio:bio}
          axios.put(baseUrl,obj,props.config)
          .then((res) => {props.fetch() ; handleClose()})
          .catch((err)=>{console.log(err)})
        }
      }
    
    //suppression du profil
    const deleteUser = () => {
        if (window.confirm('ATTENTION, vous allez supprimer votre profil')=== true){
            axios.delete(baseUrl,props.config)
            .then((res) => {props.fetch() ; handleClose()})
            .catch((err)=>{console.log(err)})
        }
    }

  return (
    <>
    <Button  onClick={handleOpen} size="small" color="primary"  sx={{ display:'flex', justifyContent:'space-around',alignItems:'center'}}>
        Modifier <EditIcon sx={{margin:'0 5px 0 5px'}} />
    </Button>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box onSubmit={updateUser} component ='form' sx={style}  encType='multipart/form-data' id="form" name="form">
          <Typography  sx={{alignSelf:'center', fontSize:'20px'}}>
            image:
          </Typography>
          <Input type="file"
            label="image"
            sx={{margin:'25px'}} 
            single='true' 
            accept="image/*"
            filename='image'
            onChange={e => {setpicture(e.target.files[0]) }}
          />
          <TextField
            id="outlined-basic"
            label="Nom D'utilisateur"
            variant="outlined"
            sx={{margin:'25px'}}
            value={username}
            onChange={e =>{setusername(e.target.value)}}
          />
          <TextField
            id="outlined-basic"
            label="Bio"
            variant="outlined"
            sx={{margin:'25px'}}
            multiline
            rows={4}
            value={bio}
            onChange={e =>{setbio(e.target.value)}} 

          />
          <Button size="small" color="primary" type='submit'sx={{ display:'flex', justifyContent:'center',alignItems:'center'}}>
            Modifier <EditIcon sx={{margin:'0 5px 0 5px'}} />
          </Button>
          <Button onClick={deleteUser} size="small" color="error" sx={{margin:'25px', display:'flex', justifyContent:'center',alignItems:'center'}} >
            Supprimer  <DeleteIcon sx={{margin:'0 5px 0 5px'}}/>
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default UpdateUser