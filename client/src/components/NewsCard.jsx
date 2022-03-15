import React from 'react'
import {CardMedia, Card, Stack, Typography, Button} from '@mui/material'

export default function NewsCard({value}) {
  return (
    <Card
        sx={{ maxWidth: '100%', maxHeight: {xs: 300, md:200}, mt: 2, p: 2, alignItems: 'center' }}
    >
        <Stack direction='row' alignItems='center' justifyContent='space-between' >
            <Stack sx={{width: '80%'}}>
                <Typography variant='h6'>{value.title}</Typography>
                <Typography variant='subtitle2'>{value.author}</Typography>
                <Button sx={{mt:2, maxWidth: 200}} variant='contained' component='a' href={value.link} target='_blank' >Read Now</Button>
            </Stack>
            <CardMedia
                component="img"
                height="100"
                sx={{width: '100px', borderRadius: '8px'}}
                image={value.media}
                alt='news-image'
            />
        </Stack>
    </Card>
  )
}
