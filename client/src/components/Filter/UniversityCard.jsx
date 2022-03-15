import React from 'react'
import {Card, ButtonGroup, CardContent, CardMedia, Button, Typography, Grid, Stack} from '@mui/material';
import FeatherIcon from 'feather-icons-react'

export default function UniversityCard({collegeInfo}) {
  return (
    <Grid item sm={4} md={3} lg={2}>
        <Stack>
            <Card sx={{ maxWidth: 345, minHeight: 300, maxHeight: 300, borderRadius: '4px 4px 0px 0px'}}>
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
                    </CardContent>
                </Stack>
            </Card>
            <ButtonGroup fullWidth variant="contained" sx={{flexGrow: 2, maxWidth: 345}}>
                <Button size="small" sx={{borderRadius: '0px 0px 4px 4px'}}><Typography variant='subtitle2'>Learn More</Typography></Button>
                <Button size="small" sx={{borderRadius: '0px 0px 4px 4px'}}><Typography variant='subtitle2'>Share</Typography></Button>
            </ButtonGroup>
        </Stack>
    </Grid>
  )
}
