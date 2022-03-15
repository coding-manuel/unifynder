import React, { useState,useContext} from 'react'
import { AppBar, Toolbar, IconButton, Stack, Box, Menu, MenuItem, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import FeatherIcon from 'feather-icons-react'

import { UserContext } from '../../services/UserContext'
import Logo from '../Logo/Logo';

const Navbar = () => {
	const [anchorEl, setAnchorEl] = useState(null)
	const {user, setUser } = useContext(UserContext);

	const open = Boolean(anchorEl)
	const navigate = useNavigate()

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	};
	const handleClose = () => {
		setAnchorEl(null)
	};
	const handleLogout = () =>{
		localStorage.removeItem('userID')
		setUser(null)
		navigate('/home')
	}

	return (
		<>
			<AppBar position='static'>
				<Toolbar>
					<Box sx={{flexGrow: 2}}>
						<Logo />
					</Box>
					{user ?
					<Stack direction='row' alignItems='center' justifyContent='flex-end' gap={2} mx={2}>
						<IconButton component={Link} to="/watchlist" aria-label="WatchList">
							<FeatherIcon icon='bookmark' />
						</IconButton>
						<IconButton aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} aria-label="Profile" onClick={handleClick}>
							<FeatherIcon icon='user' />
						</IconButton>
					</Stack> :
					<Button component={Link} to='/authenticate' variant='contained'>Register</Button>
					}
				</Toolbar>
			</AppBar>
			<Menu
			id="basic-menu"
			anchorEl={anchorEl}
			open={open}
			onClose={handleClose}
			MenuListProps={{
			'aria-labelledby': 'basic-button',
			}}>
				<MenuItem component={Link} to='/profile' onClick={handleClose}>Profile</MenuItem>
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>
		</>
	)
}

export default Navbar
