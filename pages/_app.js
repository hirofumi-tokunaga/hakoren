import { useEffect } from 'react'
import '../styles/globals.scss'
import Layout from 'components/layout'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useAuthState } from 'hooks/useAuthState'

function MyApp({ Component, pageProps, router }) {
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
	const login = useAuthState()
	useEffect(() => {
		if (router.pathname === "/login" || router.pathname === "/search") return; // pathnameが"/login"の場合には処理を行わない
		// ここに処理を書く
		if (!login.isSignedIn && !login.isLoading) {
			router.push("/login")
		}
	}, [login.isLoading])
	return (
		<>
			{(router.pathname === "/login" || router.pathname === "/search" || login.isSignedIn) && (
				<ThemeProvider theme={theme}>
					<Layout>
						< Component {...pageProps } />
					</Layout>
				</ThemeProvider>

				)
			}
		</>
	)
}

export default MyApp
