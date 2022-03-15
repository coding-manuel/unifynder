import React, { useState, useEffect, useContext } from 'react'
import { Grid, Button, Typography, Container, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import FeatherIcon from 'feather-icons-react'

import axios from '../services/axios'
import {collegeData} from '../sample'
import { UserContext } from '../services/UserContext'
import Layout from "../layout/Layout"
import WatchListCard from '../components/WatchListCard'
import UniversityCard from '../components/Filter/UniversityCard'

const WatchList = () => {
	const {user, setUser } = useContext(UserContext);

	return (
		<Layout>
			<Container maxWidth='lg'>
				<Stack sx={{mx: 4, my:2}}>
					<Stack justifyContent='space-between' alignItems='center' direction='row' sx={{width: '100%', mb: 2}}>
						<Typography variant='h5'>
							WatchList
						</Typography>
						<Button variant="text" component={Link} to={'/watchlist'} endIcon={<FeatherIcon icon='chevron-right' />}>
							See All
						</Button>
					</Stack>
					<Grid container sx={{my: 2, p:0}} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent='center'>
					{collegeData.map(value =>{
						return(
						<UniversityCard collegeInfo={value}/>
							)
						}) }
					</Grid>
				</Stack>
			</Container>
		</Layout>
	)
}

export default WatchList
