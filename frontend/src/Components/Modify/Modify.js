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

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(props.props.picture)
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
        <Box component ='form' sx={style} onSubmit={updatePost} encType='multipart/form-data'>
          <Typography  sx={{alignSelf:'center', fontSize:'20px'}}>image:</Typography>
          <Box component='div' sx={{border:'solid red', alignSelf:'center'}}>
            <Box
              component="img"
              height="25%"
              image={props.props.picture}
              alt="" sx={{objectFit:'cover' , maxHeight:'150px', maxWidth:'150px'}}>
            </Box>
          </Box>
          <Input type="file" label="image" sx={{margin:'25px'}} name ="image"/>
          <TextField id="outlined-basic" label="titre" variant="outlined" sx={{margin:'25px'}} value={title} onChange={e =>{settitle(e.target.value)}}/>
          <TextField id="outlined-basic" label="contenu" variant="outlined" sx={{margin:'25px'}} multiline rows={4} value={content} onChange={e =>{setcontent(e.target.value)}}/>
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