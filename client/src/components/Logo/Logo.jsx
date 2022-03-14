import React from 'react'
import { Typography } from '@mui/material'
import FeatherIcon from 'feather-icons-react'

export default function Logo() {
  return (
    <>
        <FeatherIcon icon='loader' style={{ margin: '0 6px' }} />
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            unifynder
        </Typography>
    </>
  )
}
