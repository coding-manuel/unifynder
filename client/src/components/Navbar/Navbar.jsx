import React from 'react'
import { AppBar, Toolbar, IconButton, Stack, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import FeatherIcon from 'feather-icons-react'


import Logo from '../Logo/Logo';

const Navbar = () => {
	return (
		<AppBar position='static'>
			<Toolbar>
				<Box sx={{flexGrow: 2}}>
					<Logo />
				</Box>
				<Stack direction='row' alignItems='center' justifyContent='flex-end' gap={2} mx={2}>
					<IconButton component={Link} to="/watchlist" aria-label="WatchList">
						<FeatherIcon icon='bookmark' />
					</IconButton>
					<IconButton component={Link} to="/profile" aria-label="Profile">
						<FeatherIcon icon='user' />
					</IconButton>
				</Stack>
			</Toolbar>
		</AppBar>
	)
}

export default Navbar
