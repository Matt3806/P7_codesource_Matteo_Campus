import './Home.scss'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Like from '../../Components/Like/Like'
import Modify from '../../Components/Modify/Modify'
import { useAuthHeader} from 'react-auth-kit'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, } from '@mui/material';

import Wave from '../../Components/Wave/Wave';



function Home() {
  //constantes
  const getAllPost = 'http://localhost:8080/api/post/'
  const authHeader = useAuthHeader()
  const config = {
    headers: { 
      authorization: authHeader() ,
      "content-type" : "multipart/form-data",
      Accept: FormData
    }
  }
  //states
  const [post, setPost] = useState([])

  //fonctions 
  const fetchPosts = () => {
    axios.get(getAllPost,config)
   .then((res)=>{setPost(res.data)})
   .catch((err) => { console.log(err)})
  }

  //Effect
  useEffect (()=>{
    fetchPosts()
  },[])


  return (
    <div className='containerHome'>
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
                <Like props={item} fetch={ () => fetchPosts()}  config ={config}/>
                <Modify props={item} fetch={ () => fetchPosts()}  config ={config}/>
              </CardActions>
            </Card>
        ))}
    </div>
  )
}

export default Home