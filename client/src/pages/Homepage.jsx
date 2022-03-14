import React, { useState, useEffect } from 'react'
import { Grid, Button, Typography, Container } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
// import ArrowCircleDownIcon from '@mui/icons/ArrowCircleDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import MediaCard from '../components/Mediacards';
import SendIcon from '@mui/icons-material/Send';

import axios from '../services/axios'

import Navbar from '../components/Navbar/Navbar'
import HackathonCard from '../components/Dashboard/HackathonCard'

const Homepage = () => {
	// const [allHackathon, setAllHackathon] = useState([])
	const [enrolledHackathon, setEnrolledHackathon] = useState([])
	const [username, setUsername] = useState(localStorage.getItem('username'))

	useEffect(() => {
		axios()
			.post('/hackathon/getall')
			.then((res) => setAllHackathon(res.data))

		axios()
			.post('/hackathon/getuser', { username: username })
			.then((res) => setEnrolledHackathon(res.data[0].hackathon))
	}, [])
	const options = ['Courses', 'Colleges', 'State','State'];
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);
	const [selectedIndex, setSelectedIndex] = React.useState(1);
  
	const handleClick = () => {
	  console.info(`You clicked ${options[selectedIndex]}`);
	};
  
	const handleMenuItemClick = (event, index) => {
	  setSelectedIndex(index);
	  setOpen(false);
	};
  
	const handleToggle = () => {
	  setOpen((prevOpen) => !prevOpen);
	};
  
	const handleClose = (event) => {
	  if (anchorRef.current && anchorRef.current.contains(event.target)) {
		return;
	  }
  
	  setOpen(false);
	};
  

  
	return (
		<>
			<Navbar />
			<Container maxWidth='lg'>
				<Grid container spacing={2} direction='column' justify='space-evenly'>
					<Grid item xs={12} alignItems='center' >
						<Grid item>
						<Box
      component="form"
      sx={{
        '& > :not(style)': { my: 4, width: '120ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="search" variant="outlined" />
    
    </Box>


	  
						</Grid>
					<Grid sx={{my:2}}>	
						<Typography variant='h5'>
							Explore Colleges
						</Typography>
				

					</Grid>
					<Button variant="contained" endIcon={<SendIcon />}>
        see more
      </Button>
					<Grid sx={{my:2}} item container justifyContent='space-evenly'>
						<MediaCard  url= "https://robohash.org/${id}?set=set2&size=180x180" name="VJTI" />
						<MediaCard  url= "https://robohash.org/${id}?set=set2&size=180x180" name="FRCRCE" />
						<MediaCard url= "https://robohash.org/${id}?set=set2&size=180x180" name="Dj Sanghvi" />
					
					</Grid>


					{/* <Grid item container justifyContent='space-evenly'>
						{allHackathon.map((hackathon) => {
							if (enrolledHackathon.includes(hackathon.id))
								return <HackathonCard hackathon={hackathon} />
						})}
					</Grid> */}
					<Grid sx={{my:2}}>	
						<Typography variant='h5'>
							Explore Courses
						</Typography>
				

					</Grid>
					<Button variant="contained" endIcon={<SendIcon />}>
        see more
      </Button>
					<Grid sx={{my:2}} item container justifyContent='space-evenly'>
						<MediaCard name= "BE"/>
						<MediaCard name= "Bcom"/>
						<MediaCard name= "BA"/>
				
					</Grid>

					{/* <Grid item container justifyContent='space-evenly'>
						{allHackathon.map((hackathon) => {
							if (enrolledHackathon.includes(hackathon.id))
								return <HackathonCard hackathon={hackathon} />
						})}
					</Grid> */}
					
					<Grid direction="row" spacing={2} sx={{my:2}}>	
						<Typography variant='h5'>
							Explore States
						</Typography>
					
					</Grid>
					<Button variant="contained" endIcon={<SendIcon />}>
        see more
</Button>
					<Grid sx={{my:2}} item container justifyContent='space-evenly'>
						<MediaCard name="Maharastra"/>
						<MediaCard name="Goa"/>
						<MediaCard name="Kerala"/>

					</Grid>
				
					{/* <Grid item container justifyContent='space-evenly'>
						{allHackathon.map((hackathon) => {
							if (enrolledHackathon.includes(hackathon.id))
								return <HackathonCard hackathon={hackathon} />
						})}
					</Grid> */}
					
					
			    </Grid>
				</Grid>
			</Container>
		</>
	)
}

export default Homepage;
