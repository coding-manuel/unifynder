import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#b42b51',
			dark: '#961c3c',
		},
		secondary: {
			main: '#e63e6d',
		},
		background: {
			default: '#1F1F1F',
			paper: '#383838',
		},
		error: {
			main: '#E70E02',
			dark: '#DE0D02',
		},
	},
	transitions: {
		duration: {
			enteringScreen: 300,
			leavingScreen: 300,
		},
	},
	components: {
		MuiAccordion:{
			defaultProps:{
				expanded: true,
			},
			styleOverrides:{
				root:{
					background: 'transparent',
					backgroundImage: 'none',
					'&.Mui-expanded':{
						margin: 0
					}
				}
			}
		},
		MuiAccordionSummary :{
			styleOverrides:{
				root:{
					'&.Mui-expanded':{
						minHeight: 0
					}
				},
				content:{
					'&.Mui-expanded':{
						margin: '12px 0'
					}
				}
			}
		},
		MuiAccordionDetails:{
			styleOverrides:{
				root:{
					padding: '8px 16pxs',
				}
			}
		},
		MuiCheckbox:{
			styleOverrides:{
				root:{
					padding:'2px 12px 2px 2px'
				}
			}
		},
		MuiFormControlLabel:{
			styleOverrides:{
				root:{
					marginLeft: 0
				}
			}
		},
		MuiToolbar:{
			styleOverrides:{
				root:{
					padding: '0 8px !important',
					'@media (min-width: 600px)': {
						padding: '0 16px'
					  }
				}
			}
		},
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					borderRadius: 6,
					border: 'thin rgba(255, 255, 255, 0.12) solid',
					marginLeft: 0,
					padding: 6,
				},
			},
			variants: [
				{
					props: { variant: 'off' },
					style: {
						backgroundColor: '#E70E02',
						'&:hover': {
							backgroundColor: '#B60B02',
						},
					},
				},
			],
		},
		MuiTreeView: {
			styleOverrides: {
				root: {
					margin: 10,
				},
			},
		},
		MuiTreeItem: {
			styleOverrides: {
				content: {
					transition: '.1s ease-out',
					padding: '0 8px',
					margin: '2px',
					borderRadius: 4,
					'&.Mui-selected': {
						backgroundColor: '#383838',
						'&.Mui-focused': { backgroundColor: '#383838' },
						'&.Mui-hover': { backgroundColor: '#383838' },
					},
				},
			},
		},
		MuiSvgIcon: {
			styleOverrides: {
				root: {
					fontSize: '1.25rem',
				},
			},
		},
		MuiList: {
			defaultProps: { dense: true },
		},
		MuiListItem: {
			styleOverrides: {
				root: {
					padding: 0,
					'&.Mui-selected': {
						backgroundColor: '#383838',
						'&:hover': { backgroundColor: '#383838' },
					},
				},
			},
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					minWidth: 36,
				},
			},
		},
		MuiMenuItem: {
			defaultProps: { dense: true },
		},
		MuiTable: {
			defaultProps: { size: 'small' },
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					fontWeight: 500,
					borderRadius: 8,
					transition: 'all 2000 ease-out',
					'&:hover': {
						background: 'grey[100]',
					},
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					borderTop: 'thin rgba(255, 255, 255, 0.12) solid',
				},
			},
		},
		MuiDrawer: {
			styleOverrides: {
				paper: {
					backgroundColor: '#1F1F1F',
				},
			},
		},
	},
	typography: {
		fontFamily: 'Sora, sans-serif',
		h5: {
			fontWeight: 600,
		},
		subtitle1:{
			fontWeight: 700,
		}
	},
})
