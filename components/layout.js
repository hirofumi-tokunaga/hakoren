import Header from 'components/header'
import Footer from 'components/footer'
import Nav from 'components/nav'
import Box from '@mui/material/Box'
import styles from 'styles/layout.module.scss'
import { useRouter } from "next/router"

export default function Layout({ children}) {
	const url = useRouter()
	return (
		url.pathname === "/search" || url.pathname === "/login" ? (
			children
		) : (
			<>
				<Header />
				<Box className={`${styles.box}`}>
					<Nav />
					<main>{children}</main>
				</Box>
				<Footer />
			</>
		)
	)
}
