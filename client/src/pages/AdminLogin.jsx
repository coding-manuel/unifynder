import React, { useState,useContext, useEffect } from 'react'
import { Button, Paper, Grid, Typography, Link, Snackbar, IconButton, Stack } from '@mui/material'
import FeatherIcon from 'feather-icons-react'
import { useNavigate } from 'react-router-dom'
import axios from '../services/axios'

import SnackBar from '../components/SnackBar'
import Input from '../components/TextField/Input'
import Loader from '../components/Loader'
import { UserContext } from '../services/UserContext'

export default function AdminLogin() {
	let navigate = useNavigate()

	const [loader, setLoader] = useState(false)
	const [isSignUp, setIsSignUp] = useState(true)
	const [open, setOpen] = useState(false)
	const [error, setError] = useState('')
	const [adminID, setAdminID] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const {user, setUser } = useContext(UserContext);

	const handleSubmit = (event) => {
		event.preventDefault()
		setLoader(true)
		if (isSignUp) {
			if ((password === '', repeatPassword === '', name === '', email === '', adminID === '')) {
				setLoader(false)
				setOpen(true)
				setError('Fill all the details')
			} else if (password !== repeatPassword) {
				setLoader(false)
				setOpen(true)
				setError("Password don't match")
			}
			else{
				axios()
					.post('/auth/adminregister', {
						name: name,
						email: email,
						password: password,
                        adminID: adminID
					})
					.then((res) => {
                        localStorage.setItem('admin', true)
						setLoader(false)
						navigate('/home')
					})
					.catch((error)=>{
						setLoader(false)
						setOpen(true)
						setError(error.response.data)
					})
				}
			} else {
				if (email === '' || password === '') {
					setOpen(true)
					setError('Fill all the details')
				}else{
					axios()
					.post('/auth/adminlogin', {
						email: email,
						password: password,
					})
					.then((res) => {
                        localStorage.setItem('admin', true)
						setLoader(false)
						navigate('/home')
					})
					.catch((error)=>{
						setLoader(false)
						setOpen(true)
						setError(error.response.data)
					})
				}
			}
		}

		const handleClose = (event, reason) => {
			if (reason === 'clickaway') {
				return
			}
			setOpen(false)
		}

		return (
			<Grid container alignItems='center' justifyContent='center' sx={{ height: '100vh' }}>
				<SnackBar open={open} handleClose={handleClose} error={error} />
				<Grid item>
					<Paper sx={{ py: 4, px: 6}}>
						<form autoComplete='off' noValidate onSubmit={handleSubmit}>
							<Grid
								container
								direction='column'
								justifyContent='center'
								alignItems='center'
								spacing={2}
							>
								<Grid item xs={12}>
									<Typography variant='h5' align='center'>
										{isSignUp ? 'Sign Up' : 'Welcome Back!'}
									</Typography>
								</Grid>
								<Grid item>
									<FeatherIcon icon='lock' />
								</Grid>
								{isSignUp && (
									<>
										<Input
											name='Name'
											label='Full Name'
											handleChange={(event) => setName(event.target.value)}
											value={name}
											half
											autoFocus={true}
										/>
									</>
								)}
								<Input
									name='email'
									label='Email Address'
									handleChange={(event) => setEmail(event.target.value)}
									value={email}
									type='email'
								/>
								<Input
									name='password'
									label='Password'
									handleChange={(event) => setPassword(event.target.value)}
									value={password}
									type='password'
								/>
								{isSignUp && (
									<Input
										name='confirmPassword'
										label='Repeat Password'
										handleChange={(event) => setRepeatPassword(event.target.value)}
										value={repeatPassword}
										type='password'
									/>
								)}
                                <Input
									name='adminID'
									label='AdminID'
									handleChange={(event) => setAdminID(event.target.value)}
									value={adminID}
									type='text'
								/>

								<Button sx={{ mt: 4 }} type='submit' variant='contained' color='primary'>
									<Stack direction='row' alignItems='center' gap={1}>
										{isSignUp ? 'Sign Up' : 'Sign In'}
										{loader && <Loader size={16} />}
									</Stack>
								</Button>
							</Grid>
						</form>
					</Paper>
					{isSignUp === true ? (
						<Typography py={1} variant='subtitle2'>
							Already an admin?
							<Link
								sx={{ px: '4px', cursor: 'pointer' }}
								underline='hover'
								onClick={() => {
									setIsSignUp(!isSignUp)
								}}
							>
								Sign In
							</Link>
						</Typography>
					) : (
						<Typography py={1} variant='subtitle2'>
							Not an admin?
							<Link
								sx={{ px: '4px', cursor: 'pointer' }}
								underline='hover'
								onClick={() => {
									setIsSignUp(!isSignUp)
								}}
							>
								Sign up
							</Link>
						</Typography>
					)}
				</Grid>
			</Grid>
		)
}
