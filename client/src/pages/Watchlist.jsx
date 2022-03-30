import React, { useState, useEffect, useContext } from 'react'
import { Grid, Button, Typography, Container, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import FeatherIcon from 'feather-icons-react'

import axios from '../services/axios'
import { UserContext } from '../services/UserContext'
import Layout from "../layout/Layout"
import WatchListCard from '../components/WatchListCard'
import UniversityCard from '../components/Filter/UniversityCard'
import Loader from '../components/Loader'

const WatchList = () => {
	const [collegeData, setCollegeData] = useState(null);

	const {user, setUser } = useContext(UserContext);

	useEffect(() =>{
		axios()
		.get('/user/getWatchlist', {params: {
			user: user
		}})
		.then(res =>{
			setCollegeData(res.data)
		})
		.catch(err =>{
			console.log(err)
		})
	}, [])

	return (
		<Layout>
			<Container maxWidth='lg'>
				<Stack sx={{mx: 4, my:2}}>
					<Stack justifyContent='space-between' alignItems='center' direction='row' sx={{width: '100%', mb: 2}}>
						<Typography variant='h5'>
							WatchList
						</Typography>
					</Stack>
					<Grid justifyContent='center' container spacing={2} columns={12}>
					{collegeData ? collegeData.map(value =>{
						return(
						<UniversityCard collegeInfo={value}/>
						)
						}) : <Loader /> }
					</Grid>
				</Stack>
			</Container>
		</Layout>
	)
}

export default WatchList
