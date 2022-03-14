import React, {useState} from 'react'
import {AppBar, Box, Divider, Drawer, IconButton, Toolbar, Typography, Grid, Select, InputLabel, FormControl, Stack, MenuItem, FormGroup, Switch, FormControlLabel} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import FeatherIcon from 'feather-icons-react'
import {Link} from 'react-router-dom'

import Layout from '../layout/Layout'
import Container from '@mui/material/Container'
import Logo from '../components/Logo/Logo'
import FilterAccordion from '../components/Filter/FilterAccordion'
import UniversityCard from '../components/Filter/UniversityCard'
import {collegeData} from "../sample"
import Navbar from '../components/Navbar/Navbar'

const categories = {
  "City":[
    {
      id:1,
      name:'Mumbai'
    },
    {
      id:2,
      name:'Delhi'
    },
    {
      id:3,
      name:'Patna'
    },
    {
      id:4,
      name:'Manipal'
    },
    {
      id:5,
      name:'Bhopal'
    }
  ],
  "University":[
    {
      id:1,
      name: "MU"
    },
    {
      id:2,
      name: "CU"
    },
    {
      id:2,
      name: "DU"
    }
  ],
  "College Type":[
    {
      id:1,
      name: "Private"
    },
    {
      id:2,
      name: "Government"
    }
  ]
}

export default function Search() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [filters, setFilters] = useState({city: []});

  const drawerWidth = 240
  const container = window.document.body


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const [sort, setSort] = React.useState('');

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const showFilteredResults = () =>{

  }

  const handleFilters = (filters, category) =>{
    const newFilters = {...filters}

    newFilters[category] = filters

    showFilteredResults(newFilters)
    setFilters(newFilters)
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
              <FilterAccordion categories={value} handleFilters={filters =>handleFilters(filters, "City") }/>
              <Divider />
            </>
          )
      })}
    </>
  );

  return (
    <>
    <Navbar />
      <Box sx={{ display: 'flex' }}>
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
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Search Colleges
          </Typography>
            <Stack direction='row' alignItems='center' justifyContent='flex-end' gap={2}>
              <IconButton component={Link} to="/watchlist" aria-label="WatchList">
                <FeatherIcon icon='bookmark' />
              </IconButton>
              <IconButton component={Link} to="/profile" aria-label="Profile">
                <FeatherIcon icon='user' />
              </IconButton>
            </Stack>
          </Toolbar>
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
          <Stack pb={2} direction='row' alignItems='center' justifyContent='space-between' gap={2}>
            <FormGroup>
              <FormControlLabel control={<Switch defaultChecked />} label="Am I eligible?" />
            </FormGroup>
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
          <Grid justifyContent='center' container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {collegeData.map(value =>{
              return(
                <UniversityCard collegeInfo={value}/>
              )
            }) }
          </Grid>
        </Box>
      </Box>
    </>
  )
}