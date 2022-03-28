import React, { useState, useEffect, useContext } from 'react'
import { Grid, Button, Typography, Container, FormControl, Stack, Snackbar, IconButton } from '@mui/material'

import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import MediaCard from '../components/Mediacards';
import FeatherIcon from 'feather-icons-react'
import { UserContext } from '../services/UserContext'

import axios from '../services/axios'

import Layout from '../layout/Layout'

const Profile = () => {
  const {user, setUser } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [marks, setMarks] = useState(null);
  const [error, setError] = useState();
  const [open, setOpen] = useState(false)


  const handleSubmit = (e) =>{
    e.preventDefault()
    if(marks > 100){
      setOpen(true)
      setError("Marks cannot be greater that 100")
    }
    axios()
    .post('/user/enterMarks',{
      marks: marks,
      user: user
    })
    .then(res =>{
      console.log(res.data)
      setMarks(res.data)
      setOpen(true)
      setError("Marks Set")
    })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  useEffect(()=>{
    axios()
    .get('/user/getUser',{params: {
      user: user
    }})
    .then(res =>{
      setUserData(res.data)
    })
    .catch(err =>{
      console.log(err)
    })
  }, [])
	return (
		<Layout>
      <Snackbar
					open={open}
					autoHideDuration={3000}
					onClose={handleClose}
					message={error}
					action={
						<React.Fragment>
							<IconButton
								aria-label='close'
								color='inherit'
								sx={{ padding: '5px', borderRadius: '6px' }}
								onClick={handleClose}
							>
								<FeatherIcon icon='x' size='16' />
							</IconButton>
						</React.Fragment>
					}
				/>
      <Container maxWidth='lg' sx={{py: 4}}>
        <Stack gap={2}>
          <Typography variant='h4'>Hello, {userData.name}</Typography>
          <Typography variant='subtitle1'>Email: {userData.email}</Typography>
        </Stack>
        {userData.marks ?
          <Typography variant='subtitle1'>Marks: {userData.marks}</Typography>:
          <form onSubmit={handleSubmit}>
            <Stack direction='row' sx={{mt:2}}>
                <TextField
                  id="Marks"
                  label="Enter AIR Marks (Percentile)"
                  value={marks}
                  type="number"
                  onChange={(event) => setMarks(event.target.value)}
                  sx={{flexGrow: 1}}
                />
                <Button onClick={handleSubmit} variant='contained'>Submit</Button>
            </Stack>
          </form>
        }
      </Container>
		</Layout>
	)
}

export default Profile;
