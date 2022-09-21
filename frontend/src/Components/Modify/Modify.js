import { Button } from '@mui/material'
import React from 'react'
import {useAuthUser} from 'react-auth-kit'


function Modify(props) {
    const authUser = useAuthUser()
    const modifypost = (item) =>{
        if(authUser().admin || authUser().id === item.userId){
          return(
          <div className='containerHome__card__modify'>
          <Button size="small" color="primary">
            Modifier
          </Button>
          </div>)
        }
      }
  return (
    <>
    {modifypost(props.props)}
    </>
  )
}

export default Modify