import React, {useState, useMemo, useEffect} from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import { UserContext } from "./services/UserContext"
import Auth from './pages/Auth'
import AdminLogin from './pages/AdminLogin'
import AdminDash from './pages/AdminDash'
import Feed from './pages/Feed'
import Search from './pages/Search'
import Profile from './pages/Profile'
import Watchlist from './pages/Watchlist'
import Homepage from './pages/Homepage.jsx'
import University from './pages/University'
import NotFound from './pages/NotFount'
import AddUniversity from './components/Admin/AddUniversity'

const App = () => {
	const [user, setUser] = useState(localStorage.getItem('userID'));
	const [admin, setAdmin] = useState(localStorage.getItem('admin'));

  	const value = useMemo(() => ({ user, setUser }), [user, setUser]);

	useEffect(() => {
		let userid = localStorage.getItem('userID')
		setUser(userid)
	}, []);

	const PrivateRoute = ({ children }) => {
		return user ? children : <Navigate to='authenticate' />
	}

	const AdminRoute = ({children}) =>{
		return admin ? children : <Navigate to='authenticate' />
	}
	return (
		<div className='App'>
			<UserContext.Provider value={value}>
				<Routes>
					<Route path='home' element={<Homepage />} />
					<Route path='/' exact element={<Navigate to="home" />} />

					<Route path='authenticate' element={<Auth />} />
					<Route path='adminauth' element={<AdminLogin />} />

					<Route path='search' element={<Search />}>
						<Route path='s=:state' element={<Search />}/>
						<Route path='t=:searchterm' element={<Search />}/>
					</Route>

					<Route path='newsfeed' element={<PrivateRoute><Feed /></PrivateRoute>} />
					<Route path='watchlist' element={<PrivateRoute><Watchlist /></PrivateRoute>} />
					<Route path='profile' element={<PrivateRoute><Profile /></PrivateRoute>} />

					<Route path='admindash' element={<AdminRoute><AdminDash /></AdminRoute>} />
					<Route path='adduni' element={<AdminRoute><AddUniversity /></AdminRoute>} />

					<Route path='university/:id' element={<University />} />

					<Route path="notfound" element={<NotFound />} />
					<Route path="*" element={<Navigate to="notfound" />} />
				</Routes>
			</UserContext.Provider>
		</div>
	)
}

export default App
