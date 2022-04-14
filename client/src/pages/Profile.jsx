import React, { useState, useEffect, useContext } from 'react'
import {Button, Typography, Container, Input, Stack, Snackbar, IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material'
import { Link } from 'react-router-dom'
import FeatherIcon from 'feather-icons-react'
import { UserContext } from '../services/UserContext'

import {news} from "../news"
import NewsCard from '../components/NewsCard'
import InputText from '../components/TextField/Input';
import Loader from '../components/Loader';

import axios from '../services/axios'

import Layout from '../layout/Layout'

const Profile = () => {
  const {user, setUser } = useContext(UserContext);

  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState(null);
  const [collegeData, setCollegeData] = useState(null);
  const [userData, setUserData] = useState({});
  const [marks, setMarks] = useState(null);
  const [error, setError] = useState();
  const [open, setOpen] = useState(false)
  const [dopen, setDopen] = useState(false)

  const uploadImage = (file) =>{
    setLoader(true)

    var fd = new FormData();
    fd.append('docs', file[0]);
    fd.append('id', user);

    axios()
    .post('/user/saveMarksheet', fd, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      setFile(res.data)
      setOpen(true)
      setError('File Uploaded Sucessfully')
      setLoader(false)
    })
    .catch(err =>{
      setOpen(true)
      setError("Error Uploading the file")
      setLoader(false)
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(marks > 100){
      setOpen(true)
      setError("Marks cannot be greater that 100")
    }
    axios()
    .post('/user/enterMarks',{
      marks: marks,
      user: user
    })
    .then(res =>{
      setUserData(res.data)
      setOpen(true)
      setDopen(false)
      setError("Marks Set")
    })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const removeImage = () => {
    setLoader(true)

    axios()
    .post('/user/removeMarksheet', {
        id: user
    })
    .then(res => {
      setFile(res.data)
      setOpen(true)
      setError('File Removeds Sucessfully')
      setLoader(false)
    })
    .catch(err =>{
      setOpen(true)
      setError("Error Uploading the file")
      setLoader(false)
    })
  }

  const shareFile = () => {
    setOpen(true)
    setError("Copied to Clipboard")
    navigator.clipboard.writeText(file.url)
  }

  const dialogOpen = () =>{
    setDopen(true)
  }

  const dhandleClose = () =>{
    setDopen(false)
  }

  useEffect(()=>{
    axios()
    .get('/user/getUser',{params: {
      user: user
    }})
    .then(res =>{
      setUserData(res.data)
    })
    .catch(err =>{
      console.log(err)
    })
  }, [])

	useEffect(() =>{
		axios()
		.get('/user/getWatchlist', {params: {
			user: user
		}})
		.then(res =>{
			setCollegeData(res.data)
		})
		.catch(err =>{
			console.log(err)
		})
	}, [])

	useEffect(() =>{
		axios()
		.get('/user/getMarksheet', {params: {
			id: user
		}})
		.then(res =>{
			setFile(res.data === [] ? null : res.data[0])
		})
		.catch(err =>{
			console.log(err)
		})
	}, [])

	return (
		<Layout>
      <Snackbar
					open={open}
					autoHideDuration={3000}
					onClose={handleClose}
					message={error}
					action={
						<React.Fragment>
							<IconButton
								aria-label='close'
								color='inherit'
								sx={{ padding: '5px', borderRadius: '6px' }}
								onClick={handleClose}
							>
								<FeatherIcon icon='x' size='16' />
							</IconButton>
						</React.Fragment>
					}
				/>
      <Dialog
        open={dopen}
        onClose={dhandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{mb:2}}>
            Enter your AIR Marks (Percentile)
          </DialogContentText>
          <InputText
              name='Marks'
              label='Enter AIR Marks'
              fullidth={true}
              handleChange={(event) => setMarks(event.target.value)}
              value={marks}
              type='number'
          />
        </DialogContent>
        <DialogActions>
          <Button variant='text' onClick={dhandleClose}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Container maxWidth='lg' sx={{py: 4}}>
        <Stack gap={2}>
          <Typography variant='h4'>Hello, {userData.name}</Typography>
        </Stack>
        {userData.marks ?
          <Stack sx={{mt:3}} direction='row' justifyContent='space-between' alignItems='center'>
            <Typography variant='h6'>Marks: {userData.marks}</Typography>
            <Tooltip title="Replace">
              <IconButton onClick={dialogOpen} variant="contained" component="span">
                <FeatherIcon size={20} icon='repeat' />
              </IconButton>
            </Tooltip>
          </Stack>:
          <form onSubmit={handleSubmit}>
            <Stack direction='row' sx={{mt:3}} gap={2}>
                <InputText
                    name='Marks'
                    label='Enter AIR Marks (Percentile)'
                    fullidth={true}
                    handleChange={(event) => setMarks(event.target.value)}
                    value={marks}
                    type='number'
                />
                <Button onClick={handleSubmit} variant='contained'>Submit</Button>
            </Stack>
          </form>
        }
        {file ?
          <Stack direction='row' alignItems='center' sx={{mt: 4}} gap={4}>
            <Stack direction='row' gap={2} alignItems='center'>
              <a href={file.url}>
                <img src={`https://res.cloudinary.com/youreng/image/upload/v1649772483/${file.filename}.jpg`} style={{borderRadius: 4, cursor: 'pointer'}} width='100px' height='auto'  alt="" />
              </a>
            </Stack>
            <Stack gap={2}>
              <Typography variant="h6">{file.origname}</Typography>
              <Stack direction='row' gap={2}>
                <label htmlFor="fileUpload">
                  <Input accept="image/*" id="fileUpload" type="file" onChange={(event)=>{uploadImage(event.target.files)}} sx={{display: 'none'}}/>
                  <Tooltip title="Replace">
                    <IconButton variant="contained" component="span">
                      {loader ? <Loader /> : <FeatherIcon size={20} icon='repeat' />}
                    </IconButton>
                  </Tooltip>
                </label>
                <Tooltip title="Delete">
                  <IconButton variant="contained" onClick={()=>removeImage()} component="span">
                    {loader ? <Loader /> : <FeatherIcon size={20} icon='trash' />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share">
                  <IconButton variant="contained" size="small" onClick={shareFile}>
                    <FeatherIcon size={20} icon='share-2' />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Download">
                  <IconButton component='a' href={`https://res.cloudinary.com/youreng/image/upload/v1649772483/${file.filename}`} download='sample.PDF' variant="contained" size="small">
                    <FeatherIcon size={20} icon='download' />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          </Stack>
          :
          <label htmlFor="fileUpload">
            <Stack direction='row' justifyContent='space-between' sx={{marginTop: 3}} alignItems='center'>
              <Typography variant="h6">Upload your Marksheet</Typography>
              <Input accept="image/*" id="fileUpload" type="file" onChange={(event)=>{uploadImage(event.target.files)}} sx={{display: 'none'}}/>
              <Tooltip title="Upload">
                <IconButton variant="contained" component="span">
                  {loader ? <Loader /> : <FeatherIcon size={20} icon='upload' />}
                </IconButton>
              </Tooltip>
            </Stack>
          </label>
        }
				<Stack sx={{my:4}}>
					<Stack justifyContent='space-between' alignItems='center' direction='row' sx={{width: '100%', mb: 2}}>
						<Typography variant='h4' align='center'>
							News Articles
						</Typography>
						<Button variant="text" component={Link} to={'/newsfeed'} endIcon={<FeatherIcon icon='chevron-right' />}>
								See All
						</Button>
					</Stack>
					{news[0].articles.slice(0,5).map(value =>{
						return(
							<NewsCard value={value}/>
						)
					})}
				</Stack>
      </Container>
		</Layout>
	)
}

export default Profile;
