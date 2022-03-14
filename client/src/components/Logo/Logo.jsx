import React from 'react'
import { Typography, Stack } from '@mui/material'
import { useNavigate } from "react-router-dom";
import FeatherIcon from 'feather-icons-react'

export default function Logo() {
  const navigate = useNavigate();

  const handleClick =() =>{
    navigate('/home')
  }
  return (
    <Stack onClick={() => handleClick()} direction='row' alignItems='center' sx={{cursor: 'pointer'}}>
        <FeatherIcon icon='loader' style={{ margin: '0 6px' }} />
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            unifynder
        </Typography>
    </Stack>
  )
}
