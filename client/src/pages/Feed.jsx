import React, { useEffect } from 'react'
import { Button, Container, Typography, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import FeatherIcon from 'feather-icons-react'

import NewsCard from '../components/NewsCard'
import Layout from '../layout/Layout'
import {news} from "../news"

const Feed = () => {
	const navigate = useNavigate()

	var options = {
		method: 'GET',
		url: 'https://api.newscatcherapi.com/v2/search',
		params: {q: 'Bitcoin', lang: 'en', sort_by: 'relevancy', page: '1'},
		headers: {
		  'x-api-key': 'BMZeTFenrPie-TLUkBSXlfBrDtreUTtH1bXH-U2vITg'
		}
	};

	// useEffect(() => {
	// 	axios.request(options).then(function (response) {
	// 		console.log(response.data);
	// 	}).catch(function (error) {
	// 		console.error(error);
	// 	});
	// }, []);


	return (
		<Layout>
			<Container maxWidth='lg' sx={{py:2}}>
				<Stack>
					<Typography variant='h4' align='center'>
						News Articles
					</Typography>
					{news[0].articles.map(value =>{
						return(
							<NewsCard value={value}/>
						)
					})}
				</Stack>
			</Container>
		</Layout>
	)
}

export default Feed
