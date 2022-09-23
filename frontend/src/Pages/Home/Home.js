//imports internes
import './Home.scss'
import React, { useEffect, useState } from 'react'
import Like from '../../Components/Like/Like'
import Modify from '../../Components/Modify/Modify'
import Wave from '../../Components/Wave/Wave';
import FromUser from '../../Components/FromUser/FromUser';
import Createpost from '../../Components/CreatePost/Createpost';
//imports externes
import axios from 'axios'
import { useAuthHeader} from 'react-auth-kit'
//imports mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, } from '@mui/material';
import { Box } from '@mui/system';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


function Home() {
  //constantes
  const getAllPost = 'http://localhost:8080/api/post/'
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

  //fonctions 
  const fetchPosts = () => {
    axios.get(getAllPost,config)
   .then((res)=>{setPost(res.data)})
   .catch((err) => { console.log(err)})
  }
  
  const noPost = ()=> {
    if(post.length === 0){
      return (
        <Box component ='div'
          sx ={{width:'100%',
          height:'500px',
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
          }}>
          <ArrowUpwardIcon sx={{ fontSize: '35px', marginBottom:'25px'}} />
          <Typography sx={{ fontSize: '35px', textAlign:'center'}} color='inherit'>
            Vous êtes le premier ! 
            <br/> 
            Créez un post et partagez le à vos collègues
          </Typography>
        </Box>  
      )
    } 
  }
  //Effect
  useEffect (()=>{
    fetchPosts();
  },[])
  

  return (
    <>
    <Wave/>
    <Createpost config={config} fetch= {() => fetchPosts()} />
    {noPost()}
    <div className='containerHome'>
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
                <FromUser props={item} config ={config}/>
                <Typography sx={{margin:'10px' ,alignSelf:'start',}} color="text.secondary" >le : {item.createdAt.substring(0, 10)} </Typography>
                <Modify props={item} fetch={ () => fetchPosts()}  config ={config}/>
              </CardActions>
            </Card>
        ))}
    </div>
  </>
  )
}

export default Home