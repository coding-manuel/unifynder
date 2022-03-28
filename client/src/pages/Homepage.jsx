import React, { useState, useEffect } from 'react'
import { Grid, Button, Typography, InputAdornment, FormControl, Stack } from '@mui/material'

import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import MediaCard from '../components/Mediacards';
import UniversityCard from '../components/Filter/UniversityCard';
import FeatherIcon from 'feather-icons-react'

import axios from '../services/axios'

import Layout from '../layout/Layout'
import Loader from '../components/Loader';
import StateCard from '../components/StateCard';
import Searchbar from '../components/Home/SearchBar';

const Homepage = () => {
	const [trendingData, setTrendingData] = useState(null);

	const cities = ['Maharashtra', 'Tamil Nadu', 'Delhi', 'Telengana', 'Rajasthan']

	useEffect(()=>{
		axios()
		.post('/university/getTrending')
		.then(res =>{
		  setTrendingData(res.data)
		})
		.catch(err =>{
		  console.log(err)
		})
	}, [])

	return (
		<Layout>
			<Stack alignItems='center' spacing={4}>
				<Searchbar />
				<Stack sx={{mx: 4, my:2, width: '80%'}}>
					<Stack justifyContent='space-between' alignItems='center' direction='row' sx={{width: '100%', mb: 4}}>
						<Typography variant='h5'>
							Trending Colleges
						</Typography>
						<Button variant="text" component={Link} to={`/search`} endIcon={<FeatherIcon icon='chevron-right' />}>
							See More
						</Button>
					</Stack>
					<Grid container justifyContent='center' spacing={2} columns={12}>
						{trendingData === null ? <Loader /> : trendingData.map(value =>{
							return(
								<UniversityCard collegeInfo={value}/>
							)
						}) }
					</Grid>
				</Stack>
				<Stack sx={{mx: 4, my:2, width: '80%'}}>
					<Stack justifyContent='space-between' alignItems='center' direction='row' sx={{width: '100%', mb: 4}}>
						<Typography variant='h5'>
							Explore by States
						</Typography>
						<Button variant="text" component={Link} to={`/search`} endIcon={<FeatherIcon icon='chevron-right' />}>
							See All
						</Button>
					</Stack>
					<Grid container sx={{my: 2, p:0}} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent='center'>
						{cities.map(value =>{
							return(
								<StateCard state={value} />
							)
						}) }
					</Grid>
				</Stack>
			</Stack>
		</Layout>
	)
}

export default Homepage;
