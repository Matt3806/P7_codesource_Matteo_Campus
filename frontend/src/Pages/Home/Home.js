import './Home.scss'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useAuthUser, useAuthHeader} from 'react-auth-kit'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Checkbox } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

import Wave from '../../Components/Wave/Wave';



function Home() {
  //constantes
  const getAllPost = 'http://localhost:8080/api/post/'
  const authUser = useAuthUser()
  const authHeader = useAuthHeader()
  const config = {
    headers: { authorization: authHeader() }
}
  //states
  const [post, setPost] = useState([])

  //fonctions 
  const fetchPosts = () => {
    axios.get(getAllPost,config)
   .then((res)=>{setPost(res.data)})
   .catch((err) => { console.log(err) })
  }

  //Effect
  useEffect (()=>{
    fetchPosts()
  },[])

  const modifypost = (item) =>{
    if(authUser().admin || authUser().id === item.userId){
      return(
      <div className='containerHome__card__modify'>
      <Button size="small" color="primary">
        Modifier
      </Button>
      <Button variant="outlined" color="error" startIcon={<DeleteIcon /> }>
        Supprimer
      </Button>
      </div>)
    }
  }
  return (
    <div className='containerHome'>
        <div id='bg'>
          <img src="" alt="" />
        </div>
        <Wave/>
        {post.map(item => (
            <Card sx={{ maxWidth: 345 , display:'flex', flexDirection:'column' , backgroundColor:'white'}} key = {item.id} className='containerHome__card'>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="25%"
                  image={item.picture ? item.picture : "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_960_720.jpg"}
                  alt=""
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.content}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <div className='containerHome__card__likeSystem'>
                  <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                  <p>{item.users.length}</p>
                </div>
                {modifypost(item)}
                {console.log(authUser().id === item.userId)}
              </CardActions>
            </Card>
        ))}
    </div>
  )
}

export default Home