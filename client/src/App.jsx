import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import { UserContext } from "./UserContext";
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Feed from './pages/Feed'
import Admin from './pages/Admin'
import Search from './pages/Search'
import Profile from './pages/Profile'
import Watchlist from './pages/Watchlist'

import Homepage from './pages/Homepage.jsx'
const App = () => {
	const [user, setUser] = useState(null);

  	const value = useMemo(() => ({ user, setUser }), [user, setUser]);
	return (
		<div className='App'>
			<Routes>
				<UserContext.Provider value={value}>
					<Route path='auth' element={<Auth />} />
					<PrivateRoute path='dash' element={<Dashboard />} />
					<PrivateRoute path='feed' element={<Feed />} />
					<Route path='search' element={<Search />} />
					<Route path='home' element={<Homepage />} />
					<PrivateRoute path='watchlist' element={<Watchlist />} />
					<PrivateRoute path='profile' element={<Profile />} />
					<Route path='admin' element={<Admin />} />
				</UserContext.Provider>
			</Routes>
		</div>
	)
}

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				user ? (
					<Component {...rest} {...props} />
				) : (
					<Navigate to={{ pathname: '/auth' }} />
				)
			}
		/>
	)
}

export default App
