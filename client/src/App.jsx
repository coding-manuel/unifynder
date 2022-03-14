import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Feed from './pages/Feed'
import Admin from './pages/Admin'
import Search from './pages/Search'
import Profile from './pages/Profile'
import Watchlist from './pages/Watchlist'

import Homepage from './pages/Homepage.jsx'
const App = () => {
	return (
		<div className='App'>
			<Routes>
				<Route path='auth' element={<Auth />} />
				<Route path='dash' element={<Dashboard />} />
				<Route path='feed' element={<Feed />} />
				<Route path='search' element={<Search />} />
				<Route path='home' element={<Homepage />} />
				<Route path='watchlist' element={<Watchlist />} />
				<Route path='profile' element={<Profile />} />
				<Route path='admin' element={<Admin />} />
			</Routes>
		</div>
	)
}

// const PrivateRoute = ({ component: Component, ...rest }) => {
// 	return (
// 		<Route
// 			{...rest}
// 			render={(props) =>
// 				localStorage.getItem('user') ? (
// 					<Component {...rest} {...props} />
// 				) : (
// 					<Navigate to={{ pathname: '/auth' }} />
// 				)
// 			}
// 		/>
// 	)
// }

export default App
