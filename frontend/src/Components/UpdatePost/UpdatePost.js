//imports internes
import './UpdatePost.scss'
import React, { useState } from 'react'
//imports externes
import axios from 'axios';
import {useAuthUser} from 'react-auth-kit'
//imports mui
import { Box, Button, Input, Modal, TextField, Typography} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


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

function UpdatePost(props) {
  //constantes
  const baseUrl = `http://localhost:8080/api/post/${props.props.id}`
  const authUser = useAuthUser()

  //states
  const [open, setOpen] = useState(false);
  const [title, settitle] = useState(props.props.title)
  const [content, setcontent] = useState(props.props.content)
  const [picture, setpicture] = useState(false)

  //fonctions
  const handleOpen = () => setOpen(true); //ouvre la modal
  const handleClose = () => setOpen(false); //ferme la modal

  //affiche le bouton pour trigger la modal si admin ou user ayant créé le post
  const allowed = (item) =>{
      if(authUser().admin || authUser().id === item.userId){
        return(
        <div className='containerHome__card__modify'>
        <Button size="small" color="primary" onClick={handleOpen} sx={{ display:'flex', justifyContent:'space-around',alignItems:'center'}}>
          Modifier <EditIcon sx={{margin:'0 5px 0 5px'}} />
        </Button>
        </div>)
      }
    }
  
  //met à jour le post avec les éléments renseignés dans les inputs
  const updatePost = (e) => {
    e.preventDefault()
    if (window.confirm('Modifier votre post ?') === true){
      const obj =  picture ?
      {
        title : title,
        content : content,
        image: picture
      } : { title:title, content:content }

      axios.put(baseUrl,obj,props.config)
      .then((res) => {props.fetch() ; handleClose()})
      .catch((err)=>{console.log(err)})
    }
  }

  //supprime le post
  const deletePost = () => {
    if (window.confirm('ATTENTION, vous allez supprimer votre post')=== true){
    axios.delete(baseUrl,props.config)
    .then((res) => {props.fetch() ; handleClose()})
    .catch((err)=>{console.log(err)})
    }
  }

  return (
    <>
    {allowed(props.props)}
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component ='form' sx={style} onSubmit={updatePost} encType='multipart/form-data' id="form" name="form">
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
            label="titre"
            variant="outlined"
            sx={{margin:'25px'}}
            value={title}
            onChange={e =>{settitle(e.target.value)}}
          />
          <TextField
            id="outlined-basic"
            label="contenu"
            variant="outlined"
            sx={{margin:'25px'}}
            multiline
            rows={4} 
            value={content}
            onChange={e =>{setcontent(e.target.value)}}
          />
          <Button size="small" color="primary" type='submit'sx={{ display:'flex', justifyContent:'center',alignItems:'center'}}>
            Modifier <EditIcon sx={{margin:'0 5px 0 5px'}} />
          </Button>
          <Button size="small" color="error" sx={{margin:'25px', display:'flex', justifyContent:'center',alignItems:'center'}} onClick={deletePost}>
            Supprimer  <DeleteIcon sx={{margin:'0 5px 0 5px'}}/>
          </Button>
        </Box>
      </Modal>      
    </>
  )
}

export default UpdatePost