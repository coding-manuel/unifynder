import React from 'react'
import { styled } from '@mui/system';
import { TextField, Grid } from '@mui/material'
import InputUnstyled from '@mui/base/InputUnstyled';


const StyledInputElement = styled('input')(
	({ theme }) => `
	width: 100%;
	font-size: 0.875rem;
	font-weight: 500;
	line-height: 1.5;
	color: #ffffff;
	background: #292929;
	border: 0.2px solid transparent;
	border-radius: 8px;
	padding: 12px 12px;
	transition: .1s ease-out;

	&:hover {
		background: #242424;
		border: 0.2px solid #242424;
	}

	&:focus {
	  border: 1px solid ${theme.palette.primary.main};
	  outline: none;
	}
  `,
);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
return (
	<InputUnstyled components={{ Input: StyledInputElement }} {...props} ref={ref} />
);
});


const Input = ({ name, handleChange, value, label, autoFocus, type, half }) => {
	return (
		<Grid item xs={12} sm={half ? 6 : 12}>
			<CustomInput
				name={name}
				placeholder={label}
				variant='outlined'
				size='small'
				value={value}
				onChange={handleChange}
				autoFocus={autoFocus}
				type={type}
			/>
		</Grid>
	)
}

export default Input
