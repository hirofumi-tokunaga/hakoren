import Header from 'components/header'
import Footer from 'components/footer'
import Nav from 'components/nav'
import Box from '@mui/material/Box'
import styles from 'styles/layout.module.scss'

export default function Layout({children }) {
	return (
		<>
			<Header />
			<Box className={`${styles.box}`}>
				<Nav/>
				<main>{children}</main>
			</Box>
			<Footer />
		</>
	)
}
