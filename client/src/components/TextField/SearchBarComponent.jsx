import React from 'react'
import { styled } from '@mui/system';
import { TextField, InputAdornment } from '@mui/material'
import InputUnstyled from '@mui/base/InputUnstyled';
import FeatherIcon from 'feather-icons-react'


const StyledInputElement = styled('input')(
	({ theme }) => `
	width: 100%;
	font-size: 0.875rem;
	font-weight: 500;
	line-height: 1.5;
	color: #ffffff;
	background: #292929;
	border: 0.2px solid transparent;
	border-radius: 4px;
	padding: 8px 12px;
	transition: .1s ease-out;
    outline: none;

	&:hover {
	  background: #333333;
	  border: 0.2px solid #333333;
	}

	&:focus {
	  border: 0.2px solid ${theme.palette.primary.main};
	}
  `,
);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
return (
	<InputUnstyled components={{ Input: StyledInputElement }} {...props} ref={ref} />
);
});


const SeachBarComponent = ({ name, blur, handleSubmit, handleChange, value, label, autoFocus, type, half }) => {
	return (
        <CustomInput
            name={name}
            placeholder={label}
            variant='outlined'
            value={value}
            onChange={handleChange}
            autoFocus={autoFocus}
            required
            type={type}
			onBlur={blur}
			onSubmit={handleSubmit}
        />
	)
}

export default SeachBarComponent
