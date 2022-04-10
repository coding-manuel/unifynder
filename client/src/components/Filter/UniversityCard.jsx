import React, {useState} from 'react'
import {Card, CardContent, CardMedia, Button, Typography, Grid, Stack, Rating} from '@mui/material';
import FeatherIcon from 'feather-icons-react'
import { useNavigate } from 'react-router-dom';

import SnackBar from '../SnackBar';

export default function UniversityCard({collegeInfo}) {
    const [open, setOpen] = useState(false)
	const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleClick = () =>{
        navigate(`/university/${collegeInfo._id}`)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    const shareUniversity = () =>{
        setOpen(true)
        setError("Copied to Clipboard")
        navigator.clipboard.writeText(`http://localhost:3000/university/${collegeInfo._id}`)
    }

    return (
        <Grid item sm={6} md={4} lg={3}>
            <SnackBar open={open} handleClose={handleClose} error={error} />
            <Stack>
                <Card sx={{ maxWidth: 345, minHeight: 300, maxHeight: 300, borderRadius: '4px 4px 0px 0px', position: 'relative'}}>
                    <Stack direction='column'>
                        <CardMedia
                            component="img"
                            height="140"
                            sx={{width: '345px'}}
                            image={collegeInfo.Images}
                            alt={collegeInfo.College_Name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" sx={{m: '-50px 0px 0px', fontSize: 18}}>{collegeInfo.College_Name}</Typography>
                            <Stack direction='row' alignItems='center' gap={1}>
                                <FeatherIcon size={12} icon='map-pin' />
                                <Typography variant="subtitle2" sx={{fontSize: 12}} color="text.secondary">{collegeInfo.City + ',' + collegeInfo.State}</Typography>
                            </Stack>
                            <Rating name="rating" value={collegeInfo.Rating} precision={0.5} readOnly />
                        </CardContent>
                    </Stack>
                </Card>
                <Stack direction='row' sx={{maxWidth: 345}}>
                    <Button variant="contained" size="small" sx={{borderRadius: '0px 0px 0px 4px', flexGrow: 2}} onClick={handleClick}><Typography variant='subtitle2'>Learn More</Typography></Button>
                    <Button variant="contained" size="small" sx={{borderRadius: '0px 0px 4px 0px'}} onClick={shareUniversity}><FeatherIcon size={16} icon='share-2' /></Button>
                </Stack>
            </Stack>
        </Grid>
    )
}