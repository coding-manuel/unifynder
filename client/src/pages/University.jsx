import * as React from 'react';
import {Stack, Container, Typography } from '@mui/material';
import FeatherIcon from 'feather-icons-react'
import { useParams } from 'react-router-dom'

import Layout from '../layout/Layout'
import axios from '../services/axios';


export default function University() {
  const [uniData, setUniData] = React.useState({});
  let { id } = useParams();

  React.useEffect(()=>{
    axios()
    .post('/university/getOneUni',{
      id: id
    })
    .then(res => setUniData(res.data))

  }, [])
  return (
    <Layout>
      <Container maxWidth='lg'>
        <Stack direction='row' alignItems='center' gap={4} my={2}>
          <img style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: 4}} src={uniData.Images} alt={uniData.College_Name} />
          <Stack>
            <Typography gutterBottom variant="h6">{uniData.College_Name}</Typography>
            <Stack direction='row' alignItems='center' gap={1}>
                <FeatherIcon size={18} icon='map-pin' />
                <Typography variant="subtitle2" color="text.secondary">{uniData.City + ', ' + uniData.State}</Typography>
            </Stack>
          </Stack>
          <Stack>


          </Stack>
        </Stack>

      </Container>
    </Layout>
  );
}

