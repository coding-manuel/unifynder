import React, {useState} from 'react';
import {Stack, Container, Typography, Button } from '@mui/material';
import SnackBar from '../SnackBar';

import axios from "../../services/axios"
import Layout from '../../layout/Layout'
import Input from '../TextField/Input'
import { useLocation, useNavigate } from 'react-router-dom';

export default function EditUniversity() {
  const navigate = useNavigate()
  const {state} = useLocation()

  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')

  const [collegeName, setCollegeName] = useState(state.College_Name);
  const [campusSize, setCampusSize] = useState(state.Campus_Size);
  const [students, setStudents] = useState(state.Total_Students);
  const [faculty, setFaculty] = useState(state.Total_Faculty);
  const [established, setEstablished] = useState(state.Established_Year);
  const [rating, setRating] = useState(state.Rating);
  const [university, setUniversity] = useState(state.University);
  const [facilities, setFacilities] = useState(state.Facilities);
  const [courses, setCourses] = useState(state.Courses);
  const [city, setCity] = useState(state.City);
  const [State, setState] = useState(state.State);
  const [averageFees, setAverageFees] = useState(state.Average_Fees);
  const [cutoff1, setCutoff1] = useState(state.Cutoff_Round_One);
  const [cutoff2, setCutoff2] = useState(state.Cutoff_Round_Two);
  const [images, setImages] = useState(state.Images);

  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
          return
      }
      setOpen(false)
  }

  const submitHandler = (e) =>{
      e.preventDefault
      if(collegeName === '' || campusSize === '' || students === '' || faculty === '' || established === '' || rating === 0 || university === '' || facilities === '' || city === '' || state === '' || averageFees ==='' || cutoff1 === '' || cutoff2 === '')
      {
          setOpen(true)
          setError('Fill all the details')
      }
      else{
          axios()
          .post('/university/updateUni', {
              College_Name: collegeName,
              Campus_Size: campusSize,
              Total_Students: students,
              Total_Faculty: faculty,
              Established_Year: established,
              Rating: rating,
              University: university,
              Facilities: facilities,
              Courses: courses,
              City: city,
              State: State,
              Average_Fees: averageFees,
              Cutoff_Round_One: cutoff1,
              Cutoff_Round_Two: cutoff2,
              Images: images
          })
          .then(res => {
              setOpen(true)
              setError("University Edit Succesfully")
              navigate(`/university/${state._id}`)
          })
          .catch(err =>{
              setOpen(true)
              setError("University Already Exists")
          })
      }
  }

  return (
      <Layout>
          <SnackBar open={open} handleClose={handleClose} error={error} />
          <Container maxWidth='md' sx={{my:4}}>
              <Stack direction='column' gap={2}>
                  <Typography variant="h4">
                      Edit University
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
                                  value={State}
                                  type='text'
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
                                  name='averagefees'
                                  label='Average Fees'
                                  half={true}
                                  handleChange={(event) => setAverageFees(event.target.value)}
                                  value={averageFees}
                                  type='number'
                              />
                          </Stack>
                          <Input
                              name='Courses'
                              label='Courses'
                              handleChange={(event) => setCourses(event.target.value)}
                              value={courses}
                              type='text'
                          />
                          <Input
                              name='Facilities'
                              label='Facilities'
                              handleChange={(event) => setFacilities(event.target.value)}
                              value={facilities}
                              type='text'
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
                          <Button sx={{mt: 2}} onClick={()=>submitHandler(event)} variant="contained">
                              Save Changes
                          </Button>
                      </Stack>
                  </form>
              </Stack>
          </Container>
      </Layout>
  );
}

