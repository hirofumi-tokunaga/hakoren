import Header from 'src/components/header'
import Footer from 'src/components/footer'
import MemberHeader from 'src/components/memberHeader'
import Nav from 'src/components/nav'
import Box from '@mui/material/Box'
import styles from 'src/styles/layout.module.scss'
import { useRouter } from "next/router"
import {LoginMemberProvider } from "src/components/loginMember"

export default function Layout({ children}) {
	const url = useRouter()
	return (
		url.pathname === "/search" || url.pathname === "/login" || url.pathname === "/estimate" || url.pathname === "/members/registry" || url.pathname === "/members/login" || url.pathname === "/members/mypage" || url.pathname === "/members/booking" || url.pathname === "/members/info_change" ? (
			<LoginMemberProvider>
				<MemberHeader />
				{children}
			</LoginMemberProvider>
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
