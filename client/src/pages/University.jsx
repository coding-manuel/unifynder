import React, {useContext, useState, useEffect} from 'react';
import {Stack, Container, Typography, Box, IconButton, List , ListItem, Table, TableCell, TableRow, TableBody, TableHead, Rating } from '@mui/material';
import SnackBar from '../components/SnackBar';
import FeatherIcon from 'feather-icons-react'
import { useParams } from 'react-router-dom'

import Loader from "../components/Loader"
import Layout from '../layout/Layout'
import axios from '../services/axios';
import { UserContext } from '../services/UserContext'
import Input from '../components/TextField/Input'

export default function University() {
  const [uniData, setUniData] = useState({});
  const [courses, setCourses] = useState(null);
  const [facilities, setFacilities] = useState(null);
  const [comments, setComments] = useState(null);
  const [comment, setComment] = useState('');
  const [inWatchlist, setInWatchlist] = useState(false);
  const [open, setOpen] = useState(false)
	const [error, setError] = useState('')
  const {user, setUser } = useContext(UserContext);
  const container = window.document.body;
  let { id } = useParams();

  useEffect(()=>{
    axios()
    .post('/university/getOneUni',{
      id: id
    })
    .then(res => {
      setUniData(res.data)
      setComments(res.data.comments)
    })

  }, [])

  useEffect(()=>{
    if(uniData.Courses){
      setCourses(uniData.Courses[0].split(', '))
      setFacilities(uniData.Facilities[0].split(', '))
    }
  }, [uniData])

  useEffect(()=>{
    axios()
    .get('/user/inWatchlist',{params: {
      college: id,
      user: user
    }})
    .then(res => setInWatchlist(res.data))
  }, [])

  const addWatchlist = () =>{
    setOpen(true)
    if(inWatchlist){
      setError("Removed from Watchlist")
      axios()
      .post('/user/removeWatchlist',{
        user: user,
        collegename: uniData.College_Name
      })
      .then(res => setInWatchlist(res.data))
    }else{
      setError("Added to Watchlist")
      axios()
      .post('/user/addToWatchlist',{
        user: user,
        collegename: uniData.College_Name
      })
      .then(res => setInWatchlist(res.data))
    }
  }

  const submitHandler = (e) =>{
    e.preventDefault();
    axios()
    .post('/university/comment', {
      collegeName: uniData.College_Name,
      commentbody: comment
    })
    .then(res => {
      setUniData(res.data)
      setComments(res.data.comments)
      console.log(res.data.comments)
    })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return
    }
    setOpen(false)
  }

  return (
    <Layout>
      <SnackBar open={open} handleClose={handleClose} error={error} />
      <Container maxWidth='lg'>
        {!courses ? <Loader/> :
        <Stack direction='column' justifyContent='center' gap={2} my={3}>
          <Stack direction='row' alignItems='center' gap={4}>
            <img style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: 4}} src={uniData.Images} alt={uniData.College_Name} />
            <Stack sx={{flexGrow: 2}} justifyContent='space-between' direction='row' alignItems='center'>
              <Stack gap={1}>
                <Typography gutterBottom variant="h6" sx={{margin: 0}}>{uniData.College_Name}</Typography>
                <Rating name="rating" value={uniData.Rating} precision={0.5} readOnly />
                <Stack direction='row' alignItems='center' gap={1}>
                    <FeatherIcon size={18} icon='map-pin' />
                    <Typography variant="subtitle2" color="text.secondary">{uniData.City + ', ' + uniData.State}</Typography>
                </Stack>
                <Stack direction='row' alignItems='center' gap={1}>
                    <FeatherIcon size={18} icon='clipboard' />
                    <Typography variant="subtitle2" color="text.secondary">{uniData.University}</Typography>
                </Stack>
              </Stack>
              <IconButton onClick={addWatchlist} variant={inWatchlist ? 'off' : 'none'}><FeatherIcon icon='bookmark' /></IconButton>
            </Stack>
          </Stack>
          <Typography variant="h5">Overview</Typography>
          <Stack direction='column' gap={2}>
            <Stack direction='row' alignItems='center'  gap={2}>
              <Stack direction='row' gap={2}>
                <FeatherIcon size={18} icon='users' />
                <Typography variant="subtitle2" color="text.secondary">{uniData.Total_Students} Seats</Typography>
              </Stack>
              <Stack direction='row' gap={2}>
                <FeatherIcon size={18} icon='briefcase' />
                <Typography variant="subtitle2" color="text.secondary">{uniData.Total_Faculty} Faculty Members</Typography>
              </Stack>
              <Stack direction='row' gap={2}>
                <FeatherIcon size={18} icon='calendar' />
                <Typography variant="subtitle2" color="text.secondary">Established in {uniData.Established_Year}</Typography>
              </Stack>
            </Stack>
            <Stack>
              <Stack direction='row' alignItems='center' gap={1}>
                  <FeatherIcon size={18} icon='layers' />
                  <Typography variant="subtitle2" color="text.secondary">₹{Math.floor(uniData.Average_Fees).toLocaleString('en-IN')}</Typography>
                </Stack>
              </Stack>
          </Stack>
          <Typography variant="h5">Facilities</Typography>
          <Stack direction='column' gap={2}>
            <Stack direction='row' alignItems='center'  gap={2}>
              {facilities.includes('Library') &&
                <Stack direction='row' gap={2}>
                  <FeatherIcon size={18} icon='book-open' />
                  <Typography variant="subtitle2" color="text.secondary">Library</Typography>
                </Stack>
              }
              {facilities.includes('Cafeteria') &&
                <Stack direction='row' gap={2}>
                  <FeatherIcon size={18} icon='coffee' />
                  <Typography variant="subtitle2" color="text.secondary">Cafeteria</Typography>
                </Stack>
              }
              {facilities.includes('Sports') &&
                <Stack direction='row' gap={2}>
                  <FeatherIcon size={18} icon='target' />
                  <Typography variant="subtitle2" color="text.secondary">Sports</Typography>
                </Stack>
              }
              {facilities.includes('Boys Hostel') &&
                <Stack direction='row' gap={2}>
                  <FeatherIcon size={18} icon='home' />
                  <Typography variant="subtitle2" color="text.secondary">Hostel</Typography>
                </Stack>
              }
            </Stack>
          </Stack>
          <Typography variant="h5">Courses</Typography>
          <Stack direction='row' alignItems='center' gap={2} mx={2}>
            <List sx={{ listStyleType: 'disc' }}>
              {courses.map((value)=>{
                return(<ListItem sx={{ display: 'list-item' }}>{value}</ListItem>)
              })}
            </List>
          </Stack>
          <Typography variant="h5">Cut Off</Typography>
          <Table sx={{ width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell>Cap Round</TableCell>
                <TableCell>Cutoff</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Cap Round 1
                </TableCell>
                <TableCell>{uniData.Cutoff_Round_One}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Cap Round 2
                </TableCell>
                <TableCell>{uniData.Cutoff_Round_Two}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Typography variant="h5">Comments</Typography>
            {!comments ? <Loader/> :
            <Stack>
              <form onSubmit={(event) => submitHandler(event)}>
                <Input
                    name='comment'
                    label='Share your thoughts'
                    fullidth={true}
                    handleChange={(event) => setComment(event.target.value)}
                    value={comment}
                    type='text'
                  />
              </form>
              {comments.map((value)=>
              <Box sx={{backgroundColor: '#3a3a3a', borderRadius: 1, marginTop: 2, padding: '8px 16px'}}>
                <Typography variant="subtitle2">{value}</Typography>
              </Box>
              )}
            </Stack>
            }
        </Stack>
        }
      </Container>
    </Layout>
  );
}

