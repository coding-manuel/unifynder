import React, {useState, useMemo, useEffect} from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import { UserContext } from "./services/UserContext"
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Feed from './pages/Feed'
import Search from './pages/Search'
import Profile from './pages/Profile'
import Watchlist from './pages/Watchlist'
import Homepage from './pages/Homepage.jsx'
import University from './pages/University'
import NotFound from './pages/NotFount'

const App = () => {
	const [user, setUser] = useState(localStorage.getItem('userID'));

  	const value = useMemo(() => ({ user, setUser }), [user, setUser]);

	useEffect(() => {
		let userid = localStorage.getItem('userID')
		setUser(userid)
	}, []);

	const PrivateRoute = ({ children }) => {
		console.log(user)
		return user ? children : <Navigate to='authenticate' />
	}
	return (
		<div className='App'>
			<UserContext.Provider value={value}>
				<Routes>
					<Route path='home' element={<Homepage />} />
					<Route path='/' exact element={<Navigate to="home" />} />

					<Route path='authenticate' element={<Auth />} />

					<Route path='search' element={<Search />}>
						<Route path='s=:state' element={<Search />}/>
						<Route path='t=:searchterm' element={<Search />}/>
					</Route>

					<Route path='dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
					<Route path='newsfeed' element={<PrivateRoute><Feed /></PrivateRoute>} />
					<Route path='watchlist' element={<PrivateRoute><Watchlist /></PrivateRoute>} />
					<Route path='profile' element={<PrivateRoute><Profile /></PrivateRoute>} />

					<Route path='university/:id' element={<University />} />

					<Route path="notfound" element={<NotFound />} />
					<Route path="*" element={<Navigate to="notfound" />} />
				</Routes>
			</UserContext.Provider>
		</div>
	)
}

export default App
