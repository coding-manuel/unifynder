import React from 'react'
import FeatherIcon from 'feather-icons-react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';

const StyledIcon = styled(FeatherIcon)(({ theme }) => ({
    animation:'spin 2s cubic-bezier(.65, -0.40, .60, 1.23) infinite',
    '@keyframes spin': { '100%': { transform: 'rotate(360deg)' } }
}));


export default function Loader({size, pad}) {
  return (
    <StyledIcon icon='loader' size={size} />
  )
}
