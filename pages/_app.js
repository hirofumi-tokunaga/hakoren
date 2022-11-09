import '../styles/globals.scss'
import Layout from 'components/layout'
import { ThemeProvider, createTheme } from '@mui/material/styles'

function MyApp({ Component, pageProps }) {
	const theme = createTheme({
		palette: {
			primary: {
				// light: "#64b5f6",
				main: "#1976d2",
				// main: "#ffff02",
				// dark: "#1976d2",
			}
		},
		typography: {
			button: {
				textTransform: "none"
			}
		},
		props: {
			MuiCheckbox: {
				color: "primary"
			},
			MuiRadio: {
				color: "primary"
			},
			MuiSwitch: {
				color: "primary"
			},
			MuiTextField: {
				variant: "outlined",
			},
		}
	})
	return (
		<ThemeProvider theme={theme}>
			<Layout>
				< Component {...pageProps } />
			</Layout>
		</ThemeProvider>
	)
}

export default MyApp
