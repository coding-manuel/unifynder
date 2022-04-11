import React, {useContext, useState, useEffect} from 'react';
import {Stack, Container, Typography, Box, IconButton, List , ListItem, Table, TableCell, TableRow, TableBody, TableHead, Rating, Button } from '@mui/material';
import SnackBar from '../SnackBar';
import FeatherIcon from 'feather-icons-react'

import Layout from '../../layout/Layout'
import Input from '../TextField/Input'

export default function AddUniversity() {
    const [open, setOpen] = useState(false)
	const [error, setError] = useState('')

    const [collegeName, setCollegeName] = useState('');
    const [campusSize, setCampusSize] = useState('');
    const [students, setStudents] = useState('');
    const [faculty, setFaculty] = useState('');
    const [established, setEstablished] = useState('');
    const [rating, setRating] = useState('');
    const [university, setUniversity] = useState('');
    const [facilities, setFacilities] = useState('');
    const [courses, setCourses] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [averageFees, setAverageFees] = useState('');
    const [cutoff1, setCutoff1] = useState('');
    const [cutoff2, setCutoff2] = useState('');
    const [images, setImages] = useState('');



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
        }

    const submitHandler = (e) =>{
        e.preventDefault
        console.log('submit')
    }

    return (
        <Layout>
            <SnackBar open={open} handleClose={handleClose} error={error} />
            <Container maxWidth='md' sx={{my:4}}>
                <Stack direction='column' gap={2}>
                    <Typography variant="h4">
                        Add University
                    </Typography>
                    <form onSubmit={(event) => submitHandler(event)}>
                        <Stack direction='column' gap={2}>
                            <Input
                                name='collegename'
                                label='College Name'
                                fullidth={true}
                                handleChange={(event) => setCollegeName(event.target.value)}
                                value={collegeName}
                                type='text'
                            />
                            <Input
                                name='university'
                                label='University'
                                fullidth={true}
                                handleChange={(event) => setUniversity(event.target.value)}
                                value={university}
                                type='text'
                            />
                            <Input
                                name='images'
                                label='Image Link'
                                fullidth={true}
                                handleChange={(event) => setImages(event.target.value)}
                                value={images}
                                type='text'
                            />
                            <Typography variant="h6">Location</Typography>
                            <Stack direction='row' gap={1}>
                                <Input
                                    name='city'
                                    label='City'
                                    half={true}
                                    handleChange={(event) => setCity(event.target.value)}
                                    value={city}
                                    type='text'
                                />
                                <Input
                                    name='state'
                                    label='State'
                                    half={true}
                                    handleChange={(event) => setState(event.target.value)}
                                    value={state}
                                    type='number'
                                />
                            </Stack>
                            <Typography variant="h6">College Information</Typography>
                            <Stack direction='row' gap={1}>
                                <Input
                                    name='faculty'
                                    label='Faculty'
                                    half={true}
                                    handleChange={(event) => setFaculty(event.target.value)}
                                    value={faculty}
                                    type='number'
                                />
                                <Input
                                    name='students'
                                    label='Students'
                                    half={true}
                                    handleChange={(event) => setStudents(event.target.value)}
                                    value={students}
                                    type='number'
                                />
                            </Stack>
                            <Stack direction='row' gap={1}>
                                <Input
                                    name='established'
                                    label='Year Established'
                                    half={true}
                                    handleChange={(event) => setEstablished(event.target.value)}
                                    value={established}
                                    type='number'
                                />
                                <Input
                                    name='rating'
                                    label='Rating'
                                    half={true}
                                    handleChange={(event) => setRating(event.target.value)}
                                    value={rating}
                                    type='number'
                                />
                            </Stack>
                            <Stack direction='row' gap={1}>
                                <Input
                                    name='campussize'
                                    label='Campus Size'
                                    half={true}
                                    handleChange={(event) => setCampusSize(event.target.value)}
                                    value={campusSize}
                                    type='number'
                                />
                                <Input
                                    name='campussize'
                                    label='Campus Size'
                                    half={true}
                                    handleChange={(event) => setCampusSize(event.target.value)}
                                    value={campusSize}
                                    type='number'
                                />
                            </Stack>
                            <Input
                                name='Courses'
                                label='Courses'
                                handleChange={(event) => setCourses(event.target.value)}
                                value={courses}
                                type='number'
                            />
                            <Input
                                name='Facilities'
                                label='Facilities'
                                handleChange={(event) => setFacilities(event.target.value)}
                                value={facilities}
                                type='number'
                            />
                            <Typography variant="h6">Cut-Offs</Typography>
                            <Stack direction='row' gap={1}>
                                <Input
                                    name='cutoff1'
                                    label='Cutoff CAP Round 1'
                                    half={true}
                                    handleChange={(event) => setCutoff1(event.target.value)}
                                    value={cutoff1}
                                    type='number'
                                />
                                <Input
                                    name='cutoff2'
                                    label='Cutoff CAP Round 2'
                                    half={true}
                                    handleChange={(event) => setCutoff2(event.target.value)}
                                    value={cutoff2}
                                    type='number'
                                />
                            </Stack>
                            <Button sx={{mt: 2}} variant="contained">
                                Create University
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Container>
        </Layout>
    );
}

