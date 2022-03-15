import React from 'react'
import { Paper, Typography } from '@mui/material'
import Logo from '../Logo/Logo'

export default function Footer() {
  return (
    <Paper sx={{p: 2, borderRadius: 0}}>
      <Logo />
      <Typography variant="subtitle2" sx={{maxWidth: 300, my:2, mx:1}}>Unifynder is an all in one solution for studnets to find information for their dream college</Typography>
    </Paper>
  )
}
