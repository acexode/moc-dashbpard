import React from 'react'
import { Backdrop, Button, Card, CardActions, CardContent,  Typography } from "@mui/material";
import Logo from '../../Logo';
import { useNavigate } from 'react-router-dom';
const NoticeBackdrop = () => {
    let navigate = useNavigate();
    const onNavigate = () => navigate('/dashboard/app')
  return (
    <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
          onClick={() => console.log('object')}
        >
          <Card sx={{background: '#212B36'}} >
         
      <CardContent sx={{display: 'flex',  flexDirection: 'column', justifyContent: 'center', textAlign: 'center', color: '#fff'}}>
        <div style={{ width: '80%', alignSelf: 'center', marginBottom: '1rem', paddingLeft: '2rem'}}>
        <Logo />
        </div>
        <Typography gutterBottom variant="h5" component="div">
          Notice !!
        </Typography>
        <Typography variant="body2" color="text.light">
          Data is currently being verified
        </Typography>
      </CardContent>
      <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
        <Button onClick={onNavigate} >Back</Button>
      </CardActions>
        </Card>
        </Backdrop>
  )
}

export default NoticeBackdrop
