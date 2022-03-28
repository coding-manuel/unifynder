import React, {useEffect, useState} from 'react';
import { FormControl, Paper, Stack, Typography, Button } from '@mui/material';
import FeatherIcon from 'feather-icons-react'

import SearchBarComponent from '../TextField/SearchBarComponent'
import axios from '../../services/axios';
import { createEdgeNGrams } from '../../services/utils';
import { Link, useNavigate } from 'react-router-dom';

const Searchbar = () => {
	const [search, setSearch] = useState('')
    const [searchData, setSearchData] = useState([]);
    const [searchVisible, setSearchVisible] = useState(true);

    let navigate = useNavigate()

    const searchStyle = {
        borderRadius: 2,
        padding: '8px 18px',
        cursor: 'pointer',
        transition: '.2s ease-out',
        '&:hover' : {
            backgroundColor: '#333333'
        }
    }

    const handleSearch = (value) =>{
        axios()
        .post('/university/getSearch',{
            search: createEdgeNGrams(value)
        })
        .then(res =>{
            setSearchData(res.data)
        })
        setSearch(value)
        setSearchVisible(true)
    }

    const submitHandler = (e) =>{
		e.preventDefault()
        navigate(`/search/t=${search}`)
	}

    const handleClick = (value) =>{
        navigate(`/university/${value}`)
    }

    return (
        <form onSubmit={(event) => submitHandler(event)} style={{margin: '32px 32px 16px 32px', position: 'relative', width: '80%'}}>
            <SearchBarComponent
            id="Search"
            label="Search Colleges, Courses or location"
            fullWidth
            value={search}
            handleChange={(event) => handleSearch(event.target.value)}

            style={{position: 'relative'}}
            handleSubmit={() => submitHandler()}
            />
            <Stack sx={{backgroundColor: '#292929', borderRadius: '8px', mt: 2, position:'absolute', top: '40px', width: '100%', zIndex: '10'}}>
                {searchVisible &&
                    <>
                        {searchData.length !== 0 && searchData.map(value =>{
                            return(
                                <Stack alignItems='center' onClick={() => handleClick(value._id)} component={Paper} elevation={0} gap={2} direction='row' sx={searchStyle}>
                                    <img src={value.Images} alt={value.College_Name} style={{width: '60px', height: '60px', backgroundSize: 'cover', borderRadius: '8px'}} />
                                    <Stack>
                                        <Typography variant="subtitle2">{value.College_Name}</Typography>
                                        <Stack direction='row' alignItems='center' gap={1}>
                                            <FeatherIcon size={12} icon='map-pin' />
                                            <Typography variant="subtitle2" sx={{fontSize: 12}} color="text.secondary">{value.City + ',' + value.State}</Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            )
                        })}
                        {searchData.length !== 0 && <Button component={Link} to={`/search/t=${search}`} variant="contained" sx={{mx: '16px', my:'16px', borderRadius: '8px'}}>See All Results</Button>}
                    </>
                }
            </Stack>
        </form>
    );
}

export default Searchbar;
