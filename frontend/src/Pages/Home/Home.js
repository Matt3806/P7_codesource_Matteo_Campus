//imports internes
import './Home.scss'
import React, { useEffect, useState } from 'react'
import Like from '../../Components/Like/Like'
import Modify from '../../Components/Modify/Modify'
import Wave from '../../Components/Wave/Wave';
//imports externes
import axios from 'axios'
import { useAuthHeader} from 'react-auth-kit'
//imports mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, CardActions, } from '@mui/material';
import Avatar from '@mui/material/Avatar';






function Home() {
  //constantes
  const getAllPost = 'http://localhost:8080/api/post/'
  const getAllUser = 'http://localhost:8080/api/auth/'
  const pictureMissing = "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_960_720.jpg"
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
  const [user, setUser] = useState([])

  //fonctions 
  const fetchPosts = () => {
    axios.get(getAllPost,config)
   .then((res)=>{setPost(res.data)})
   .catch((err) => { console.log(err)})
  }
  const fetchUsers = ()=>{
    axios.get(getAllUser,config)
    .then((res)=>{setUser(res.data)})
    .catch((err) => { console.log(err)})
   }

  //Effect
  useEffect (()=>{
    fetchPosts();
    fetchUsers()
  },[])

  return (
    <div className='containerHome'>
        <Wave/>
        {post.map(item => (
            <Card sx={{ maxWidth: 400 , display:'flex', flexDirection:'column' , backgroundColor:'white'}} key = {item.id} className='containerHome__card'>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="25%"
                  image={item.picture ? item.picture : pictureMissing}
                  alt=""
                />
                <CardContent sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'start',}}>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{textAlign:'justify'}} >
                    {item.content}
                  </Typography>
                </CardContent>      
              </CardActionArea>
              <CardActions sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <Like props={item} fetch={ () => fetchPosts()}  config ={config}/>
                <Box content ='div' sx={{display:'flex', flexGrow:1, justifyContent:'space-around', alignItems:'center', width:'100%'}} >
                    <Typography > Créé par : {user.find( i => i.id === item.userId).username}</Typography>
                    <Avatar alt={user.find( i => i.id === item.userId).username} src={user.find( i => i.id === item.userId).picture} sx={{ width: 56, height: 56 }} />
                </Box>
                <Typography sx={{margin:'10px' ,alignSelf:'start',}} color="text.secondary" >le : {item.createdAt.substring(0, 10)} </Typography>
                <Modify props={item} fetch={ () => fetchPosts()}  config ={config}/>
              </CardActions>
            </Card>
        ))}
    </div>
  )
}

export default Home