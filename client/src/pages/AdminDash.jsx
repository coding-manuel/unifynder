import React from 'react'
import { Link } from 'react-router-dom'

import Layout from '../layout/Layout'
import {Button, Stack, Container} from '@mui/material'
import Typography from '@mui/material/Typography'

const Admindash = () => {
    return (
        <div>
            <Layout>
                <Container maxWidth="lg" sx={{mt:2}}>
                    <Stack direction='column' gap={2}>
                        <Typography variant="h6">Actions</Typography>
                        <Button variant="contained" component={Link} to='/adduni'>
                        Add University
                        </Button>
                    </Stack>
                </Container>
            </Layout>
        </div>
    );
}

export default Admindash
