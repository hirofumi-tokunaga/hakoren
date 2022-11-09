import Header from 'components/header'
import Footer from 'components/footer'
import Nav from 'components/nav'
import Box from '@mui/material/Box'
import styles from 'styles/layout.module.scss'
import { useAuthState } from 'hooks/useAuthState'
import { SignInForm } from "../components/SignInForm"
import { useRouter } from "next/router"

export default function Layout({ children }) {
	const url = useRouter()
	const login = useAuthState()
	return (
		login.isSignedIn ? (
			<>
			<Header />
			<Box className={`${styles.box}`}>
				<Nav/>
				<main>{children}</main>
			</Box>
			<Footer />
			</>
		) : (
			url.pathname === "/reservation" ? (
				children
			) : (
				<SignInForm />
			)
		)
	)
}
