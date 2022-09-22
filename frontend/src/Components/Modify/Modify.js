import { Box, Button, Input, Modal, TextField, Typography} from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import {useAuthUser} from 'react-auth-kit'

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

function Modify( props) {
    const baseUrl = `http://localhost:8080/api/post/${props.props.id}`
    const authUser = useAuthUser()
    const [open, setOpen] = useState(false);
    const [title, settitle] = useState(props.props.title)
    const [content, setcontent] = useState(props.props.content)
    const [picture, setpicture] = useState(null)


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const modifypost = (item) =>{
        if(authUser().admin || authUser().id === item.userId){
          return(
          <div className='containerHome__card__modify'>
          <Button size="small" color="primary" onClick={handleOpen}>
            Modifier
          </Button>
          </div>)
        }
      }
    
 
    const updatePost = (e) => {
      e.preventDefault()
      const obj = {
        title : title,
        content : content,
        image: picture
      }
      axios.put(baseUrl,obj,props.config)
      .then((res) => {props.fetch() ; handleClose()})
      .catch((err)=>{console.log(err)})
    }

    const deletePost = () => {
      axios.delete(baseUrl,props.config)
      .then((res) => {props.fetch() ; handleClose()})
      .catch((err)=>{console.log(err)})
    }

  return (
    <>
    {modifypost(props.props)}
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
          <Button size="small" color="primary" type='submit'>
            Modifier
          </Button>
          <Button size="small" color="error" sx={{margin:'25px'}} onClick={deletePost}>
            Supprimer
          </Button>
        </Box>
      </Modal>      
    </>
  )
}

export default Modify