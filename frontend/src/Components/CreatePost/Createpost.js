//imports internes
import './Createpost.scss'
import React from 'react'
import { useState } from 'react'
//imports externes
import {useForm} from 'react-hook-form'
import axios from 'axios'
//imports mui
import { Box, Button, Typography , Drawer, TextField, Input} from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import EditIcon from '@mui/icons-material/Edit'



function Createpost(props) {

  //cosntantes
  const {register , handleSubmit} = useForm() //permet de recupérer l'objet présent dans le form
  const [isDrawerOpen, setIsDrawerOpen] = useState(false) // gestion de l'ouverture du drawer

  //fonctions

  //création du post
  const onSubmit = (data)=>{
    const baseUrl = 'http://localhost:8080/api/post/'

    const obj = {
        title : data.title,
        content : data.content,
        image: data.image[0]
    }
    axios.post(baseUrl, obj, props.config)
    .then((res) => {
      props.fetch()
      setIsDrawerOpen(false)
    })          
      .catch(err => console.log(err))
  }

  return (
    <>
    <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'15px'}} >
      <Button onClick={()=> setIsDrawerOpen(true)} >
        <Typography sx={{fontSize:'25px'}} >Créer un post</Typography>
        <AddBoxIcon sx ={{fontSize:'25px'}}/>
      </Button>
    </Box>
    <Drawer
      anchor= 'top'
      open={isDrawerOpen}
      onClose={()=> setIsDrawerOpen(false)}>
      <Box component= 'form'
        method='PUT' 
        encType='multipart/form-data' 
        onSubmit={handleSubmit(onSubmit)}
        p={2} width ='250px'
        textAlign='center' 
        role= 'presentation'
        sx={{display:'flex',
            flexDirection:'column',
            width:'100vw',
            justifyContent:'center',
            alignItems:'center'
        }}>
        <Typography  sx={{alignSelf:'center', fontSize:'20px'}}>
        image:
        </Typography>
        <Input type="file"
          {...register("image")}
          label="image"
          sx={{ margin:'25px',
                width:'100%',
                maxWidth:'350px'
          }} 
          single='true' 
          accept="image/*"
          filename='image'
        />
        <TextField
          required
          {...register("title")}
          id="outlined-basic"
          label="titre"
          variant="outlined"
          sx={{ margin:'25px',
                width:'100%',
                maxWidth:'350px'
          }}
        />
        <TextField
          required
          {...register("content")}
          id="outlined-basic"
          label="contenu"
          variant="outlined"
          sx={{ margin:'25px',
                width:'100%',
                maxWidth:'350px'
          }}
          multiline
          rows={4} 
        />
        <Button size="small"
        color="primary"
        type='submit'
        sx={{ display:'flex',
              justifyContent:'center',
              alignItems:'center',
              width:'100%',
              maxWidth:'350px'
        }}>
          Créer un nouveau post <EditIcon sx={{margin:'0 5px 0 5px'}} />
        </Button>
      </Box>
    </Drawer>
    </>
  )}

export default Createpost