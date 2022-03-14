import React from 'react'
import { AppBar, Toolbar, IconButton, Button, Typography, Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

import Logo from '../Logo/Logo';

const Navbar = () => {
	return (
		<AppBar position='static'>
			<Toolbar>
				<Logo />
			</Toolbar>
		</AppBar>
	)
}

export default Navbar
