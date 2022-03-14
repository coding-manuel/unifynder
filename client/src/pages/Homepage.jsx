import React, { useState, useEffect } from 'react'
import { Grid, Button, Typography, InputAdornment, FormControl, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import MediaCard from '../components/Mediacards';
import SendIcon from '@mui/icons-material/Send';
import FeatherIcon from 'feather-icons-react'

import axios from '../services/axios'

import Layout from '../layout/Layout'

const Homepage = () => {
	const [search, setSearch] = useState('');

	const options = ['Courses', 'Colleges', 'State','State'];

	const submitHandler = () =>{
		console.log("chiekn")
	}

	return (
		<Layout>
			<Grid container spacing={2} direction='column' justifyContent='center' alignItems='center'>
				<FormControl sx={{mx: 4, mt:4, mb:2, width: '90%'}} onSubmit={() => submitHandler()}>
					<TextField
					id="Search"
					label="Search Colleges, Courses or location"
					fullWidth
					value={search}
					InputProps={{
						startAdornment: (
						<InputAdornment position="start">
							<FeatherIcon icon='search' size='20'/>
						</InputAdornment>
						),
					}}
					onChange={(event) => setSearch(event.target.value)}
					/>
				</FormControl>
				<Stack sx={{mx: 4, my:2, width: '80%'}}>
					<Stack justifyContent='space-between' alignItems='center' direction='row' sx={{width: '100%', mb: 2}}>
						<Typography variant='h5'>
							Explore Colleges
						</Typography>
						<Button variant="text" endIcon={<FeatherIcon icon='chevron-right' />}>
							See More
						</Button>
					</Stack>
					<Grid container sx={{my: 2, p:0}} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent='center'>
						<MediaCard  url= "https://robohash.org/${id}?set=set2&size=180x180" name="VJTI" />
						<MediaCard  url= "https://robohash.org/${id}?set=set2&size=180x180" name="FRCRCE" />
						<MediaCard url= "https://robohash.org/${id}?set=set2&size=180x180" name="Dj Sanghvi" />
						<MediaCard url= "https://robohash.org/${id}?set=set2&size=180x180" name="Dj Sanghvi" />
					</Grid>
				</Stack>
				<Stack sx={{mx: 4, my:2, width: '80%'}}>
					<Stack justifyContent='space-between' alignItems='center' direction='row' sx={{width: '100%', mb: 2}}>
						<Typography variant='h5'>
							Explore Courses
						</Typography>
						<Button variant="text" endIcon={<FeatherIcon icon='chevron-right' />}>
							See More
						</Button>
					</Stack>
					<Grid container sx={{my: 2, p:0}} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent='center'>
						<MediaCard  url= "https://robohash.org/${id}?set=set2&size=180x180" name="BE" />
						<MediaCard  url= "https://robohash.org/${id}?set=set2&size=180x180" name="B-COM" />
						<MediaCard url= "https://robohash.org/${id}?set=set2&size=180x180" name="BA" />
					</Grid>
				</Stack>
				<Stack sx={{mx: 4, my:2, width: '80%'}}>
					<Stack justifyContent='space-between' alignItems='center' direction='row' sx={{width: '100%', mb: 2}}>
						<Typography variant='h5'>
							Explore Courses
						</Typography>
						<Button variant="text" endIcon={<FeatherIcon icon='chevron-right' />}>
							See More
						</Button>
					</Stack>
					<Grid container sx={{my: 2, p:0}} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent='center'>
						<MediaCard  url= "https://robohash.org/${id}?set=set2&size=180x180" name="Maharashtra" />
						<MediaCard  url= "https://robohash.org/${id}?set=set2&size=180x180" name="Goa" />
						<MediaCard url= "https://robohash.org/${id}?set=set2&size=180x180" name="Kerala" />
					</Grid>
				</Stack>
			</Grid>
		</Layout>
	)
}

export default Homepage;
