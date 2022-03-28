import { Container, Stack, Typography, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../layout/Layout'

export default function NotFount() {
  return (
    <Layout>
      <Stack sx={{width: '100vw', py:10}} alignItems='center'>
        <Stack sx={{width: '60%'}} alignItems='center'>
          <Typography variant="h1" sx={{fontWeight: 600}}>404</Typography>
          <Typography variant="h6" pt={2} sx={{fontWeight: 600}}>Are you lost?</Typography>
          <Button component={Link} to='/home' variant='contained' sx={{mt: 4}}>Take me back</Button>
        </Stack>
      </Stack>
    </Layout>
  )
}
