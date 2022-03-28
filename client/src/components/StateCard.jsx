import React, { useEffect, useState } from 'react'
import { Paper, Grid, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export default function StateCard({state}) {
    const [image, setImage] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchImage = async () =>{
            const img = await import(`../assets/${state}.png`)
            setImage(img.default)
        }

        fetchImage()
    }, [state]);

    const handleClick = () =>{
        navigate(`/search/s=${state}`)
    }

    return (
        <Grid item sx={{width: '150px'}} onClick={() => handleClick()}>
            <Paper elevation={2} sx={{padding: '20px', cursor: 'pointer'}}>
                <Stack alignItems='center' gap={1}>
                    <img style={{width: '60px'}} src={image} alt={state} />
                    <Typography variant='subtitle2'>{state}</Typography>
                </Stack>
            </Paper>
        </Grid>
    )
}
