import React, {useState, useMemo, useEffect} from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import { UserContext } from "./services/UserContext"
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Feed from './pages/Feed'
import Search from './pages/Search'
import Profile from './pages/Profile'
import Watchlist from './pages/Watchlist'
import Collegepage from './pages/Collegepage'
import Homepage from './pages/Homepage.jsx'
const App = () => {
	const [user, setUser] = useState(localStorage.getItem('userID'));

  	const value = useMemo(() => ({ user, setUser }), [user, setUser]);

	useEffect(() => {
		let userid = localStorage.getItem('userID')
		setUser(userid)
	}, []);

	const PrivateRoute = ({ children }) => {
		console.log(user)
		return user ? children : <Navigate to='/authenticate' />
	}
	return (
		<div className='App'>
			<UserContext.Provider value={value}>
				<Routes>
					<Route path='authenticate' element={<Auth />} />
					<Route path='search' element={<Search />} />
					<Route path='home' element={<Homepage />} />
					<Route path='dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
					<Route path='newsfeed' element={<PrivateRoute><Feed /></PrivateRoute>} />
					<Route path='watchlist' element={<PrivateRoute><Watchlist /></PrivateRoute>} />
					<Route path='profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
					<Route path='college' element={<Collegepage />} />
				</Routes>
			</UserContext.Provider>
		</div>
	)
}

export default App
