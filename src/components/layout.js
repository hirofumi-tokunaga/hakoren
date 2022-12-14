import Header from 'src/components/header'
import Footer from 'src/components/footer'
import Nav from 'src/components/nav'
import Box from '@mui/material/Box'
import styles from 'src/styles/layout.module.scss'
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
