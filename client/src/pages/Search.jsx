import React, {useState, useEffect, useContext} from 'react'
import {AppBar, Button, Slider, Box, Divider, Pagination, Drawer, IconButton, Toolbar, Typography, Grid, Select, InputLabel, FormControl, Stack, MenuItem, FormGroup, Switch, FormControlLabel, Menu, Container} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import FeatherIcon from 'feather-icons-react'
import {Link, useParams} from 'react-router-dom'

import { UserContext } from '../services/UserContext'
import axios from "../services/axios"

import FilterAccordion from '../components/Filter/FilterAccordion'
import UniversityCard from '../components/Filter/UniversityCard'
import Navbar from '../components/Navbar/Navbar'
import Loader from '../components/Loader'
import { createEdgeNGrams } from '../services/utils';
import SearchBarComponent from '../components/TextField/SearchBarComponent'

import Logo from '../components/Logo/Logo'
import { categories } from '../filter'

export default function Search() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [userData, setUserData] = useState({});
  const {user, setUser } = useContext(UserContext);
  const [eligible, setEligible] = useState(false);
  const [filters, setFilters] = useState({University: [], State: [], Search: '', eligible: eligible, user: user});
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [uniData, setUniData] = useState([]);
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [loader, setLoader] = useState(true);

  let { state, searchterm } = useParams();

	const open = Boolean(anchorEl)
  const drawerWidth = 240
  const container = window.document.body

  useEffect(() => {
    setLoader(true)
    axios()
    .get("/university/getUni",{params: {
      page: page,
      filters: filters,
    }})
    .then(res => {
      setUniData(res)
      setPageCount(parseInt(res.data.pagination.pageCount))
      setLoader(false)
    })
    .catch(err =>{
      console.error(error)
    })
  }, [filters, page, eligible, search]);

  useEffect(() =>{
    state = state && handleFilters(state, 'State')
    searchterm = searchterm && handleFilters(searchterm, 'Search')
    setSearch(searchterm)
  }, [])

  useEffect(()=>{
    axios()
    .get('/user/getUser',{params: {
      user: user
    }})
    .then(res =>{
      setUserData(res.data)
    })
    .catch(err =>{
      console.log(err)
    })
  }, [])

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handlePageChange = (event, value) =>{
    setPage(value)
  }

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleFilters = (filter, category) =>{
    const newFilters = {...filters}

    newFilters[category] = filter

    setFilters(newFilters)
  }

  const handleSearch = (value) =>{
    handleFilters(value, 'Search')
    setSearch(value)
  }

  const handleEligible = () =>{
    const newFilters = {...filters}
    setEligible(!eligible)

    newFilters["eligible"] = eligible

    setFilters(newFilters)
  }

  function valuetext(value) {
    return `${value}°C`;
  }

  const PriceSlider = () => {

    const minDistance = 10;

    const [rating, setRating] = React.useState([1, 3]);

    const handleChange = (event, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
        return;
      }

      setRating(newValue)
    };

    return (
      <Stack sx={{mx:3, my:2}} gap={2}>
        <Typography variant='subtitle1'>College Rating</Typography>
        <Slider
          getAriaLabel={() => 'Minimum distance'}
          value={rating}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={0}
          step={0.2}
          size='small'
          max={5}
          disableSwap
        />
      </Stack>
    )
  }

  const drawer = (
    <>
      <Toolbar sx={{padding: '0 2px'}}>
        <Logo/>
      </Toolbar>
      <Divider />
      {Object.entries(categories).map((value) => {
          return (
            <>
              <FilterAccordion categories={value} handleFilters={filters =>handleFilters(filters, value[0]) }/>
              <Divider />
            </>
          )
        })}
      <FormGroup sx={{py:1}}>
        <FormControlLabel control={<Switch defaultChecked />} onChange={()=>{handleEligible()}} checked={eligible} label={<Typography variant='subtitle1'>Am I eligible?</Typography>} />
      </FormGroup>
      <Divider />
      <PriceSlider />
    </>
  );

  return (
    <>
    <Navbar />
      <Box sx={{ display: 'flex', height: 'auto' }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: '#1F1F1F'
          }}
        >
          <Toolbar sx={{padding: '0px 16px !important'}}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <FeatherIcon icon='menu' size='20'/>
            </IconButton>
            <div style={{flexGrow: 1, margin: '0 16px 0 0'}}>
              <SearchBarComponent
                id="Search"
                label="Search Colleges, Courses or location"
                fullWidth
                value={search}
                handleChange={(event) => handleSearch(event.target.value)}
              />
            </div>
            {user ?
              <Stack direction='row' alignItems='center' justifyContent='flex-end' gap={2}>
                <IconButton component={Link} to="/watchlist" aria-label="WatchList">
                  <FeatherIcon icon='bookmark' size='20'/>
                </IconButton>
                <IconButton aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} aria-label="Profile" onClick={handleClick}>
                  <FeatherIcon icon='user' size='20'/>
                </IconButton>
              </Stack> :
              <Button component={Link} to='/authenticate' variant='contained'>Register</Button>
            }
          </Toolbar>
          <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
          'aria-labelledby': 'basic-button',
          }}>
            <MenuItem component={Link} to='/profile' onClick={handleClose}>Profile</MenuItem>
            <MenuItem component={Link} to='/newsfeed' onClick={handleClose}>News Feed</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          {loader ? <Stack alignItems='center'><Loader sx={{width: '100%'}} size={24} /></Stack> :
          <Container maxWidth='xl'>
            <Stack pb={2} direction='row' alignItems='center' justifyContent='space-between' gap={2}>
              <Stack >
                <Typography>Displaying {Math.min(uniData.data.pagination.count, page * 50)} of {uniData.data.pagination.count} results</Typography>
              </Stack>
              <FormControl fullWidth sx={{maxWidth: 200, fontSize: '12px'}}>
                <InputLabel sx={{fontSize: '12px'}} id="demo-simple-select-label">Sort by</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sort}
                  label="Sort by"
                  onChange={handleSortChange}
                  sx={{fontSize: '12px'}}
                >
                  <MenuItem value={1}>Average Fees: High to Low</MenuItem>
                  <MenuItem value={2}>Average Fees: Low to High</MenuItem>
                  <MenuItem value={3}>Rating</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Grid justifyContent='center' container spacing={2} columns={12}>
              {uniData.data.pagination.count === 0 ?
                <Stack pt={4} pb={2}>
                  <Typography>Oops, No matching results</Typography>
                </Stack>
                : uniData.data.items.map(value =>{
                return(
                  <UniversityCard collegeInfo={value}/>
                )
              }) }
            </Grid>
            <Pagination count={pageCount} page={page} onChange={handlePageChange} shape="rounded" sx={{pt: 4}} />
          </Container>
          }
        </Box>
      </Box>
    </>
  )
}