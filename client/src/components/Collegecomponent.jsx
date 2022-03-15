import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FeatherIcon from 'feather-icons-react'


export default function Collegecomponent() {
  return (
    <Card sx={{ maxWidth: 'auto' }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image= "data:image/jpeg;base64,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"
      />
      <CardContent>
      <Grid sx={{ my : 2 }} container spacing={1}>
      <Grid  item xs={10}>
        <Typography gutterBottom variant="h5" component="div">
          FRCRCE
        </Typography>
        </Grid>
        <Grid sx={{ pl:0}}item md={2} xs={4}>
        <CardActions>
        <Button sx={{ mb : 2 ,pl:0}} variant="contained" size="small"> <FeatherIcon icon='bookmark' /> Add to Watchlist</Button>
      </CardActions>
        </Grid>
        </Grid>
        <Grid  sx={{ border: 1 , borderColor: 'text.primary'}} container spacing={1}>
        <Grid sx={{ border: 1 }}  item md={2} xs={4}>
        <Typography variant="body2" color="text.secondary">
         University
        </Typography>
        </Grid>
        <Grid sx={{ border: 1, borderColor: 'text.primary' }} item xs={8} md={10}>
        <Typography variant="body2" color="text.secondary">
          Mumbai University
        </Typography>
        </Grid>
        <Grid sx={{ border: 1, borderColor: 'text.primary' }} item md={2} xs={4}>
        <Typography variant="body2" color="text.secondary">
          College Type
        </Typography>
        </Grid>
        <Grid sx={{ border: 1 , borderColor: 'text.primary'}} item xs={8} md={10}>
        <Typography variant="body2" color="text.secondary">
          Private
        </Typography>
        </Grid>
        <Grid sx={{ border: 1, borderColor: 'text.primary' }} item md={2} xs={4}>
        <Typography variant="body2" color="text.secondary">
         Rating
        </Typography>
        </Grid>
        <Grid sx={{ border: 1, borderColor: 'text.primary' }} item xs={8} md={10}>
        <Typography variant="body2" color="text.secondary">
          2
        </Typography>
        </Grid>
        <Grid sx={{ border: 1 , borderColor: 'text.primary'}} item md={2} xs={4}>
        <Typography variant="body2" color="text.secondary">
          Genders Accepted
        </Typography>
        </Grid>
        <Grid sx={{ border: 1, borderColor: 'text.primary' }} item xs={8} md={10}>
        <Typography variant="body2" color="text.secondary">
          Co-ED
        </Typography>
        </Grid>
        <Grid sx={{ border: 1 , borderColor: 'text.primary'}} item md={2} xs={4}>
        <Typography variant="body2" color="text.secondary">
          Campus Size
        </Typography>
        </Grid>
        <Grid sx={{ border: 1, borderColor: 'text.primary' }} item xs={8} md={10}>
        <Typography variant="body2" color="text.secondary">
          256 acres
        </Typography>
        </Grid>
        <Grid sx={{ border: 1 , borderColor: 'text.primary'}} item md={2} xs={4}>
        <Typography variant="body2" color="text.secondary">
          Average fees
        </Typography>
        </Grid>
        <Grid sx={{ border: 1, borderColor: 'text.primary' }} item xs={8} md={10}>
        <Typography variant="body2" color="text.secondary">
          152000
        </Typography>
        </Grid>
        <Grid sx={{ border: 1 , borderColor: 'text.primary'}} item md={2} xs={4}>
        <Typography variant="body2" color="text.secondary">
          Cut OFF
        </Typography>
        </Grid>
        <Grid sx={{ border: 1, borderColor: 'text.primary' }} item xs={8} md={10}>
        <Typography variant="body2" color="text.secondary">
          97%
        </Typography>
        </Grid>
        <Grid sx={{ border: 1, borderColor: 'text.primary' }} item md={2} xs={4}>
        <Typography variant="body2" color="text.secondary">
          Courses
        </Typography>
        </Grid>
        <Grid sx={{ border: 1, borderColor: 'text.primary' }} item xs={8} md={10}>
        <Typography variant="body2" color="text.secondary">
        B.Tech Computer Science Engineering, B.Tech Electrical and Electronics Engineering, B.Tech Electronics and Communication Engineering, B.Tech Mechanical Engineering, B.Tech Chemical Engineering, B.Tech Civil
        </Typography>
        </Grid>
        <Grid sx={{ border: 1, borderColor: 'text.primary' }} item md={2} xs={4}>
        <Typography variant="body2" color="text.secondary">
          Facilities
        </Typography>
        </Grid>
        <Grid sx={{ border: 1, borderColor: 'text.primary' }} item xs={8} md={10}>
        <Typography variant="body2" color="text.secondary">
        Boys Hostel, Girls Hostel, Gym, Library, Sports, Cafeteria, Auditorium, Medical/Hospital, Wifi, IT Infrastructure, Laboratories, Alumni Associations, Guest Room
        </Typography>
        </Grid>
        <Grid sx={{ border: 1 , borderColor: 'text.primary'}} item md={2} xs={4}>
        <Typography variant="body2" color="text.secondary">
          City
        </Typography>
        </Grid>
        <Grid sx={{ border: 1 , borderColor: 'text.primary'}} item xs={8} md={10}>
        <Typography variant="body2" color="text.secondary">
       Mumbai
        </Typography>
        </Grid>
        <Grid sx={{ border: 1 , borderColor: 'text.primary'}} item md={2} xs={4}>
        <Typography variant="body2" color="text.secondary">
        State
        </Typography>
        </Grid>
        <Grid sx={{ border: 1, borderColor: 'text.primary' }} item xs={8} md={10}>
        <Typography variant="body2" color="text.secondary">
        Maharashtra
        </Typography>
        </Grid>
        <Grid sx={{ border: 1, borderColor: 'text.primary' }} item md={2} xs={4}>
        <Typography variant="body2" color="text.secondary">
        Facilities
        </Typography>
        </Grid>
        <Grid sx={{ border: 1 }} item xs={8} md={10}>
        <Typography variant="body2" color="text.secondary">
        Boys Hostel, Girls Hostel, Gym, Library, Sports, Cafeteria, Auditorium, Medical/Hospital, Wifi, IT Infrastructure, Laboratories, Alumni Associations, Guest Room
        </Typography>
        </Grid>
        
        
        </Grid>
      </CardContent>
      
    </Card>
  );
}
