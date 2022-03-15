import React, {useState, useEffect} from 'react'
import {AppBar, Slider, Box, Divider, Pagination, Drawer, IconButton, Toolbar, Typography, Grid, Select, InputLabel, FormControl, Stack, MenuItem, FormGroup, Switch, FormControlLabel} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import FeatherIcon from 'feather-icons-react'
import {Link} from 'react-router-dom'

import axios from "../services/axios"
import Logo from '../components/Logo/Logo'
import FilterAccordion from '../components/Filter/FilterAccordion'
import UniversityCard from '../components/Filter/UniversityCard'
import {collegeData} from "../sample"
import Navbar from '../components/Navbar/Navbar'
import Loader from '../components/Loader'

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
  "Type":[
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
  const [filters, setFilters] = useState({City: [], University: [], Type: []});
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [uniData, setUniData] = useState([]);
  const [eligible, setEligible] = useState(false);
  const [loader, setLoader] = useState(true);

  const drawerWidth = 240
  const container = window.document.body


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handlePageChange = (event, value) =>{
    setPage(value)
  }

  useEffect(() => {
    setLoader(true)
    axios()
    .get("/getUni",{params: {
      page: page
    }})
    .then(res => {
      setUniData(res)
      setPageCount(parseInt(res.data.pagination.pageCount))
      setLoader(false)
    })
    .catch(err =>{
      console.error(error)
    })
  }, [page]);

  const [sort, setSort] = React.useState('');

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const showFilteredResults = () =>{

  }

  const handleFilters = (filter, category) =>{
    const newFilters = {...filters}

    newFilters[category] = filter

    showFilteredResults(newFilters)
    setFilters(newFilters)
  }

  function valuetext(value) {
    return `${value}°C`;
  }

  const PriceSlider = () => {

    const minDistance = 10;

    const [value1, setValue1] = React.useState([20, 37]);

    const handleChange1 = (event, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
        return;
      }

      if (activeThumb === 0) {
        setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
      } else {
        setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
      }
    };

    const [value2, setValue2] = React.useState([20, 37]);

    const handleChange2 = (event, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
        return;
      }

      if (newValue[1] - newValue[0] < minDistance) {
        if (activeThumb === 0) {
          const clamped = Math.min(newValue[0], 100 - minDistance);
          setValue2([clamped, clamped + minDistance]);
        } else {
          const clamped = Math.max(newValue[1], minDistance);
          setValue2([clamped - minDistance, clamped]);
        }
      } else {
        setValue2(newValue);
      }
    }
    return (
      <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => 'Minimum distance'}
          value={value1}
          onChange={handleChange1}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
        />
      </Box>
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
        <FormControlLabel control={<Switch defaultChecked />} onChange={(e)=>{setEligible(!eligible)}} checked={eligible} label="Am I eligible?" />
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
          {loader ? <Stack alignItems='center'><Loader sx={{width: '100%'}} size={24} /></Stack> :
          <>
            <Stack pb={2} direction='row' alignItems='center' justifyContent='space-between' gap={2}>
              <Stack >
                <Typography>Displaying {uniData.data.pagination.skip + 50} of {uniData.data.pagination.count} results</Typography>
                <Typography>Page {page}</Typography>
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
            <Grid justifyContent='center' container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {uniData.data.items.map(value =>{
                return(
                  <UniversityCard collegeInfo={value}/>
                )
              }) }
            </Grid>
            <Pagination count={pageCount} page={page} onChange={handlePageChange} shape="rounded" justifyContent='center' sx={{pt: 2}} />
          </>
          }
        </Box>
      </Box>
    </>
  )
}